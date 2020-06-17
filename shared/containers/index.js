import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { compose } from 'recompose';

import { Div, colours } from '..';


const makeDarkmodeableText = BaseComp => ({
  style, 
  ...props
}) => 
  <BaseComp 
    {...props} 
    style={
      [
        style, 
        useColorScheme() === 'dark' ? 
          {
            color: colours.dark.color,
            borderColor: colours.dark.borderColor,
          } : 
          {
            color: colours.light.color,
            borderColor: colours.light.borderColor,
          }
      ]
    }
    />

const makeStandardisedText = BaseComp => ({
  style, 
  ...props
}) => 
  <BaseComp 
    {...props} 
    style={
      [
        style, 
        {
          fontSize: 14
        }
      ]
    }
    />

const makeDarkmodeableScreen = BaseComp => ({
  style, 
  ...props
}) => 
  <Div 
    style={[
      {height: '100%', width: '100%'},
      useColorScheme() === 'dark' ? 
        { backgroundColor: colours.dark.background } : 
        { backgroundColor: colours.light.background }
    ]}
    >
  <BaseComp 
    {...props} 
    style={
      [
        style
      ]
    }
    />
  </Div>

export const makeStyledScreen = compose(makeDarkmodeableScreen);
export const makeStyledText = compose(
  makeDarkmodeableText, 
  makeStandardisedText
);