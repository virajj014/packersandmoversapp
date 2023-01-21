import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Pages/LoginSignup/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupPhone from './src/Pages/LoginSignup/Signup/SignupPhone';
import SignupOtp from './src/Pages/LoginSignup/Signup/SignupOtp';
import SignupRestDetails from './src/Pages/LoginSignup/Signup/SignupRestDetails';
import ForgotPasswordPhone from './src/Pages/LoginSignup/Forgotpassword/ForgotPasswordPhone';
import ForgotPasswordReset from './src/Pages/LoginSignup/Forgotpassword/ForgotPasswordReset';
import ForgotPasswordOtp from './src/Pages/LoginSignup/Forgotpassword/ForgotPasswordOtp';
import Home from './src/Pages/Home/Home';
import Quotation from './src/Pages/Forms/Quotation';
import Bill from './src/Pages/Forms/Bill';
import LrBilty from './src/Pages/Forms/LrBilty';
import PackingList from './src/Pages/Forms/PackingList';
import PaymentVoucher from './src/Pages/Forms/PaymentVoucher';
import PbCard from './src/Pages/Forms/PbCard';
import Reciept from './src/Pages/Forms/Reciept';
import SurveyList from './src/Pages/Forms/SurveyList';
import { colors } from './src/CommonStyles/Theme';
import SavedDocs from './src/Pages/Saved/SavedDocs';
import Settings from './src/Pages/Settings/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Invoice from './src/Pages/Forms/Invoice';
import SignupUploadProfileImage from './src/Pages/LoginSignup/Signup/SignupUploadProfileImage';
import VehicleCondition from './src/Pages/Forms/VehicleCondition';
import EditProfile from './src/Pages/Settings/EditProfile';
import QuotationEdit from './src/Pages/UpdateForms/QuotationEdit';
import LrBiltyEdit from './src/Pages/UpdateForms/LrBiltyEdit';
import PackingListEdit from './src/Pages/UpdateForms/PackingListEdit';
import RecieptEdit from './src/Pages/UpdateForms/RecieptEdit';
import InvoiceEdit from './src/Pages/UpdateForms/InvoiceEdit';
import PrintDoc from './src/PrintDocs/PrintDoc';



const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignupPhone" component={SignupPhone} />
        <Stack.Screen name="SignupOtp" component={SignupOtp} />
        <Stack.Screen name="SignupRestDetails" component={SignupRestDetails} />
        <Stack.Screen name="SignupUploadProfileImage" component={SignupUploadProfileImage} />
        <Stack.Screen name="ForgotPasswordPhone" component={ForgotPasswordPhone} />
        <Stack.Screen name="ForgotPasswordOtp" component={ForgotPasswordOtp} />
        <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordReset} />
        <Stack.Screen name="SavedDocs" component={SavedDocs} />
        <Stack.Screen name="Settings" component={Settings}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: "white",

            },
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen name="Quotation" component={Quotation}
          options={{
            headerShown: true,
            headerTitle: 'Quotation Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="QuotationEdit" component={QuotationEdit}
          options={{
            headerShown: true,
            headerTitle: 'Quotation Form',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="Bill" component={Bill}
          options={{
            headerShown: true,
            headerTitle: 'Bill Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="VehicleCondition" component={VehicleCondition}
          options={{
            headerShown: true,
            headerTitle: 'Vehicle Condition Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="LrBilty" component={LrBilty}
          options={{
            headerShown: true,
            headerTitle: 'LR Bilty Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="LrBiltyEdit" component={LrBiltyEdit}
          options={{
            headerShown: true,
            headerTitle: 'LR Bilty Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="PackingList" component={PackingList}
          options={{
            headerShown: true,
            headerTitle: 'Packing List Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="PackingListEdit" component={PackingListEdit}
          options={{
            headerShown: true,
            headerTitle: 'Packing List Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="PaymentVoucher" component={PaymentVoucher}
          options={{
            headerShown: true,
            headerTitle: 'Payment Voucher Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="PbCard" component={PbCard}
          options={{
            headerShown: true,
            headerTitle: 'PB Card Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="Reciept" component={Reciept}
          options={{
            headerShown: true,
            headerTitle: 'Reciept Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="RecieptEdit" component={RecieptEdit}
          options={{
            headerShown: true,
            headerTitle: 'Reciept Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="SurveyList" component={SurveyList}
          options={{
            headerShown: true,
            headerTitle: 'Survey List Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        {/* forms */}

        <Stack.Screen name="Invoice" component={Invoice}
          options={{
            headerShown: true,
            headerTitle: 'Invoice Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="InvoiceEdit" component={InvoiceEdit}
          options={{
            headerShown: true,
            headerTitle: 'Invoice Form',
            headerStyle: {
              backgroundColor: colors.primary,

            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="EditProfile" component={EditProfile}
          options={{
            headerShown: true,
            headerTitle: 'Edit Profile',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen name="PrintDoc" component={PrintDoc} 
          options={{
            headerShown: true,
            headerTitle: 'Print Document',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})



// ./gradlew assembleRelease     