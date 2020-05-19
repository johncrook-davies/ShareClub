import 'react-native';
import { Div } from '../../shared';
import React from 'react';
import { Provider } from 'react-redux';
import { 
    create,
    act,
    findAllInRenderedTree
} from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import Types from '../views/types';

const mockStore = configureMockStore([]);

const store = mockStore({});

describe('General behaviour', () => {
    let wrp,
        rendered;
    beforeEach(() => {
        act(() => {
            wrp = create(<Provider store={store}><Types/></Provider>);
        })
        rendered = wrp.root.findByType(Div);
    })
    it('renders component of type RCTSafeAreaView', () => {
        expect(
            wrp.toJSON().type
        ).toEqual('RCTSafeAreaView');
    });
    it.skip('renders with more than one children', () => {
        expect(
            rendered.props.children.length
        ).not.toEqual(undefined);
    });
})