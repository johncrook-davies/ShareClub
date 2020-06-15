import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';

import { 
  P,
  TouchableOpacity,
  GenericModal,
  colours as c
} from '.';

const ComingSoonModal = ({ visible, onClose }) => {
  return <GenericModal
    visible={ visible }
    >
      <P
        style={{ marginBottom: 16 }}
        >
        This button isn't working yet
      </P> 
      <GenericButton
        text="OK"
        working={ true }
        onPress={ onClose }
        />
    </GenericModal>
}

export const GenericButton = ({ 
  children, 
  text, 
  working,
  onPress,
  style, 
  ...other 
}) => {
  const cs = useColorScheme() === 'dark' ? 'dark' : 'light',
        [modalVisible, setModalVisible] = useState(false);
  return <>
    <TouchableOpacity
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
      onPress={ working ? onPress : () => setModalVisible(!modalVisible) }
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
    { 
      !working &&
      <ComingSoonModal
        visible={ modalVisible}
        onClose={ () => setModalVisible(!modalVisible) }
        />
    }
  </>
}

GenericButton.defaultProps = {
  working: false,
};

GenericButton.propTypes = {
  text: PropTypes.string,
  working: PropTypes.bool,
};