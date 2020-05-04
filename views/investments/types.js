import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Appearance, useColorScheme } from 'react-native-appearance';

import {
  View,
  ScrollView,
  Section,
  P,
  H1,
  H2,
  Div,
  Image,
  ImageAndText,
  setStyle
} from '../../shared';

const Types = ({ navigation }) => {
  const cs = useColorScheme();
  return <Div cs={cs}>
    <ImageAndText
      cs={cs}
      text={
        <>
          <H2 cs={cs}>Stock markets</H2>
          <P cs={cs}>
              Stock markets are where public companies raise capital.
          </P>
        </>
      }
      image={
        <Image style={setStyle(cs,'outline',{ width: 136, height: 136, borderWidth: 1, borderRadius: 3 })} />
      }
      onPress={() => navigation.navigate('Indices')}
      />
  </Div>
}

export default Types