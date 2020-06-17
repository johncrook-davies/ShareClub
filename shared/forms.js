import React from 'react';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import {
  View,
  TextInput,
  makeStyledText,
  colours as c,
} from '.';

const BaseTextInput = ({ 
  style,
  ...other
}) => {
  const cs = useColorScheme() === 'dark' ? 'dark' : 'light';
  return(
    <View
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 8,
        borderColor: c[cs].inputBorder,
        borderBottomWidth: 1,
      }}
      >
      <TextInput
        placeholder="Club name"
        placeholderTextColor={ c[cs].placeholderColour }
        style={[
          style,
          {
  
          }
        ]}
        { ...other }
        />
    </View>
  )
}

export const GenericInput = makeStyledText(({ 
  style,
  children,
  ...other
}) => (
  <BaseTextInput
    style={{
      fontSize: 15
    }}
    { ...other }
    >
    { children }
  </BaseTextInput>
))

export const HeadingInput = makeStyledText(({ 
  style,
  children,
  ...other
}) => (
  <BaseTextInput
    style={{
      fontSize: 35,
      fontFamily: 'Asap-Bold',
    }}
    { ...other }
    >
    { children }
  </BaseTextInput>
))


BaseTextInput.defaultProps = {
};

BaseTextInput.propTypes = {
  keyboardType: PropTypes.string.isRequired,
};