import React, {Component} from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Animated, Easing, Linking, Image, AsyncStorage, ToastAndroid, KeyboardAvoidingView,
Modal, StatusBar} from 'react-native';
import Button from './common/Button';
import OtpButton from './common/OtpButton';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import LinearGradient from 'react-native-linear-gradient';
import FinalQrCode from './FinalQrCode'

export default class AboutUs extends Component {

  render() {

    return (
            <LinearGradient   colors={['#007aff', '#2471A3']} style={{flex:1,justifyContent:'space-between'}}>
            <StatusBar backgroundColor="#007aff" barStyle="light-content" />

              <View style={{marginTop:40,height:100,justifyContent:"space-between",alignItems:"center"}}>
                <View style={{alignItems:"center"}}>
                  <Text style={{fontSize:30,color:"#fff"}}>{"About Us "}</Text>
                </View>
              </View>

              <View style={{flex:1,backgroundColor:"#fff",borderTopLeftRadius:50,borderTopRightRadius:50}} >
                <View style={{marginTop:20,padding:40}}>

                  <View style={{marginTop:20}}>
                    <View>
                      <Text style={{fontSize:18}}>
                      Cities are known to be the backbone of economic growth as well as human growth of a country. However, as the fashioned city has developed, a crucial role in building a better and sustainable future is given to technical advancements. Hence, we, at Aristo21 focus on systemized smart parking solution around the city by availing underused parking spaces to give an any time access to citizens and to provide hustle-free and secure parking wherever they go.
                      Aristo 21 aims to provide you with the accurate planning of Aristotle in the 21st century of gizmos and gadgets. If smart planning and parking is  the requirement, Aristo 21 is the solution.
                      </Text>
                    </View>

                  </View>

                </View>
              </View>
            </LinearGradient>
    )
  }
}

const styles = {
  signup: {
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    paddingTop:25,
  },
  text:{
    color:"blue"
  },
  fab: {
    width:500,
    flexDirection:'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    elevation: 8
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    height:50,
    alignSelf: 'stretch',
    backgroundColor: '#4630eb',
    borderColor:"#4630eb",
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5
  },
  cardsection:{
    borderRadius:20,
    borderWidth:1,
    borderColor:'#ddd',
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  info:{
    fontSize:12,
    color: "#ABB2B9",
    marginTop:10,
    marginBottom:10
  }
};
