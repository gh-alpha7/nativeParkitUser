import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text, Animated, FlatList } from 'react-native'
import Button from '../common/SubmitButton'
import LottieView from 'lottie-react-native';

import Db from '../firebaseConfig'

// Expand the touch target around the icon
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export default class Ongoing extends Component {

  state={
    bookings:[],
    loading:true,
    progress:new Animated.Value(0),
  }
  navMenu=()=>{
    this.props.navMenu()
  }
  componentDidMount(){
    this.animation.play();

    Db.collection("Bookings").where("user", "==", global.user.uid).get().then((querySnapshot) => {
        this.setState({bookings:querySnapshot.docs.map(d=>({...d.data(),id:d.id})),loading:false})})
        .catch(err=>{console.log(err);})
    // this.setState({bookings:global.bookings})
  }
  details=(data)=>{
    this.props.navigation.navigate('CompletedDetails',{
      itemId:2,
      CompleteDetail:data
    })
  }
  _renderItem = (data) => {
    let d=data.item
    return (
    <TouchableOpacity onPress={this.details.bind(this,d)}>
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
        {d.type=="car"?<Image source={require("../../assets/images/car.png")} style={{height:30,width:30}}/>:
        <Image source={require("../../assets/images/bike.png")} style={{height:30,width:30}}/>
        }
        <View style={styles.details}>
          <Text style={{fontSize:19}}>{d.inTime}</Text>
          <Text style={{fontSize:17,color:"#808B96"}}>{d.placeName}</Text>
          <Text style={{color:'red',fontSize:15}}>Booking Id: {d.id}</Text>
        </View>
      </View>
        <Text style={{fontSize:23,color:'#1A5276'}}>₹{d.amount}</Text>
    </View>
    <View
      style={{
        borderBottomColor: '#F2F4F4',
        borderBottomWidth: 1,
        marginTop:10,
        marginLeft:50,
        marginRight:10
      }}
    />
    </TouchableOpacity>
  );}
  render() {
    let bookings=this.state.bookings.filter(d=>d.status=="complete")

    console.log("bookings",bookings);
    return (
      <View style={{flex:1}}>

        {this.state.loading?<LottieView source={require('../../assets/json/loading.json')} ref={animation => {
          this.animation = animation;
          }}/>:<FlatList
            data={bookings}
            renderItem={this._renderItem}
          />}
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
  details: {
    paddingLeft:10
  },
  distance: {
    flexDirection:"row",
  }
})
