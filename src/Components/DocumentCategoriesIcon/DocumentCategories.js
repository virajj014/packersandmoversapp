import { Image, StyleSheet, Text, TouchableOpacity, ity, View } from 'react-native'
import React from 'react'
import { colors } from '../../CommonStyles/Theme'
//icons
import quotation from './icon/quotation.png'
import surveylist from './icon/surveylist.png'
import packinglist from './icon/packinglist.png'
import carcondition from './icon/carcondition.png'
import paymentvoucher from './icon/paymentvoucher.png'
import bill from './icon/bill.png'
import reciept from './icon/moneyreciept.png'
import lrbilty from './icon/lrbilty.png'
import pbcard from './icon/PB-card.png'
import AntDesign from 'react-native-vector-icons/AntDesign';
import envs from '../../env'

const DocumentCategories = ({ navigation }) => {

  return (
    <View style={styles.Docs}>
      <Text style={styles.h1}>Document Categories</Text>
      <View style={styles.s1}>
        <TouchableOpacity onPress={() => navigation.navigate('Quotation')} style={styles.s2}>
          <View style={styles.s2in} >
            <Image source={quotation} style={styles.icon} />
            <Text style={styles.t1}>Quotation</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PackingList')} style={styles.s2}>
          <View style={styles.s2in}>
            <Image source={packinglist} style={styles.icon} />
            <Text style={styles.t1}>Packing List</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VehicleCondition')} style={styles.s2}>
          <View style={styles.s2in}>
            <Image source={carcondition
            } style={styles.icon} />
            <Text style={styles.t1}>Vehicle</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Bill', {converteditem: {}})} style={styles.s2}>
          <View style={styles.s2in}>
            <Image source={bill} style={styles.icon} />
            <Text style={styles.t1}>Bill</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LrBilty')} style={styles.s2}>
          <View style={styles.s2in}>
            <Image source={lrbilty} style={styles.icon} />
            <Text style={styles.t1}>LR Bilty</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Invoice')} style={styles.s2}>
          <View style={styles.s2in}>
            <Image source={surveylist} style={styles.icon} />
            <Text style={styles.t1}>Invoice</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigation.navigate('Reciept')} style={styles.s2}>
          <View style={styles.s2in}>
            <Image source={reciept} style={styles.icon} />
            <Text style={styles.t1}>Reciept</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.h1}>Saved Document List</Text>


      <View style={styles.s4}>
        <TouchableOpacity style={styles.s3}   onPress={() => navigation.navigate('SavedDocs', { doctype: 'Quotation' })}>
          <View style={styles.s3in}>
            <Image source={quotation} style={styles.icon1} />
            <Text style={styles.t3}>Quotation</Text>
          </View>

          <AntDesign name="caretright" size={20} color={colors.primary}
            onPress={() => navigation.navigate('SavedDocs', { doctype: 'Quotation' })}
          />

        </TouchableOpacity>

        <TouchableOpacity style={styles.s3}   onPress={() => navigation.navigate('SavedDocs', { doctype: 'PackingList' })}>
          <View style={styles.s3in}>
            <Image source={packinglist} style={styles.icon1} />
            <Text style={styles.t3}>Packing List</Text>
          </View>
          <AntDesign name="caretright" size={20} color={colors.primary} onPress={() => navigation.navigate('SavedDocs', {
            doctype: 'PackingList'
          })} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.s3}   onPress={() => navigation.navigate('SavedDocs', { doctype: 'CarCondition' })}>
          <View style={styles.s3in}>
            <Image source={carcondition} style={styles.icon1} />
            <Text style={styles.t3}>Car Condition</Text>
          </View>
          <AntDesign name="caretright" size={20} color={colors.primary} onPress={() => navigation.navigate('SavedDocs', {
            doctype: 'CarCondition'
          })} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.s3}   onPress={() => navigation.navigate('SavedDocs', { doctype: 'Invoice' })}>
          <View style={styles.s3in}>
            <Image source={bill} style={styles.icon1} />
            <Text style={styles.t3}>Bill</Text>
          </View>
          <AntDesign name="caretright" size={20} color={colors.primary} onPress={() => navigation.navigate('SavedDocs', {

            doctype: 'Invoice'
          })} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.s3} onPress={() => navigation.navigate('SavedDocs', {
          doctype: 'LrBilty'
        })} >
          <View style={styles.s3in}>
            <Image source={lrbilty} style={styles.icon1} />
            <Text style={styles.t3}>LR Bilty</Text>
          </View>
          <AntDesign name="caretright" size={20} color={colors.primary} onPress={() => navigation.navigate('SavedDocs', {
            doctype: 'LrBilty'
          })} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.s3}   onPress={() => navigation.navigate('SavedDocs', { doctype: 'Reciept' })}>
          <View style={styles.s3in}>
            <Image source={reciept} style={styles.icon1} />
            <Text style={styles.t3}>Reciept</Text>
          </View>

          <AntDesign name="caretright" size={20} color={colors.primary} onPress={() => navigation.navigate('SavedDocs', {
            doctype: 'Reciept'
          })} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default DocumentCategories

const styles = StyleSheet.create({
  Docs: {
    padding: 0,
  },
  h1: {
    color: colors.primary,
    fontSize: 23,
    fontWeight: '500',
    padding: 10,

  },
  icon: {
    width: 80,
    height: 80,
  },
  s1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  s2: {
    width: '30%',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 5,
    backgroundColor: 'white',
    padding: 5,
    elevation: 5,
    borderRadius: 10,
  },
  s2in: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  t1: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
    fontFamily: 'sans-serif',
  },
  s4: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: 'white',
    // elevation: 5,
    marginHorizontal: 2,
    justifyContent: 'space-evenly',
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  s3in: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: colors.primary,
    elevation: 5,
    marginHorizontal: 2,
    // justifyContent: 'space-evenly',
    marginVertical: 10,
    width: '90%',
    // alignSelf: 'center',
    borderRadius: 20,
  },
  t3: {
    fontSize: 16,
    // transform: [{rotate: '270deg' }],
    // textAlign: 'left',
    color: 'white',
  },
  icon1: {
    width: 60,
    height: 60,
    translateX: -18,
  }
})