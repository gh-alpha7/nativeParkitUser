import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';

import { StyleSheet, View, TextInput, Text, BackHandler } from 'react-native';

export default class HelloWorld extends Component {


  render() {
    console.log("userid",global.user.uid);
    return (
          <QRCode
            value={this.props.value}
            size={200}
            bgColor='purple'
            fgColor='white'/>
    );
  }
}
