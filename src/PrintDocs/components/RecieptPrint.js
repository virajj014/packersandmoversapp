import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const RecieptPrint = ({ document }) => {
  const [doc, setDoc] = React.useState(document);

  return (
    <View style={styles.a4sheet}>
      <View style={styles.billHeader}>
        <View style={styles.billHeaderLeft}>
          <Image source={{ uri: doc.images.parentcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
        <Text style={styles.billHeaderCenter}>Quotation ( {doc.doc.docid} )</Text>
        <View style={styles.billHeaderRight}>
          <Image source={{ uri: doc.images.yourcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
      </View>

      <View style={styles.basics}>
        <View style={styles.c2}>
          <Text style={styles.val}>Client Name</Text>
          <Text style={styles.val}>{doc.doc.basicform.clientname}</Text>
        </View>
      </View>
      <View style={styles.basics}>
        <View style={styles.c2}>
          <Text style={styles.val}>Reciept Number</Text>
          <Text style={styles.val}>{doc.doc.basicform.recieptnumber}</Text>
        </View>
      </View>
      <View style={styles.basics}>

        <View style={styles.c2}>
          <Text style={styles.val}>Date</Text>
          <Text style={styles.val}>{doc.doc.basicform.date}</Text>
        </View>
      </View>
      <View style={styles.basics}>
        <View style={styles.c2}>
          <Text style={styles.val}>Amount Recieved in Numbers</Text>
          <Text style={styles.val}>{doc.doc.basicform.amountrecievedinnumbers}</Text>
        </View>
      </View>
      <View style={styles.basics}>
        <View style={styles.c2}>
          <Text style={styles.val}>Amount Recieved in Words</Text>
          <Text style={styles.val}>{doc.doc.basicform.amountrecieved}</Text>
        </View>
      </View>

      <View style={styles.basics}>
        <View style={styles.c2}>
          <Text style={styles.val}>Payment Type</Text>
          <Text style={styles.val}>{doc.doc.basicform.paymenttype}</Text>
        </View>
      </View>
      <View style={styles.signatures1}>
        <View style={styles.c3}>
          <Text style={styles.label}>Signature</Text>
          <Image source={{ uri: doc.images.signature }} style={{ height: 50, width: 100 }} alt='signature' />
        </View>

        <View style={styles.c3}>
          <Text style={styles.label}>Stamp</Text>
          <Image source={{ uri: doc.images.stamp }} alt='stamp'
            style={{ height: 50, width: 100 }}
          />
        </View>
      </View>
    </View>
  )
}

export default RecieptPrint

const styles = StyleSheet.create({
  a4sheet: {
    width: '90%',
    height: '95%',
    margin: 20,
    padding: 0,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    fontFamily: 'Open Sans',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#000',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: 'Courier New',
  },
  billHeaderCenter: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '300',
    color: '#000',
  },
  billHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
  },
  basics: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(215, 215, 215)',
    padding: 5,
  },
  c2:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  signatures1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(215, 215, 215)',
    padding: 10,
    marginTop: 50,
  },
  c3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  c3Img: {
    height: 70,
  },
  val:{
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  }
})