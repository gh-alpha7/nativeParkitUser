import React from 'react';
import { TextInput, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker'
const Input = ({ label,value,onDateChange, placeholder, secureTextEntry, mode, format }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
      <DatePicker
        date={value}
        mode={mode}
        placeholder="Select Date"
        format={format}
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
  );
};

const styles = {


};

export default Input;
