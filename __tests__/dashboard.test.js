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
    const syncdb = {get: jest.fn()}
    const db = {readyState: 'initialising', call: syncdb},
          conn = {ws: jest.fn(() => new Promise((r)=>r))}
    const store = mockStore({db, conn});
    const spy = jest.spyOn(syncdb, 'get');
        jest.clearAllMocks()
    renderer.create(<Provider store={store}><Dashboard /></Provider>);
});
