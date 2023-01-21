import { Linking, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../CommonStyles/Theme'
import Feather from 'react-native-vector-icons/Feather';
import { formedit, sformcontainer, sformhead, sformhead2, sformcontainerin, sformcontainerin2, sformlabel, sformvalue, sformhr, formbtn, sforminput } from "../../CommonStyles/FormStyle"
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const InvoiceEdit = ({ navigation, route }) => {
    const { item } = route.params
    const [oldinvoices, setoldinvoices] = React.useState([])

    const [editing, setediting] = React.useState(false)

    const [basicform, setbasicform] = React.useState({
        clientname: item.basicform.clientname,
        companyname: item.basicform.companyname,
        invoiceumber: item.basicform.invoiceumber,
        mobile: item.basicform.mobile,
        email: item.basicform.email,
        from: item.basicform.from,
        to: item.basicform.to
    })

    const [costform, setcostform] = React.useState({
        packingcharge: item.costform.packingcharge,
        unpackingcharge: item.costform.unpackingcharge,
        loadingcharge: item.costform.loadingcharge,
        unloadingcharge: item.costform.unloadingcharge,
        profright: item.costform.profright,
        cartransportation: item.costform.cartransportation,
        trucksize: item.costform.trucksize,
        handymancharges: item.costform.handymancharges,
        escortcharges: item.costform.escortcharges,
        insurancecharges: item.costform.insurancecharges,
        remarks1: item.costform.remarks1,
        fovtransitpolicy: item.costform.fovtransitpolicy,
        anyothercharges: item.costform.anyothercharges,
        taxtype: item.costform.taxtype,
        gst: item.costform.gst,
        cgst: item.costform.cgst,
        sgst: item.costform.sgst,
        igst: item.costform.igst,
        // total: item.costform.total,
        discount: item.costform.discount,
        // finalamount: item.costform.finalamount,
        remarks2: item.costform.remarks2,
        advancepayment: item.costform.advancepayment,//
        // remainingpayment: item.costform.remainingpayment,//
        remarks2: item.costform.remarks2,

    })

    // useEffect(() => {
    //     console.log(item)
    // }, [])

    const savedoc = async () => {
        AsyncStorage.getItem('token')
            .then(token => {
                fetch(`${envs.BACKEND_URL}/updatealldocs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({
                        doc: {
                            // invoiceumber: item.basicform.invoiceumber,
                            basicform: basicform,
                            costform: costform,
                            createdDate: item.createdDate,
                            updatedDate: new Date(),
                            docid: basicform.invoiceumber
                        },
                        doctype: 'invoices'
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if (data.message == "Invoice Updated Successfully") {
                            // resetvalues()
                            setediting(false)
                            alert("Invoice Updated Successfully")
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
        //   + (eval(costform.fovtransitpolicy) >= 0 ? eval(costform.fovtransitpolicy) : 0)

        // console.log(total)



        const tgst = total * (costform.gst / 100) + total * (costform.igst / 100)
        // console.log(tgst)
        const total1 = parseFloat(total) + parseFloat(tgst)

        setgetotal(total1)
        setgetfinaltotal(total1 - costform.discount)
        setgetremaining(total1 - costform.discount - costform.advancepayment)



    }, [costform])

    var radio_props = [
        { label: 'Within State', value: 0 },
        { label: 'Other State', value: 1 }
    ];


    const showprintablerbill = async () => {
        let userid = 0;
        let docid = item.basicform.invoiceumber;
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
                                <Text style={sformlabel}>Client Name</Text>
                                <TextInput style={sforminput} value={basicform?.clientname} onChangeText={(text) => setbasicform({ ...basicform, clientname: text })} />
                            </View>

                            <View style={sformcontainerin}>
                                <Text style={sformlabel}>Company Name</Text>
                                <TextInput style={sforminput} value={basicform?.companyname} onChangeText={(text) => setbasicform({ ...basicform, companyname: text })} />
                            </View>

                            <View style={sformcontainerin}>
                                <Text style={sformlabel}>Invoice Number</Text>
                                <TextInput style={sforminput} value={basicform?.invoiceumber} onChangeText={(text) => setbasicform({ ...basicform, invoiceumber: text })} />
                            </View>

                            <View style={sformcontainerin}>
                                <Text style={sformlabel}>Mobile Number</Text>
                                <TextInput style={sforminput} value={basicform?.mobile} onChangeText={(text) => setbasicform({ ...basicform, mobile: text })}
                                    maxLength={10}
                                />
                            </View>

                            <View style={sformcontainerin}>

                                <Text style={sformlabel}>Email</Text>
                                <TextInput style={sforminput} value={basicform?.email} onChangeText={(text) => setbasicform({ ...basicform, email: text })} />
                            </View>

                            <View style={sformcontainerin}>
                                <Text style={sformlabel}>From (Floor)</Text>
                                <TextInput style={sforminput} value={basicform?.from} onChangeText={(text) => setbasicform({ ...basicform, from: text })} />
                            </View>

                            <View style={sformcontainerin}>
                                <Text style={sformlabel}>To (Floor)</Text>
                                <TextInput style={sforminput} value={basicform?.to} onChangeText={(text) => setbasicform({ ...basicform, to: text })} />
                            </View>
                        </View>

                        <View style={sformcontainer}>
                            <Text style={sformhead}>Cost Details</Text>
                            {/*  */}
                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>PACKING SUPPORT</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Packing Charges</Text>
                                <TextInput style={sforminput} value={costform?.packingcharge} onChangeText={(text) => setcostform({ ...costform, packingcharge: text })} />
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Unpacking Charges</Text>
                                <TextInput style={sforminput} value={costform?.unpackingcharge} onChangeText={(text) => setcostform({ ...costform, unpackingcharge: text })} />
                            </View>
                            <View style={sformhr}></View>

                            {/*  */}

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>HANDLING</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Loading Charges</Text>
                                <TextInput style={sforminput} value={costform?.loadingcharge} onChangeText={(text) => setcostform({ ...costform, loadingcharge: text })} />
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Unloading Charges</Text>
                                <TextInput style={sforminput} value={costform?.unloadingcharge} onChangeText={(text) => setcostform({ ...costform, unloadingcharge: text })} />
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>FRIGHT</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Truck Size</Text>
                                <TextInput style={sforminput} value={costform?.trucksize} onChangeText={(text) => setcostform({ ...costform, trucksize: text })} />
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Pro Fright Charges</Text>
                                <TextInput style={sforminput} value={costform?.profright} onChangeText={(text) => setcostform({ ...costform, profright: text })} />
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Car Transportation</Text>
                                <TextInput style={sforminput} value={costform?.cartransportation} onChangeText={(text) => setcostform({ ...costform, cartransportation: text })} />
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Handyman Charges</Text>
                                <TextInput style={sforminput} value={costform?.handymancharges} onChangeText={(text) => setcostform({ ...costform, handymancharges: text })} />
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Escort Charges</Text>
                                <TextInput style={sforminput} value={costform?.escortcharges} onChangeText={(text) => setcostform({ ...costform, escortcharges: text })} />
                            </View>
                            <View style={sformhr}></View>

                            {/*  */}
                            {/*  */}
                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>LOGISTIC SUPPORT</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Insurance Charges</Text>
                                <TextInput style={sforminput} value={costform?.insurancecharges} onChangeText={(text) => setcostform({ ...costform, insurancecharges: text })} />
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
                                <Text style={sformlabel}>Any Other Charges</Text>
                                <TextInput style={sforminput} value={costform?.anyothercharges} onChangeText={(text) => setcostform({ ...costform, anyothercharges: text })} />
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
                                <Text style={sformlabel}>GST</Text>
                                <TextInput style={sforminput} value={costform?.gst} onChangeText={(text) => setcostform({ ...costform, gst: text })} />
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>CGST</Text>
                                <Text style={sformvalue} > {costform?.gst / 2} </Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>SGST</Text>
                                <Text style={sformvalue} > {costform?.gst / 2} </Text>

                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>IGST</Text>
                                <TextInput style={sforminput} value={costform?.igst}
                                    onChangeText={(text) => setcostform({ ...costform, igst: text })}
                                />
                            </View>

                            <View style={sformhr}></View>

                            {/*  */}
                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>TOTAL</Text>
                                <Text style={sformvalue}>Rs. {getotal ? getotal : 0}</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>DISCOUNT</Text>
                                <TextInput style={sforminput} value={costform?.discount} onChangeText={(text) => setcostform({ ...costform, discount: text })} />
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>FINAL AMOUNT</Text>
                                <Text style={sformvalue}>Rs. {getfinaltotal ? getfinaltotal : 0
                                }</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>ADVANCE PAYMENT</Text>
                                <TextInput style={sforminput} value={costform?.advancepayment} onChangeText={(text) => setcostform({ ...costform, advancepayment: text })} />
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>REMAINING AMOUNT</Text>
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
                                <Text style={sformlabel}>From</Text>
                                <Text style={sformvalue}>Floor {basicform?.from}</Text>
                            </View>

                            <View style={sformcontainerin}>
                                <Text style={sformlabel}>To</Text>
                                <Text style={sformvalue}>Floor {basicform?.to}</Text>
                            </View>
                        </View>

                        <View style={sformcontainer}>
                            <Text style={sformhead}>Cost Details</Text>
                            {/*  */}
                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>PACKING SUPPORT</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Packing Charges</Text>
                                <Text style={sformvalue}>Rs. {
                                    costform?.packingcharge
                                }</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Unpacking Charges</Text>
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
                                <Text style={sformlabel}>Loading Charges</Text>
                                <Text style={sformvalue}>Rs. {
                                    costform?.loadingcharge
                                }</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Unloading Charges</Text>
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
                                <Text style={sformlabel}>Pro Fright Charges</Text>
                                <Text style={sformvalue}>Rs. {costform.profrignt}</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Car Transportation</Text>
                                <Text style={sformvalue}>Rs. {costform.cartransportation}</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Handyman Charges</Text>
                                <Text style={sformvalue}>Rs. {costform.handymancharges}</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Escort Charges</Text>
                                <Text style={sformvalue}>Rs. {costform.escortcharges}</Text>
                            </View>
                            <View style={sformhr}></View>

                            {/*  */}
                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>LOGISTIC SUPPORT</Text>
                            </View>
                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>Insurance Charges</Text>
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
                                <Text style={sformlabel}>Any Other Charges</Text>
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
                                <Text style={sformlabel}>GST</Text>
                                <Text style={sformvalue}>{costform.gst > 0 ? costform.gst : 0}%</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>CGST</Text>
                                <Text style={sformvalue}>{costform.gst > 0 ? costform.gst / 2 : 0}%</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>SGST</Text>
                                <Text style={sformvalue}>{costform.gst > 0 ? costform.gst / 2 : 0}%</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformlabel}>IGST</Text>
                                <Text style={sformvalue}>{costform.igst > 0 ? costform.igst : 0}%</Text>
                            </View>




                            <View style={sformhr}></View>

                            {/*  */}
                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>TOTAL</Text>
                                <Text style={sformvalue}>Rs. {getotal ? getotal : 0}</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>DISCOUNT</Text>
                                <Text style={sformvalue}>Rs. {costform.discount}</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>FINAL AMOUNT</Text>
                                <Text style={sformvalue}>Rs. {getfinaltotal ? getfinaltotal : 0
                                }</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>ADVANCE PAYMENT</Text>
                                <Text style={sformvalue}>Rs. {costform.advancepayment}</Text>
                            </View>

                            <View style={sformcontainerin2}>
                                <Text style={sformhead2}>REMAINING AMOUNT</Text>
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

export default InvoiceEdit

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