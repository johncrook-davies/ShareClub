import 'react-native';
import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Dashboard from '../views/dashboard';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const middlewares = [thunk],
      mockStore = configureMockStore([]);

it('renders correctly', () => {
    const store = mockStore({proposals: [], invitations: [], clubs: [], connection: 'thing'});
    renderer.create(<Provider store={store}><Dashboard /></Provider>);
});
