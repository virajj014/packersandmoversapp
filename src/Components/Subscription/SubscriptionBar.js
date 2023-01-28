import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { Linking } from 'react-native';
import envs from '../../env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionBar = ({ navigation, data }) => {

    const [userdata, setuserdata] = React.useState([])
    const [subscriptionenddate, setsubscriptionenddate] = React.useState({
        date: '',
        month: '',
        year: ''
    })
    const [planexpired, setplanexpired] = React.useState(false)
    const [whatsappmessage, setwhatsappmessage] = React.useState('')

    const getuserdata = () => {

        setuserdata(data?.userdata)
        // console.log(data?.userdata?.subscription);
        let temp = '';

        if (data?.userdata?.subscription?.subscriptionType == 'Yearly') {
            let startdate = new Date(data?.userdata?.subscription?.date.year, data?.userdata?.subscription?.date.month, data?.userdata?.subscription?.date.day)
            let enddate = new Date(startdate.setFullYear(startdate.getFullYear() + 1))
            temp = {
                year: enddate.getFullYear(),
                month: enddate.getMonth(),
                day: enddate.getDate()
            }

            setsubscriptionenddate(temp)
            let currentdate = {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDate()
            }
            // console.log(temp);
            // console.log(currentdate);

            if (!checkcurrentdatelessthanenddate(currentdate, temp)) {
                alert('plan is expired')
                setplanexpired(true)
            }
            else {
                // alert('plan is not expired')
                setplanexpired(false)
            }
        }

        else if (data?.userdata?.subscription?.subscriptionType == 'Monthly') {
            let startdate = new Date(data?.userdata?.subscription?.date.year, data?.userdata?.subscription?.date.month, data?.userdata?.subscription?.date.day)
            let enddate = new Date(startdate.setMonth(startdate.getMonth() + 1))
            temp = {
                year: enddate.getFullYear(),
                month: enddate.getMonth(),
                day: enddate.getDate()
            }

            setsubscriptionenddate(temp)
            let currentdate = {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDate()
            }
            console.log(temp);
            console.log(currentdate);

            if (!checkcurrentdatelessthanenddate(currentdate, temp)) {
                alert('Your Plan is expired')
                setplanexpired(true)
            }
            else {
                // alert('plan is not expired')
                setplanexpired(false)
            }
        }

        else if (data?.userdata?.subscription?.subscriptionType == 'Demo') {
            // 7 days demo

            let startdate = new Date(data?.userdata?.subscription?.date.year, data?.userdata?.subscription?.date.month, data?.userdata?.subscription?.date.day)
            let enddate = new Date(startdate.setDate(startdate.getDate() + 1))
            temp = {
                year: enddate.getFullYear(),
                month: enddate.getMonth(),
                day: enddate.getDate()
            }

            setsubscriptionenddate(temp)
            let currentdate = {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDate()
            }

            if (!checkcurrentdatelessthanenddate(currentdate, temp)) {
                alert('Your Plan is expired')
                setplanexpired(true)
            }

            else {
                // alert('plan is not expired')
                setplanexpired(false)
            }
        }
        let tempmessage = `I%20want%20to%20renew%20my%20subscription?.%0aMy%20uid%20is%20 ${data?.userdata?._id} %0a%0a`
        setwhatsappmessage(tempmessage)

    }

    React.useEffect(() => {
        getuserdata();
    }, [data])


    const checkcurrentdatelessthanenddate = (current, end) => {
        if (current.year < end.year) {
            return true;
        }
        else if (current.year == end.year && current.month < end.month) {
            return true;
        }
        else if (current.year == end.year && current.month == end.month && current.day < end.day) {
            return true;
        }
        else {
            return false;
        }
    }

    return (

        <View style={styles.s1}>

            <View style={styles.s11}>
                <Text style={styles.t1}>Subscription</Text>
                <FontAwesome5 name="gratipay" size={30} color="white" />
            </View>
            {
                planexpired ?
                    <View style={styles.expired}>
                        <Text style={styles.t3}
                            onPress={() => Linking.openURL(`https://wa.me/+917000896210?text=${whatsappmessage
                                }`)}>
                            Expired</Text>
                        <Feather name="arrow-right-circle" size={24} color="#FEBD11" />
                    </View>
                    :
                    <View style={styles.expired1}>
                        <Text style={styles.t2}
                        >Valid Till</Text>
                        <Text style={styles.t3}
                        >
                            {subscriptionenddate.day}-{subscriptionenddate.month + 1}-{subscriptionenddate.year}
                        </Text>
                    </View>
            }
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
        fontSize: 18,
        marginRight: 10,
    },
    expired: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    expired1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    t2: {
        color: '#FEBD11',
        fontSize: 15,
        marginRight: 10,
        fontWeight: 'bold',
    },
    t3: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    }
})