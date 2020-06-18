import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import {
  View,
  TextInput,
  makeStyledText,
  colours as c,
} from '.';

export const BaseForm = ({
  children
}) => {
  const [inputs, setInputs] = useState({})
  // REMOVE IN PRODUCTION
  console.log(inputs);
  // REMOVE ABOVE IN PRODUCTION
  return <>
    {
      React.Children.map(
        children, 
        (c,i) => {
          const { name, placeholder } = c.props;
          return React.cloneElement(
            c,
            {
              onChangeText: (text) => setInputs({
                ...inputs,
                [name]: text
              })
            },
            []
          )
        } 
      )
    }
  </>
}

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
        placeholderTextColor={ c[cs].placeholderColour }
        style={[
          style,
          {
  
          }
        ]}
        defaultValue={ null }
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
    style={[
      style,
      {
        fontSize: 15
      }
    ]}
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
    style={[
      style,
      {
        fontSize: 35,
        fontFamily: 'Asap-Bold',
      }
    ]}
    { ...other }
    >
    { children }
  </BaseTextInput>
))


BaseTextInput.defaultProps = {
};

BaseTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  keyboardType: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  textContentType: PropTypes.string.isRequired,
};