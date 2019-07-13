import React from 'react';
import { Animated, Easing, View, Linking, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './common/Button';
import CardSection from './common/CardSection';

export default class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start();
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

  render() {
    return (
      <View style={{flex:1}}>
        <LottieView source={require('../assets/json/success.json')} progress={this.state.progress}  style={{transform:[{scale:1.5}]}}/>
        <View style={styles.fab}>
            <Button onPress={this.navigate.bind(this,this.props.navigation.getParam('selectedLoc'))}>
              Navigate
            </Button>
            <Button onPress={()=>{this.props.navigation.navigate('DrawerNavigator')}}>
              Home
            </Button>
        </View>

      </View>
    );
  }
}
const styles={
  fab: {
    flexDirection:'row',
    width:'100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    elevation: 8
  }
}
