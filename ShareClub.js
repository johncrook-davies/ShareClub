import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';

// Redux
import store from './redux/store';
import { 
    createConnection,
    initialiseDb,
    destroyConnection,
    tearDownDb
} from "./redux/actions";

import Dashboard from './views/dashboard';
import Investments from './views/investments.js';

const Tab = createBottomTabNavigator();

// Get the current color scheme
Appearance.getColorScheme();

const ShareClub = ({ createConnection, initialiseDb, destroyConnection, tearDownDb  }) => {
  const cs = useColorScheme(); //'dark';//'light';
  /*
    Initialisation
    - Create database connection
    - Create websocket connection
  */
  useEffect(() => {
    createConnection()
    initialiseDb()
  },[])
  /*
    Cleanup actions
    - Destroy database connection
    - Close websocket connection
  */
  useEffect(() => {
    return () => {
      tearDownDb()
      destroyConnection()
    }
  },[])
  return <NavigationContainer theme={cs === 'dark' ? DarkTheme : DefaultTheme}>{
    <AppearanceProvider>
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          />
        <Tab.Screen
          name="Investments"
          component={Investments}
          />
      </Tab.Navigator>
    </AppearanceProvider>
  }</NavigationContainer>
}

export default connect(
  (state) => state,
  { 
    createConnection,
    initialiseDb,
    destroyConnection,
    tearDownDb
  }
)(ShareClub)