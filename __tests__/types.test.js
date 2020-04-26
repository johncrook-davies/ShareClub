import 'react-native';
import { Div } from '../shared';
import React from 'react';
import { syncdb, store } from '../setupTests';
import { Provider } from 'react-redux';
import { 
    create,
    act,
    findAllInRenderedTree
} from 'react-test-renderer';

import Types from '../views/investments/types';

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
            wrp = create(<Provider store={store}><Types/></Provider>);
        })
        rendered = wrp.root.findByType(Div);
    })
    it('renders with more than one children', () => {
        expect(
            rendered.props.children.length
        ).toBeGreaterThan(1);
    });
})