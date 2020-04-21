import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import store from './redux/store';
import { 
    initDbConnection,
    createConnection,
    createDbConnection,
    destroyConnection,
    destroyDbConnection
} from "./redux/actions";

import Dashboard from './views/dashboard';
import Investments from './views/investments/investments';

const Tab = createBottomTabNavigator();

const ShareClub = ({ createConnection, destroyConnection, initDbConnection, destroyDbConnection  }) => {
    /*
        Initialisation
        - Create database connection
        - Create websocket connection
    */
    useEffect(() => {
        initDbConnection()
        createConnection()
    },[])
    /*
        Cleanup actions
        - Destroy database connection
        - Close websocket connection
    */
    useEffect(() => {
        return () => {
//            destroyDbConnection()
            destroyConnection()
        }
    },[])
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
        initDbConnection,
        destroyConnection,
        destroyDbConnection
    }
)(ShareClub)