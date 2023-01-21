import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../CommonStyles/Theme'
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import envs from '../../env'

const Card1 = ({ index, item, navigation, doctype }) => {
    const [date, setdate] = React.useState('')
    const [time, settime] = React.useState('')
    const [ampm, setampm] = React.useState('')
    // console.log(item.createdDate)


    useEffect(() => {
        const date = new Date(item.createdDate)
        const newdate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        const newminute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        const newHour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const newTime = newHour + ':' + newminute
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
        setdate(newdate)
        settime(newTime)
        setampm(ampm)

        // if(doctype == 'Quotation'){
        //     console.log(item)
        // }
    }, [])


    const ViewDoc = () => {

        if(doctype == 'Quotation'){
            navigation.navigate('QuotationEdit', { item: item })
        }
        else if(doctype == 'Invoice'){
            navigation.navigate('InvoiceEdit', { item: item })
        }
        else if(doctype == 'Reciept'){
            navigation.navigate('RecieptEdit', { item: item })
        }
        else if(doctype == 'Invoice'){
            navigation.navigate('InvoiceEdit', { item: item })
        }
        else if(doctype=="PackingList"){
            navigation.navigate('PackingListEdit', { item: item })
        }
        else if(doctype=="LrBilty"){
            // console.log('LrBilty')
            navigation.navigate('LrBiltyEdit', { item: item })
        }

        else{
            console.log('Ohter Doc')
        }
     }

    return (
        <TouchableOpacity
            onPress={() => {
                ViewDoc()
            }}
        >
            <View style={styles.docitem}>
                <Text style={styles.datetime}>
                    {`${date}  -  ${time} ${ampm}`}
                </Text>

                <View style={styles.doccont}>
                    {/* <Text style={styles.doctext}>DOCUMENT</Text> */}
                    <Text style={styles.docnum}>{item.docid}</Text>
                    <AntDesign name="caretright" size={20} color={colors.primary} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card1

const styles = StyleSheet.create({
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
        // width: 30,
        paddingHorizontal: 10,
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
    datetime: {
        fontSize: 14,
        backgroundColor: "#FEBD11",
        color: "#fff",
        padding: 10,
        borderRadius: 20,
        fontWeight: 'bold',
    },
    doctext: {
        fontSize: 16,
        color: colors.primary,
    }
})