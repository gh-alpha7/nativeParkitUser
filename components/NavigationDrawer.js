import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacity, AsyncStorage, ToastAndroid,Linking, Button } from 'react-native';
import { DrawerItems} from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient';
import RNRestart from 'react-native-restart';
const CustomDrawerComponent = (props)=>(
  <View style={{flex:1}}>
  <LinearGradient
    colors={['#007aff', '#2471A3']}
    style={{ height:135, }}>
    <View style={{paddingTop:35,paddingLeft:15,flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>{props.navigation.navigate('Profile')}}>
        <Image source={require("../assets/images/user.png")} style={{height:70,width:70,borderRadius:35,borderWidth:3,borderColor:'#fff' }}/>
      </TouchableOpacity>
      <View style={{justifyContent:'space-around',height:60,paddingLeft:15}}>
        <Text style={{fontSize:23,color:'white'}}>{global.user.phn_number}</Text>
        <TouchableOpacity onPress={()=>{
          AsyncStorage.removeItem("userData")
          global.firebase.auth().signOut();
          RNRestart.Restart();
        }}>
          <Text style={{color:'white',fontSize:15}}>{"Logout "}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
    <ScrollView>
      <DrawerItems {...props}
      />
      <Button title="Contact Us" onPress={()=>{
        Linking.openURL("mailto:shubhamsngh067@gmail.com");

      }}/>
    </ScrollView>
  </View>
)
export default CustomDrawerComponent
