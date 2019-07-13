import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

const Button = ({ onPress, children, source }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
    <Image
      style={styles.icon}
      source={source}
    />
      <Text style={textStyle}>
        {children+' '}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    paddingLeft:7,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
  },
  buttonStyle: {
    flexDirection:'row',
    margin:10,
    marginLeft:5,
    justifyContent:'center',
    alignItems:'center',
    height:35,
    width:110,
    backgroundColor: '#007aff',
    borderRadius: 40,
  },
  icon:{
    height:14,
    width:14
  }
};

export default Button;
