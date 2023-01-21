import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { button, colors } from '../../CommonStyles/Theme';
import { dropdown, dropdownText, dropdownicon, formout, formout1, formout2, formlabel, forminput, datelabel, dateinput, dateout, datevr } from '../../CommonStyles/FormStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import  Entypo  from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from '../../env'

const VehicleCondition = ({ navigation }) => {
  const [vehicleconditionDetailsDropdown, setvehicleconditionDetailsDropdown] = useState(false);
  const [vehicledetailsDropdown, setvehicledetailsDropdown] = useState(false);
  const [accessoriesdetails, setaccessoriesdetails] = useState(false);
  const [dentscratchesdetails, setdentscratchesdetails] = useState(false);
  // moving type dropdown 
  //starts
  const [movingtype_open, setMovingTypeOpen] = useState(false);
  const [movingtype_value, setMovingTypeValue] = useState(null);
  const [movingtype_Array, setMovingTypeArray] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);
  //ends
  const [date, setDate] = useState([
    { day1: new Date().getDate(), month1: new Date().getMonth() + 1, year1: new Date().getFullYear() }]);

  //dropdown 
  //starts
  const [d1_open, setd1Open] = useState(false);
  const [d1_value, setd1Value] = useState(null);
  const [d1_Array, setd1Array] = useState([
    { label: 'House Hold Goods', value: 'House Hold Goods' },
    { label: 'Banana', value: 'banana' }
  ]);

  const [d2_open, setd2Open] = useState(false);
  const [d2_value, setd2Value] = useState(null);
  const [d2_Array, setd2Array] = useState([
    { label: 'Optional', value: 'Optional' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d3_open, setd3Open] = useState(false);
  const [d3_value, setd3Value] = useState(null);
  const [d3_Array, setd3Array] = useState([
    { label: 'Optional', value: 'Optional' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d4_open, setd4Open] = useState(false);
  const [d4_value, setd4Value] = useState(null);
  const [d4_Array, setd4Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d5_open, setd5Open] = useState(false);
  const [d5_value, setd5Value] = useState(null);
  const [d5_Array, setd5Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d6_open, setd6Open] = useState(false);
  const [d6_value, setd6Value] = useState(null);
  const [d6_Array, setd6Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d7_open, setd7Open] = useState(false);
  const [d7_value, setd7Value] = useState(null);
  const [d7_Array, setd7Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d8_open, setd8Open] = useState(false);
  const [d8_value, setd8Value] = useState(null);
  const [d8_Array, setd8Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d9_open, setd9Open] = useState(false);
  const [d9_value, setd9Value] = useState(null);
  const [d9_Array, setd9Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d10_open, setd10Open] = useState(false);
  const [d10_value, setd10Value] = useState(null);
  const [d10_Array, setd10Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);

  const [d11_open, setd11Open] = useState(false);
  const [d11_value, setd11Value] = useState(null);
  const [d11_Array, setd11Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d12_open, setd12Open] = useState(false);
  const [d12_value, setd12Value] = useState(null);
  const [d12_Array, setd12Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d13_open, setd13Open] = useState(false);
  const [d13_value, setd13Value] = useState(null);
  const [d13_Array, setd13Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d14_open, setd14Open] = useState(false);
  const [d14_value, setd14Value] = useState(null);
  const [d14_Array, setd14Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [d15_open, setd15Open] = useState(false);
  const [d15_value, setd15Value] = useState(null);
  const [d15_Array, setd15Array] = useState([
    { label: 'In Quotation', value: 'In Quotation' },
    { label: 'Banana', value: 'banana' }
  ]);

  //ends


  const [vehicleconditiondetailsform, setvehicleconditiondetailsform] = useState({
    vehicleconditiondetails: '',
    partyname: '',
    partyphonenumber: '',
    partyemail: '',
    date: '',
    movefrom: '',
    moveto: '',
  })

  const [vehicledetailsform, setvehicledetailsform] = useState({
    vehicletype: '',
    vehiclebrandname: '',
    vehiclevalue: '',
    insurancepolicynumber: '',
    vehicleregisrationnumber: '',
    vehiclemanufacturingyear: '',
    vehiclecolour: '',
    vehiclekilometer: '',
    vehiclechasisnumber: '',
    vehicleenginenumber: '',
  })

  const [accessoriesdetailsform, setaccessoriesdetailsform] = useState({
    stepney: '',
    wheelcaps: '',
    siderearviewmirrors: '',
    carradio: '',
    airconditioner: '',
    lighter: '',
    digitalwatch: '',
    speakers: '',
    toolkit: '',
    jack: '',
    wiper: '',
    mudflaps: '',
    floormats: '',
    fuel: '',
    cover: '',
    batterynumber: '',
    typenumber: '',
    otheraccessories: '',
    remarks: '',
  })

  const [dentscratchesdetailsform, setdentscratchesdetailsform] = useState({
    dents: '',
    scratches: '',
    other: '',
  })

  const [vehiclesaving, setvehiclesaving] = useState(false)

  const saveVehicleConditionDetails = () => {
    setvehicleconditiondetailsform({
      ...vehicleconditiondetailsform,
      date: `${date[0].day1}/${date[0].month1}/${date[0].year1}`,
    })
    setaccessoriesdetailsform({
      ...accessoriesdetailsform,
      stepney: d1_value,
      wheelcaps: d2_value,
      siderearviewmirrors: d3_value,
      carradio: d4_value,
      airconditioner: d5_value,
      lighter: d6_value,
      digitalwatch: d7_value,
      speakers: d8_value,
      toolkit: d9_value,
      jack: d10_value,
      wiper: d11_value,
      mudflaps: d12_value,
      floormats: d13_value,
      fuel: d14_value,
      cover: d15_value,

    })


    if (
      vehicleconditiondetailsform.vehicleconditiondetails == '1234') {
      alert('Please fill all the fields')
    }

    else {
      setvehiclesaving(true)
      AsyncStorage.getItem('token')
        .then((token) => {
          fetch(envs.BACKEND_URL + '/savevehiclecondition', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              vehicleconditiondetailsform: vehicleconditiondetailsform,
              vehicledetailsform: vehicledetailsform,
              accessoriesdetailsform: accessoriesdetailsform,
              dentscratchesdetailsform: dentscratchesdetailsform,

            })
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.error) {
                alert(data.error)
                setvehiclesaving(false)
              }
              else {
                alert('Vehicle Details Saved')
                setvehiclesaving(false)
                navigation.navigate('VehicleCondition')
              }
            })
        })

        .catch((err) => {

          navigation.navigate('Login')
        })

    }
  }
  return (
    <ScrollView>

      {/* /////////////////////////////////// */}
      <View style={dropdown}>
        <Text style={dropdownText}>Vehicle Condition Details</Text>
        {
          vehicleconditionDetailsDropdown ?
            <Entypo name="circle-with-cross" size={24} color="white " style={dropdownicon}
              onPress={() => setvehicleconditionDetailsDropdown(!vehicleconditionDetailsDropdown)} />
            :
            <Ionicons name="arrow-forward-circle" size={24} color="white " style={dropdownicon}
              onPress={() => setvehicleconditionDetailsDropdown(!vehicleconditionDetailsDropdown)} />
        }
      </View>
      {
        vehicleconditionDetailsDropdown &&
        <View>
          <View style={formout}>
            <Text style={formlabel}>VEHICLE CONDITION DETAILS</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicleconditiondetailsform({ ...vehicleconditiondetailsform, vehicleconditiondetails: text })}
              value={vehicleconditiondetailsform.vehicleconditiondetails}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>PARTY NAME</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicleconditiondetailsform({ ...vehicleconditiondetailsform, partyname: text })}
              value={vehicleconditiondetailsform.partyname}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>PARTY PHONE NUMBER</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicleconditiondetailsform({ ...vehicleconditiondetailsform, partyphonenumber: text })}
              value={vehicleconditiondetailsform.partyphonenumber}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>PARTY EMAIL</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicleconditiondetailsform({ ...vehicleconditiondetailsform, partyemail: text })}
              value={vehicleconditiondetailsform.partyemail}
            />
          </View>

          <View style={formout}>
            <Text style={datelabel}>DATE</Text>
            <View style={dateout}>
              <TextInput style={dateinput} placeholderTextColor={colors.secondary} placeholder='DD'
                onChangeText={(text) => {
                  let temp = [...date];
                  temp[0].day1 = text;
                  setDate(temp);
                }}
                value={`${date[0].day1}`}
              />
              <Text style={datevr}></Text>
              <TextInput style={dateinput} placeholderTextColor={colors.secondary} placeholder='MM'
                onChangeText={(text) => {
                  let temp = [...date];
                  temp[0].month1 = text;
                  setDate(temp);
                }
                }
                value={`${date[0].month1}`}
              />
              <Text style={datevr}></Text>
              <TextInput style={dateinput} placeholderTextColor={colors.secondary} placeholder='YYYY'
                onChangeText={(text) => {
                  let temp = [...date];
                  temp[0].year1 = text;
                  setDate(temp);
                }}

                value={`${date[0].year1}`}
              />
            </View>
          </View>

          <View style={formout}>
            <Text style={formlabel}>MOVE FROM</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicleconditiondetailsform({ ...vehicleconditiondetailsform, movefrom: text })}
              value={vehicleconditiondetailsform.movefrom}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>MOVE TO</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicleconditiondetailsform({ ...vehicleconditiondetailsform, moveto: text })}

              value={vehicleconditiondetailsform.moveto}
            />
          </View>

        </View>
      }
      {/* //////////////////////////////////// */}


      {/* ////////////////////////////////// */}
      <View style={dropdown}>
        <Text style={dropdownText}>Vehicle Details</Text>
        {
          vehicledetailsDropdown ?
            <Entypo name="circle-with-cross" size={24} color="white " style={dropdownicon}
              onPress={() => setvehicledetailsDropdown(!vehicledetailsDropdown)} />
            :
            <Ionicons name="arrow-forward-circle" size={24} color="white " style={dropdownicon}
              onPress={() => setvehicledetailsDropdown(!vehicledetailsDropdown)} />
        }
      </View>

      {
        vehicledetailsDropdown &&
        <View>
          <View style={formout}>
            <Text style={formlabel}>VEHICLE TYPE</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehicletype: text })}
              value={vehicledetailsform.vehicletype}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>VEHICLE BRAND NAME</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehiclebrandname: text })}
              value={vehicledetailsform.vehiclebrandname}
            />
          </View>

          <View style={formout2}>
            <View style={formout1}>
              <Text style={formlabel}>VEHICLE'S VALUE (INR)</Text>
              <TextInput style={forminput} placeholder=''
                onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehiclevalue: text })}
                value={vehicledetailsform.vehiclevalue}
              />
            </View>

            <View style={formout1}>
              <Text style={formlabel}>INSURANCE POLICY NUMBER</Text>
              <TextInput style={forminput} placeholder=''
                onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, insurancepolicynumber: text })}
                value={vehicledetailsform.insurancepolicynumber}
              />
            </View>
          </View>

          <View style={formout2}>
            <View style={formout1}>
              <Text style={formlabel}>VEHICLE REG NO.</Text>
              <TextInput style={forminput} placeholder='eg. MP-16R-1240'
                onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehicleregisrationnumber: text })}
                value={vehicledetailsform.vehicleregisrationnumber}
              />
            </View>

            <View style={formout1}>
              <Text style={formlabel}>MANUFACTURING YEAR</Text>
              <TextInput style={forminput} placeholder='eg. 2022'
                onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehiclemanufacturingyear: text })}
                value={vehicledetailsform.vehiclemanufacturingyear}
              />
            </View>
          </View>

          <View style={formout2}>
            <View style={formout1}>
              <Text style={formlabel}>COLOUR</Text>
              <TextInput style={forminput} placeholder='eg. Colour'
                onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehiclecolour: text })}

                value={vehicledetailsform.vehiclecolour}
              />
            </View>

            <View style={formout1}>
              <Text style={formlabel}>VEHICLE KILOMETER (KM)</Text>
              <TextInput style={forminput} placeholder='eg. 5,123'
                onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehiclekilometer: text })}
                value={vehicledetailsform.vehiclekilometer}
              />
            </View>
          </View>

          <View style={formout}>
            <Text style={formlabel}>CHASSIS NO.</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehiclechasisnumber: text })}
              value={vehicledetailsform.vehiclechasisnumber}
            />
          </View>


          <View style={formout}>
            <Text style={formlabel}>ENGINE NO.</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setvehicledetailsform({ ...vehicledetailsform, vehicleenginenumber: text })}

              value={vehicledetailsform.vehicleenginenumber}
            />
          </View>

        </View>
      }
      {/* //////////////////////////////////////////////////// */}

      {/* //////////////////////////////////////////// */}
      <View style={dropdown}>
        <Text style={dropdownText}>Accessories Details</Text>
        {
          accessoriesdetails ?
            <Entypo name="circle-with-cross" size={24} color="white " style={dropdownicon}
              onPress={() => setaccessoriesdetails(!accessoriesdetails)} />
            :
            <Ionicons name="arrow-forward-circle" size={24} color="white " style={dropdownicon}
              onPress={() => setaccessoriesdetails(!accessoriesdetails)} />
        }
      </View>
      {
        accessoriesdetails &&
        <View>
          <View style={formout}>
            <Text style={formlabel}>STEPNEY</Text>
            <DropDownPicker
              style={forminput}
              open={d1_open}
              value={d1_value}
              items={d1_Array}
              setOpen={setd1Open}
              setValue={setd1Value}
              setItems={setd1Array}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>WHEEL CAPS</Text>
            <DropDownPicker
              style={forminput}
              open={d2_open}
              value={d2_value}
              items={d2_Array}
              setOpen={setd2Open}
              setValue={setd2Value}
              setItems={setd2Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>SIDE REAR VIEW MIRROR</Text>
            <DropDownPicker
              style={forminput}
              open={d3_open}
              value={d3_value}
              items={d3_Array}
              setOpen={setd3Open}
              setValue={setd3Value}
              setItems={setd3Array}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>CAR RADIO</Text>
            <DropDownPicker
              style={forminput}
              open={d4_open}
              value={d4_value}
              items={d4_Array}
              setOpen={setd4Open}
              setValue={setd4Value}
              setItems={setd4Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>AIR CONDITION</Text>
            <DropDownPicker
              style={forminput}
              open={d5_open}
              value={d5_value}
              items={d5_Array}
              setOpen={setd5Open}
              setValue={setd5Value}
              setItems={setd5Array}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>LIGHTER</Text>
            <DropDownPicker
              style={forminput}
              open={d6_open}
              value={d6_value}
              items={d6_Array}
              setOpen={setd6Open}
              setValue={setd6Value}
              setItems={setd6Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>DIGITAL WATCH</Text>
            <DropDownPicker
              style={forminput}
              open={d7_open}
              value={d7_value}
              items={d7_Array}
              setOpen={setd7Open}
              setValue={setd7Value}
              setItems={setd7Array}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>SPEAKER</Text>
            <DropDownPicker
              style={forminput}
              open={d8_open}
              value={d8_value}
              items={d8_Array}
              setOpen={setd8Open}
              setValue={setd8Value}
              setItems={setd8Array}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>TOOL KIT</Text>
            <DropDownPicker
              style={forminput}
              open={d9_open}
              value={d9_value}
              items={d9_Array}
              setOpen={setd9Open}
              setValue={setd9Value}
              setItems={setd9Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>JACK</Text>
            <DropDownPicker
              style={forminput}
              open={d10_open}
              value={d10_value}
              items={d10_Array}
              setOpen={setd10Open}
              setValue={setd10Value}
              setItems={setd10Array}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>WIPER ARMS & BLADES</Text>
            <DropDownPicker
              style={forminput}
              open={d11_open}
              value={d11_value}
              items={d11_Array}
              setOpen={setd11Open}
              setValue={setd11Value}
              setItems={setd11Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>MUD FLAP</Text>
            <DropDownPicker
              style={forminput}
              open={d12_open}
              value={d12_value}
              items={d12_Array}
              setOpen={setd12Open}
              setValue={setd12Value}
              setItems={setd12Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>FLOOR RUBBER CARPET</Text>
            <DropDownPicker
              style={forminput}
              open={d13_open}
              value={d13_value}
              items={d13_Array}
              setOpen={setd13Open}
              setValue={setd13Value}
              setItems={setd13Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>FUEL (PETROL/LTR.)</Text>
            <DropDownPicker
              style={forminput}
              open={d14_open}
              value={d14_value}
              items={d14_Array}
              setOpen={setd14Open}
              setValue={setd14Value}
              setItems={setd14Array}

            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>CAR COVER</Text>
            <DropDownPicker
              style={forminput}
              open={d15_open}
              value={d15_value}
              items={d15_Array}
              setOpen={setd15Open}
              setValue={setd15Value}
              setItems={setd15Array}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>BATTERY NO.</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setaccessoriesdetails({ ...accessoriesdetails, batterynumber: text })}

              value={accessoriesdetails.batterynumber}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>TYPE NO.</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setaccessoriesdetails({ ...accessoriesdetails, typenumber: text })}
              value={accessoriesdetails.typenumber}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>ANY OTHER ACCESSORIES</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setaccessoriesdetails({ ...accessoriesdetails, otheraccessories: text })}
              value={accessoriesdetails.otheraccessories}
            />
          </View>

          <View style={formout}>
            <Text style={formlabel}>ANY REMARK</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setaccessoriesdetails({ ...accessoriesdetails, remark: text })}
              value={accessoriesdetails.remark}
            />
          </View>
        </View>
      }

      {/* /////////////////////////////////// */}



      {/* /////////////////////////////////////////////// */}
      <View style={dropdown}>
        <Text style={dropdownText}>Dent/Scratches Details</Text>
        {
          dentscratchesdetails ?
            <Entypo name="circle-with-cross" size={24} color="white " style={dropdownicon}
              onPress={() => setdentscratchesdetails(!dentscratchesdetails)} />
            :
            <Ionicons name="arrow-forward-circle" size={24} color="white " style={dropdownicon}
              onPress={() => setdentscratchesdetails(!dentscratchesdetails)} />
        }
      </View>


      {
        dentscratchesdetails &&
        <View>
          <View style={formout}>
            <Text style={formlabel}>SCRATCHES</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setdentscratchesdetails({ ...dentscratchesdetails, scratches: text })}
              value={dentscratchesdetails.scratches}
            />
          </View>
          <View style={formout}>
            <Text style={formlabel}>DENT</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setdentscratchesdetails({ ...dentscratchesdetails, dent: text })}
              value={dentscratchesdetails.dent}
            />
          </View>


          <View style={formout}>
            <Text style={formlabel}>ANY OTHER VISIBLE OBSERVATION</Text>
            <TextInput style={forminput} placeholder=''
              onChangeText={(text) => setdentscratchesdetails({ ...dentscratchesdetails, otherobservation: text })}

              value={dentscratchesdetails.otherobservation}
            />
          </View>
        </View>
      }

      {/* ////////////////////// */}

      {
        vehiclesaving ?
          <ActivityIndicator size="large" color="#E1B000" />
          :
          <Text style={button}
            onPress={() => {
              saveVehicleConditionDetails()
            }}
          >Save Vehicle Condition</Text>
      }
    </ScrollView >
  )
}

export default VehicleCondition

const styles = StyleSheet.create({
  formout2: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  addmore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1B000',
    margin: 10,
    padding: 10,
  },
  addmorein: {
    color: 'white',
  }
})
