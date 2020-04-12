import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import store from './redux/store';
import { 
    createConnection,
    destroyConnection
} from "./redux/actions";

import Dashboard from './views/dashboard';
import Investments from './views/investments/investments';

const Tab = createBottomTabNavigator();

const ShareClub = ({ createConnection, destroyConnection }) => {
    // Initialisation
    // Create websocket connection
    useEffect(() => {
        
        createConnection()
    })
    // Cleanup actions
    // Close websocket connection
    useEffect(() => {
        return () => {
            destroyConnection()
        }
    })
    return <NavigationContainer>{
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
    }</NavigationContainer>
}

export default connect(
    null,
    { 
        createConnection,
        destroyConnection
    }
)(ShareClub)