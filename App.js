import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import configureStore from './redux/store';

import ShareClub from './ShareClub';

const store = configureStore();

const App: () => React$Node = () => {
    return <Provider store={store}>
        <ShareClub/>
    </Provider>
};

export default App;