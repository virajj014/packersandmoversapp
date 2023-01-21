import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import  Feather  from 'react-native-vector-icons/Feather';
import { Linking } from 'react-native';
import envs from '../../env'

const SubscriptionBar = () => {
    return (
        <View style={styles.s1out}>
            <View style={styles.s1}>
                <FontAwesome5 name="id-card-alt" size={30} color="white" />
                <View style={styles.s11}>
                    <Text style={styles.t1}>PBID</Text>
                    <Text style={styles.t2}>123456789</Text>
                </View>
            </View>
            <View style={styles.vr}></View>
            <View style={styles.s1}>
                <FontAwesome5 name="gratipay" size={30} color="white" />
                <View style={styles.s11}>
                    <Text style={styles.t1}>Subscription</Text>
                    <View style={styles.expired}>
                        <Text style={styles.t3}
                            onPress={() => Linking.openURL("https://wa.me/+917000896210?text=I%20want%20to%20renew%20my%20subscription.")}>
                        Expired</Text>
                        <Feather name="arrow-right-circle" size={24} color="#FEBD11" />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SubscriptionBar

const styles = StyleSheet.create({
    s1out: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEBD11',
        padding: 20,
        borderRadius: 20,
        margin: 15,
        justifyContent: 'space-between',
    },
    vr: {
        width: 2,
        height: 40,
        backgroundColor: 'white',
    },
    s1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    s11: {
        paddingLeft: 10,
    },
    t1: {
        color: 'white',
        fontSize: 18,

    },
    t2: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
    },
    expired: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 5,
    },
    t3: {
        color: '#FEBD11',
        fontSize: 16,
        alignItems: 'center',
        marginRight: 4,
    },

})