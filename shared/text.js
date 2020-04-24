import React from 'react';
import {
    Text
} from 'react-native';

export const H1 = (props) => {
    const { children } = props,
          styles = {
              fontSize: 35
          };
    return(
        <Text style={styles}>{ children }</Text>
    )
}
export const H2 = (props) => {
    const { children } = props,
          styles = {
              fontSize: 19,
              marginBottom: 16
          };
    return(
        <Text style={styles}>{ children }</Text>
    )
}

export const Currency = ({children, ...other}) => {
    const n = children;
    const roundedN = Math.round(n*100)/100;
    var stringN = String(roundedN),
        splitStringN,
        stringLength,
        i = 0;
    // Add decimal points for integers
    Number.isInteger(n) ? stringN += '.00' : null;
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
    return( 
        <Text { ...other }>
            {`£${stringN.split('').reverse().join('')}`}
        </Text>
    )
}