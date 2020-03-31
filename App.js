/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import syncroniser from './synchroniser';
import { schema } from './schema';
import seedDatabase from './seeds';

import Dashboard from './views/dashboard';
import store from './redux/store';

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
        /* 
        On unmount cleanup actions
            - Cleanup database
        */
        return () => {
            syncdb.close()
        }
    });
    
    return (
        <Provider store={store}>
            <SafeAreaView>
                <Dashboard/>
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  }
});

export default App;
