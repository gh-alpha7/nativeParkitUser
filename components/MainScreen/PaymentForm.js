import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text, Modal } from 'react-native'
import Button from '../common/SubmitButton'

// Expand the touch target around the icon
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export default class PaymentForm extends Component {


  navMenu=()=>{
    this.props.navMenu()
  }
  render() {
    return (

      <View style={{flex:1,height:500,width:500}}>
        <View style={styles.container}>
          <View style={styles.details}>
            <Text style={{fontSize:19,fontWeight:'bold'}}>On-Spot Booking at:</Text>
            <Text style={{fontSize:14,color:"#808B96"}}>Forum mall,Kormangalla</Text>
            <View style={styles.distance}>
              <Text style={{color:'red',fontSize:13}}>2 spots left  </Text>
              <Text style={{fontSize:13}}>• 7 km</Text>
            </View>
          </View>
            <Text style={{fontSize:22,color:'#1A5276',fontWeight:'bold'}}>₹05-10</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Button source={require('../../assets/images/navigation.png')}>Navigate</Button>
          <Button source={require('../../assets/images/submit.png')}>Book</Button>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  details: {
  },
  distance: {
    flexDirection:"row",
  }
})
