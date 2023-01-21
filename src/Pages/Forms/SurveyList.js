import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { button, colors } from '../../CommonStyles/Theme';
import { dropdown, dropdownText, dropdownicon, formout, formout1, formlabel, forminput, datelabel, dateinput, dateout, datevr } from '../../CommonStyles/FormStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import envs from '../../env'



const SurveyList = () => {
  const [goodListDetailsDropdown, setGoodListDetailsDropdown] = useState(false);
  const [itemDetailsDropdown, setItemDetailsDropdown] = useState(false);


  return (
    <ScrollView>

      {/* /////////////////////////////////// */}
      <View style={dropdown}>
        <Text style={dropdownText}>Goods List Details</Text>
        {
          goodListDetailsDropdown ?
            <Entypo name="circle-with-cross" size={24} color="white " style={dropdownicon}
              onPress={() => setGoodListDetailsDropdown(!goodListDetailsDropdown)} />
            :
            <Ionicons name="arrow-forward-circle" size={24} color="white " style={dropdownicon}
              onPress={() => setGoodListDetailsDropdown(!goodListDetailsDropdown)} />
        }
      </View>
      {
        goodListDetailsDropdown &&
        <View>
          <View style={formout}>
            <Text style={formlabel}>NAME</Text>
            <TextInput style={forminput} placeholder='' />
          </View>

          <View style={formout}>
            <Text style={formlabel}>PHONE</Text>
            <TextInput style={forminput} placeholder='' />
          </View>
          <View style={formout}>
            <Text style={formlabel}>SURVEY NO.</Text>
            <TextInput style={forminput} placeholder='' />
          </View>
          

          <View style={formout}>
            <Text style={datelabel}>DATE</Text>
            <View style={dateout}>
              <TextInput style={dateinput} placeholderTextColor={colors.secondary} placeholder='DD' />
              <Text style={datevr}></Text>
              <TextInput style={dateinput} placeholderTextColor={colors.secondary} placeholder='MM' />
              <Text style={datevr}></Text>

              <TextInput style={dateinput} placeholderTextColor={colors.secondary} placeholder='YYYY' />
            </View>
          </View>

          <View style={formout}>
            <Text style={formlabel}>MOVE FROM</Text>
            <TextInput style={forminput} placeholder='' />
          </View>
          <View style={formout}>
            <Text style={formlabel}>MOVE TO</Text>
            <TextInput style={forminput} placeholder='' />
          </View>
        </View>
      }
      {/* //////////////////////////////////// */}



      {/* /////////////////////////////////// */}
      <View style={dropdown}>
        <Text style={dropdownText}>Item/Particular Details</Text>
        {
          itemDetailsDropdown ?
            <Entypo name="circle-with-cross" size={24} color="white " style={dropdownicon}
              onPress={() => setItemDetailsDropdown(!itemDetailsDropdown)} />
            :
            <Ionicons name="arrow-forward-circle" size={24} color="white " style={dropdownicon}
              onPress={() => setItemDetailsDropdown(!itemDetailsDropdown)} />
        }
      </View>

      {
        itemDetailsDropdown &&
        <View>
          <View style={formout}>
            <Text style={formlabel}>ITEM/PARTICULARS NAME</Text>
            <TextInput style={forminput} placeholder='' />
          </View>


          <View style={styles.formout2}>
            <View style={formout1}>
              <Text style={formlabel}>QUANTITY</Text>
              <TextInput style={forminput} placeholder='0' />
            </View>

            <View style={formout1}>
              <Text style={formlabel}>VALUE</Text>
              <TextInput style={forminput} placeholder='0' />
            </View>
          </View>

          <View style={formout}>
            <Text style={formlabel}>REMARK</Text>
            <TextInput style={forminput} placeholder='' />
          </View>

          <View style={styles.addmore}>
          <MaterialIcons name="add-box" size={24} color="white" />
            <Text style={styles.addmorein}>ADD MORE ITEMS</Text>
          </View>
        </View>
      }

      {/* ////////////////////// */}

      <Text style={button}>Save Survey List</Text>
    </ScrollView >
  )
}

export default SurveyList

const styles = StyleSheet.create({
  formout2: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  addmore:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#E1B000',
    margin:10,
    padding:10,
  },
  addmorein:{
    color:'white',
  }
})
