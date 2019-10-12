import React, {Component} from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Animated, Easing, Linking, Image, AsyncStorage, ToastAndroid, KeyboardAvoidingView, Stat,Modal, TouchableWithoutFeedback} from 'react-native';
import Button from './common/Button';
import OtpButton from './common/OtpButton';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import AddVehicle from './AddVehicle'
import LinearGradient from 'react-native-linear-gradient';
import db from './firebaseConfig'

export default class LoginForm extends Component {
  state={
    addVisible:false,
    details:[]
  }
  componentDidMount(){
    db.collection("users").where("phn_number", "==", global.user.phn_number).get().then((querySnapshot) => {
        if(querySnapshot.size==1)
        querySnapshot.forEach(doc=>{
          let d=doc.data()
          console.log("*****************profile",d);
          this.setState({details:d.vehicle||[]})
        })
    })
  }
  deleteDetail=(index)=>{
    let prevState=[...this.state.details]
    prevState.splice(index,1)
    this.updateData(prevState)
    this.setState({details:prevState})
    console.log(prevState,"delete");

  }

  addDetails=(data)=>{
    this.updateData([...this.state.details,data])
    this.setState(prevState=>({details:[...prevState.details,data],addVisible:false}))
  }

  updateData=(vehicle)=>{
    db.collection('users').doc(global.user.uid).update({vehicle}).then((d)=>{
      ToastAndroid.show('Update Successful', ToastAndroid.SHORT);

    })
    .catch(err=>{
      ToastAndroid.show('Update failed', ToastAndroid.SHORT);

    })
  }


  render() {
    let data=this.props.navigation.getParam('CompleteDetail')

    return (
            <LinearGradient   colors={['#007aff', '#2471A3']} style={{flex:1,justifyContent:'space-between'}}>
              <View style={{marginTop:40,height:100,justifyContent:"space-between",alignItems:"center"}}>
                <View style={{alignItems:"center"}}>
                  <Text style={{fontSize:30,color:"#fff"}}>{"Add Vehicles "}</Text>
                </View>
              </View>

              <View style={{flex:1,backgroundColor:"#fff",borderTopLeftRadius:50,borderTopRightRadius:50}} >
                <View style={{marginTop:20,padding:40}}>

                  <View style={{marginTop:20}}>

                    <TouchableOpacity onPress={()=>{this.setState({addVisible:true})}}>
                      <View style={{flexDirection:'row',justifyContent:'flex-start',borderWidth:1,borderColor:'#ABB2B9',borderRadius:35,padding:5}}>
                        <Image style={styles.add} source={require("../assets/images/plus.png")}/>
                        <Text style={{fontSize:22,alignSelf:'center',paddingLeft:10}}>Add Vehicles</Text>
                      </View>

                    </TouchableOpacity>
                  </View>
                </View>
                {
                  this.state.details.map((d,index)=>(

                    <View style={{margin:20,padding:20,justifyContent:'space-between',flexDirection:'row',marginTop:10,borderWidth:1,borderColor:'#D5DBDB',borderRadius:10,padding:5}}>
                    <View >
                    <Text style={{fontSize:15,paddingLeft:5}}>{d.name}</Text>
                    <Text style={{fontSize:24,paddingLeft:5}}>{d.number}</Text>
                    </View>
                    <TouchableOpacity  onPress={()=>{this.deleteDetail(index)}}>
                    <Image  style={{width:15,height:15,alignSelf:'center'}} source={require("../assets/images/bin.png")}/>
                    </TouchableOpacity>
                    </View>
                  ))
                }


              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.addVisible}
                onRequestClose={() => {
                  this.setState({addVisible:false})
                }}>
                <TouchableOpacity
                onPressOut={() => {this.setState({addVisible:false})}}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                  <TouchableWithoutFeedback>
                  <View style={{height:300,width:300,backgroundColor:'white',borderRadius:10}}>
                    <AddVehicle onPress={this.addDetails}/>
                  </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>
            </LinearGradient>
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
  },
  info:{
    fontSize:12,
    color: "#ABB2B9",
    marginTop:10,
    marginBottom:10
  },
  add:{
    width:40,
    height:40
  }
};
