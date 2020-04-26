import 'react-native';
import {
    SafeAreaView,
    Text
} from 'react-native';
import React from 'react';
import { syncdb, store } from '../setupTests';
import { Provider } from 'react-redux';
import { 
    create,
    act,
    findAllInRenderedTree
} from 'react-test-renderer';

import Dashboard from '../views/dashboard';

var spy;

beforeAll(() => {
    spy = jest.spyOn(syncdb, 'get')
})
beforeEach(() => spy.mockClear())  

describe('General behaviour', () => {
    let wrp,
        rendered;
    beforeEach(() => {
        act(() => {
            wrp = create(<Provider store={store}><Dashboard/></Provider>);
        })
        rendered = wrp.root.findByType(SafeAreaView);
    })
    it('renders with more than one children', () => {
        expect(
            rendered.props.children.length
        ).toBeGreaterThan(1);
    });
    it('calls get', () => {
        expect(
            spy
        ).toHaveBeenCalledWith({"all": "clubs"});
    });
})