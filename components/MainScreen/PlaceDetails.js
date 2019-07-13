import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text, Platform, Linking } from 'react-native'
import Button from '../common/SubmitButton'
import CardSection from '../common/CardSection'
import OtpButton from '../common/OtpButton'

// Expand the touch target around the icon
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export default class NavigationIcon extends Component {
  state={
    distance:2
  }
  navigate=({latitude,longitude})=>{
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = 'Label';
    console.log(latitude,longitude,latLng);
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
  }
  bookPlace=()=>{
    this.props.modalVisible()
  }
  navMenu=()=>{
    this.props.navMenu()
  }
  componentDidMount(){
    let details=this.props.selectedLoc
    if(details){
      let str_origin = `origin=${this.props.current.latitude},${this.props.current.longitude}`
      let str_dest = `destination=${details.Lat},${details.Lon}`
      let sensor = "sensor=false"
      let api_key="key=AIzaSyAoncE3HjFoXY3gJZucv4yPfQuWXCSya58"
      let parameters = `${str_origin}&${str_dest}&${sensor}&${api_key}`
      let output = "json"
      let url=`https://maps.googleapis.com/maps/api/directions/${output}?${parameters}`
      console.log(url);
      fetch(url).then(d=>d.json())
        .then(d=>{
        this.setState({distance:d.routes[0].legs[0].distance.text})
    })}
  }
  bookNow=()=>{

  }
  render() {
    let details=this.props.selectedLoc,distance

    return (
      <View style={{flex:1}}>
        


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  contact: {
    padding:10,
  },
  detail: {
    flexDirection:'row',
    paddingTop:10
  },
  details: {
    flexDirection:'row',
    paddingTop:10,
    paddingLeft:20
  },
  spots:{
    paddingLeft:10,
    fontSize:16
  },
  distance: {
    flexDirection:"row",
  }
})
