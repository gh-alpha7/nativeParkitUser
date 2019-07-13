import React, {Component} from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Animated, Easing, Linking, Image, AsyncStorage, ToastAndroid, KeyboardAvoidingView,
Modal} from 'react-native';
import Button from './common/Button';
import OtpButton from './common/OtpButton';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import LinearGradient from 'react-native-linear-gradient';
import FinalQrCode from './FinalQrCode'

export default class LoginForm extends Component {

  payment=(amount)=>{
    if(amount)
      RNUpiPayment.initializePayment({
        vpa: 'anupamk121@dbs', // or can be john@ybl or mobileNo@upi
        payeeName: 'Anupam Kumar',
        amount,
        transactionRef: 'aasf-332-aoei-fn'
      }, this.Callback, this.Callback);
    else{
      this.Callback({Status:'Success'})
    }
  }

  Callback=(response)=>{
    let data=this.props.navigation.getParam('OngoingDetail')
    if(response.Status=="Success"){
      ToastAndroid.show('Payment Successful', ToastAndroid.SHORT);
      this.props.navigation.navigate('FinalQrCode',{
        itemId:2,
        FinalQr:{due:0,data}
      })
    }
  }

  render() {
    let data=this.props.navigation.getParam('OngoingDetail')

    return (
            <LinearGradient   colors={['#007aff', '#2471A3']} style={{flex:1,justifyContent:'space-between'}}>
            
              <View style={{marginTop:40,height:100,justifyContent:"space-between",alignItems:"center"}}>
                <View style={{alignItems:"center"}}>
                  <Text style={{fontSize:30,color:"#fff"}}>{"Ongoing Booking Details "}</Text>
                </View>
              </View>

              <View style={{flex:1,backgroundColor:"#fff",borderTopLeftRadius:50,borderTopRightRadius:50}} >
                <View style={{marginTop:20,padding:40}}>

                  <View style={{marginTop:20}}>
                    <View>
                      <Text style={styles.info}>LOCATION</Text>
                      <Text style={{fontSize:26}} >{data.placeName}</Text>
                    </View>
                    <View>
                      <Text style={styles.info}>DATE</Text>
                      <Text style={{fontSize:26}} >{data.inTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.info}>TOTAL HOURS</Text>
                      <Text style={{fontSize:26}} >{data.hours} hrs</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                      <View>
                        <Text style={styles.info}>AMOUNT</Text>
                        <Text style={{fontSize:26}} >₹{data.amount}</Text>
                      </View>
                      <View>
                        <Text style={styles.info}>PAID</Text>
                        <Text style={{fontSize:26}} >₹{data.paid?data.paid:0}</Text>
                      </View>
                    </View>

                  </View>
                </View>

              </View>

                <CardSection>
                  <OtpButton onPress={this.payment.bind(this,+(data.amount)-(+(data.paid?data.paid:0)))}>
                    CHECKOUT
                  </OtpButton>
                </CardSection>
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
