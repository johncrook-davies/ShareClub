import 'react-native';
import { Div } from '../../shared';
import React from 'react';
import { Provider } from 'react-redux';
import { 
    create,
    act,
} from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import Indices from '../views/indices';

const indices = [{"created_at": "2020-05-03T12:58:05.691Z", "exchange_id": 1, "id": 2, "latest_price": "5936.0", "name": "FTSE 100", "stocks": ["III-LN", "ABF-LN", "ADM-LN", "AAL-LN", "ANTO-LN"], "symbol": "FTSE", "updated_at": "2020-05-08T13:53:57.968Z"}]

const mockStore = configureMockStore([]);

const store = mockStore({
  indices
});

describe('General behaviour', () => {
    let wrp,
        rendered;
    beforeEach(() => {
        act(() => {
            wrp = create(<Provider store={store}><Indices/></Provider>);
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