import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import nouser from '../../Media/Images/nouser.jpg'
import { colors } from '../../CommonStyles/Theme'
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Octicons  from 'react-native-vector-icons/Octicons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'react-native';
import envs from '../../env'

const Sidebar = ({ navigation }) => {
  const handleLogout = () => {
    AsyncStorage.removeItem('token')
      .then(() => {
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
    <View style={styles.sidebar}>
      {
        userdata != '' ?
          <View>
            <Image source={userdata.profilepic ?
              { uri: userdata.profilepic }
              :
              nouser} style={styles.image} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: 'white' }}>{
              userdata?.name ? userdata.name : 'User'
            }</Text>
            <View style={styles.c1}>
              <Text style={styles.label}>Company Name</Text>
              <Text style={styles.value}>{
                userdata?.companyname ? userdata.companyname : 'No Company'
              }</Text>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{
                userdata?.phonenumber ? userdata.phonenumber : 'No Phone Number'
              }</Text>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{
                userdata?.email ? userdata.email : 'No Email'
              }</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <View style={styles.settingsbtn}>
                  <Text style={styles.btnt1}
                  >Settings</Text>
                  <Octicons name="gear" size={24} color={colors.primary} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLogout()}>
                <View style={styles.logoutbtn}>
                  <Text style={styles.btnt}
                  >Logout</Text>
                  <AntDesign name="logout" size={24} color="white" />
                </View>
              </TouchableOpacity>

            </View>
            <View style={styles.hrline}></View>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.jptechnopark.com/termsandconditions.html')}
            >
              <View style={styles.t1out}>
                <Entypo name="list" size={24} color="white" />
                <Text style={styles.t1}>Terms & Conditions</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.jptechnopark.com/privacypolicy.html')}
            >
              <View style={styles.t1out}>
              <MaterialIcons name="privacy-tip" size={24} color="white" />
                <Text style={styles.t1}>Privacy Policy</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.t1out}>
              <MaterialIcons name="developer-mode" size={24} color="white" />
              <Text style={styles.t1}
                onPress={() => Linking.openURL('https://harshalportfolio.vercel.app/')}
              >Developer</Text>
            </View>
            <View style={styles.hrline}></View>
            <View style={styles.t1out}>

              <Text style={styles.t2}>Copyrights @CodersHub2022</Text>
            </View>
          </View>
          :
          <ActivityIndicator size="large" color={"white"} />
      }
    </View>
  )
}

export default Sidebar

const styles = StyleSheet.create({
  sidebar: {
    // flex: 1,
    // backgroundColor: '#fff',
    width: '100%',
    height: '100%',

  },
  c1: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  logoutbtn: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  btnt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  settingsbtn: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
    elevation: 5,
  },
  btnt1: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  image:
  {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  t1out: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
  },
  t1: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    color: 'white',

  },
  hrline: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  t2: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    color: 'white',
  }

})