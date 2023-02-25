import { Linking, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../../CommonStyles/Theme'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { formedit, sformcontainer, sformhead, sformhead2, sformcontainerin, sformcontainerin2, sformlabel, sformvalue, sformhr, formbtn, sforminput } from "../../CommonStyles/FormStyle"
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'
const LrBilty = ({ navigation, route }) => {
  const { converteditem } = route.params;
  // console.log(converteditem)
  const [oldlr, setoldlr] = React.useState([])
  const [editing, setediting] = React.useState(false)
  const [basicform, setbasicform] = React.useState({
    biltynumber: '',
    date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
    consignorname: converteditem?.basicform?.clientname ? converteditem?.basicform?.clientname : converteditem?.basicform?.clientname ? converteditem?.basicform?.clientname : '',    
    addressfrom: converteditem?.basicform?.from ? converteditem?.basicform?.from : '',
    addressto: converteditem?.basicform?.to ? converteditem?.basicform?.to : '',
    lorrynumber: '',
  })

  const [costform, setcostform] = React.useState({
    packingchargerate: '',
    packingchargepaid: '',
    unpackingchargerate: '',
    unpackingchargepaid: '',

    loadingchargerate: '',
    loadingchargepaid: '',

    unloadingchargerate: '',
    unloadingchargepaid: '',

    freightchargesrate: '',
    freightchargespaid: '',
    grchargerate: '',
    grchargepaid: '',
    insurancechargesrate: '',
    insurancechargespaid: '',
    discount: '',
    gst: converteditem?.costform?.gst ? converteditem?.costform?.gst : '',
    cgst: converteditem?.costform?.cgst ? converteditem?.costform?.cgst : '',
    sgst: converteditem?.costform?.sgst ? converteditem?.costform?.sgst : '',
    igst: converteditem?.costform?.igst ? converteditem?.costform?.igst : '',
    totalamount: '',
    totalamountpaid: '',
  })

  const [descriptionform, setdescriptionform] = React.useState({
    householditems: '',
    householditemswtactual: '',
    householditemswtcharged: '',
    officeitems: '',
    officeitemswtactual: '',
    officeitemswtcharged: '',
    industrialitems: '',
    industrialitemswtactual: '',
    industrialitemswtcharged: '',
    cartransportation: '',
    cartransportationwtactual: '',
    cartransportationwtcharged: '',
    biketransportation: '',
    biketransportationwtactual: '',
    biketransportationwtcharged: '',
    asperlistattached: '',
    asperlistattachedwtactual: '',
    asperlistattachedwtcharged: '',
  })


  React.useEffect(() => {
    getoldlr()
  }, [])

  const resetvalues = () => {
    setbasicform({
      biltynumber: '',
      date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,

      consignorname: '',
      addressfrom: '',
      addressto: '',
      lorrynumber: '',
    })

    setcostform({
      packingchargerate: '',
      packingchargepaid: '',
      unpackingchargerate: '',
      unpackingchargepaid: '',

      loadingchargerate: '',
      loadingchargepaid: '',

      unloadingchargerate: '',
      unloadingchargepaid: '',

      freightchargesrate: '',
      freightchargespaid: '',
      grchargerate: '',
      grchargepaid: '',
      insurancechargesrate: '',
      insurancechargespaid: '',
      discount: '',
      gst: '',
      cgst: '',
      sgst: '',
      igst: '',
      totalamount: '',
      totalamountpaid: '',
    })
    setdescriptionform({
      householditems: '',
      householditemswtactual: '',
      householditemswtcharged: '',
      officeitems: '',
      officeitemswtactual: '',
      officeitemswtcharged: '',
      industrialitems: '',
      industrialitemswtactual: '',
      industrialitemswtcharged: '',
      cartransportation: '',
      cartransportationwtactual: '',
      cartransportationwtcharged: '',
      biketransportation: '',
      biketransportationwtactual: '',
      biketransportationwtcharged: '',
      asperlistattached: '',
      asperlistattachedwtactual: '',
      asperlistattachedwtcharged: '',
    })
    getoldlr()
  }

  const getoldlr = async () => {
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
                    setoldlr(data.lrbilties)
                    {
                      userdata?.userdata?.customlrbiltynumber ?
                        setbasicform({ ...basicform, biltynumber: `${userdata?.userdata?.customlrbiltynumber}-${data.lrbilties.length + 1}` }) :
                        setbasicform(
                          {
                            ...basicform,
                            biltynumber: `LR-${data.lrbilties.length + 1}`
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
            navigation.navigate('Login');

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
              costform: costform,
              descriptionform: descriptionform,
              createdDate: new Date(),
              docid: basicform.biltynumber
            },
            doctype: 'lrbilties'
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message == "LR Bilty Saved Successfully") {
              alert("LR Bilty Saved Successfully")
              setediting(false)
               showprintablerbill(basicform)
            }
            else {
              alert("LR Bilty Not Saved")
            }
          })
          .catch(err => {
            alert("LR Bilty Not Saved ")
            console.log("Error in saving LR Bilty ", err)
          })
      })
      .catch(err => {
        navigation.navigate('Login')
      })

  }
  // https://packersandmoversweb.vercel.app/bill/63aa05847bab0845931b3780/lrbilty/HJIN-4

  const showprintablerbill = async (basicform) => {
    let userid = 0;
    let docid = basicform.biltynumber;
    let doctype = 'lrbilty'
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

  const [getotal, setgetotal] = React.useState(0);
  const [gettotalpaid, settotalpaid] = React.useState(0);
  const [getgst, setgetgst] = React.useState(0);
  const [getigst, setgetigst] = React.useState(0);

  React.useEffect(() => {
    const total =
      (eval(descriptionform.householditemswtcharged) >= 0 ? eval(descriptionform.householditemswtcharged) : 0)
      + (eval(descriptionform.officeitemswtcharged) >= 0 ? eval(descriptionform.officeitemswtcharged) : 0)
      + (eval(descriptionform.industrialitemswtcharged) >= 0 ? eval(descriptionform.industrialitemswtcharged) : 0)
      + (eval(descriptionform.cartransportationwtcharged) >= 0 ? eval(descriptionform.cartransportationwtcharged) : 0)
      + (eval(descriptionform.biketransportationwtcharged) >= 0 ? eval(descriptionform.biketransportationwtcharged) : 0)
      + (eval(descriptionform.asperlistattachedwtcharged) >= 0 ? eval(descriptionform.asperlistattachedwtcharged) : 0)
      + (eval(costform.packingchargerate) >= 0 ? eval(costform.packingchargerate) : 0)
      + (eval(costform.unpackingchargerate) >= 0 ? eval(costform.unpackingchargerate) : 0)
      + (eval(costform.loadingchargerate) >= 0 ? eval(costform.loadingchargerate) : 0)
      + (eval(costform.unloadingchargerate) >= 0 ? eval(costform.unloadingchargerate) : 0)
      + (eval(costform.freightchargesrate) >= 0 ? eval(costform.freightchargesrate) : 0)
      + (eval(costform.grchargerate) >= 0 ? eval(costform.grchargerate) : 0)
      + (eval(costform.insurancechargesrate) >= 0 ? eval(costform.insurancechargesrate) : 0)
      + (eval(costform.discount) >= 0 ? eval(costform.discount) : 0)


    const tgst = total * (costform.gst / 100) + total * (costform.igst / 100)
    // console.log(tgst)
    const total1 = parseFloat(total) + parseFloat(tgst)
    const gst = total * (costform.gst / 100)
    const igst = total * (costform.igst / 100)
    setgetotal(total1)
    setgetgst(gst)
    setgetigst(igst)


    const totalpaid =
      (eval(costform.packingchargepaid) >= 0 ? eval(costform.packingchargepaid) : 0)
      + (eval(costform.unpackingchargepaid) >= 0 ? eval(costform.unpackingchargepaid) : 0)
      + (eval(costform.loadingchargepaid) >= 0 ? eval(costform.loadingchargepaid) : 0)
      + (eval(costform.unloadingchargepaid) >= 0 ? eval(costform.unloadingchargepaid) : 0)
      + (eval(costform.freightchargespaid) >= 0 ? eval(costform.freightchargespaid) : 0)
      + (eval(costform.grchargepaid) >= 0 ? eval(costform.grchargepaid) : 0)
      + (eval(costform.insurancechargespaid) >= 0 ? eval(costform.insurancechargespaid) : 0)

    settotalpaid(totalpaid)
  }, [costform, descriptionform])
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
              {/* <View style={sformcontainerin}>
                <Text style={sformlabel}>Bilty Number</Text>
                <TextInput style={sforminput} value={basicform?.biltynumber} onChangeText={(text) => setbasicform({ ...basicform, biltynumber: text })} />
              </View> */}

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Date</Text>
                <TextInput style={sforminput} value={basicform?.date} onChangeText={(text) => setbasicform({ ...basicform, date: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Consignor Name</Text>
                <TextInput style={sforminput} value={basicform?.consignorname} onChangeText={(text) => setbasicform({ ...basicform, consignorname: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Address From</Text>
                <TextInput style={sforminput} value={basicform?.addressfrom} onChangeText={(text) => setbasicform({ ...basicform, addressfrom: text })} />
              </View>

              <View style={sformcontainerin}>

                <Text style={sformlabel}>Address To</Text>

                <TextInput style={sforminput} value={basicform?.addressto} onChangeText={(text) => setbasicform({ ...basicform, addressto: text })} />
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Lorry Number</Text>

                <TextInput style={sforminput} >{basicform?.lorrynumber}</TextInput>
              </View>
            </View>

            <View
              style={sformcontainer}
            >

              <Text style={sformhead}>Description Details</Text>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Household Items</Text>
                <TextInput style={sforminput} value={descriptionform?.householditems} onChangeText={(text) => setdescriptionform({ ...descriptionform, householditems: text })} />
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <TextInput style={sforminput} value={descriptionform?.householditemswtactual} onChangeText={(text) => setdescriptionform({ ...descriptionform, householditemswtactual: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <TextInput style={sforminput} value={descriptionform?.householditemswtcharged} onChangeText={(text) => setdescriptionform({ ...descriptionform, householditemswtcharged: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Office Items</Text>
                <TextInput style={sforminput} value={descriptionform?.officeitems} onChangeText={(text) => setdescriptionform({ ...descriptionform, officeitems: text })} />
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <TextInput style={sforminput} value={descriptionform?.officeitemswtactual} onChangeText={(text) => setdescriptionform({ ...descriptionform, officeitemswtactual: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <TextInput style={sforminput} value={descriptionform?.officeitemswtcharged} onChangeText={(text) => setdescriptionform({ ...descriptionform, officeitemswtcharged: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Industrial Items</Text>
                <TextInput style={sforminput} value={descriptionform?.industrialitems} onChangeText={(text) => setdescriptionform({ ...descriptionform, industrialitems: text })} />
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <TextInput style={sforminput} value={descriptionform?.industrialitemswtactual} onChangeText={(text) => setdescriptionform({ ...descriptionform, industrialitemswtactual: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <TextInput style={sforminput} value={descriptionform?.industrialitemswtcharged} onChangeText={(text) => setdescriptionform({ ...descriptionform, industrialitemswtcharged: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Car Transportation</Text>
                <TextInput style={sforminput} value={descriptionform?.cartransportation} onChangeText={(text) => setdescriptionform({ ...descriptionform, cartransportation: text })} />
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <TextInput style={sforminput} value={descriptionform?.cartransportationwtactual} onChangeText={(text) => setdescriptionform({ ...descriptionform, cartransportationwtactual: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <TextInput style={sforminput} value={descriptionform?.cartransportationwtcharged} onChangeText={(text) => setdescriptionform({ ...descriptionform, cartransportationwtcharged: text })}  keyboardType={'number-pad'} />
              </View>


              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Bike Transportation</Text>
                <TextInput style={sforminput} value={descriptionform?.biketransportation} onChangeText={(text) => setdescriptionform({ ...descriptionform, biketransportation: text })} />
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <TextInput style={sforminput} value={descriptionform?.biketransportationwtactual} onChangeText={(text) => setdescriptionform({ ...descriptionform, biketransportationwtactual: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <TextInput style={sforminput} value={descriptionform?.biketransportationwtcharged} onChangeText={(text) => setdescriptionform({ ...descriptionform, biketransportationwtcharged: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Asper List Attached</Text>
                <TextInput style={sforminput} value={descriptionform?.asperlistattached} onChangeText={(text) => setdescriptionform({ ...descriptionform, asperlistattached: text })} />
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <TextInput style={sforminput} value={descriptionform?.asperlistattachedwtactual} onChangeText={(text) => setdescriptionform({ ...descriptionform, asperlistattachedwtactual: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <TextInput style={sforminput} value={descriptionform?.asperlistattachedwtcharged} onChangeText={(text) => setdescriptionform({ ...descriptionform, asperlistattachedwtcharged: text })}  keyboardType={'number-pad'}/>
              </View>

            </View>


            <View style={sformcontainer}>
              <Text style={sformhead}>Charges Details</Text>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Freight Charges </Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Freight Charges Rate (Rs.)</Text>

                <TextInput style={sforminput} value={costform?.freightchargesrate} onChangeText={(text) => setcostform({ ...costform, freightchargesrate: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Freight Charges Paid (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.freightchargespaid} onChangeText={(text) => setcostform({ ...costform, freightchargespaid: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Freight Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.freightchargesrate - costform.freightchargespaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Loading Charges </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges Rate (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.loadingchargerate} onChangeText={(text) => setcostform({ ...costform, loadingchargerate: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges Paid (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.loadingchargepaid} onChangeText={(text) => setcostform({ ...costform, loadingchargepaid: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.loadingchargerate - costform.loadingchargepaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Unloading Charges </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges Rate (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.unloadingchargerate} onChangeText={(text) => setcostform({ ...costform, unloadingchargerate: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges Paid (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.unloadingchargepaid} onChangeText={(text) => setcostform({ ...costform, unloadingchargepaid: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.unloadingchargerate - costform.unloadingchargepaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>G.R. Charge</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>G.R. Charge Rate (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.grchargerate} onChangeText={(text) => setcostform({ ...costform, grchargerate: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>G.R. Charge Paid (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.grchargepaid} onChangeText={(text) => setcostform({ ...costform, grchargepaid: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>G.R. Charge Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.grchargerate - costform.grchargepaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Insurance Charges </Text>

              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges Rate (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.insurancechargesrate} onChangeText={(text) => setcostform({ ...costform, insurancechargesrate: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges Paid (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.insurancechargespaid} onChangeText={(text) => setcostform({ ...costform, insurancechargespaid: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.insurancechargesrate - costform.insurancechargespaid}</Text>
              </View>

              <View style={sformhr} />
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Other Charges (Rs.)</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Discount (Rs.)</Text>
                <TextInput style={sforminput} value={costform?.discount} onChangeText={(text) => setcostform({ ...costform, discount: text })}  keyboardType={'number-pad'}/>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>GST %</Text>
                <TextInput style={sforminput} value={costform?.gst} onChangeText={(text) => setcostform({ ...costform, gst: text })}  keyboardType={'number-pad'}/>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>CGST %</Text>
                <Text style={sformvalue} > {costform?.gst / 2} %</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>SGST %</Text>
                <Text style={sformvalue} > {costform?.gst / 2} %</Text>

              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>IGST %</Text>
                <TextInput style={sforminput} value={costform?.igst}
                  onChangeText={(text) => setcostform({ ...costform, igst: text })}
                  keyboardType={'number-pad'}
                />
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>GST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getgst ? getgst : 0}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>IGST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getigst ? getigst : 0}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Total Amount (Rs.)</Text>
                <Text style={sformvalue}>Rs.{getotal}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Total Amount Paid (Rs.)</Text>
                <Text style={sformvalue}>Rs.{gettotalpaid}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Total Amount Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{getotal - gettotalpaid}</Text>
              </View>
            </View>
            {/* 
            <Text style={formbtn}>
              Save
            </Text> */}
          </ScrollView>
          :
          <ScrollView>
            <View style={sformcontainer}>
              <Text style={sformhead}>Basic Details</Text>
              <View style={sformcontainerin}>
                <Text style={sformlabel}>Bilty Number</Text>
                <Text style={sformvalue}>{basicform?.biltynumber}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Date</Text>
                <Text style={sformvalue}>{basicform?.date}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Consignor Name</Text>
                <Text style={sformvalue}>{basicform?.consignorname}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Address From</Text>
                <Text style={sformvalue}>{basicform?.addressfrom}</Text>
              </View>

              <View style={sformcontainerin}>

                <Text style={sformlabel}>Address To</Text>
                <Text style={sformvalue}>{basicform?.addressto}</Text>
              </View>

              <View style={sformcontainerin}>
                <Text style={sformlabel}>Lorry Number</Text>
                <Text style={sformvalue}>{basicform?.lorrynumber}</Text>
              </View>
            </View>

            <View
              style={sformcontainer}
            >

              <Text style={sformhead}>Description Details</Text>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Household Items</Text>
                <Text style={sformvalue}>{descriptionform.householditems}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <Text style={sformvalue}>{descriptionform.householditemswtactual}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <Text style={sformvalue}>
                  {descriptionform.householditemswtcharged}
                </Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Office Items</Text>
                <Text style={sformvalue}>
                  {descriptionform.officeitems}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <Text style={sformvalue}>
                  {descriptionform.officeitemswtactual}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <Text style={sformvalue}>
                  {descriptionform.officeitemswtcharged}
                </Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Industrial Items</Text>
                <Text style={sformvalue}>
                  {descriptionform.industrialitems}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <Text style={sformvalue}>
                  {descriptionform.industrialitemswtactual}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <Text style={sformvalue}>
                  {descriptionform.industrialitemswtcharged}
                </Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Car Transportation</Text>
                <Text style={sformvalue}>
                  {descriptionform.cartransportation}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <Text style={sformvalue}>
                  {descriptionform.cartransportationwtactual}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <Text style={sformvalue}>
                  {descriptionform.cartransportationwtcharged}
                </Text>
              </View>


              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Bike Transportation</Text>
                <Text style={sformvalue}>
                  {descriptionform.biketransportation}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <Text style={sformvalue}>
                  {descriptionform.biketransportationwtactual}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <Text style={sformvalue}>
                  {descriptionform.biketransportationwtcharged}
                </Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Asper List Attached</Text>
                <Text style={sformvalue}>
                  {descriptionform.asperlistattached}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Actual (kg)</Text>
                <Text style={sformvalue}>
                  {descriptionform.asperlistattachedwtactual}
                </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Weight Charge (Rs)</Text>
                <Text style={sformvalue}>
                  {descriptionform.asperlistattachedwtcharged}
                </Text>
              </View>

            </View>

            <View style={sformcontainer}>
              <Text style={sformhead}>Charges Details</Text>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Freight Charges </Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Freight Charges Rate (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.freightchargesrate}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Freight Charges Paid (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.freightchargespaid}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Freight Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.freightchargesrate - costform.freightchargespaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Loading Charges </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges Rate (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.loadingchargerate}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges Paid (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.loadingchargepaid}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Loading Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.loadingchargerate - costform.loadingchargepaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Unloading Charges </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges Rate (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.unloadingchargerate}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges Paid (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.unloadingchargepaid}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Unloading Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.unloadingchargerate - costform.unloadingchargepaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>G.R. Charge</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>G.R. Charge Rate (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.grchargerate}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>G.R. Charge Paid (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.grchargepaid}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>G.R. Charge Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.grchargerate - costform.grchargepaid}</Text>
              </View>

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Insurance Charges </Text>

              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges Rate (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.insurancechargesrate}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges Paid (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.insurancechargespaid}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Insurance Charges Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.insurancechargesrate - costform.insurancechargespaid}</Text>
              </View>

              <View style={sformhr} />
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Other Charges </Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformlabel}>Discount (Rs.)</Text>
                <Text style={sformvalue}>Rs.{costform.discount}</Text>
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

              <View style={sformhr} />

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>GST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getgst ? getgst : 0}</Text>
              </View>
              <View style={sformcontainerin2}>
                <Text style={sformhead2}>IGST (Rs.)</Text>
                <Text style={sformvalue}>Rs. {getigst ? getigst : 0}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Total Amount (Rs.)</Text>
                <Text style={sformvalue}>Rs.{getotal}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Total Amount Paid (Rs.)</Text>
                <Text style={sformvalue}>Rs.{gettotalpaid}</Text>
              </View>

              <View style={sformcontainerin2}>
                <Text style={sformhead2}>Total Amount Due (Rs.)</Text>
                <Text style={sformvalue}>Rs.{getotal - gettotalpaid}</Text>
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

export default LrBilty

const styles = StyleSheet.create({

  sforminput: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '35%',
    marginHorizontal: 10,
    padding: 5,
  }
})