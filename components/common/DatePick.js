import React from 'react';
import { TextInput, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker'
const Input = ({ label,value,onDateChange, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {label?<Text style={labelStyle}>{label}</Text>:null}
      <DatePicker
        date={value}
        mode="datetime"
        placeholder="Select Date"
        format="DD-MM-YYYY HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
            alignItems: 'flex-start',
            borderWidth:0
          }
        }}
        onDateChange={onDateChange}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default Input;
