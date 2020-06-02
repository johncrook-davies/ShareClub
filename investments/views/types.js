import React from 'react';
import { useColorScheme } from 'react-native-appearance';

import {
  View,
  Section,
  P,
  H2,
  Div,
  Image,
  ImageAndText,
  makeStyledScreen,
  colours as c,
} from '../../shared';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Types = ({ navigation }) => {
  const isDark = useColorScheme() === 'dark';
  return <Div>
    <Section>
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
          <Icon 
            name={"bank"} 
            size={136}
            color={ 
              isDark ? c.dark.iconFill : c.light.iconFill
            }
            />
        }
        onPress={() => navigation.navigate('Indices',{title: 'Stock markets'})}
        style={{
          borderBottomColor: isDark ? c.dark.borderBottomColor : c.light.borderBottomColor,
          borderBottomWidth: 1
        }}
        />
    </Section>
  </Div>
}

export default makeStyledScreen(Types)