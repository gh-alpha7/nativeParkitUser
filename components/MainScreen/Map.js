import React from 'react';
import MapView from 'react-native-maps';
import { Image, TouchableHighlight,  } from 'react-native';
  const location=[{latitude: 23.99,longitude: 85.3},{latitude: 12.9,longitude: 77.6 },{latitude: 12.9,longitude: 77.6}]
const CustomDrawerComponent = (props)=>{
  console.log(props.markers,"markers");
  return (
    <MapView
    style={{ flex: 1}}
    showsUserLocation
    initialRegion={props.mapRegion}
    region={props.mapRegion}
    onRegionChangeComplete={props._onRegionChangeComplete}
    >
    {props.points.map(loc=>(<MapView.Marker
    coordinate={{latitude:parseFloat(loc.Lat),longitude:parseFloat(loc.Lon)}}
    title={loc.Name}
    onPress={()=>{props.rbSheetClick(loc)}}
    >
        <Image source={require("../../assets/images/marker.png")} style={{height:50,width:50}}/>
    </MapView.Marker>))}

  </MapView>
)}
export default CustomDrawerComponent
