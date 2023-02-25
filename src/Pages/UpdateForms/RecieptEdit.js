import { Linking, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../CommonStyles/Theme'
import Feather from 'react-native-vector-icons/Feather';
import { formedit, sformcontainer, sformhead, sformhead2, sformcontainerin, sformcontainerin2, sformlabel, sformvalue, sformhr, formbtn, sforminput } from "../../CommonStyles/FormStyle"
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'
import numberToWords from 'number-to-words';

const RecieptEdit = ({ navigation, route }) => {
  const { item } = route.params;
  const [oldreciepts, setoldreciepts] = React.useState([])
  const [editing, setediting] = React.useState(false)

  const [amountrecievedinwords, setamountrecievedinwords] = React.useState('')
  const convertamounttowords = (amount) => {
    var number = amount;
    var words = numberToWords.toWords(number);
    setamountrecievedinwords(words)
  }

  useEffect(() => {
    convertamounttowords(basicform.amountrecievedinnumbers)
  }, [])


  
  const [basicform, setbasicform] = React.useState({
    recieptnumber: item.basicform.recieptnumber,
    date: item.basicform.date,

    clientname: item.basicform.clientname,
    amountrecievedinwords: item.basicform.amountrecievedinwords,
    amountrecievedinnumbers: item.basicform.amountrecievedinnumbers,
    paymenttype: item.basicform.paymenttype,
  })

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
              createdDate: item.createdDate,
              docid: basicform.recieptnumber
            },
            doctype: 'reciepts'
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message == "Reciept Updated Successfully") {
              alert("Reciept Updated Successfully")
              setediting(false)
              // resetvalues()
            }
            else {
              alert("Reciept Not Saved")
            }
          })
          .catch(err => {
            alert("Reciept Not Saved ")
            console.log("Error in saving Reciept ", err)
          })
      })
      .catch(err => {
        navigation.navigate('Login')
      })

  }


  const showprintablerbill = async () => {
    let userid = 0;
    let docid = item.basicform.recieptnumber;
    let doctype = 'reciept'
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


  

  useEffect(() => {
    basicform.amountrecievedinnumbers > 0 && convertamounttowords(basicform.amountrecievedinnumbers)
  }, [basicform])
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
                <Text style={sformlabel}>Reciept Number</Text>
                <Text style={sformvalue}>{basicform?.recieptnumber}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Date</Text>
                <TextInput style={sforminput} value={basicform?.date} onChangeText={(text) => setbasicform({ ...basicform, date: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Client Name</Text>
                <TextInput style={sforminput} value={basicform?.clientname} onChangeText={(text) => setbasicform({ ...basicform, clientname: text })} />
              </View>



              <View style={sformcontainerin}>

                <Text style={sformlabel}>Amount Recieved in Numbers (Rs.)</Text>
                <TextInput style={sforminput} keyboardType='numeric' value={basicform?.amountrecievedinnumbers} onChangeText={(text) => setbasicform({ ...basicform, amountrecievedinnumbers: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Amount Recieved in Words (Rs.)</Text>
                <TextInput style={sforminput} value={amountrecievedinwords} onChangeText={(text) => setamountrecievedinwords(text)}
                  multiline
                />
              </View>


              <View style={sformcontainerin}>
                <Text style={sformlabel}>Payment Type</Text>
                <TextInput style={sforminput} value={basicform?.paymenttype} onChangeText={(text) => setbasicform({ ...basicform, paymenttype: text })} />
              </View>
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
                <Text style={sformlabel}>Reciept Number</Text>
                <Text style={sformvalue}>{basicform?.recieptnumber}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Date</Text>
                <Text style={sformvalue}>{basicform?.date}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Client Name</Text>
                <Text style={sformvalue}>{basicform?.clientname}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Amount Recieved in Words (Rs.)</Text>
                <Text style={sformvalue}>{amountrecievedinwords}</Text>
              </View>

              <View style={sformcontainerin}>

                <Text style={sformlabel}>Amount Recieved in Numbers (Rs.)</Text>
                <Text style={sformvalue}>Rs. {basicform?.amountrecievedinnumbers}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Payment Type</Text>
                <Text style={sformvalue}>{basicform?.paymenttype}</Text>
              </View>
            </View>


            <Text style={formbtn}
              onPress={() => savedoc()}
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

export default RecieptEdit

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