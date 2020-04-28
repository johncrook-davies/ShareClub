import React from 'react';
import {
    Text,
    View,
    setStyle,
    colours
} from '.';

export const P = ({ children, cs, style, ...other }) => {
    return <Text
               style={setStyle(cs,'p', style)}
               {...other}
               >
        { children }
    </Text>
}

export const H1 = ({ children, cs, style, ...other }) => (
    <Text 
        style={setStyle(cs,'h1', {
            fontSize: 35,
            ...style
        })}
        { ...other }
        >
        { children }
    </Text>
)
export const H2 = ({ children, cs, style, ...other  }) => (
    <Text
        style={setStyle(cs,'h2', {
            fontSize: 19,
            ...style
        })}
        { ...other }
        >
        { children }
    </Text>
)

export const Currency = ({ children, cs, styles, ...other }) => {
    const roundedN = Math.round(children*100)/100;
    var stringN = String(roundedN),
        splitStringN,
        stringLength,
        i = 0;
    // Add decimal points for integers
    Number.isInteger(children) ? stringN += '.00' : null;
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
               style={setStyle(cs,'currency', styles)}
               { ...other }
               >
        {`£${stringN.split('').reverse().join('')}`}
    </Text>
}