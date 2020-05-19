import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { 
  create,
  act
} from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import { Div } from '../../shared';

import Index from '../views/index_view';

const ind = 'FTSE';

const stocks = {
  bySymbol: {
    "ZCC-LN": {"created_at": "2020-05-03T12:49:34.986Z", "exchange_id": 1, "id": 7789, "latest_price": null, "name": "ZCCM Investments Holdings PLC Class B", "symbol": "ZCC-LN", "updated_at": "2020-05-03T12:49:34.986Z"}, 
    "ZEG-LN": {"created_at": "2020-05-03T12:49:35.352Z", "exchange_id": 1, "id": 7790, "latest_price": null, "name": "Zegona Communications Plc", "symbol": "ZEG-LN", "updated_at": "2020-05-03T12:49:35.352Z"}
  }
}
const indices = [{"created_at": "2020-05-03T12:58:05.691Z", "exchange_id": 1, "id": 2, "latest_price": "5936.0", "name": "FTSE 100", "stocks": ["III-LN", "ABF-LN", "ADM-LN", "AAL-LN", "ANTO-LN"], "symbol": "FTSE", "updated_at": "2020-05-08T13:53:57.968Z"}]

const mockStore = configureMockStore([]);

const store = mockStore({
  indices
});

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
})