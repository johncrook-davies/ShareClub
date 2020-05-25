import React from 'react';
import { useColorScheme } from 'react-native-appearance';

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
  makeStyledScreen
} from '../../shared';

const Types = ({ navigation }) => {
  return <Div>
    <ImageAndText
      text={
        <>
          <H2>Stock markets</H2>
          <P>
              Stock markets are where public companies raise capital.
          </P>
        </>
      }
      image={
        <Image style={{ width: 136, height: 136, borderWidth: 1, borderRadius: 3 }} />
      }
      onPress={() => navigation.navigate('Indices')}
      />
  </Div>
}

export default makeStyledScreen(Types)