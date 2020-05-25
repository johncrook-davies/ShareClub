import React from 'react';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Stock from './stock';
import Types from './types';
import Indices from './indices';
import Index from './index_view';

import {
  Text,
  Image,
  Button,
  SafeAreaView,
  H1,
} from 'react-native';

const Stack = createStackNavigator();

const screens = [
  { title: 'Browse', component: Types },
  { title: 'Indices', component: Indices },
  { title: 'Index', component: Index },
  { title: 'Stock', component: Stock }
];

const Investments = () => {
  return <Stack.Navigator>
    {
    screens.map((s) => (
      <Stack.Screen 
        name={s.title}
        key={s.title}
        component={s.component} 
        options={{
          headerTitleStyle: {
            fontFamily: 'Asap-Bold',
          },
        }}
        />
    ))
    }
  </Stack.Navigator>
}

export default Investments