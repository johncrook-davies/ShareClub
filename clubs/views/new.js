import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

import {
  H1,
  makeStyledScreen,
  colours as c,
  GenericButton,
} from '../../shared';

const NewClub = ({}) => {
  const cs = useColorScheme() === 'dark' ? 'dark' : 'light';
  return <H1>
    Create a new club
  </H1>
}

export default makeStyledScreen(NewClub)