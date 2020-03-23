/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

import Dashboard from './views/dashboard';
import store from './redux/store';

const App: () => React$Node = () => {
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
