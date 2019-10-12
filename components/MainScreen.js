import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet, TouchableWithoutFeedback, StatusBar, Platform,
   TextInput, Image, TouchableOpacity, Dimensions, Modal, Linking, BackHandler, PermissionsAndroid, ToastAndroid
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import PlaceDetails from './MainScreen/PlaceDetails'
import MapView from 'react-native-maps';
import LocationSearch from './MainScreen/LocationSearch'
import Map from './MainScreen/Map'
import NavigationIcon from './MainScreen/NavigationIcon'
import * as Animatable from 'react-native-animatable'
import QrCode from './QrCode'
import Payment from './Payment'
import CardSection from './common/CardSection'
import OtpButton from './common/OtpButton'
import Db from './firebaseConfig'
import FirestoreData from './FirestoreData'
import { StackActions, NavigationActions } from 'react-navigation';
import RNUpiPayment from 'react-native-upi-payment'
import Button from './common/Button';


const {width: windowWidth} = Dimensions.get('window')
const width = windowWidth - 10
let ref=null
import BottomSheet from 'reanimated-bottom-sheet'
class MainScreen extends Component {
  state={
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    currLoc:null,
    modalVisible:false,
    vehicle:'bike',
    source:require("../assets/images/bike.png"),
    selectedLoc:null,
    modalVisible:false,
    points:[],
    markers:[],
    paymentVisible:false,
    initialSnap:0
  }

  componentWillMount() {


    this._getLocationAsync();
    console.log(global.firestoreData,"firestoreData");
    this.setState({points:global.firestoreData.points,selectedLoc:global.firestoreData.points[0]})

  }
  _handleOpenURL=(event)=>{
    console.log(event,"event");
  }
  _onRegionChangeComplete=(region)=> {
    // console.log("region change",region,this.state.currLoc);
    this.setState({
      mapRegion: region,
    });
  }

  rbSheetClick=(loc)=>{
    console.log("rbsheet",loc);
    this.setState({selectedLoc:loc})
    this.bs.current.snapTo(1)
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };
  _getLocationAsync = async () => {
    try {
     const granted = await PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
       {
         title: ' Location Permission',
         message:
           'Our App needs access to your current location ' +
           'so you can get better service.',
         buttonNegative: 'Cancel',
         buttonPositive: 'OK',
       },
     );
     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       navigator.geolocation.getCurrentPosition(location=>{
         console.log("current location",location);
         this.setState({ locationResult: location });
         this.setState({currLoc:{latitude: location.coords.latitude, longitude: location.coords.longitude}})
         this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
       })
     } else {
       console.log('location permission denied');
     }
   } catch (err) {
     console.warn(err);
   }

  };
  changeVehicle=()=>{
    let source=this.state.vehicle=='car'?require("../assets/images/bike.png"):require("../assets/images/car.png")
    let vehicle=this.state.vehicle=='car'?"bike":"car"
    this.setState({vehicle,source})

  }
  currentLocation=async ()=>{
    let location = this.state.locationResult

    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }})

  }
  navigate=()=>{
    let {Lat,Lon}= {...this.state.selectedLoc}
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${Lat},${Lon}`;
    const label = 'Label';
    console.log(Lat,Lon,latLng);
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
  }
  navMenu=()=>{
    this.props.navigation.openDrawer()
  }
  changeLocation=(location)=>{
    this.setState({mapRegion: { latitude: location.lat, longitude: location.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }})
  }



  completeBooking= async (data,response)=>{
    if(response.Status!="Success"){
      ToastAndroid.show('Payment Failed', ToastAndroid.SHORT);

      return
    }
    this.setState({paymentVisible:false})
    let locData=this.state.selectedLoc
    let paid= this.state.vehicle=='car'?+locData.carsCost:+locData.bikesCost
    amount=paid*data.hours

    // console.log(response);
    let temp={
      amount,
      paid,
      owner:locData.Owner,
      ownerName:locData.OwnerName,
      placeName:locData.Name,
      status:"ongoing",
      inTime:data.date,
      hours:data.hours,
      type:this.state.vehicle,
      user:global.user.uid,
    }
    console.log("booking data",temp);
    Db.collection("Bookings")
    .add(temp)
    .then( docRef => {console.log(docRef.id)
      ToastAndroid.show('Payment Successful', ToastAndroid.SHORT);
      this.props.navigation.navigate('Success',{
        itemId:1,
        selectedLoc:this.state.selectedLoc
      })
    })
    .catch(err=>{console.log(err);})

  }
  modalVisible=()=>{
    console.log("modal true");
    this.setState({modalVisible:true})
  }
  renderInner = () => (
    <View style={styles.contact}>
      <Text style={{fontSize:18,color:"#808B96",paddingTop:10}}>Operating hours</Text>
      <Text style={{fontSize:20,paddingTop:6}}>05:00 AM - 11:00 PM</Text>
      <Text style={{fontSize:17,color:'#2ECC71',paddingTop:6}}>Now is open</Text>
      <Text style={{fontSize:18,color:"#808B96",paddingTop:10}}>Contacts</Text>
      <TouchableOpacity style={{flexDirection:'row',paddingTop:6}} onPress={()=>{Linking.openURL(`tel:8862944302`)}}>
        <Image source={require("../assets/images/phone.png")} style={{height:20,width:20,marginRight:10,marginTop:5}}/>
        <Text style={{fontSize:20}}>8862944302</Text>
      </TouchableOpacity>

    </View>
)

renderHeader = () => (
  <View>
    <TouchableOpacity onPress={this.changeVehicle} style={styles.fab}>
      <Image source={this.state.source} style={{height:30,width:30}}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.currentLocation} style={styles.location}>
      <Image source={require("../assets/images/location.png")} style={{height:30,width:30}}/>
    </TouchableOpacity>
    <View style={styles.bsheet}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <View style={styles.container1}>
        <View>
          <Text style={{fontSize:26}}>On-Spot Booking:</Text>
          <Text style={{fontSize:18,color:"#808B96",paddingTop:10}}>{this.state.selectedLoc?this.state.selectedLoc.Name:'Forum mall,Kormangalla '}</Text>
          <View style={styles.detail}>
            <View style={styles.sdetail}>
              <Image source={require("../assets/images/parking.png")} style={{height:20,width:20}}/>
              <Text style={styles.spots}>{this.state.vehicle=='car'?this.state.selectedLoc.carCount:this.state.selectedLoc.bikeCount} spots</Text>
            </View>
            <View style={styles.details}>
              <Image source={require("../assets/images/rupee.png")} style={{height:20,width:20}}/>
              <Text style={styles.spots}>{this.state.vehicle=='car'?this.state.selectedLoc.carsCost:this.state.selectedLoc.bikesCost} p/h</Text>
            </View>
          </View>
        </View>
        <Image source={require("../assets/images/Park.png")} style={{borderRadius:5,height:90,width:90}}/>
      </View>
      <View style={{flexDirection:'row',marginLeft:10,marginRight:10}}>
        <Button onPress={this.paymentVisible}>
          BOOK
        </Button>

        <Button onPress={this.navigate}>
          NAVIGATE
        </Button>
      </View>
    </View>
  </View>
)
paymentVisible=()=>{
  this.setState({paymentVisible:true})
}
  bs = React.createRef()
  render () {
    console.log(this.state.currLoc);
    return (
    <View style={styles.container}>
      <StatusBar backgroundColor='rgba(255,255,255,0)'  barStyle='dark-content' />
      <LocationSearch changeLocation={this.changeLocation} qrModal={this.modalVisible} navMenu={this.navMenu}/>
      <Map style={styles.map} mapRegion={this.state.mapRegion} rbSheetClick={this.rbSheetClick} location={{latitude: 23.99,
          longitude: 85.3}} points={this.state.points} _onRegionChangeComplete={this._onRegionChangeComplete}/>
      {this.state.currLoc && (
        <MapView.Circle
          center={this.state.currLoc}
          radius={300}
          strokeColor={'transparent'}
          fillColor={'rgba(112,185,213,0.30)'}
        />
      )}


      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({modalVisible:false})
        }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <QrCode value={{user: global.user.uid,pay:0}}/>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.paymentVisible}
        onRequestClose={() => {
          this.setState({paymentVisible:false})
        }}>
        <TouchableOpacity
        onPressOut={() => {this.setState({paymentVisible:false})}}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <TouchableWithoutFeedback>
          <View style={{height:300,width:300,backgroundColor:'white',borderRadius:10}}>
            <Payment response={this.completeBooking} buttonName={+(this.state.vehicle=='car'?this.state.selectedLoc.carsCost:this.state.selectedLoc.bikesCost)}/>
          </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <BottomSheet
          ref={this.bs}
          snapPoints={[170, 335,485, 170]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={0}
        />


    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EEE',
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  circle:{
    height:60,
    width:60,
    borderRadius:30,
    backgroundColor:'white',
  },
  fab: {
    flexDirection:'row',
    alignSelf:'flex-end',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 8,
    margin:10
  },
  location: {
    flexDirection:'row',
    alignSelf:'flex-end',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
    marginTop:0,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 8,
  },
  container1: {
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',

  },
  bsheet:{

    backgroundColor:'white',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  contact: {
    padding:10,
    backgroundColor:'white'
  },
  detail: {
    flexDirection:'row',
    paddingTop:10
  },
  sdetail: {
    flexDirection:'row',
  },
  details: {
    flexDirection:'row',
    paddingLeft:20
  },
  spots:{
    paddingLeft:10,
    fontSize:16
  },
  distance: {
    flexDirection:"row",
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    marginTop:10,
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',

  },
  innerContainer: {
    alignItems: 'center'
  },
});

export default MainScreen;
