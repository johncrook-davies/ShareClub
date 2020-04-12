import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';

// Redux
import store from './redux/store';

import syncroniser from './synchroniser';
import { schema } from './schema';
import seedDatabase from './seeds';
import ShareClub from './ShareClub';

const App: () => React$Node = () => {
    
    // Initialisation and cleanup actions
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
            syncdb.update({invitations: [{id: 1, user: 'Dave', club: 'Clubs of stuff and things'}]});
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