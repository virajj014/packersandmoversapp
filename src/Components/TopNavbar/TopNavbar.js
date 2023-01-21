import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React from 'react'
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { colors } from '../../CommonStyles/Theme';
import user from '../../Media/Images/user.png'
import envs from '../../env'
import nouser from '../../Media/Images/nouser.jpg'

const TopNavbar = ({ navigation }) => {
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
                        console.log(data.userdata);
                    })
                    .catch(err => {
                        handleLogout();
                        console.log(err);
                    })
            })
    }

    React.useEffect(() => {
        getuserdata();
    }, [])

    return (
        <View style={styles.topnav}>
            <Image source={userdata.profilepic ?
                { uri: userdata.profilepic }
                :
                nouser} style={styles.userimg}
                onPress={() => navigation.navigate('Login')}
            />
            <View style={styles.searchbar}>
                <TextInput style={styles.input} placeholder='Search' />
                <AntDesign name="search1" size={24} color="black" />
            </View>
        </View>
    )
}

export default TopNavbar

const styles = StyleSheet.create({
    topnav: {
        backgroundColor: colors.primary,
        // height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },
    userimg: {
        width: 40,
        height: 40,
    },
    searchbar: {
        backgroundColor: 'white',
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 20,
    }
})