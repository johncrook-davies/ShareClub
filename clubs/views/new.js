import React from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

import {
  Section,
  makeStyledScreen,
  colours as c,
  GenericButton,
  HeadingInput,
  GenericInput,
} from '../../shared';

import {
  TextInput,
  makeStyledText,
} from '../../shared';

const NewClub = ({}) => {
  const cs = useColorScheme() === 'dark' ? 'dark' : 'light';
  return <Section>
    <HeadingInput
      keyboardType='default'
      />
  </Section>
}

export default makeStyledScreen(NewClub)