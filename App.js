import React, { useState, useEffect } from 'react';
import { Provider, connect  } from 'react-redux';
import store from './redux/store';
import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';

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
  useEffect(() => {
    createConnection()
    initialiseDb()
  },[])
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

const ConnectedShareClub = connect(
  (state) => state,
  { 
    createConnection,
    initialiseDb,
    destroyConnection,
    tearDownDb
  }
)(ShareClub)

const App: () => React$Node = () => {
    return <Provider store={store}>
        <ConnectedShareClub/>
    </Provider>
};

export default App;