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

const PackingListEdit = ({ navigation, route }) => {
  const { item } = route.params;
  console.log(item)
  const [packinglists, setpackinglists] = React.useState([])
  const [editing, setediting] = React.useState(false)

  const [basicform, setbasicform] = React.useState({
    partyname: item.basicform.partyname,
    date: item.basicform.date,
    from: item.basicform.from,
    to: item.basicform.to,
    mobilenumber: item.basicform.mobilenumber,
    plnumber: item.basicform.plnumber,
  })

  const [items, setitems] = React.useState(
    // {
    //   name: 'Fridge',
    //   quantity: '10',
    // },
    item.items
  )

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


  const resetvalues = () => {
    setbasicform({
      partyname: item.basicform.partyname,
      date: item.basicform.date,
      from: item.basicform.from,
      to: item.basicform.to,
      mobilenumber: item.basicform.mobilenumber,
      plnumber: item.basicform.plnumber,
    })
    setitems(
      item.items
    )
  }


  const savedoc = async () => {
    AsyncStorage.getItem('token')
      .then(token => {
        // console.log("token is ", token)

        fetch(`${envs.BACKEND_URL}/updatealldocs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            doc: {
              basicform: basicform,
              items: items,
              updatedDate: new Date(),
              docid: basicform.plnumber,
              createdDate: item.createdDate,
            },
            doctype: 'packinglists'
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message == "Packing List Updated Successfully") {
              alert("Packing List Updated Successfully")
              // resetvalues()
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


  const showprintablerbill = async () => {
    let userid = 0;
    let docid = item.basicform.plnumber;
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
            // Linking.openURL(`https://packersandmoversweb.vercel.app/bill/${userid}/${doctype}/${docid}`)
            navigation.navigate('PrintDoc', { userid: userid, doctype: doctype, docid: docid })
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
                  maxLength={10}
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
                  value={newitem.name} onChangeText={(text) => setnewitem({ ...newitem, name: text })}
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

            <Text style={formbtn}
              onPress={() => {
                showprintablerbill()
              }}
            >
              Print Quotation
            </Text>
          </ScrollView>
      }
    </View>
  )
}

export default PackingListEdit

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