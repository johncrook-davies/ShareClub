import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, Appearance, useColorScheme } from 'react-native-appearance';

// DB
import Synchroniser from './db/synchroniser';
import { schema } from './db/schema';
import seedDatabase from './db/seeds';
import { syncWithDatabase } from './db/sync_with_server';

// Redux
import store from './redux/store';
import { 
    createConnection,
    createDbConnection,
    destroyConnection,
    destroyDbConnection
} from "./redux/actions";

import Dashboard from './views/dashboard';
import Investments from './views/investments.js';

const Tab = createBottomTabNavigator();

const initDbConnection = async () => {
    const syncdb = new Synchroniser({
        database: "offlineDatabase.db",
        size: 200000,
        schema: schema
    },
    true);
    await syncdb.initDb()
        .catch(() => {
            throw new Error('Could not initialise database')
        })
    return syncdb
};

// Get the current color scheme
Appearance.getColorScheme();

const ShareClub = ({ createConnection, createDbConnection, destroyConnection, destroyDbConnection  }) => {
    const cs = useColorScheme(); //'dark';//'light';
    /*
        Initialisation
        - Create database connection
        - Create websocket connection
    */
    useEffect(() => {
        createConnection()
        initDbConnection().then(async (db) => {
            await __DEV__ ? seedDatabase(db) : null;
            await syncWithDatabase(db)
            return db
        }).then((db) => createDbConnection(db))
    },[])
    /*
        Cleanup actions
        - Destroy database connection
        - Close websocket connection
    */
    useEffect(() => {
        return () => {
            destroyDbConnection()
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
        createDbConnection,
        destroyConnection,
        destroyDbConnection
    }
)(ShareClub)