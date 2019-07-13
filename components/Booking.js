import React, {Component} from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import InputText from './common/InputText';
import DatePick from './common/DatePick';
import Header from './common/Header';

export default class LoginForm extends Component {

  state={
    dateIn:null,
    dateOut:null
  }

  render() {
    return (
      <View style={{borderRadius:10}}>
        <Card>
          <CardSection>
            <DatePick label="In-Time"  value={this.state.dateIn} onDateChange={dateIn=>this.setState({dateIn})}/>

          </CardSection>
          <CardSection>
            <DatePick label="Out-Time"  value={this.state.dateOut} onDateChange={dateOut=>this.setState({dateOut})}/>

          </CardSection>

          <View style={{flexDirection:'row',backgroundColor:'white',padding:3}}>

              <Button onPress={()=>{this.props.completeBooking(this.state)}}>
                BOOK
              </Button>

              <Button onPress={()=>{this.props.closeModal()}}>
                CANCEL
              </Button>
          </View>
        </Card>
      </View>
    )
  }
}

const styles = {

};
