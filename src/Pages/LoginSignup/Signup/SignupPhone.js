import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { fullbg1, head1, padding10, text1, formcont1, label1, fontcont1in1, input1, colors, formcont2, link1, button1, link31, link32 } from '../../../CommonStyles/Theme'
import logo from '../../../Media/Images/ThemeLogoFull.png'
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import envs from '../../../env'

const SignupPhone = ({navigation}) => {
    const [phonenumber, setphonenumber] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const sendotptophone = () => {
        setLoading(true)
        fetch(envs.BACKEND_URL+'/sendotp',{
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phonenumber: phonenumber
            })
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log(json.message)
                setLoading(false)
                if(json.message == 'OTP sent successfully'){
                    alert('OTP sent successfully')
                    navigation.navigate('SignupOtp', {phonenumber: phonenumber, otp: json.otp})
                }
                else if(json.error == "User already exists with that phone number"){
                    alert('User already exists with that phone number')
                }
                else{
                    alert('Invalid phone number')
                }
            })
            .catch((error) => {
                setLoading(false)
                alert('Something went wrong');
            })
    }
    return (
        <View style={fullbg1}>
            <View style={styles.s1}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.s2}>
                <View style={formcont1} >
                    <Text style={label1}>ENTER YOUR MOBILE NO. TO CONTINUE</Text>
                    <View style={fontcont1in1}>
                        <FontAwesome5 name="mobile" size={20} color={colors.primary} />
                        <TextInput style={input1} placeholder='' placeholderTextColor={
                            colors.secondary
                        } 
                        maxLength={10}
                        onChangeText={text => setphonenumber(text)}
                        />
                    </View>
                    {
                        loading ?
                         <ActivityIndicator size="large" color={colors.primary} /> :  
                        <Text style={button1}
                        onPress={() => sendotptophone()}
                       >GET OTP</Text>

                    }
                    <Text style={link31}>
                        Already have an account? <Text style={link32} onPress={() => navigation.navigate('Login')}
                        >Login</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default SignupPhone
const styles = StyleSheet.create({
    s1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 300,
        backgroundColor: 'white',
        borderBottomEndRadius: 70,
        borderBottomStartRadius: 70,
    },
    logo: {
        width: 300,
        height: 200,
    },
    s2: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }

})

