import 'react-native';
import React from 'react';
import { syncdb, store } from './setupTests';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import Dashboard from '../views/dashboard';

var spy;

beforeAll(() => spy = jest.spyOn(syncdb, 'get'))
beforeEach(() => spy.mockClear())  

describe('General behaviour', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = renderer.create(<Provider store={store}><Dashboard/></Provider>);
    })
    it('renders correctly', () => {
        expect(spy).toHaveBeenCalled()
    });
})
