import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../CommonStyles/Theme'
import { formedit, sformcontainer, sformhead, sformhead2, sformcontainerin, sformcontainerin2, sformlabel, sformvalue, sformhr, formbtn, sforminput } from "../../CommonStyles/FormStyle"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'
import numberToWords from 'number-to-words';



const Reciept = ({ navigation }) => {
  const [oldreciepts, setoldreciepts] = React.useState([])
  const [editing, setediting] = React.useState(false)

  const [basicform, setbasicform] = React.useState({
    recieptnumber: '',
    date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,

    clientname: '',
    amountrecievedinwords: '',
    amountrecievedinnumbers: '',
    paymenttype: '',
  })

  React.useEffect(() => {
    getoldreciepts()
  }, [])

  const resetvalues = () => {
    setbasicform({
      recieptnumber: '',
      date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,

      clientname: '',
      amountrecievedinwords: '',
      amountrecievedinnumbers: '',
      paymenttype: '',
    })
    getoldreciepts()
  }

  const getoldreciepts = async () => {
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
                    setoldreciepts(data.reciepts)
                   

                   {
                      userdata?.userdata?.customreceiptnumber ?
                        setbasicform(
                          {
                            ...basicform,
                            recieptnumber: `${userdata?.userdata?.customreceiptnumber}-${data.reciepts.length + 1}`
                          }
                        )
                        :  setbasicform(
                          {
                            ...basicform,
                            recieptnumber: `REC-${data.reciepts.length + 1}`
                          }
                        )
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
              createdDate: new Date(),
              docid: basicform.recieptnumber
            },
            doctype: 'reciepts'
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message == "Reciept Saved Successfully") {
              alert("Reciept Saved Successfully")
              setediting(false)
              resetvalues()
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

  const [amountrecievedinwords, setamountrecievedinwords] = React.useState('')
  const convertamounttowords = (amount) => {
    var number = amount;
    var words = numberToWords.toWords(number);
    // console.log(words); // "twelve thousand five hundred"

    // setbasicform({
    //   ...basicform,
    //   amountrecievedinwords: words
    // })
    setamountrecievedinwords(words)
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
                <Text style={sformlabel}>Reciept Number </Text>
                <TextInput style={sforminput} value={basicform?.recieptnumber} onChangeText={(text) => setbasicform({ ...basicform, recieptnumber: text })} />
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
                <TextInput style={sforminput} value={basicform.amountrecievedinnumbers} onChangeText={(text) => setbasicform({ ...basicform, amountrecievedinnumbers: text })} />
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
                <Text style={sformlabel}>Reciept Number </Text>
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
          </ScrollView>
      }
    </View>
  )
}

export default Reciept

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