import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, TextInput,  ScrollView, Keyboard, Dimensions, Picker
} from 'react-native';
import CardSection from './common/CardSection';
import OtpButton from './common/OtpButton';
import DatePick from './common/DatePickProfile';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

const {height: windowHeight} = Dimensions.get('window')
export default class Profile extends Component {
  state={
    uri:'https://bootdey.com/img/Content/avatar/avatar6.png',height:windowHeight
  }

  _pickImage = async () => {
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
        this.setState({ uri: `data:${response.type};base64,${response.data}`)

      }
    });
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow=(e)=> {
    console.log(e.endCoordinates.height);
    this.setState({height:windowHeight+e.endCoordinates.height})
  }

  _keyboardDidHide=()=> {
    this.setState({height:windowHeight})

  }
  render() {
    return (
      <ScrollView contentContainerStyle={{ height: this.state.height }}>
      <LinearGradient
        colors={['#007aff', '#2471A3']}
        style={styles.header}/>

        <Image style={styles.avatar} source={{uri: this.state.uri}}/>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={()=>{this._pickImage()}}>
          <Image style={styles.picker} source={require("../assets/images/picker.png")}/>
        </TouchableOpacity>

          <View style={styles.body}>
            <View>
              <Text style={styles.info}>FULL NAME</Text>
              <TextInput placeholder="Name" style={{fontSize:16}} value={this.state.name} onChangeText={name=>this.setState({name})}/>
              <View style={{borderWidth:1,borderColor:'#ABB2B9'}}></View>
            </View>
            <View>
              <Text style={styles.info}>GENDER</Text>
              <Picker
                selectedValue={this.state.language}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
              <View style={{borderWidth:1,borderColor:'#ABB2B9'}}></View>
            </View>
            <View>
              <Text style={styles.info}>MOBILE NUMBER</Text>
              <Text style={{fontSize:16}} >{global.user.phn_number}</Text>
              <View style={{borderWidth:1,borderColor:'#ABB2B9'}}></View>
            </View>
            <View>
              <Text style={styles.info}>BIRTHDAY</Text>
              <DatePick mode='date' format='Do MMM YYYY'  value={this.state.date} onDateChange={date=>this.setState({date})}/>
              <View style={{borderWidth:1,borderColor:'#ABB2B9'}}></View>
            </View>
            <View>
              <Text style={styles.info}>EMAIL</Text>
              <TextInput style={{fontSize:16}} placeholder="Email"  value={this.state.email} onChangeText={email=>this.setState({email})}/>
              <View style={{borderWidth:1,borderColor:'#ABB2B9'}}></View>
            </View>
            <View>
              <Text style={styles.info}>HOME ADDRESS</Text>
              <TextInput style={{fontSize:16}} placeholder="Location"  value={this.state.location} onChangeText={location=>this.setState({location})}/>
              <View style={{borderWidth:1,borderColor:'#ABB2B9'}}></View>
            </View>
          </View>
          <View style={{flex:1,justifyContent:'flex-end'}}>
          <CardSection >
            <OtpButton >
              SAVE
            </OtpButton>
            </CardSection>
          </View>
      </ScrollView>
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
    width: 130,
    height: 130,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:95
  },
  TouchableOpacity:{
    width: 32,
    height: 32,
    borderRadius: 15,
    borderColor: "white",
    alignSelf:'center',
    position: 'absolute',
    backgroundColor:'#5ac3de',
    alignItems:'center',
    justifyContent:'center',
    marginTop:208
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
