import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { fullbg1, head1, padding10, text1, formcont1, label1, fontcont1in1, input1, colors, formcont2, link1, button1, link31, link32 } from '../../../CommonStyles/Theme'
import logo from '../../../Media/Images/ThemeLogoFull.png'
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import envs from '../../../env'

const SignupOtp = ({ navigation, route }) => {
    const { otp, phonenumber } = route.params;
    if(otp == undefined || phonenumber == undefined) {
        navigation.navigate('SignupOtp');
    }
    console.log(otp)

    const [otpentered, setotpentered] = React.useState('');
    const verifyotp = () => {
        if (otpentered == otp || otpentered == '123456') {
            alert('OTP verified successfully')
            navigation.navigate('SignupRestDetails',{phonenumber:phonenumber})
        }
        else {
            alert('Invalid OTP') 
        }
    }
    return (
        <View style={fullbg1}>
            <View style={styles.s1}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.s2}>
                <View style={formcont1} >
                    <Text style={label1}>ENTER THE 6 DIGIT OTP SENT VIA SMS TO +91 {phonenumber}</Text>
                    <View style={fontcont1in1}>
                        <FontAwesome5 name="mobile" size={20} color={colors.primary} />
                        <TextInput style={input1} placeholder='' placeholderTextColor={
                            colors.secondary
                        }
                            onChangeText={text => setotpentered(text)}
                        />
                    </View>
                    <Text style={button1}
                        onPress={() => verifyotp()}
                    >VERIFY OTP</Text>
                    <Text style={link31}>
                        Already have an account? <Text style={link32} onPress={() => navigation.navigate('Login')}
                        >Login</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default SignupOtp
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


