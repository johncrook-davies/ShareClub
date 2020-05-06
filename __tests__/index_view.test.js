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

const ind = 'FTSE';
var spy;

beforeAll(() => {
  spy = jest.spyOn(syncdb, 'get')
})
beforeEach(() => spy.mockClear())  

describe('General behaviour', () => {
  let wrp,
      rendered;
  beforeEach(async () => {
    await act(() => {
      wrp = create(
        <Provider store={store}>
          <Index
            route={{params: {symbol: ind}}}
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
  it('renders with more than zero children', () => {
    expect(
      rendered.props.children.length
    ).toBeGreaterThan(0);
  });
  it('calls get', () => {
    expect(
      spy
    ).toHaveBeenNthCalledWith(1, {"all": "indices", "where": {"symbol": {"isEqualTo": ind}}});
  });
})