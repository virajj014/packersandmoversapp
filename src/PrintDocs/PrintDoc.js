import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import envs from '../env'
import QuotaionPrint from './components/QuotaionPrint'
import InvoicePrint from './components/InvoicePrint'
import PackingListPrint from './components/PackingListPrint'
import LrbiltyPrint from './components/LrbiltyPrint'
import RecieptPrint from './components/RecieptPrint'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const PrintDoc = ({ route }) => {
    const { userid, doctype, docid } = route.params

    console.log(userid, doctype, docid)
    const [document, setDocument] = useState({})
    const [loading, setLoading] = useState(true)

    const getDocument = async () => {
        setLoading(true)

        fetch(`${envs.BACKEND_URL}/getdocbyuseridanddocid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ userid, docid, doctype })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDocument(data)
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getDocument()
    }, [])


    const createPDFout = async () => {
        const options = {
            html: '<h1>PDF TEST</h1>',
            fileName: 'mypdf',
            directory: 'docs',
        };

        const file = await RNHTMLtoPDF.convert(options)
        alert(file.filePath);
        // open the PDF document in device's default PDF viewer
        // await RNHTMLtoPDF.open(file.filePath);

        

    }
    return (
        <View>
             <TouchableHighlight onPress={createPDFout}>
          <Text>Create PDF</Text>
        </TouchableHighlight>
            {
                document.doctype === 'quotation' && <QuotaionPrint document={document} />
            }
            {
                document.doctype === 'invoice' && <InvoicePrint document={document}/>
            }
            {
                document.doctype === 'packinglist' && <PackingListPrint document={document}/>
            }
            {
                document.doctype === 'lrbilty' && <LrbiltyPrint document={document}/>
            }
            {
                document.doctype === 'reciept' && <RecieptPrint document={document}/>
            }
        </View>
    )
}

export default PrintDoc

const styles = StyleSheet.create({})