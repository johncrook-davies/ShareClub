import React, { useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

import {
  Section,
  makeStyledScreen,
  colours as c,
  GenericButton,
  HeadingInput,
  GenericInput,
  BaseForm,
} from '../../shared';

import {
  TextInput,
  makeStyledText,
} from '../../shared';

const ClubLayout = ({ heading, members }) => 
  <Section>
    { heading }
    { members }
  </Section>

const NewClub = ({ settings }) => {
  return <Section>
    <BaseForm>
      <HeadingInput
        name='name'
        placeholder="Club name"
        keyboardType='default'
        textContentType='none'
        style={{
          textAlign: 'center'
        }}
        /> 
      <GenericInput
        name='test'
        placeholder="test"
        keyboardType='default'
        textContentType='none'
        /> 
    </BaseForm>
  </Section>
}

export default connect(
  (state) => state, 
  {  } 
)(makeStyledScreen(NewClub))