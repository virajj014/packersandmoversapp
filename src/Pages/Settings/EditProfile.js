import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import nouser from '../../Media/Images/nouser.jpg'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../CommonStyles/Theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import client from '../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'
import Feather from 'react-native-vector-icons/Feather';
import { RNS3 } from 'react-native-aws3';


const EditProfile = ({ navigation }) => {
    const [profileimage, setprofileimage] = React.useState(null);
    const [companylogo, setcompanylogo] = React.useState(null);
    const [yourlogo, setyourlogo] = React.useState(null);
    const [signature, setSignature] = React.useState(null);
    const [stamp, setStamp] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        getuserdata();
    }, [])

    const pickImage = async (type) => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
            } else {
                // setprofileimage(response.uri);
                // console.log(response.assets[0]);
                uploadImageHandler(response.assets[0], type);
            }
        });
    };
    const uploadImageHandler = async (profileimage, type) => {
        setLoading(true);
        const file = {
            uri: profileimage.uri,
            name: profileimage.uri.split('/').pop(),
            type: 'image/jpg'
        }

        const options = {
            bucket: 'packersandmovers',
            accessKey: envs.AWS_ACCESS_KEY_ID,
            secretKey: envs.AWS_SECRET_ACCESS_KEY,
            region: 'ap-northeast-1',
            successActionStatus: 201
        }

        // console.log(envs.AWS_ACCESS_KEY_ID)

        RNS3.put(file, options).then(response => {

            if (response.status == 201) {
                // alert('Image uploaded successfully');
                console.log(response.body);
                updateanyimage(response.body.postResponse.location, type);
            }
            else {
                alert('Image upload failed');
                console.log(response);
            }
        })
            .catch((err) => {
                alert('Image upload failed ');
                console.log(err);
            })
    }
    const updateanyimage = (imgurl, type) => {
        // console.log(imgurl,type);
        AsyncStorage.getItem('token')
            .then((token) => {
                fetch(envs.BACKEND_URL + '/updateanyimage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        image: imgurl,
                        type: type
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setLoading(false);
                        alert(data.message);
                        if (data.type == 'profilepic') {
                            setprofileimage(data.image);
                            alert('Profile pic updated successfully');
                        }
                        else if (data.type == 'parentcompanylogo') {
                            setcompanylogo(data.image);
                            alert('Company logo updated successfully');
                        }
                        else if (data.type == 'yourcompanylogo') {
                            setyourlogo(data.image);
                            alert('Your logo updated successfully');
                        }
                        else if (data.type == 'signature') {
                            setSignature(data.image);
                            alert('Signature updated successfully');
                        }
                        else if (data.type == 'stamp') {
                            setStamp(data.image);
                            alert('Stamp updated successfully');
                        }
                    })
            })
            .catch((err) => {
                alert('You are not logged in');
                navigation.navigate('Login');
            })
    }



    const [userdata, setuserdata] = React.useState([])
    const getuserdata = () => {
        AsyncStorage.getItem('token')
            .then((token) => {
                // console.log(token);
                fetch(envs.BACKEND_URL + '/getuserdatafromtoken', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setuserdata(data.userdata)
                        setprofileimage(data.userdata.profilepic)
                        setcompanylogo(data.userdata.parentcompanylogo)
                        setyourlogo(data.userdata.yourcompanylogo)
                        setSignature(data.userdata.signature)
                        setStamp(data.userdata.stamp)
                        console.log(data.userdata);
                    })
                    .catch(err => {
                        handleLogout();
                        console.log(err);
                    })
            })
    }
    const updateuserdata = () => {
        AsyncStorage.getItem('token')
            .then((token) => {
                fetch(envs.BACKEND_URL + '/updateuserdetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: userdata.name,
                        email: userdata.email,
                        address: userdata.address,
                        companyname: userdata.companyname,
                        phonenumber: userdata.phonenumber,
                        profilepic: profileimage
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        getuserdata();
                        alert('Userdata updated successfully');
                    })
            })
            .catch((err) => {
                alert('You are not logged in');
                navigation.navigate('Login');
            })
    }


    return (
        <ScrollView style={styles.container}>
            {
                loading ?
                    <View style={styles.profileimgout}>
                        {/* {
            profileimage ? <Image source={{ uri: profileimage }} style={styles.profileimage} /> : <Image source={nouser} style={styles.profileimage} />
        } */}

                        <View style={styles.profileimage1} >
                            <ActivityIndicator size="large" color="black" />
                        </View>
                    </View>
                    :
                    <View style={styles.profileimgout}>
                        {/* {
                    profileimage ? <Image source={{ uri: profileimage }} style={styles.profileimage} /> : <Image source={nouser} style={styles.profileimage} />
                } */}

                        <Image source={profileimage !== "" && { uri: profileimage }} style={styles.profileimage}
                            onPress={() => pickImage('profilepic')}
                        />
                        <Ionicons name="add-circle-sharp" size={24} color="black"
                            style={styles.addicon}
                            onPress={() => pickImage('profilepic')}
                        />
                    </View>
            }

            <View style={styles.formcont}>
                <View style={styles.formcontin}>
                    <Text style={styles.formlabel}>Name</Text>
                    <TextInput style={styles.forminput} value={userdata.name} onChangeText={(text) => setuserdata({ ...userdata, name: text })}></TextInput>
                </View>

                <View style={styles.formcontin}>
                    <Text style={styles.formlabel}>Email</Text>
                    <TextInput style={styles.forminput} value={userdata.email} onChangeText={(text) => setuserdata({ ...userdata, email: text })}></TextInput>
                </View>

                <View style={styles.formcontin}>
                    <Text style={styles.formlabel}>Phone</Text>
                    <Text style={styles.forminput1}
                    >
                        {userdata.phonenumber}
                    </Text>
                </View>

                <View style={styles.formcontin}>
                    <Text style={styles.formlabel}>Address</Text>
                    <TextInput style={styles.forminput} value={userdata.address?userdata.address:"- - - -"} onChangeText={(text) => setuserdata({ ...userdata, address: text })}
                    ></TextInput>
                </View>

                <View style={styles.formcontin}>
                    <Text style={styles.formlabel}>Company Name</Text>
                    <TextInput style={styles.forminput} value={userdata.companyname} onChangeText={(text) => setuserdata({ ...userdata, companyname: text })}></TextInput>
                </View>

                <View style={styles.formcontlogos}>
                    {
                        companylogo ?
                            <TouchableOpacity onPress={() => pickImage('parentcompanylogo')}>
                                <Text>Parent Company</Text>
                                <Image source={{ uri: companylogo }} style={styles.formlogo}
                                
                                />
                            </TouchableOpacity>
                            :
                            <Text style={styles.formlogo}
                                onPress={() => pickImage('parentcompanylogo')}
                            >Parent Company Logo</Text>
                    }
                    {
                        yourlogo ?
                            <TouchableOpacity   onPress={() => pickImage('yourcompanylogo')}>
                                <Text>Your Company</Text>
                                <Image source={{ uri: yourlogo }} style={styles.formlogo}
                                  
                                />
                            </TouchableOpacity>
                            :
                            <Text style={styles.formlogo}
                                onPress={() => pickImage('yourcompanylogo')}
                            >Your Company Logo</Text>

                    }
                </View>

                <View style={styles.formcontlogos}>
                    {
                        signature ?
                            <TouchableOpacity onPress={() => pickImage('signature')}>
                                <Text>Signature</Text>
                                <Image source={{ uri: signature }} style={styles.formlogo}
                                    
                                />
                            </TouchableOpacity>
                            :
                            <Text style={styles.formlogo}
                                onPress={() => pickImage('signature')}
                            >Signature</Text>
                    }
                    {
                        stamp ?
                            <TouchableOpacity onPress={() => pickImage('stamp')}>
                                <Text>Stamp</Text>
                                <Image source={{ uri: stamp }} style={styles.formlogo}
                                />
                            </TouchableOpacity>
                            :
                            <Text style={styles.formlogo}
                                onPress={() => pickImage('stamp')}
                            >Stamp</Text>
                    }
                </View>

                <TouchableOpacity
                    onPress={updateuserdata}
                >
                    <View style={styles.formbtn}>
                        <Text
                            style={styles.formbtntext}
                        >Update</Text>
                        <Feather name="edit" size={24} color="black"
                            style={styles.formbtnicon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileimgout: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        // overflow: 'hidden',
        marginVertical: 20,
        elevation: 10,
        backgroundColor: colors.quadinary,
        padding: 5,
    },
    profileimage: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
    },
    profileimage1: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    addicon: {
        position: 'absolute',
        bottom: 0,
        right: '10%',
        color: colors.primary,
        fontSize: 30,
    },
    formcont: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 20,
    },
    formcontin: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    formlabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black",
    },
    forminput: {
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: colors.quadinary,
        fontSize: 15,
        padding: 2,
        marginVertical: 10,
        color: 'black',
    },
    forminput1: {
        width: '50%',
        // borderBottomWidth: 1,
        // borderBottomColor: colors.quadinary,
        fontSize: 15,
        padding: 2,
        marginVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 5,
        color: 'black',

    },
    formbtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.quadinary,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    formbtntext: {
        fontSize: 20,
        color: 'white',
        marginRight: 10,
    },
    formbtnicon: {
        fontSize: 20,
        color: 'white',
    },
    formcontlogos: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
    },
    formlogo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginVertical: 10,
        // height: '50%',
        textAlign: 'center',
        fontSize: 14,
        borderColor: colors.quadinary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'center',
        borderStyle: 'dashed',
        color :"black"
        // backgroundColor: colors.primary,
    }
})


