import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React from 'react'
import { fullbg1, head1, padding10, text1, formcont1, label, fontcont1in, input, colors, formcont2, link1, button, link21, link22 } from '../../../CommonStyles/Theme'
import logo from '../../../Media/Images/whitelogofull.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import envs from '../../../env'

const SignupRestDetails = ({ navigation, route }) => {
    const { phonenumber } = route.params;
    const [loading, setLoading] = React.useState(false);
    if (phonenumber == undefined) {
        navigation.navigate('Login');
    }
    console.log(phonenumber);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const createAccount = () => {

        if (name == '' || email == '' || company == '' || password == '' || confirmpassword == '') {
            alert('All fields are required');
            return;
        }
        else if (password != confirmpassword) {
            alert('Password does not match');
            return;
        }
        else {
            setLoading(true);
            fetch(envs.BACKEND_URL + '/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    companyname: company,
                    password: password,
                    phonenumber: phonenumber
                }),
            })

                .then((response) => response.json())
                .then((json) => {
                    if (json.message == "Account Created Successfully") {
                        alert('Account created successfully');
                        setLoading(false);
                        navigation.navigate('Login');
                    }
                    else {
                        setLoading(false);
                        alert('Error creating account, Try again later');
                        navigation.navigate('SignupOtp');
                    }
                })
        }
    }
    return (
        <KeyboardAvoidingView behavior='position' >
            {/* <View style={fullbg1}> */}

            <View style={styles.s1}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.s2}>
                <View style={padding10} />
                <Text style={head1}>Signup</Text>
                <Text style={link21}>
                    already Registered? <Text style={link22}
                        onPress={() => navigation.navigate('Login')}
                    >Log in here</Text>
                </Text>
                <View style={formcont1} >
                    <Text style={label}>Name</Text>
                    <View style={fontcont1in}>
                        <FontAwesome name="user" size={15} color={colors.primary} />
                        <TextInput style={input} placeholder='Enter Your Name' placeholderTextColor={
                            colors.secondary
                        }

                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                </View>


                <View style={formcont1} >
                    <Text style={label}>Email</Text>
                    <View style={fontcont1in}>
                        <Entypo name="email" size={15} color={colors.primary} />
                        <TextInput style={input} placeholder='Enter Your Email' placeholderTextColor={
                            colors.secondary
                        }
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={formcont1} >
                    <Text style={label}>Your Company Name</Text>
                    <View style={fontcont1in}>
                        <FontAwesome5 name="building" size={15} color={colors.primary} />
                        <TextInput style={input} placeholder='Enter Your Company Name' placeholderTextColor={
                            colors.secondary
                        }
                            value={company}
                            onChangeText={text => setCompany(text)}
                        />
                    </View>
                </View>


                <View style={formcont1} >
                    <Text style={label}>Password</Text>
                    <View style={fontcont1in}>
                        <Entypo name="eye" size={15} color={colors.primary} />
                        <TextInput style={input} placeholder='Enter Your Password' placeholderTextColor={
                            colors.secondary
                        }
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
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
                            onChangeText={text => setConfirmPassword(text)}
                        />
                    </View>
                </View>
                <View style={padding10}></View>

                {
                    loading ? <ActivityIndicator size='large' color={colors.primary} /> :
                        <Text style={button}
                            onPress={() => createAccount()}
                        >
                            Sign Up
                        </Text>
                }
            </View>
            {/* </View> */}
        </KeyboardAvoidingView>
    )
}

export default SignupRestDetails
const styles = StyleSheet.create({
    s1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // height: '70%',
    },
    logo: {
        width: 150,
        height: 100,
    },
    s2: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '85%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    }
})

