import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { compose } from 'recompose';

import { colours } from '..';

const cs = StyleSheet.create({
  dark: {
    color: colours.dark.color,
    borderColor: colours.dark.borderColor,
  },
  light: {
    color: colours.light.color,
    borderColor: colours.light.borderColor,
  },
});

const makeDarkmodeable = BaseComp => ({
  style, 
  ...props
}) => 
  <BaseComp 
    {...props} 
    style={
      [
        style, 
        useColorScheme() === 'dark' ? cs.dark : cs.light
      ]
    }
    />

export const makeStyled = compose(makeDarkmodeable);