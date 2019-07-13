import React, {Component} from 'react';
import { Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';

export default class OtpButton extends Component {

  render(){
    const { buttonStyle, textStyle } = styles;
    return (
      <TouchableOpacity onPress={this.props.onPress} style={buttonStyle}>
        {this.props.loading?<ActivityIndicator size="large" color="#fff" />:
          <Text style={textStyle}>
            {this.props.children+' '}
          </Text>}
      </TouchableOpacity>
    )
  }
};

const styles = {
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
    alignSelf: 'stretch',
    backgroundColor: '#4630eb',
    borderColor:"#4630eb",
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5
  }
};
