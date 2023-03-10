import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import TopNavbar from '../../Components/TopNavbar/TopNavbar'
import SubscriptionBar from '../../Components/Subscription/SubscriptionBar'
import DocumentCategories from '../../Components/DocumentCategoriesIcon/DocumentCategories'
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar'
import { TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../CommonStyles/Theme';
import nouser from '../../Media/Images/nouser.jpg'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage'
import envs from '../../env'
import logo from '../../Media/Images/ThemeLogoFull.png'


const Home = ({ navigation }) => {
  React.useEffect(() => {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token == null) {
          navigation.navigate('Login');
        }
      })
  }, [])
  const [showsidebar, setshowsidebar] = React.useState(false)
  const [loading, setloading] = React.useState(false)
  const [subscriptionstatus, setsubscriptionstatus] = React.useState(false)
  const [userdata, setuserdata] = React.useState([])
  const getuserdata = () => {
    setloading(true);
    AsyncStorage.getItem('token')
      .then((token) => {
        console.log(token);
        fetch(envs.BACKEND_URL + '/getuserdatafromtoken', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setloading(false);
            if (data.error) {
              navigation.navigate('Login');
            }
            else {
              let startdate = new Date(data?.userdata?.subscription?.date.year, data?.userdata?.subscription?.date.month, data?.userdata?.subscription?.date.day)

              if (data?.userdata?.subscription?.subscriptionType == 'Monthly') {
                let enddate = new Date(startdate.setMonth(startdate.getMonth() + 1))
                let currentdate = new Date()

                // console.log("end ", enddate)
                // console.log("current ", currentdate)
                if (currentdate < enddate) {
                  // alert('Not Expired')
                  setsubscriptionstatus(true)
                }
                else {
                  setsubscriptionstatus(false)
                  // alert('Expired')
                }
              }

              if (data?.userdata?.subscription?.subscriptionType == 'Yearly') {
                let enddate = new Date(startdate.setFullYear(startdate.getFullYear() + 1))
                let currentdate = new Date()
                if (currentdate < enddate) {
                  setsubscriptionstatus(true)
                  // alert('Not Expired')
                }
                else {
                  setsubscriptionstatus(false)
                  // alert('Expired')
                }
              }

              // console.log("end ",enddate)
              // console.log("current ",currentdate)

              setuserdata(data);
            }
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        setloading(false);
        navigation.navigate('Login');
      })
  }

  useEffect(() => {
    setshowsidebar(false);
    getuserdata();
  }, [userdata.length == 0])
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView style={styles.containerin}>
        <View style={styles.topnav} >
          <TouchableOpacity onPress={() => {
            setshowsidebar(true);
            getuserdata();
          }}>
            <Image source={userdata.profilepic ?
              { uri: userdata.profilepic }
              :
              nouser
            } style={styles.userimg} />
          </TouchableOpacity>
          <View style={styles.searchbar}>
            {/* <TextInput style={styles.input} placeholder='Search' />
          <AntDesign name="search1" size={24} color="black" /> */}
            <Text style={{ color: colors.primary, fontSize: 20, padding: 10 }}>Packers & Movers</Text>
            {/* <Image source={logo} style={{ width: 70, height: 60, borderRadius: 20 }} /> */}
          </View>
        </View>
        {
          showsidebar &&
          <View style={styles.sidebar}>
            <Entypo name="circle-with-cross" size={30} color="white" style={styles.icon}
              onPress={() => setshowsidebar(false)}
            />
            <Sidebar navigation={navigation} />
          </View>
        }
        <Image source={require('../../Media/Images/banner.png')} style={{ width: '95%', height: 200, alignSelf: 'center' }} />
        {
          !loading && <SubscriptionBar navigation={navigation} data={userdata} />
        }

        <DocumentCategories navigation={navigation} subscription={subscriptionstatus} />

        {/* <DocumentCategories navigation={navigation} /> */}
      </ScrollView>

      <View style={styles.bottomnav}>
        <BottomNavbar navigation={navigation} pagename={"Home"} />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  containerin: {
    marginBottom: 70,
  },
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
    borderRadius: 20,
    backgroundColor: 'white',
  },
  searchbar: {
    backgroundColor: 'white',
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  sidebar: {
    backgroundColor: "#602CB6",
    opacity: 0.9,
    width: '60%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    borderBottomRightRadius: 20,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  }
})