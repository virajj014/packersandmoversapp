import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { Linking } from 'react-native';
import envs from '../../env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionBar = () => {

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
                        // console.log(data.userdata);
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

        <View style={styles.s1}>

            <View style={styles.s11}>
                <Text style={styles.t1}>Subscription</Text>
                <FontAwesome5 name="gratipay" size={30} color="white" />
            </View>
            <View style={styles.expired}>
                <Text style={styles.t3}
                    onPress={() => Linking.openURL("https://wa.me/+917000896210?text=I%20want%20to%20renew%20my%20subscription.")}>
                    Expired</Text>
                <Feather name="arrow-right-circle" size={24} color="#FEBD11" />
            </View>
        </View>

    )
}

export default SubscriptionBar

const styles = StyleSheet.create({
    s1: {
        backgroundColor: '#FEBD11',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        width: '95%',
        borderRadius: 50,
        marginTop: 10,
        alignSelf: 'center',
    },
    s11: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    t1: {
        color: 'white',
        fontSize: 20,
        marginRight: 10,
    },
    expired: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    }
})