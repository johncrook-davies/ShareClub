import React, { useState, useEffect } from 'react';
import { Provider, connect  } from 'react-redux';
import { StyleSheet } from 'react-native';
import store from './redux/store';
import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';

import { initialiseDb, tearDownDb, } from "./db/actions";

import { createConnection, destroyConnection, } from "./websockets/actions";

import Dashboard from './dashboard/views/dashboard';
import Investments from './investments/views';

import { 
  colours,
  browse,
  new_trade,
  clubs,
  H1,
} from './shared';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// Get the current color scheme
Appearance.getColorScheme();

const styles = StyleSheet.create({
  light: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  dark: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  }
})

const theme = (appearance) => {
  if(appearance === 'dark') {
    return {
      dark: true,
      colors: {
        primary: colours.dark.navBarText,
        background: colours.dark.navBarBackground,
        card: colours.dark.navBarBackground,
        text: colours.light.navBarText,
        border: colours.dark.navBarBorder,
      }
    }
  } else {
    return {
      dark: false,
      colors: {
        primary: colours.light.navBarText,
        background: colours.light.navBarBackground,
        card: colours.light.navBarBackground,
        text: colours.light.navBarText,
        border: colours.light.navBarBorder,
      }
    }
  }
}
        

const ShareClub = ({ createConnection, initialiseDb, destroyConnection, tearDownDb  }) => {
  const appearance = useColorScheme() === 'dark' ? styles.dark : styles.light;
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
  return <NavigationContainer theme={ theme(useColorScheme()) }>{
    <AppearanceProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Clubs') {
              iconName = focused ? 'account-group' : 'account-group-outline';
            } else if (route.name === 'Investments') {
              iconName = focused ? 'chart-areaspline' : 'chart-line';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colours.light.navBarActive,
          inactiveTintColor: colours.light.navBarInactive,
          style: {}
        }}
        >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          />
        <Tab.Screen
          name="Investments"
          component={Investments}
          />
        <Tab.Screen
          name="Clubs"
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

const App: () => React$Node = () =>
  <Provider store={store}>
    <ConnectedShareClub/>
  </Provider>

export default App;