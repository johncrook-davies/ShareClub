import 'react-native';
import React from 'react';
import { syncdb, store } from '../setupTests';
import { Provider } from 'react-redux';
import { 
  create,
  act
} from 'react-test-renderer';

import { Div } from '../shared';

import Index from '../views/investments/index_view';

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
      wrp = create(
        <Provider store={store}>
          <Index
            route={{params: {symbol: 'FTSE'}}}
            />
        </Provider>
      );
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