import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, Linking } from 'react-native';
import {createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator} from 'react-navigation'
import Home from './components/MainScreen'
import Profile from './components/Profile'
import Kyc from './components/Kyc'
import NavMenu from './components/NavigationDrawer'
// import Setting from './components/DetailScreen'
import ContactUs from './components/ContactUs'
import Login from './components/LoginForm'
import History from './components/Navigation/History'
import Success from './components/Success'
import OngoingDetails from './components/OngoingDetail'
import CompletedDetails from './components/CompletedDetails'
import FinalQrCode from './components/FinalQrCode'
import AboutUs from './components/AboutUs'
import Vehicles from './components/Vehicles'

const DrawerNavigator=createDrawerNavigator({
  'Home ':{
    screen:Home,
    navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("./assets/images/home.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: tintColor }}
          />
        )
      }
  },
  'History ':{
    screen:History,
    navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("./assets/images/history.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: tintColor }}
          />
        )
      }
  },
  'KYC ':{
    screen:Kyc,
    navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("./assets/images/kyc.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: tintColor }}
          />
        )
      }
  },
  'About Us ':{
    screen:AboutUs,
    navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("./assets/images/info.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: tintColor }}
          />
        )
      }
  },
  'Vehicles ':{
    screen:Vehicles,
    navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("./assets/images/kyc.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: tintColor }}
          />
        )
      }
  }
},{
  contentComponent:NavMenu
})
const StackNavigator = createStackNavigator({
     Login,DrawerNavigator,Profile,OngoingDetails,CompletedDetails, Success, FinalQrCode
},{headerMode: 'none'},{
    initialRouteName: "Login"
  });
export default createAppContainer(StackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
