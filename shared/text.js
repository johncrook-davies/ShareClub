import React from 'react';
import {
  Text,
  View,
  setStyle,
  colours
} from '.';
import { makeStyledText } from './containers';

export const P = makeStyledText(({ children, style, ...other }) => {
    return <Text
              style={style}
              {...other}
              >
        { children }
    </Text>
})
export const H1 = makeStyledText(({ children, style, ...other }) => (
    <Text 
        style={[style, {fontSize: 35}]}
        { ...other }
        >
        { children }
    </Text>
))
export const H2 = makeStyledText(({ children, style, ...other  }) => (
    <Text
        style={[
          style, 
          {
            marginBottom: 16,
            fontSize: 19, 
            fontFamily: 'Asap-Bold',
          }
        ]}
        { ...other }
        >
        { children }
    </Text>
))

export const Currency = makeStyledText(({ children, style, ...other }) => {
    const roundedN = Math.round(children*100)/100;
    var stringN = String(roundedN),
        splitStringN,
        stringLength,
        i = 0;
    // Add decimal points for integers
    stringN.indexOf('.') === -1 ? stringN += '.00' : null;
    // Add zerowhen only 1dp
    stringN.indexOf('.') === stringN.length - 2 ? stringN += '0' : null;
    splitStringN = stringN.split('');
    stringLength = splitStringN.length - 1;
    // Add commas for thousand separators
    stringN = '';
    splitStringN.reverse().map((s)=>{
        if( i <= 3 ){
            stringN += s;
        } else if( i % 3 === 0 ) {
            stringN += `,${s}`;
        } else {
            stringN += s;
        }
        i ++;
    })
    return <Text 
              style={style}
              { ...other }
               >
        {`£${stringN.split('').reverse().join('')}`}
    </Text>
})