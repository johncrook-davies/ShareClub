import React from 'react';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';

import { 
  Section,
  Modal,
  View,
  colours as c,
} from '.';

export const GenericModal = ({ 
  children, 
  visible,
  style,
  ...other 
}) => {
  const cs = useColorScheme() === 'dark' ? 'dark' : 'light';
  return <Modal
    animationType="slide"
    transparent={ true }
    visible={ visible }
    { ...other }
    >
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
      <View
        style={[
          style,
          {
            alignItems: 'center',
            padding: 12,
            backgroundColor: c[cs].modalBackground,
            borderRadius: 4,
            shadowColor: c[cs].modalShadow,
            shadowOffset: {
              width: 1,
              height: 2
            },
            shadowOpacity: c[cs].modalShadowOpacity,
            shadowRadius: 4,
          }
        ]}
        >
        { children }
      </View>
    </View>
  </Modal>
}

GenericModal.defaultProps = {
};

GenericModal.propTypes = {
  children: PropTypes.element.isRequired,
};