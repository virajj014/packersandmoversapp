import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { button, colors } from '../../CommonStyles/Theme';
import DropDownPicker from 'react-native-dropdown-picker';

import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card1 from '../../Components/Card/Card1';
import nodoc from '../../Media/Images/nodoc.png'
import envs from '../../env'
const SavedDocs = ({ navigation, route }) => {
    const { doctype } = route.params;
    const [loading, setLoading] = useState(false);
    const [doctype_open, setdocTypeOpen] = useState(false);
    const [doctype_value, setdocTypeValue] = useState('All');
    const [doctype_Array, setdocTypeArray] = useState([
        // { label: 'All', value: 'All' },
        { label: 'Quotation', value: 'Quotation' },
        { label: 'Bill', value: 'Invoice' },
        { label: 'PackingList', value: 'PackingList' },
        // { label: 'CarCondition', value: 'CarCondition' },
        { label: 'LrBilty', value: 'LrBilty' },
        { label: 'Reciept', value: 'Reciept' },
    ]);
    useEffect(() => {
        getAllDocs()
        setdocTypeValue(doctype)
        console.log(envs)
    }, [])
    const [docs, setDocs] = useState([]);


    const getAllDocs = () => {
        setLoading(true)
        AsyncStorage.getItem('token')
            .then((token) => {
                // console.log('All ',token)
                fetch(`${envs.BACKEND_URL}/getalldocs`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setLoading(false)
                        // console.log(data)
                        if (data.message == 'All Documents Fetched Successfully') {
                            console.log("All Docs Fetched Successfully")
                            setDocs(data)
                            checkalldocs(data)
                            // console.log(data.quotationdetails)
                        }
                        else {
                            alert(data.error)
                        }
                    })
            })
            .catch((err) => {
                setLoading(false)
                navigation.navigate('Login')
            })
        // console.log('All')
    }
    const [isalldocs, setisalldocs] = useState(false)

    const checkalldocs = (data) => {
        if (data.quotationdetails.length > 0 || data.invoices.length > 0 || data.packinglists.length > 0 || data.vehiclesdetails.length > 0 || data.lrbilties.length > 0) {
            setisalldocs(true)
        }
    }

    useEffect(() => {
        getAllDocs();
    }, [doctype_value]);
    return (
        <View style={styles.container}>
            <View style={styles.c1}>
                <Text style={styles.c1in1}>Document Type</Text>
                <DropDownPicker
                    style={styles.c1in2}
                    open={doctype_open}
                    value={doctype_value}
                    items={doctype_Array}

                    setOpen={setdocTypeOpen}
                    setValue={setdocTypeValue}
                    setItems={setdocTypeArray}
                    selectedItemContainerStyle={{ backgroundColor: colors.primary }}
                    selectedItemLabelStyle={{ color: "#fff" }}
                    textStyle={{ color: colors.primary, fontSize: 17 }}
                    dropDownContainerStyle={{
                        backgroundColor: "#fff", borderColor: colors.primary, borderWidth: 1,
                        zIndex: 100
                    }}
                />
            </View>
            {
                docs != null ?
                    <ScrollView style={styles.docs}>
                        {
                            doctype_value == 'All' &&
                            <View style={styles.docIn}>
                                {
                                    docs?.quotationdetails?.length > 0 &&

                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>Quotations</Text>
                                        <View style={styles.docitems}>
                                            {
                                                docs?.quotationdetails?.sort(
                                                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                                ).map((item, index) => {
                                                    return (
                                                        <Card1 navigation={navigation} item={item} index={index} key={index}
                                                            doctype={"Quotation"}
                                                        />
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                }
                                {
                                    docs?.packinglists?.length > 0 &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>PackingList</Text>
                                        {
                                            docs?.packinglists?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"PackingList"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                }
                                {
                                    docs?.invoices?.length > 0 &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>Bills</Text>
                                        {
                                            docs?.invoices?.map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"Invoice"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                }
                                {
                                    docs?.vehiclesdetails?.length > 0 &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>CarCondition</Text>
                                        {
                                            docs?.vehiclesdetails?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"CarCondition"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                }
                                {
                                    docs?.lrbilties?.length > 0 &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>LrBilty</Text>
                                        {
                                            docs?.lrbilties?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"LrBilty"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                }
                                {
                                    docs?.reciepts?.length > 0 &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>Reciepts</Text>
                                        {
                                            docs?.reciepts?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"Reciept"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                }

                                {
                                    isalldocs == false && loading == false &&
                                    <View style={styles.nodocout}>
                                        <Image source={nodoc} style={styles.nodocimg} />
                                        <Text style={styles.nodocin}>No Documents Found</Text>
                                    </View>
                                }
                                {
                                    loading == true &&
                                    <View style={styles.nodocout}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </View>
                                }
                            </View>

                        }
                        {
                            doctype_value == 'Quotation' &&
                            <View style={styles.docIn}>
                                {
                                    docs?.quotationdetails?.length <= 0 && loading == false &&
                                    <View style={styles.nodocout}>
                                        <Image source={nodoc} style={styles.nodocimg} />
                                        <Text style={styles.nodoctxt}>0 Quotations</Text>
                                    </View>
                                }
                                {
                                    docs?.quotationdetails?.length > 0 && loading == false &&

                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>Quotations</Text>
                                        <View style={styles.docitems}>
                                            {
                                                docs?.quotationdetails?.sort(
                                                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                                ).map((item, index) => {
                                                    return (
                                                        <Card1 navigation={navigation} item={item} index={index} key={index}
                                                            doctype={"Quotation"}
                                                        />
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                }
                                {
                                    loading == true &&
                                    <View style={styles.nodocout}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </View>
                                }
                            </View>
                        }

                        {
                            doctype_value == 'Invoice' &&
                            <View style={styles.docIn}>

                                {
                                    docs?.invoices?.length > 0 && loading == false &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>Bills</Text>
                                        {
                                            docs?.invoices?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"Invoice"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>

                                }

                                {
                                    docs?.invoices?.length <= 0 && loading == false &&
                                    <View style={styles.nodocout}>
                                        <Image source={nodoc} style={styles.nodocimg} />
                                        <Text style={styles.nodoctxt}>0 Bills</Text>
                                    </View>
                                }
                                {
                                    loading == true &&
                                    <View style={styles.nodocout}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </View>
                                }
                            </View>
                        }
                        {
                            doctype_value == 'PackingList' &&
                            <View style={styles.docIn}>
                                {
                                    docs?.packinglists?.length > 0 && loading == false &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>PackingList</Text>
                                        {
                                            docs?.packinglists?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"PackingList"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>

                                }
                                {
                                    docs?.packinglists?.length <= 0 && loading == false &&

                                    <View style={styles.nodocout}>
                                        <Image source={nodoc} style={styles.nodocimg} />
                                        <Text style={styles.nodoctxt}>0 Packing Lists</Text>
                                    </View>
                                }
                                {
                                    loading == true &&
                                    <View style={styles.nodocout}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </View>
                                }
                            </View>
                        }


                        {
                            doctype_value == 'CarCondition' &&
                            <View style={styles.docIn}>
                                {
                                    docs?.vehiclesdetails?.length > 0 && loading == false &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>CarCondition</Text>
                                        {
                                            docs?.vehiclesdetails?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"CarCondition"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>

                                }
                                {
                                    docs?.vehiclesdetails?.length <= 0 && loading == false &&

                                    <View style={styles.nodocout}>
                                        <Image source={nodoc} style={styles.nodocimg} />
                                        <Text style={styles.nodoctxt}>0 Vehicles</Text>
                                    </View>
                                }

                                {
                                    loading == true &&
                                    <View style={styles.nodocout}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </View>
                                }
                            </View>
                        }
                        {
                            doctype_value == 'LrBilty' &&
                            <View style={styles.docIn}>
                                {
                                    docs?.lrbilties?.length > 0 && loading == false &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>LrBilty</Text>
                                        {
                                            docs?.lrbilties?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"LrBilty"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>

                                }
                                {
                                    docs?.lrbilties?.length <= 0 && loading == false &&

                                    <View style={styles.nodocout}>
                                        <Image source={nodoc} style={styles.nodocimg} />
                                        <Text style={styles.nodoctxt}>0 LR Bilties</Text>
                                    </View>
                                }

                                {
                                    loading == true &&
                                    <View style={styles.nodocout}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </View>
                                }
                            </View>
                        }
                        {
                            doctype_value == 'Reciept' &&
                            <View style={styles.docIn}>
                                {
                                    docs?.reciepts?.length > 0 && loading == false &&
                                    <View style={styles.docInType}>
                                        <Text style={styles.dochead}>Reciept</Text>
                                        {
                                            docs?.reciepts?.sort(
                                                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                                            ).map((item, index) => {
                                                return (
                                                    <Card1 navigation={navigation} item={item} index={index} key={index}
                                                        doctype={"Reciept"}
                                                    />
                                                )
                                            })
                                        }
                                    </View>

                                }
                                {
                                    docs?.reciepts?.length <= 0 && loading == false &&
                                    <View style={styles.nodocout}>
                                        <Image source={nodoc} style={styles.nodocimg} />
                                        <Text style={styles.nodoctxt}>0 Reciepts</Text>
                                    </View>
                                }
                                {
                                    loading == true &&
                                    <View style={styles.nodocout}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </View>
                                }
                            </View>
                        }
                        <View style={{
                            height: 100,
                        }}></View>
                    </ScrollView>
                    :
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            }
            <View style={styles.bottomnav}>
                <BottomNavbar navigation={navigation} pagename={"SavedDocs"} />
            </View>
        </View>
    )
}

export default SavedDocs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingBottom: 100,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    containerin: {
        marginBottom: 70,
    },
    c1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 10,
    },
    c1in1: {
        color: "#fff",
        fontSize: 20,
        padding: 10,
    },
    c1in2: {
        borderRadius: 30,
        borderColor: "#fff",
        fontSize: 20,
        zIndex: 10,
    },
    docs: {
        padding: 10,
        width: '100%',
        zIndex: -1,
    },
    docInType: {
        backgroundColor: "white",
        margin: 10,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    dochead: {
        fontSize: 20,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        color: "#fff",
        textAlign: 'center',
        borderRadius: 20,
    },
    docitem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    docnum: {
        fontSize: 16,
        backgroundColor: colors.primary,
        color: "#fff",
        // padding: 10,
        width: 30,
        height: 30,
        borderRadius: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
    doccont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nodocout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
    },
    nodoctxt: {
        fontSize: 30,
        color: colors.primary,

    },
    nodocimg: {
        width: 300,
        height: 300,
    }
})