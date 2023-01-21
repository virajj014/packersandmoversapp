import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PackingListPrint = ({ document }) => {
  const [doc, setDoc] = React.useState(document);
  // console.log(doc)
  return (
    <View style={styles.a4sheet}>
      <View style={styles.billHeader}>
        <View style={styles.billHeaderLeft}>
          <Image source={{ uri: doc.images.parentcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
        <Text style={styles.billHeaderCenter}>Packing List ( {doc.doc.docid} )</Text>
        <View style={styles.billHeaderRight}>
          <Image source={{ uri: doc.images.yourcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
      </View>


      <View style={styles.basics}>
        <View style={styles.c1}>
          <Text style={styles.label}>Client Name</Text>
          <Text>{doc.doc.basicform.partyname}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Date</Text>
          <Text>{doc.doc.basicform.date}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Packing List Number</Text>
          <Text>{doc.doc.basicform.plnumber}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Mobile</Text>
          <Text>{doc.doc.basicform.mobilenumber}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Move From</Text>
          <Text>{doc.doc.basicform.from}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Move To</Text>
          <Text>{doc.doc.basicform.to}</Text>
        </View>
      </View>

      <View style={styles.items}>
        {
          doc.doc.items.map((item, index) => {
            return (
              <View style={styles.c2} key={index}>
                <Text style={styles.label}>{item.name}</Text>
                <Text>Rs. {item.quantity}</Text>
              </View>
            )
          })
        }
      </View>


      <View style={styles.signatures}>
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

export default PackingListPrint

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
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(215, 215, 215)',
    padding: 5,
  },
  c1: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
    marginRight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',

  },
  charges: {
    width: '100%',
    height: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexDirection: 'column',
    margin: 10,
  },
  c2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
  },
  signatures: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(215, 215, 215)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  c3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  val: {
    fontSize: 11,
    color: '#000',
  },
  items: {
    width: '100%',
    height: '60%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
  },
  c2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: 'max-content',
    minWidth: '20%',
    margin: 10,
    borderWidth: 1,
    borderColor: 'rgb(208, 208, 208)',
    padding: 5,
  },
})