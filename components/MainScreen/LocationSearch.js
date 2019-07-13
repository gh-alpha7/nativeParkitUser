
import React, {Component} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Image, TextInput, Dimensions } from 'react-native'
import NavigationIcon from './NavigationIcon'
import CurrentQr from './CurrentQr'

const {width: windowWidth} = Dimensions.get('window')
const width1 = windowWidth - 24 * 4
const width2 = windowWidth - 24

class LocationSearch extends Component {
  state={
    showPlacesList:false
  }
  //  changeHeight=async ()=>{
  //   await this.setState({height:0})
  //   // await this.setState({height:300})
  //
  // }
  render(){
   return (

    <View style={styles.container} >
    <NavigationIcon navMenu={this.props.navMenu}/>

    <GooglePlacesAutocomplete
      placeholder="Going to?"
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      listViewDisplayed={this.state.showPlacesList}
      textInputProps={{
       onFocus: () => this.setState({showPlacesList: true}),
       onBlur: () => this.setState({showPlacesList: false}),
    }}
      query={{
        key: 'AIzaSyAU9q24pb9M1oqCFTe8ZmIhsESOaup4lDA',
        language: 'en', // language of the results
      }}
      styles={{
        textInputContainer: styles.inputContainer,
        textInput: styles.input,
        listView:{
          backgroundColor:'white',
          width:width2,
          padding:10,
          zIndex:21
        }
      }}
      onPress={(data, details = null) => {
        // console.log(data);
        console.log("hey");
        let location=details.geometry.location
        this.props.changeLocation(location)
        // this.changeHeight()
      }}
      currentLocationLabel="Current location"
    />
    <CurrentQr qrModal={this.props.qrModal}/>


    </View>
  )
}
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    margin:10,
    zIndex: 10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#D5DBDB',
    elevation:10,
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center'
  },
  inputContainer:{
    backgroundColor: 'white',
    height:50,
    width:width1,
    borderRadius:10,
    marginLeft:16,
    zIndex: 10,
    paddingHorizontal: 50,
  },
  input:{
    fontSize: 16,
    marginTop:10,
    borderColor:'white',
  }

})


export default LocationSearch
