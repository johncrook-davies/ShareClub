import React from 'react';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';

import { 
  P,
  TouchableOpacity,
  colours as c
} from '.';

export const GenericButton = ({ 
  children, 
  text, 
  working,
  onPress,
  style, 
  ...other 
}) => {
  const cs = useColorScheme() === 'dark' ? 'dark' : 'light';
  return <TouchableOpacity
    style={ [ 
      style,
      {
        alignSelf: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: c[cs].buttonBackground,
        borderWidth: 4,
        borderRadius: 99999,
        borderColor: c[cs].buttonBorder,
      }
    ] }
    onPress={ working ? onClick : () => console.log('not working')}
    { ...other }
    >
    { 
      !!text 
      && 
      <P 
        style={{ color: c[cs].buttonText }}
        >
        { text }
      </P> 
    }
    { children }
  </TouchableOpacity>
}

GenericButton.defaultProps = {
  working: false,
};

GenericButton.propTypes = {
  text: PropTypes.string,
  working: PropTypes.bool,
};