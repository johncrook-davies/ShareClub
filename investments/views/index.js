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

function StackScreen({title, component}) => 
  <Stack.Screen 
    name={title}
    component={component} 
    options={{
      headerTitleStyle: {
        fontFamily: 'Asap-Bold',
      },
    }}
    />

const Investments = () => {
  return <Stack.Navigator>
    <StackScreen title={"Browse"} component={Types}/>
    <StackScreen title={"Indices"} component={Indices}/>
    <StackScreen title={"Index"} component={Index} />
    <StackScreen title={"Stock"} component={Stock} />
  </Stack.Navigator>
}

export default Investments