import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import syncroniser from './synchroniser';
import { schema } from './schema';
import seedDatabase from './seeds';
import Dashboard from './views/dashboard';
import Investments from './views/investments';
import store from './redux/store';

const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
    const [db, setDb] = useState(null);
    
    useEffect(() => {
        // Initialise database
        const syncdb = new syncroniser({
            database: "offlineDatabase.db",
            size: 200000,
            schema: schema
        },
        true);
        syncdb.initDb(() => {
            __DEV__ ? seedDatabase(syncdb) : null;
            syncdb.get(
                {all: 'invitations', where: {club: {isEqualto: "Original Pirate Investors"}, invitation_id: {isEqualto: 0}}}
            ).then((r) => console.log(r) )
        })
        // On unmount cleanup database
        return () => {
            syncdb.close()
        }
    });
    
    return <Provider store={store}>
        <NavigationContainer>{
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
    </Provider>
};

export default App;
