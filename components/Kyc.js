import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, ToastAndroid,
  TouchableOpacity, TextInput,  KeyboardAvoidingView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import db from './firebaseConfig'

// import { LinearGradient, ImagePicker, Permissions, Constants } from 'expo';

export default class Profile extends Component {
  state={
    frontDl:require("../assets/images/card.png"),
    backDl:require("../assets/images/card.png"),
    vehicleDoc:require("../assets/images/card.png")
  }
  // getPermissionAsync = async () => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }
  // }
  componentDidMount(){
    db.collection("users").where("phn_number", "==", global.user.phn_number).get().then((querySnapshot) => {
        if(querySnapshot.size==1)
        querySnapshot.forEach(doc=>{
          let d=doc.data()
          console.log("*****************profile",d);
          this.setState(prevState=>({
            frontDl:d.frontDl?{uri:d.frontDl} : prevState.frontDl,
            backDl:d.backDl?{uri:d.backDl} : prevState.backDl,
            vehicleDoc:d.vehicleDoc?{uri:d.vehicleDoc} : prevState.vehicleDoc,
          }))
        })
    })
  }
  _pickImage = async (uri) => {
    // await this.getPermissionAsync()
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 4],
    // });
    //
    // console.log(result);
    //
    // if (!result.cancelled) {
    //   this.setState({ [uri]: result.uri });
    // }
    let options={
      maxWidth:1200,
      maxHeight:1200,
      quality:0.2
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ [uri]: {uri:`data:${response.type};base64,${response.data}`} })
        db.collection('users').doc(global.user.uid).update({[uri]:`data:${response.type};base64,${response.data}`}).then((d)=>{
          ToastAndroid.show('Update Successful', ToastAndroid.SHORT);

        })
        .catch(err=>{
          ToastAndroid.show('Update failed', ToastAndroid.SHORT);

        })

      }
    });
  };
  render() {
    return (
      <View style={{marginTop:30}}>
        <Text style={{fontSize:20,marginLeft:20}}>KYC Documents</Text>
        <TouchableOpacity  onPress={()=>{this._pickImage('frontDl')}}>
        <View style={{margin:20,padding:20,borderRadius:5,borderWidth:1,flexDirection:'row',borderColor:'#ABB2B9'}}>
          <Image style={styles.avatar} source={this.state.frontDl}/>
          <View style={{marginLeft:30,justifyContent:'space-around'}}>
            <Text style={{fontSize:16}}>Upload front side of DL</Text>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.picker} source={require("../assets/images/upload1.png")}/>
              <Text style={{color:'#0007ff',fontSize:16,marginLeft:10}}>Upload</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>{this._pickImage('backDl')}}>
        <View style={{margin:20,padding:20,borderRadius:5,borderWidth:1,flexDirection:'row',borderColor:'#ABB2B9'}}>
          <Image style={styles.avatar} source={this.state.backDl}/>
          <View style={{marginLeft:30,justifyContent:'space-around'}}>
            <Text style={{fontSize:16}}>Upload back side of DL</Text>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.picker} source={require("../assets/images/upload1.png")}/>
              <Text style={{color:'#0007ff',fontSize:16,marginLeft:10}}>Upload</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>{this._pickImage('vehicleDoc')}}>
        <View style={{margin:20,padding:20,borderRadius:5,borderWidth:1,flexDirection:'row',borderColor:'#ABB2B9'}}>
          <Image style={styles.avatar} source={this.state.vehicleDoc}/>
          <View style={{marginLeft:30,justifyContent:'space-around'}}>
            <Text style={{fontSize:16}}>Upload vehicle registration documents</Text>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.picker} source={require("../assets/images/upload1.png")}/>
              <Text style={{color:'#0007ff',fontSize:16,marginLeft:10}}>Upload</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:180,
  },
  container:{
    flex:1
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  picker: {
    width: 20,
    height: 20

  },
  phone:{
    alignSelf:'center',
    position: 'absolute',
    marginTop:250,
    color:'black',
    fontSize:20
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:80,
    paddingLeft:20,
    paddingRight:20

  },
  bodyContent: {
    flex: 1,
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:12,
    color: "#ABB2B9",
    marginTop:10,
    marginBottom:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
