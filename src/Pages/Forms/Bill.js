import { Linking, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../../CommonStyles/Theme'
import Feather from 'react-native-vector-icons/Feather';
import { formedit, sformcontainer, sformhead, sformhead2, sformcontainerin, sformcontainerin2, sformlabel, sformvalue, sformhr, formbtn, sforminput } from "../../CommonStyles/FormStyle"
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const Bill = ({ navigation, route }) => {
  const [oldinvoices, setoldinvoices] = React.useState([])

  const [editing, setediting] = React.useState(false)
  const { converteditem } = route.params;


  const [basicform, setbasicform] = React.useState({
    clientname: converteditem?.basicform?.clientname ? converteditem?.basicform?.clientname : converteditem?.basicform?.clientname ? converteditem?.basicform?.clientname : '',
    companyname: converteditem?.basicform?.companyname ? converteditem?.basicform?.companyname : '',
    invoiceumber: '',
    mobile: converteditem?.basicform?.mobile ? converteditem?.basicform?.mobile : '',
    email: converteditem?.basicform?.email ? converteditem?.basicform?.email : '',
    from: converteditem?.basicform?.from ? converteditem?.basicform?.from : '',
    to: converteditem?.basicform?.to ? converteditem?.basicform?.to : '',
    fromfloor: converteditem?.basicform?.fromfloor ? converteditem?.basicform?.fromfloor : '',
    tofloor: converteditem?.basicform?.tofloor ? converteditem?.basicform?.tofloor : '',
    liftavailable: converteditem?.basicform?.liftavailable ? converteditem?.basicform?.liftavailable : '',
  })

  const [costform, setcostform] = React.useState({
    packingcharge: converteditem?.costform?.packingcharge ? converteditem?.costform?.packingcharge : '',
    unpackingcharge: converteditem?.costform?.unpackingcharge ? converteditem?.costform?.unpackingcharge : '',
    loadingcharge: converteditem?.costform?.loadingcharge ? converteditem?.costform?.loadingcharge : '',
    unloadingcharge: converteditem?.costform?.unloadingcharge ? converteditem?.costform?.unloadingcharge : '',
    profright: converteditem?.costform?.profright ? converteditem?.costform?.profright : '',
    cartransportation: converteditem?.costform?.cartransportation ? converteditem?.costform?.cartransportation : '',
    trucksize: converteditem?.costform?.trucksize ? converteditem?.costform?.trucksize : '',
    handymancharges: converteditem?.costform?.handymancharges ? converteditem?.costform?.handymancharges : '',
    escortcharges: converteditem?.costform?.escortcharges ? converteditem?.costform?.escortcharges : '',
    insurancecharges: converteditem?.costform?.insurancecharges ? converteditem?.costform?.insurancecharges : '',
    remarks1: converteditem?.costform?.remarks1 ? converteditem?.costform?.remarks1 : '',
    fovtransitpolicy: converteditem?.costform?.fovtransitpolicy ? converteditem?.costform?.fovtransitpolicy : '',
    anyothercharges: converteditem?.costform?.anyothercharges ? converteditem?.costform?.anyothercharges : '',
    taxwithinstate: converteditem?.costform?.taxwithinstate ? converteditem?.costform?.taxwithinstate : '',
    taxotherstate: converteditem?.costform?.taxotherstate ? converteditem?.costform?.taxotherstate : '',
    gst: converteditem?.costform?.gst ? converteditem?.costform?.gst : '',
    cgst: converteditem?.costform?.cgst ? converteditem?.costform?.cgst : '',
    sgst: converteditem?.costform?.sgst ? converteditem?.costform?.sgst : '',
    igst: converteditem?.costform?.igst ? converteditem?.costform?.igst : '',
    total: converteditem?.costform?.total ? converteditem?.costform?.total : '',
    discount: converteditem?.costform?.discount ? converteditem?.costform?.discount : '',
    finalamount: converteditem?.costform?.finalamount ? converteditem?.costform?.finalamount : '',
    remarks2: converteditem?.costform?.remarks2 ? converteditem?.costform?.remarks2 : '',
    advancepayment: converteditem?.costform?.advancepayment ? converteditem?.costform?.advancepayment : '',//
    remainingpayment: converteditem?.costform?.remainingpayment ? converteditem?.costform?.remainingpayment : '',//
    remarks2: converteditem?.costform?.remarks2 ? converteditem?.costform?.remarks2 : '',

  })


  React.useEffect(() => {
    getoldinvoicess()
  }, [])

  const resetvalues = () => {
    setbasicform({
      clientname: '',
      companyname: '',
      invoiceumber: '',
      mobile: '',
      email: '',
      from: '',
      to: ''
    })
    setcostform({
      packingcharge: '',
      unpackingcharge: '',
      loadingcharge: '',
      unloadingcharge: '',
      profright: '',
      cartransportation: '',
      trucksize: '',
      handymancharges: '',
      escortcharges: '',
      insurancecharges: '',
      remarks1: '',
      fovtransitpolicy: '',
      anyothercharges: '',
      taxtype: '',
      gst: '',
      cgst: '',
      sgst: '',
      igst: '',
      // total: '',
      discount: '',
      // finalamount: '',
      remarks2: '',
      advancepayment: '',//
      // remainingpayment: '',//
      remarks2: '',

    })
    getoldinvoicess()
  }

  const getoldinvoicess = async () => {
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
                    setoldinvoices(data.invoices)
                    setbasicform(
                      {
                        ...basicform,
                        invoiceumber: `IN-${data.invoices.length + 1}`
                      }
                    )

                    userdata?.userdata?.custominvoicenumber ?
                      setbasicform(
                        {
                          ...basicform,
                          invoiceumber: `${userdata?.userdata?.custominvoicenumber}-${data.invoices.length + 1}`
                        }
                      )
                      :

                      setbasicform(
                        {
                          ...basicform,
                          invoiceumber: `IN-${data.invoices.length + 1}`
                        }
                      )
                  }
                })
                .catch(err => {
                  console.log("Error in getting old quotations ", err)
                })
            }
          })


      })
      .catch(err => {
        navigation.navigate('Login')
      })
  }

  const savedoc = async () => {
    AsyncStorage.getItem('token')
      .then(token => {
        fetch(`${envs.BACKEND_URL}/savealldocs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            doc: {
              basicform: basicform,
              costform: costform,
              createdDate: new Date(),
              docid: basicform.invoiceumber
            },
            doctype: 'invoices'
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message == "Invoice Saved Successfully") {
              // resetvalues()
              showprintablerbill(basicform)
              setediting(false)
              alert("Invoice Saved Successfully")
              resetvalues()
            }
            else {
              alert("Error in saving Invoice")
            }
          })
      })
      .catch(err => {
        navigation.navigate('Login')
      })
  }


  const [getotal, setgetotal] = React.useState(0);
  const [getfinaltotal, setgetfinaltotal] = React.useState(0);
  const [getremaining, setgetremaining] = React.useState(0);
  const [getgst, setgetgst] = React.useState(0);
  const [getigst, setgetigst] = React.useState(0);

  React.useEffect(() => {
    const total =
      (eval(costform.packingcharge) >= 0 ? eval(costform.packingcharge) : 0)
      + (eval(costform.unpackingcharge) >= 0 ? eval(costform.unpackingcharge) : 0)
      + (eval(costform.loadingcharge) >= 0 ? eval(costform.loadingcharge) : 0)
      + (eval(costform.unloadingcharge) >= 0 ? eval(costform.unloadingcharge) : 0)
      + (eval(costform.profright) >= 0 ? eval(costform.profright) : 0)
      + (eval(costform.cartransport) >= 0 ? eval(costform.cartransport) : 0)
      + (eval(costform.handymancharges) >= 0 ? eval(costform.handymancharges) : 0)
      + (eval(costform.escortcharges) >= 0 ? eval(costform.escortcharges) : 0)
      + (eval(costform.insurancecharges) >= 0 ? eval(costform.insurancecharges) : 0)
      + (eval(costform.anyothercharges) >= 0 ? eval(costform.anyothercharges) : 0)
    // + (eval(costform.fovtransitpolicy) >= 0 ? eval(costform.fovtransitpolicy) : 0)

    // console.log(total)



    const tgst = total * (costform.gst / 100) + total * (costform.cgst / 100) + total * (costform.sgst / 100) + total * (costform.igst / 100)
    // console.log(tgst)
    const total1 = parseFloat(total) + parseFloat(tgst)
    const gst = total * (costform.gst / 100)
    const igst = total * (costform.igst / 100)


    setgetotal(total1)
    setgetfinaltotal(total1 - costform.discount)
    setgetremaining(total1 - costform.discount - costform.advancepayment)
    setgetgst(gst)
    setgetigst(igst)


  }, [costform])

  var radio_props = [
    { label: 'Within State', value: 0 },
    { label: 'Other State', value: 1 }
  ];
  var radio_props1 = [
    { label: 'Lift Not Available', value: 0 },
    { label: 'Lift Available', value: 1 }
  ];




  const showprintablerbill = async (basicform) => {
    let userid = 0;
    let docid = basicform.invoiceumber;
    let doctype = 'invoice'
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
                <Text style={sformlabel}>Client Name</Text>
                <TextInput style={sforminput} value={basicform?.clientname} onChangeText={(text) => setbasicform({ ...basicform, clientname: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Company Name</Text>
                <TextInput style={sforminput} value={basicform?.companyname} onChangeText={(text) => setbasicform({ ...basicform, companyname: text })} />
              </View>

              {/* <View style={sformcontainerin}>
                <Text style={sformlabel}>Invoice Number</Text>
                <TextInput style={sforminput} value={basicform?.invoiceumber} onChangeText={(text) => setbasicform({ ...basicform, invoiceumber: text })} />
              </View> */}

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Mobile Number</Text>
                <TextInput style={sforminput} value={basicform?.mobile} onChangeText={(text) => setbasicform({ ...basicform, mobile: text })}
                  maxLength={10}
                  keyboardType={'number-pad'}
                />
              </View>

              <View style={sformcontainerin}>

                <Text style={sformlabel}>Email</Text>
                <TextInput style={sforminput} value={basicform?.email} onChangeText={(text) => setbasicform({ ...basicform, email: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>From (city)</Text>
                <TextInput style={sforminput} value={basicform?.from} onChangeText={(text) => setbasicform({ ...basicform, from: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>To (city)</Text>
                <TextInput style={sforminput} value={basicform?.to} onChangeText={(text) => setbasicform({ ...basicform, to: text })} />
              </View>

              {/* from floor , to floor */}

              <View style={sformcontainerin}>
                <Text style={sformlabel}>From (Floor)</Text>
                <TextInput style={sforminput} value={basicform?.fromfloor} onChangeText={(text) => setbasicform({ ...basicform, fromfloor: text })} keyboardType={'number-pad'} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>To (Floor)</Text>
                <TextInput style={sforminput} value={basicform?.tofloor} onChangeText={(text) => setbasicform({ ...basicform, tofloor: text })} keyboardType={'number-pad'} />
              </View>

              <View style={sformcontainerin2}>
                <RadioForm
                  radio_props={radio_props1}
                  initial={
                    basicform?.liftavailable == 1 ? 1 : 0
                  }
                  onPress={(value) => {
                    console.log(value)
                    setbasicform({ ...basicform, liftavailable: value })
                  }}

                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={colors.primary}
                  selectedButtonColor={colors.primary}
                  animation={true}
                  labelStyle={{ fontSize: 14, color: colors.primary, marginRight: 10 }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonStyle={{ marginRight: 10 }}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />

              </View>
            </View>

            <View style={sformcontainer}>
              <Text style={sformhead}>Cost Details</Text>
              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>PACKING SUPPORT</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Packing Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.packingcharge} onChangeText={(text) => setcostform({ ...costform, packingcharge: text })}
                  keyboardType={'number-pad'}
                />
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unpacking Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.unpackingcharge} onChangeText={(text) => setcostform({ ...costform, unpackingcharge: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformhr}></View>

              {/*  */}

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>HANDLING</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.loadingcharge} onChangeText={(text) => setcostform({ ...costform, loadingcharge: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.unloadingcharge} onChangeText={(text) => setcostform({ ...costform, unloadingcharge: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>FRIGHT</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Truck Size (Ft.)</Text>
                <TextInput style={sforminput} value={costform?.trucksize} onChangeText={(text) => setcostform({ ...costform, trucksize: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Pro Fright Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.profright} onChangeText={(text) => setcostform({ ...costform, profright: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Car Transportation (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.cartransportation} onChangeText={(text) => setcostform({ ...costform, cartransportation: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Handyman Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.handymancharges} onChangeText={(text) => setcostform({ ...costform, handymancharges: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Escort Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.escortcharges} onChangeText={(text) => setcostform({ ...costform, escortcharges: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformhr}></View>

              {/*  */}
              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>LOGISTIC SUPPORT</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.insurancecharges} onChangeText={(text) => setcostform({ ...costform, insurancecharges: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Remarks</Text>
                <TextInput style={sforminput} value={costform?.remarks1} onChangeText={(text) => setcostform({ ...costform, remarks1: text })} />
              </View>
              <View style={sformhr}></View>

              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>FOV TRANSIT POLICY</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>FOV Transit Policy</Text>
                <TextInput style={sforminput} value={costform?.fovtransitpolicy} onChangeText={(text) => setcostform({ ...costform, fovtransitpolicy: text })} />
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Any Other Charges (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.anyothercharges} onChangeText={(text) => setcostform({ ...costform, anyothercharges: text })}  keyboardType={'number-pad'}/>
              </View>


              <View style={sformhr}></View>

              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>TAX DETAILS</Text>
              </View>
              <View style={sformcontainerin2}>
                <RadioForm
                  radio_props={radio_props}
                  initial={
                    costform?.taxtype == 0 ? 0 : 1
                  }
                  onPress={(value) => { setcostform({ ...costform, taxtype: value }) }}

                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={colors.primary}
                  selectedButtonColor={colors.primary}
                  animation={true}
                  labelStyle={{ fontSize: 14, color: colors.primary, marginRight: 10 }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonStyle={{ marginRight: 10 }}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />

              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>GST %</Text>
                <TextInput style={sforminput} value={costform?.gst} onChangeText={(text) => setcostform({ ...costform, gst: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>CGST %</Text>
                <Text style={sformvalue} > {costform?.gst / 2} </Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>SGST %</Text>
                <Text style={sformvalue} > {costform?.gst / 2} </Text>

              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>IGST %</Text>
                <TextInput style={sforminput} value={costform?.igst}
                  onChangeText={(text) => setcostform({ ...costform, igst: text })}  keyboardType={'number-pad'}
                />
              </View>

              <View style={sformhr}></View>
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>GST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getgst ? getgst : 0}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>IGST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getigst ? getigst : 0}</Text>
              </View>
              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>TOTAL (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getotal ? getotal : 0}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>DISCOUNT (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.discount} onChangeText={(text) => setcostform({ ...costform, discount: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>FINAL AMOUNT (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getfinaltotal ? getfinaltotal : 0
                }</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>ADVANCE PAYMENT (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.advancepayment} onChangeText={(text) => setcostform({ ...costform, advancepayment: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>REMAINING AMOUNT (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getremaining ? getremaining : 0}</Text>
              </View>
              <View style={sformhr}></View>
              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>REMARKS</Text>
                <TextInput style={sforminput} value={costform?.remarks2} onChangeText={(text) => setcostform({ ...costform, remarks2: text })} />
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
                <Text style={sformlabel}>Client Name</Text>
                <Text style={sformvalue}>{basicform?.clientname}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Company Name</Text>
                <Text style={sformvalue}>{basicform?.companyname}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Invoice Number</Text>
                <Text style={sformvalue}>{basicform?.invoiceumber}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Mobile Number</Text>
                <Text style={sformvalue}>{basicform?.mobile}</Text>
              </View>

              <View style={sformcontainerin}>

                <Text style={sformlabel}>Email</Text>
                <Text style={sformvalue}>{basicform?.email}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>From (city)</Text>
                <Text style={sformvalue}>{basicform?.from}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>To (city)</Text>
                <Text style={sformvalue}>{basicform?.to}</Text>
              </View>

              <View style={sformcontainerin}>
                {/* from (floor) */}
                <Text style={sformlabel}>From (floor)</Text>
                <Text style={sformvalue}>{basicform?.fromfloor}</Text>
              </View>

              <View style={sformcontainerin}>
                {/* to (floor) */}
                <Text style={sformlabel}>To (floor)</Text>
                <Text style={sformvalue}>{basicform?.tofloor}</Text>
              </View>

              {/* lift available */}
              <View style={sformcontainerin}>
                <Text style={sformlabel}>Lift Available</Text>
                <Text style={sformvalue}>{basicform?.liftavailable != 1 ? 'NO' : 'YES'}</Text>
              </View>
            </View>

            <View style={sformcontainer}>
              <Text style={sformhead}>Cost Details</Text>
              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>PACKING SUPPORT</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Packing Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {
                  costform?.packingcharge
                }</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unpacking Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {
                  costform?.unpackingcharge
                }</Text>
              </View>
              <View style={sformhr}></View>

              {/*  */}

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>HANDLING</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {
                  costform?.loadingcharge
                }</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.unloadingcharge}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>FRIGHT</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Truck Size</Text>
                <Text style={sformvalue}>{costform.trucksize} ft</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Pro Fright Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.profrignt}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Car Transportation (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.cartransportation}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Handyman Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.handymancharges}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Escort Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.escortcharges}</Text>
              </View>
              <View style={sformhr}></View>

              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>LOGISTIC SUPPORT</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.insurancecharges}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Remarks</Text>
                <Text style={sformvalue}>{costform.remarks1}</Text>
              </View>
              <View style={sformhr}></View>

              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>FOV TRANSIT POLICY</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>FOV Transit Policy</Text>
                <Text style={sformvalue}>{costform.fovtransportpolicy}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Any Other Charges (Rs.)</Text>
                <Text style={sformvalue}>{costform.anyothercharges}</Text>
              </View>


              <View style={sformhr}></View>

              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>TAX DETAILS</Text>
              </View>
              <View>
                {
                  costform.taxtype == 0 ?
                    <View style={sformcontainerin2}>
                      <Text style={sformlabel}>Tax Type</Text>
                      <Text style={sformvalue}>Within State</Text>
                    </View>
                    :
                    <View style={sformcontainerin2}>
                      <Text style={sformlabel}>Tax Type</Text>
                      <Text style={sformvalue}>Other State</Text>
                    </View>
                }
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>GST %</Text>
                <Text style={sformvalue}>{costform.gst > 0 ? costform.gst : 0}%</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>CGST %</Text>
                <Text style={sformvalue}>{costform.gst > 0 ? costform.gst / 2 : 0}%</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>SGST %</Text>
                <Text style={sformvalue}>{costform.gst > 0 ? costform.gst / 2 : 0}%</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>IGST %</Text>
                <Text style={sformvalue}>{costform.igst > 0 ? costform.igst : 0}%</Text>
              </View>




              <View style={sformhr}></View>
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>GST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getgst ? getgst : 0}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>IGST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getigst ? getigst : 0}</Text>
              </View>
              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>TOTAL (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getotal ? getotal : 0}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>DISCOUNT (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.discount}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>FINAL AMOUNT (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getfinaltotal ? getfinaltotal : 0
                }</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>ADVANCE PAYMENT (Rs.)</Text>
                <Text style={sformvalue}>Rs. {costform.advancepayment}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>REMAINING AMOUNT (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getremaining ? getremaining : 0}</Text>
              </View>



              <View style={sformhr}></View>
              {/*  */}
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>REMARKS</Text>
                <Text style={sformvalue}>{costform.remarks2}</Text>
              </View>
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

export default Bill

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