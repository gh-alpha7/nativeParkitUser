import React, {Component} from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Animated, Easing, Linking, Image, AsyncStorage, ToastAndroid, KeyboardAvoidingView,PermissionsAndroid} from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './common/Button';
import OtpButton from './common/OtpButton';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Header from './common/Header';
import FirestoreData from './FirestoreData'
import db from './firebaseConfig'
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios'
import firebase from 'react-native-firebase';
export default class LoginForm extends Component {

  constructor(props) {
   super(props);
   this.unsubscribe = null;
   this.state={
     email:'+91',
     password:"",
     updatedHeight:0,
     expand:false,
     buttonText:'GET OTP',
     progress: new Animated.Value(0),
     dataLoading:true,data:[],
     source:require("../assets/images/send.png"),
     message:"We will send you an OTP on your phone number",
     resend:false,
     loading:false,
     phoneOtp:"Mobile",
     confirmResult:null


   }
   const firebaseConfig = {
     apiKey: "AIzaSyBhhgzC0Auy0YficBklazX0tFXa_XuZ9Io",
     authDomain: "parkin-227515.firebaseapp.com",
     databaseURL: "https://parkin-227515.firebaseio.com",
     projectId: "parkin-227515",
     storageBucket: "parkin-227515.appspot.com",
     messagingSenderId: "819022767661",
     appId:'1:819022767661:android:321de58bc82a9ac6',
   };
   firebase.initializeApp(firebaseConfig);

 }

 componentDidMount(){
   this.animation.play();

    FirestoreData.then(async data=>{
      global.firestoreData=data
      this.unsubscribe=firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          let res=await AsyncStorage.getItem('userData')
          if(res){
            await this.getBookings(res)
          }
          else{
            ToastAndroid.show('Verified', ToastAndroid.SHORT);
            await this.setState({loading:true})
            this.signin_user()
          }
        }
        else{
          this.setState({dataLoading:false})
        }
      });


    })




  }
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
     if(granted === PermissionsAndroid.RESULTS.GRANTED){
       this.resetState()
       this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DrawerNavigator' })], 0)
     }
   }
   catch(err){}
 }





  signin_user=async ()=> {
    let user={},ph=this.state.email
    AsyncStorage.getItem('userData').then((err,res)=>{
      if(res){
        global.user=res
        this.getBookings(res)
      }
      else {db.collection("users").where("phn_number", "==", ph).get().then((querySnapshot) => {
        let i = 0;
        if (querySnapshot.size == 0) {
          var temp = {
            phn_number: ph,
            is_logged_in: true
          };
          db.collection("users")
          .add(temp)
          .then( (docRef)=> {
            user.uid = docRef.id;
            user.phn_number = ph
            global.user=user
            AsyncStorage.setItem('userData', JSON.stringify(user))
            this.getBookings(user)
          })
          .catch((error)=> {
            console.error("Error adding user: ", error);
          });
        } else if (querySnapshot.size == 1) {
          querySnapshot.forEach((doc) => {
            user.uid = doc.id;
            user.phn_number = doc.data().phn_number;
            AsyncStorage.setItem('userData', JSON.stringify(user))
            this.getBookings(user)
          });
        } else {

        }
      });}
    })
  }
  getBookings=async (user)=>{
    user=user.phn_number?user:JSON.parse(user)
    global.user=user
    // console.log("phone",user.phn_number);
    // if(user.phn_number)
    // db.collection("Bookings").where("user", "==", user.uid).get().then((querySnapshot) => {
    //     global.bookings=querySnapshot.docs.map(d=>d.data())
    //     console.log("bookigns",querySnapshot.docs.map(d=>d.data()));
    await this._getLocationAsync()
    global.firebase=firebase


    // });
    // else {
    //   this.setState({dataLoading:false})
    // }
  }
  verifyOtp=async ()=>{
    const { password, confirmResult } = this.state;
    if (confirmResult && password.length) {
      confirmResult.confirm(password)
        .then(async (user) => {
          ToastAndroid.show('OTP Matched', ToastAndroid.SHORT);
          await this.setState({loading:true})
          // this.signin_user()
        })
        .catch(error => {
          ToastAndroid.show('Wrong OTP', ToastAndroid.SHORT);});
    }

  }
  sendOtp=()=>{
    ToastAndroid.show('Sending OTP', ToastAndroid.SHORT);

    firebase.auth().signInWithPhoneNumber(this.state.email)
      .then(confirmResult => {
        ToastAndroid.show('OTP Sent', ToastAndroid.SHORT);
        this.setState({
          confirmResult,
          updatedHeight:50,
          expand: true,
          buttonText: 'VERIFY',
          phoneOtp:'OTP',
          source:require("../assets/images/sms.png"),
          resend:true,message:"You will get OTP via SMS"
        });
      })
      .catch(error => {
        ToastAndroid.show('Sending OTP Error', ToastAndroid.SHORT);});


      // ToastAndroid.show('Enter Valid Phone Number', ToastAndroid.SHORT);

  }
  expandCollapse =()=>
    {
        LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

        if( this.state.expand == false )
        {
          if(this.state.email){
            this.sendOtp()
          }
          else{
            ToastAndroid.show('Enter Valid Phone Number', ToastAndroid.SHORT);
          }
        }
        else
        {
          this.verifyOtp()
        }
    }

    resetState=()=>{
      this.setState({
        updatedHeight: 0,
        expand: false,
        buttonText: 'GET OTP',
        loading:false,
        dataLoading:false,phoneOtp:'Mobile',
        resend:false,message:"We will send you an OTP on your phone number",email:"+91",password:""
      });
    }


  render() {
    return (

      <KeyboardAvoidingView  style={{flex: 1, justifyContent: 'space-around'}} behavior="padding">
          {this.state.dataLoading?<LottieView source={require('../assets/json/location.json')} ref={animation => {
            this.animation = animation;
          }}/>:
            <LinearGradient   colors={['#007aff', '#2471A3']} style={{flex:1,justifyContent:'space-between',marginBottom:30}}>
              <View style={{marginTop:120,height:100,justifyContent:"space-between",alignItems:"center"}}>
                <Image source={require("../assets/images/sms1.png")} style={{height:80,width:80}}/>
                <View style={{alignItems:"center"}}>
                  <Text style={{fontSize:30,color:"#fff"}}>{"Verification "}</Text>
                  <Text style={{fontSize:16,color:'#fff',marginTop:10}}>{this.state.message+' '}</Text>
                </View>
              </View>

              <View style={{backgroundColor:"#fff",borderTopLeftRadius:50,borderTopRightRadius:50}} >
                <View style={{marginTop:20,padding:40}}>
                  <View style={{alignItems:"center"}}>
                    <Text style={{fontWeight:"bold",fontSize:28,color:'#4630eb'}}>{this.state.phoneOtp+' '}</Text>
                  </View>
                  <View style={{marginTop:20}}>
                    {this.state.buttonText=="GET OTP"?<View style={{padding:10}}>
                      <View style={styles.cardsection}>
                        <Input  placeholder="Phone No." value={this.state.email} onChangeText={email=>this.setState({email})}/>
                      </View>
                    </View>:<View style={{padding:10}}>
                      <View style={styles.cardsection}>
                        <Input  placeholder="OTP" value={this.state.password} onChangeText={password=>this.setState({password})}/>
                      </View>
                    </View>}
                    <CardSection>
                      <OtpButton loading={this.state.loading} onPress={this.expandCollapse}>
                        {this.state.buttonText}
                      </OtpButton>
                    </CardSection>
                    {this.state.resend?<View style={{flexDirection:'row',justifyContent:"space-between",padding:10}}>
                      <TouchableOpacity onPress={this.sendOtp}><Text style={{color:"#4630eb",fontSize:19}}>{'Resend again '}</Text></TouchableOpacity>
                      <TouchableOpacity onPress={this.resetState}><Text style={{color:"#4630eb",fontSize:19}}>{'Retry '}</Text></TouchableOpacity>
                    </View>:null}
                  </View>
                </View>
              </View>
            </LinearGradient>
        }
        </KeyboardAvoidingView>
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
  }
};
