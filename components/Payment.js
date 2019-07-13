import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ToastAndroid } from 'react-native';
import CardSection from './common/CardSection'
import Card from './common/Card'
import DatePick from './common/DatePickProfile';
import OtpButton from './common/OtpButton';

import RNUpiPayment from 'react-native-upi-payment'
export default class Payment extends Component {
  state={
    date:"",
    hours:""
  }
  payment=()=>{
    if(this.state.data==""||this.state.hours==""){
      ToastAndroid.show('Enter Fields', ToastAndroid.SHORT);

      return
    }
    if(this.props.buttonName==0){
      this.Callback({Status:'Success'})
      return
    }
    RNUpiPayment.initializePayment({
      vpa: 'surbhiranjan2.sr@okhdfcbank', // anupamk121@dbs
      payeeName: 'Surbhi Ranjan',
      amount:this.props.buttonName,
      transactionRef: 'aasf-332-aoei-fn'
    }, this.Callback, this.Callback);
  }

  Callback=(response)=>{
      console.log(response);
      this.props.response(this.state,response)
  }

  render(){
    return (
      <View style={styles.container}>
          <Text style={styles.info}>Date</Text>
          <CardSection>
            <DatePick  value={this.state.date} format='Do MMM YYYY, h:mm' onDateChange={date=>this.setState({date})} mode='datetime'/>
          </CardSection>
          <Text style={styles.info}>Hours</Text>
          <CardSection>
            <TextInput keyboardType='numeric' placeholder="Hours" style={{fontSize:15}} value={this.state.hours}  onChangeText={hours=>this.setState({hours})}/>
          </CardSection>
        <CardSection>
          <OtpButton onPress={this.payment}>
            {this.props.buttonName==0?'BOOK':'PAY'}
          </OtpButton>
        </CardSection>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20
  },
  info:{
    fontSize:15,
    color: "#ABB2B9",
    marginTop:10,
    marginBottom:10
  },
});
