import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LrbiltyPrint = ({ document }) => {

  const [doc, setDoc] = React.useState(document);


  const [getotal, setgetotal] = React.useState(0);
  const [getotalpaid, settotalpaid] = React.useState(0);
  React.useEffect(() => {
    const costform = doc.doc.costform;
    const descriptionform = doc.doc.descriptionform;
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
    setgetotal(total1)

    const totalpaid =
      (eval(costform.packingchargepaid) >= 0 ? eval(costform.packingchargepaid) : 0)
      + (eval(costform.unpackingchargepaid) >= 0 ? eval(costform.unpackingchargepaid) : 0)
      + (eval(costform.loadingchargepaid) >= 0 ? eval(costform.loadingchargepaid) : 0)
      + (eval(costform.unloadingchargepaid) >= 0 ? eval(costform.unloadingchargepaid) : 0)
      + (eval(costform.freightchargespaid) >= 0 ? eval(costform.freightchargespaid) : 0)
      + (eval(costform.grchargepaid) >= 0 ? eval(costform.grchargepaid) : 0)
      + (eval(costform.insurancechargespaid) >= 0 ? eval(costform.insurancechargespaid) : 0)

    settotalpaid(totalpaid)
  }, [doc])


  return (
    <View style={styles.a4sheet}>
      <View style={styles.billHeader}>
        <View style={styles.billHeaderLeft}>
          <Image source={{ uri: doc.images.parentcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
        <Text style={styles.billHeaderCenter}>LR Bilty ( {doc.doc.docid} )</Text>
        <View style={styles.billHeaderRight}>
          <Image source={{ uri: doc.images.yourcompanylogo }}
            style={{ height: 40, width: 70, resizeMode: 'contain' }}
          />
        </View>
      </View>


      <View style={styles.basics}>
        <View style={styles.c1}>
          <Text style={styles.label}>Consignor Name</Text>
          <Text style={styles.val}>- {doc.doc.basicform.consignorname}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.val}>- {doc.doc.basicform.date}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Bilty Number</Text>
          <Text style={styles.val}>- {doc.doc.basicform.biltynumber}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Lorry Number</Text>
          <Text style={styles.val}>- {doc.doc.basicform.lorrynumber}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Move From</Text>
          <Text style={styles.val}>- {doc.doc.basicform.addressfrom}</Text>
        </View>

        <View style={styles.c1}>
          <Text style={styles.label}>Move To</Text>
          <Text style={styles.val}>- {doc.doc.basicform.addressto}</Text>
        </View>
      </View>

      <View style={styles.lrcharges}>
        <View style={styles.c2}>
          <Text style={styles.h3}>Freight Charges</Text>
          <View style={styles.c2in}>
            <View style={styles.c2in1}>
              <Text style={styles.val}>Freight Charges Rate</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.freightchargesrate}</Text>
            </View>
            <View style={styles.c2in1}>
              <Text style={styles.val}>Freight Charges Paid</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.freightchargespaid}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>Freight Charges Due</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.freightchargesrate - doc.doc.costform.freightchargespaid}</Text>
            </View>
          </View>
        </View>

        <View style={styles.c2}>
          <Text style={styles.h3}>Loading Charges</Text>
          <View style={styles.c2in}>
            <View style={styles.c2in1}>
              <Text style={styles.val}>Loading Charges Rate</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.loadingchargerate}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>Loading Charges Paid</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.loadingchargepaid}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>Loading Charges Due</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.loadingchargerate - doc.doc.costform.loadingchargepaid}</Text>
            </View>
          </View>
        </View>

        <View style={styles.c2}>
          <Text style={styles.h3}>Unloading Charges</Text>
          <View style={styles.c2in}>
            <View style={styles.c2in1}>
              <Text style={styles.val}>Unloading Charges Rate</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.unloadingchargerate}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>Unloading Charges Paid</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.unloadingchargepaid}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>Unloading Charges Due</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.unloadingchargerate - doc.doc.costform.unloadingchargepaid}</Text>
            </View>
          </View>
        </View>

        <View style={styles.c2}>
          <Text style={styles.h3}>GR Charges</Text>
          <View style={styles.c2in}>
            <View style={styles.c2in1}>
              <Text style={styles.val}>GR Charges Rate</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.grchargerate}</Text>
            </View>
            <View style={styles.c2in1}>
              <Text style={styles.val}>GR Charges Paid</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.grchargepaid}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>GR Charges Due</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.grchargerate - doc.doc.costform.grchargepaid}</Text>
            </View>
          </View>
        </View>

        <View style={styles.c2}>
          <Text style={styles.h3}>Insurance Charges</Text>
          <View style={styles.c2in}>
            <View style={styles.c2in1}>
              <Text style={styles.val}>Insurance Charges Rate</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.insurancechargesrate}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>Insurance Charges Paid</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.insurancechargespaid}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val}>Insurance Charges Due</Text>
              <Text style={styles.val}>Rs. {doc.doc.costform.insurancechargesrate - doc.doc.costform.insurancechargespaid}</Text>
            </View>
          </View>
        </View>
      </View>


      <View style={styles.descriptionformlr}>
        <View style={styles.c3}>
          <View style={styles.c3in}>
            <Text style={styles.val}>As per list attached</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.asperlistattached}</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Weight</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.asperlistattachedwtactual} KG</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Charge</Text>
            <Text style={styles.val}>Rs. {doc.doc.descriptionform.asperlistattachedwtcharged}</Text>
          </View>
        </View>

        <View style={styles.c3}>
          <View style={styles.c3in}>
            <Text style={styles.val}>Bike Transportation</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.biketransportation}</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Weight</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.biketransportationwtactual} KG</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Charge</Text>
            <Text style={styles.val}>Rs. {doc.doc.descriptionform.biketransportationwtcharged}</Text>
          </View>
        </View>

        <View style={styles.c3}>
          <View style={styles.c3in}>
            <Text style={styles.val}>Car Transportation</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.cartransportation}</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Weight</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.cartransportationwtactual} KG</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Charge</Text>
            <Text style={styles.val}>Rs. {doc.doc.descriptionform.cartransportationwtcharged}</Text>
          </View>
        </View>

        <View style={styles.c3}>
          <View style={styles.c3in}>
            <Text style={styles.val}>Household Items</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.householditems}</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Weight</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.householditemswtactual} KG</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Charge</Text>
            <Text style={styles.val}>Rs. {doc.doc.descriptionform.householditemswtcharged}</Text>
          </View>
        </View>


        <View style={styles.c3}>
          <View style={styles.c3in}>
            <Text style={styles.val}>Household Items</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.householditems}</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Weight</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.householditemswtactual} KG</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Charge</Text>
            <Text style={styles.val}>Rs. {doc.doc.descriptionform.householditemswtcharged}</Text>
          </View>
        </View>

        <View style={styles.c3}>
          <View style={styles.c3in}>
            <Text style={styles.val}>Industrial Items</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.industrialitems}</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Weight</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.industrialitemswtactual} KG</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Charge</Text>
            <Text style={styles.val}>Rs. {doc.doc.descriptionform.industrialitemswtcharged}</Text>
          </View>
        </View>

        <View style={styles.c3}>
          <View style={styles.c3in}>
            <Text style={styles.val}>Office Items</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.officeitems}</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Weight</Text>
            <Text style={styles.val}>{doc.doc.descriptionform.officeitemswtactual} KG</Text>
          </View>

          <View style={styles.c3in}>
            <Text style={styles.val}>Charge</Text>
            <Text style={styles.val}>Rs. {doc.doc.descriptionform.officeitemswtcharged}</Text>
          </View>
        </View>

      </View>


      <View style={styles.lrcharges}>
        <View style={styles.c2}>
          <Text style={styles.val1}>Total Charges</Text>
          <View style={styles.c2in}>
            <View style={styles.c2in1}>
              <Text style={styles.val1}>Total Charges </Text>
              <Text style={styles.val1}>Rs. {getotal}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val1}>Total Charges Paid</Text>
              <Text style={styles.val1}>Rs. {getotalpaid}</Text>
            </View>

            <View style={styles.c2in1}>
              <Text style={styles.val1}>Total Charges Due</Text>
              <Text style={styles.val1}>Rs. {getotal - getotalpaid}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.signatures}>
        <View style={styles.c31}>
          <Text style={styles.label}>Signature</Text>
          <Image source={{ uri: doc.images.signature }} style={{ height: 50, width: 100 }} alt='signature' />
        </View>

        <View style={styles.c31}>
          <Text style={styles.label}>Stamp</Text>
          <Image source={{ uri: doc.images.stamp }} alt='stamp'
            style={{ height: 50, width: 100 }}
          />
        </View>
      </View>
    </View>
  )
}

export default LrbiltyPrint

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
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',

  },
  lrcharges: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 20,
  },
  c2: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    margin: 1,
  },
  c2in: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  c2in1: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  val: {
    fontSize: 10,
    color: '#000',
  },
  descriptionformlr: {
    display: 'flex',
    flexDirection: 'column',
    // width: 90,
    margin: 'auto',
  },
  c3: {
    flexDirection: 'row',
    width: '100%',
  },
  c3in: {
    display: 'flex',
    flexDirection: 'row',
    // width: 30,
    width: '33.33%',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgb(208, 208, 208)',
    padding: 4,
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
  c31: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  val1:{
    color: '#000',
    fontSize: 12,
  }
})