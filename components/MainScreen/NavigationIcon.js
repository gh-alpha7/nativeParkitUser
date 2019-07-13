import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'


// Expand the touch target around the icon
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export default class NavigationIcon extends Component {


  navMenu=()=>{
    this.props.navMenu()
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        hitSlop={hitSlop}
        onPress={this.navMenu}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/images/navicon.png")}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 20,
    marginLeft:10
  },
  icon: {
    width: 31,
    height: 31,
  },
})
