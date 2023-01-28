import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { fullbg1, head1, padding10, text1, formcont1, label, fontcont1in, input, colors, formcont2, link1, button, link21, link22 } from '../../../CommonStyles/Theme'
import logo from '../../../Media/Images/whitelogofull.png'
import Entypo from 'react-native-vector-icons/Entypo';
import envs from '../../../env'


const ForgotPasswordReset = ({ navigation, route }) => {
    const { token } = route.params;
    const [loading, setLoading] = React.useState(false);
    if (token == undefined) {
        navigation.navigate('ForgotPasswordPhone');
    }
    // console.log(token);

    const [password, setpassword] = React.useState('');
    const [confirmpassword, setconfirmpassword] = React.useState('');


    const handleresetpassword = () => {


        if (password == confirmpassword) {
            setLoading(true);
            fetch(envs.BACKEND_URL + '/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    newpassword: password
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    // console.log(json)
                    setLoading(false);
                    if (json.message == 'Password Changed Successfully') {
                        alert('Password changed successfully')
                        navigation.navigate('Login')
                    }
                    else if (json.error == "Error in changing password") {
                        alert('Unable to reset password! Please try again later.')
                        navigation.navigate('Login')
                    }
                    else {
                        alert('Invalid Details')
                        setconfirmpassword('')
                        setpassword('')
                    }
                })
                .catch((error) => {
                    alert('Unable to reset password! Please try again later.')
                    setLoading(false);
                })

        }
        else {
            setLoading(false);
            alert('Passwords do not match')
            setconfirmpassword('')
            setpassword('')
        }
    }
    return (
        <View style={fullbg1}>
            <View style={styles.s1}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.s2}>
                <View style={padding10} />
                {/* <Text style={head1}>Reset</Text> */}
                {/* <Text style={text1}>Enter new Password to continue</Text> */}
                {/* <View style={padding10} /> */}
                <View style={formcont1} >
                    <Text style={label}>Password</Text>
                    <View style={fontcont1in}>
                        <Entypo name="eye" size={15} color={colors.primary} />
                        <TextInput style={input} placeholder='Enter Your Password' placeholderTextColor={
                            colors.secondary
                        }
                            secureTextEntry={true}

                            value={password}
                            onChangeText={text => setpassword(text)}
                        />
                    </View>
                </View>

                <View style={formcont1} >
                    <Text style={label}>Confirm Password</Text>
                    <View style={fontcont1in}>
                        <Entypo name="eye" size={15} color={colors.primary} />
                        <TextInput style={input} placeholder='Enter Your Password Again' placeholderTextColor={
                            colors.secondary
                        }
                            secureTextEntry={true}

                            value={confirmpassword}
                            onChangeText={text => setconfirmpassword(text)}
                        />
                    </View>
                </View>
                <View style={padding10} />

                {
                    loading ?
                    <ActivityIndicator size="large" color={colors.primary} />
                    :
                    <Text style={button}
                    onPress={() => handleresetpassword()}
                >
                    Update
                </Text>
                }

                {/* <Text style={link21}>
                    Don't have an account? <Text style={link22}
                        onPress={() => navigation.navigate('SignupPhone')}
                    >Create a new account</Text>
                </Text> */}
            </View>
        </View>
    )
}

export default ForgotPasswordReset
const styles = StyleSheet.create({
    s1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // height: '70%',
    },
    logo: {
        width: 350,
        height: 200,
    },
    s2: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    }
})



