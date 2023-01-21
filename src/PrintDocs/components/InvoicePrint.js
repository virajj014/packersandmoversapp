import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InvoicePrint = (document) => {
  const [doc, setDoc] = React.useState(document.document);
  const [getotal, setgetotal] = React.useState(0);
  const [getfinaltotal, setgetfinaltotal] = React.useState(0);
  React.useEffect(() => {
    const costform = doc.doc.costform;
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

    const tgst = total * (costform.gst / 100) + total * (costform.igst / 100)
    // console.log(tgst)
    const total1 = parseFloat(total) + parseFloat(tgst)


    setgetotal(total1)
    setgetfinaltotal(total1 - costform.discount)
  }, [doc])

  return (
    <View style={styles.a4sheet}>
      <View style={styles.billHeader}>
        <View style={styles.billHeaderLeft}>
          <Image source={{ uri: doc.images.parentcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
        <Text style={styles.billHeaderCenter}>Invoice ( {doc.doc.docid} )</Text>
        <View style={styles.billHeaderRight}>
          <Image source={{ uri: doc.images.yourcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
      </View>

      <View style={styles.basics}>
        <View style={styles.c1}>
          <Text style={styles.label}>Client Name</Text>
          <Text style={styles.val}>{doc.doc.basicform.clientname}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Company Name</Text>
          <Text style={styles.val}>{doc.doc.basicform.companyname}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Quotation Number</Text>
          <Text style={styles.val}>{doc.doc.basicform.invoiceumber}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.val}>{doc.doc.basicform.mobile}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.val}>{doc.doc.basicform.email}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Move From</Text>
          <Text style={styles.val}>{doc.doc.basicform.from}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Move To</Text>
          <Text style={styles.val}>{doc.doc.basicform.to}</Text>
        </View>
      </View>

      <View style={styles.charges}>
        <View style={styles.c2}>
          <Text style={styles.label}>Packing Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.packingcharge}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Unpacking Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.unpackingcharge}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Loading Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.loadingcharge}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Unloading Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.unloadingcharge}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Truck Size</Text>
          <Text style={styles.val}>{doc.doc.costform.trucksize} Ft</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Pro Freight Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.profright}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Car Transportation</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.cartransportation}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Handyman Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.handymancharges}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Escort Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.escortcharges}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Insurance Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.insurancecharges}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Remarks 1</Text>
          <Text style={styles.val}>{doc.doc.costform.remarks1}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>FOV Transit Policy</Text>
          <Text style={styles.val}>{doc.doc.costform.fovtransitpolicy}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Any Other Charges</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.anyothercharges}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Tax Type</Text>
          <Text style={styles.val}>{doc.doc.costform.taxtype == '1' ? "Other State" : "Within State"}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>GST</Text>
          <Text style={styles.val}>{doc.doc.costform.gst} %</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>CGST</Text>
          <Text style={styles.val}>{doc.doc.costform.gst / 2} %</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>SGST</Text>
          <Text style={styles.val}>{doc.doc.costform.gst / 2} %</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>IGST</Text>
          <Text style={styles.val}>{doc.doc.costform.igst} %</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.val}>Rs. {getotal}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.discount}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Final Amount</Text>
          <Text style={styles.val}>Rs. {getfinaltotal}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Advance Payment</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.advancepayment}</Text>
        </View>
        <View style={styles.c2}>
          <Text style={styles.label}>Remaining Payment</Text>
          <Text style={styles.val}>Rs. {getfinaltotal - doc.doc.costform.advancepayment}</Text>
        </View>

        <View style={styles.c2}>
          <Text style={styles.label}>Remarks 2</Text>
          <Text style={styles.val}>Rs. {doc.doc.costform.remarks2}</Text>
        </View>
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

export default InvoicePrint

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

  }
})
