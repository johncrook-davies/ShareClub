import React from 'react';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Stock from './investments/stocks';
import Types from './investments/types';
import Indices from './investments/indices';

import {
    Text,
    Image,
    Button,
    SafeAreaView
} from 'react-native';

const Stack = createStackNavigator();

const Investments = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Browse" component={Types} />
        <Stack.Screen name="Indices" component={Indices} />
        <Stack.Screen name="Stock" component={Stock} />
    </Stack.Navigator>
}

export default Investments