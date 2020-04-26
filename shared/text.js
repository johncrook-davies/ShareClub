import React from 'react';
import {
    Text,
    setStyle,
    colours
} from '.';

export const P = ({ children, cs, styles, ...other }) => {
    return <Text
               style={setStyle(cs,'p', styles)}
               {...other}
               >
        { children }
    </Text>
}

export const H1 = ({ children, cs }) => {
    const styles = {
              fontSize: 35
          }; 
    return <Text 
            style={setStyle(cs,'h1', styles)}
            >
        { children }
    </Text>
}
export const H2 = ({ children, cs }) => {
    const styles = {
              fontSize: 19,
              marginBottom: 16
          };
    return <Text
            style={setStyle(cs,'h2', styles)}
            >
        { children }
    </Text>
}

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