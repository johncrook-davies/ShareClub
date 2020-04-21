import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import store from './redux/store';

import ShareClub from './ShareClub';

const App: () => React$Node = () => {
    return <Provider store={store}>
        <ShareClub/>
    </Provider>
};

export default App;