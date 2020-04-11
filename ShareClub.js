import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import store from './redux/store';
import { 
    getConnection
} from "./redux/selectors";
import { 
    createConnection,
    destroyConnection
} from "./redux/actions";

import Dashboard from './views/dashboard';
import Investments from './views/investments';

const Tab = createBottomTabNavigator();

const mapStateToProps = state => {
    const connection = getConnection(state);
    return { connection }
}

const ShareClub = ({ createConnection, destroyConnection }) => {
    // Initialisation and cleanup actions
    useEffect(() => {
        // Create websocket connection
        createConnection()
        return () => {
            // Close websocket connection
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