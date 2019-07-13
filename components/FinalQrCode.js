import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';

import { StyleSheet, View, TextInput, Text, BackHandler } from 'react-native';

export default class HelloWorld extends Component {


  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}>
          <QRCode
            value={this.props.navigation.getParam('FinalQr')}
            size={200}
            bgColor='purple'
            fgColor='white'/>
      </View>
    );
  }
}
