import { Linking, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../../CommonStyles/Theme'
import Feather from 'react-native-vector-icons/Feather';
import {
  formedit, sformcontainer, sformhead, sformhead2, sformcontainerin, sformcontainerin2, sformlabel, sformvalue, sformhr, formbtn, sforminput,
  sformlabelh, sformvalueh
} from "../../CommonStyles/FormStyle"
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'

const PackingList = ({ navigation }) => {
  const [packinglists, setpackinglists] = React.useState([])
  const [editing, setediting] = React.useState(false)

  const [basicform, setbasicform] = React.useState({
    partyname: '',
    date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
    from: '',
    to: '',
    mobilenumber: '',
    plnumber: '',
  })

  const [items, setitems] = React.useState([
    // {
    //   name: 'Fridge',
    //   quantity: '10',
    // },
  ])

  const [newitem, setnewitem] = React.useState({
    name: '',
    quantity: '',
  })

  const additem = () => {
    if (newitem.name.length > 0 && newitem.quantity.length > 0) {
      setitems([...items, newitem])
      setnewitem({
        name: '',
        quantity: '',
      })
    }
    else {
      alert('Please fill item name and quantity')
    }
  }


  React.useEffect(() => {
    getpackinglistss()
  }, [])

  const resetvalues = () => {
    setbasicform({
      partyname: '',
      date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
      from: '',
      to: '',
      mobilenumber: '',
      plnumber: '',
    })
    setitems([])
    getpackinglistss()
  }

  const getpackinglistss = async () => {
    AsyncStorage.getItem('token')
      .then(token => {
        fetch(envs.BACKEND_URL + '/getuserdatafromtoken', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(userdata => {
            if (userdata.error) {
              navigation.navigate('Login');
            }
            else {
              fetch(`${envs.BACKEND_URL}/getalldocs`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Bearer " + token
                }
              }).then(res => res.json())
                .then(data => {
                  // console.log(data.quotationdetails);
                  if (data.message == "All Documents Fetched Successfully") {
                    setpackinglists(data.packinglists)
                  
                    {
                       userdata?.userdata?.customplnumber ? setbasicform({
                        ...basicform,
                        plnumber : `${userdata?.userdata?.customplnumber}-${data.packinglists.length + 1}`
                       }) 
                       : setbasicform({
                        ...basicform,
                        plnumber: `PL-${data.packinglists.length + 1}`
                       })
                    }
                  }
                })
                .catch(err => {
                  console.log("Error in getting old quotations ", err)
                })
            }
          })
          .catch(err => {
            navigation.navigate('Login')
          })


      })
      .catch(err => {
        navigation.navigate('Login')
      })
  }

  const savedoc = async () => {
    AsyncStorage.getItem('token')
      .then(token => {
        // console.log("token is ", token)

        fetch(`${envs.BACKEND_URL}/savealldocs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            doc: {
              basicform: basicform,
              items: items,
              createdDate: new Date(),
              docid: basicform.plnumber
            },
            doctype: 'packinglists'
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message == "Packing List Saved Successfully") {
              showprintablerbill(basicform)
              alert("Packing List Saved Successfully")
              resetvalues()
            }
            else {
              alert("Packing List Not Saved")
            }
          })
          .catch(err => {
            alert("Packing List Not Saved ")
            console.log("Error in saving packing list ", err)
          })
      })
      .catch(err => {
        navigation.navigate('Login')
      })

  }


  const showprintablerbill = async (basicform) => {
    let userid = 0;
    let docid = basicform.plnumber;
    let doctype = 'packinglist'
    AsyncStorage.getItem('token')
      .then(token => {
        fetch(`${envs.BACKEND_URL}/getuserdatafromtoken`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            userid = data.userdata._id

            // console.log(userid + '/' + doctype + '/' + docid)
            Linking.openURL(`https://packersandmoversweb.vercel.app/bill/${userid}/${doctype}/${docid}`)
            // navigation.navigate('PrintDoc', { userid: userid, doctype: doctype, docid: docid })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        navigation.navigate('Login')
      })

  }
  return (
    <View>
      {
        editing ?
          <AntDesign name="check" size={24} color="black" style={formedit} onPress={() => setediting(false)} />
          : <Feather name="edit" size={24} color="black" style={formedit} onPress={() => setediting(true)} />
      }
      {
        editing ?
          <ScrollView>
            <View style={sformcontainer}>
              <Text style={sformhead}>Basic Details</Text>
              <View style={sformcontainerin}>
                <Text style={sformlabel}>Party Name</Text>
                <TextInput style={sforminput} value={basicform?.partyname} onChangeText={(text) => setbasicform({ ...basicform, partyname: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Date</Text>
                <TextInput style={sforminput} value={basicform?.date} onChangeText={(text) => setbasicform({ ...basicform, date: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>From</Text>
                <TextInput style={sforminput} value={basicform?.from} onChangeText={(text) => setbasicform({ ...basicform, from: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>To</Text>
                <TextInput style={sforminput} value={basicform?.to} onChangeText={(text) => setbasicform({ ...basicform, to: text })} />
              </View>

              <View style={sformcontainerin}>

                <Text style={sformlabel}>Mobile Number</Text>
                <TextInput style={sforminput} value={basicform?.mobilenumber} onChangeText={(text) => setbasicform({ ...basicform, mobilenumber: text })}
                  maxLength={10}  keyboardType={'number-pad'}
                />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Packing Lists No.</Text>
                <Text style={sformvalue}>{basicform?.plnumber}</Text>
              </View>
            </View>
            <View style={sformcontainer}>
              <Text style={sformhead}>ITEMS / PARTICULARS</Text>
              {
                items.length > 0 ?

                  <View style={sformcontainerin}>
                    <Text style={sformlabelh}>Name</Text>
                    <Text style={sformvalueh}>Quantity</Text>
                  </View>
                  :
                  <View style={sformcontainerin}>
                    <Text style={sformlabelh}>0 Items</Text>
                  </View>
              }
              {
                items.map((item, index) => {
                  return (
                    <View style={sformcontainerin2} key={index}>
                      <Text style={sformlabel}>{item.name}</Text>
                      <Text style={sformvalue}>{item.quantity}</Text>
                    </View>
                  )
                })
              }
              <View style={sformhr}></View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Item Name</Text>
                <TextInput style={sforminput} placeholder="Item Name"
                  value={newitem.name} onChangeText={(text) => setnewitem({ ...newitem, name: text })}  keyboardType={'number-pad'}
                />
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Quantity</Text>
                <TextInput style={sforminput} placeholder="Quantity"
                  value={newitem.quantity} onChangeText={(text) => setnewitem({ ...newitem, quantity: text })}
                />
              </View>

              <Text style={formbtn} onPress={() => additem()}>
                Add
              </Text>
            </View>
            {/* <Text style={formbtn}>
              Save
            </Text> */}
          </ScrollView>
          :
          <ScrollView>
            <View style={sformcontainer}>
              <Text style={sformhead}>Basic Details</Text>
              <View style={sformcontainerin}>
                <Text style={sformlabel}>Party Name</Text>
                <Text style={sformvalue}>{basicform?.partyname}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Date</Text>
                <Text style={sformvalue}>{basicform?.date}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>From</Text>
                <Text style={sformvalue}>{basicform?.from}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>To</Text>
                <Text style={sformvalue}>{basicform?.to}</Text>
              </View>

              <View style={sformcontainerin}>

                <Text style={sformlabel}>Mobile</Text>
                <Text style={sformvalue}>{basicform?.mobilenumber}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Bilty No.</Text>
                <Text style={sformvalue}>{basicform?.plnumber}</Text>
              </View>
            </View>
            <View style={sformcontainer}>
              <Text style={sformhead}>ITEMS / PARTICULARS</Text>
              {
                items.length > 0 ?

                  <View style={sformcontainerin}>
                    <Text style={sformlabelh}>Name</Text>
                    <Text style={sformvalueh}>Quantity</Text>
                  </View>
                  :
                  <View style={sformcontainerin}>
                    <Text style={sformlabelh}>0 Items</Text>
                  </View>
              }
              {
                items.map((item, index) => {
                  return (
                    <View style={sformcontainerin2} key={index}>
                      <Text style={sformlabel}>{item.name}</Text>
                      <Text style={sformvalue}>{item.quantity}</Text>
                    </View>
                  )
                })
              }
            </View>
            <Text style={formbtn}
              onPress={() => {
                savedoc()
              }}
            >
              Save
            </Text>
          </ScrollView>
      }
    </View>
  )
}

export default PackingList

const styles = StyleSheet.create({

  sformcontainer: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    // padding: 10,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sformcontainerin: {
    // backgroundColor: 'yellow',
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sformcontainerin2: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sformhead: {
    fontSize: 20,
    backgroundColor: colors.primary,
    color: '#fff',
    padding: 10,
  },
  sformlabel: {
    fontSize: 14,
    color: colors.primary,
  },
  sformvalue: {
    fontSize: 14,
    color: colors.secondary,
    width: '50%',
  },
  sformhead2: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 10,
    marginLeft: 20,
  },
  sformhr: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  formedit: {
    backgroundColor: colors.quadinary,
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 1,
  },
  formbtn: {
    backgroundColor: colors.primary,
    padding: 10,
    width: '40%',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 20,
    margin: 20,
  }
})