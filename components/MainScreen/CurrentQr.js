import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'


// Expand the touch target around the icon
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export default class CurrentQr extends Component {


  qrModal=()=>{
    this.props.qrModal()
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        hitSlop={hitSlop}
        onPress={this.qrModal}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/images/qr.png")}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 20,
    right:20,
  },
  icon: {
    width: 25,
    height: 25,
  },
})
