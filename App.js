import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';

// Redux
import store from './redux/store';

import Synchroniser from './synchroniser';
import { schema } from './schema';
import seedDatabase from './seeds';
import ShareClub from './ShareClub';

const App: () => React$Node = () => {
    
    // Initialisation and cleanup actions
    useEffect(() => {
        // Initialise database
        const syncdb = new Synchroniser({
            database: "offlineDatabase.db",
            size: 200000,
            schema: schema
        },
        true);
        syncdb.initDb()
            .then(() => {
                __DEV__ ? seedDatabase(syncdb) : null;
            })
            .catch(() => {
                throw new Error('Could not initialise database')
            })
        // On unmount cleanup database
        return () => {
            // Close database connection
            syncdb.close()
        }
    });
    
    return <Provider store={store}>
        <ShareClub/>
    </Provider>
};

export default App;