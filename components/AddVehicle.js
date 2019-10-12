import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ToastAndroid } from 'react-native';
import CardSection from './common/CardSection'
import Card from './common/Card'
import DatePick from './common/DatePickProfile';
import OtpButton from './common/OtpButton';

import RNUpiPayment from 'react-native-upi-payment'
export default class Payment extends Component {
  state={
    name:"",
    number:""
  }

  addDetail=()=>{
    if(this.state.name!='' && this.state.number!='')
      this.props.onPress(this.state)
  }
  render(){
    return (
      <View style={styles.container}>
          <Text style={styles.info}>Name</Text>
          <CardSection>
            <TextInput placeholder="Enter vehicle name" style={{fontSize:15}} value={this.state.hours}  onChangeText={name=>this.setState({name})}/>
          </CardSection>
          <Text style={styles.info}>Number</Text>
          <CardSection>
            <TextInput placeholder="Enter vehicle number" style={{fontSize:15}} value={this.state.hours}  onChangeText={number=>this.setState({number})}/>
          </CardSection>
        <CardSection>
          <OtpButton onPress={this.addDetail}>
            SAVE
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
