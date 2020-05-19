import 'react-native';
import { SafeAreaView } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { create, act } from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import Dashboard from '../views/dashboard';

const mockStore = configureMockStore([]);
const invitations = [
  {
    id: 1,
    name: 'Tess Yellanda',
    club: 'Original Pirate Investors'
  },
  {
    id: 2,
    name: 'Rob Brown',
    club: "Investors not haters"
  }
];
const clubs = [
  {
    id: 1,
    name: 'The jolly savers',
    value: 3456.64
  },
  {
    id: 2,
    name: 'Cash club',
    value: 10325
  }
];
const proposals = [
{
  id: 1,
  name: 'Dan James',
  trades: JSON.stringify([
    {
      name: "Higher Skin Industries",
      symbol: "HSK",
      type: 'buy',
      value: 837
    },
    {
      name: "Sudo Foods",
      symbol: "SUDO",
      type: 'buy',
      value: 223
    },
    {
      name: "Cash",
      symbol: "CASH",
      type: 'sell',
      value: -1000
    }
  ])
},
{
  id: 2,
  name: 'Dave Smith',
  trades: JSON.stringify([
    {
      name: 'Sydney Financial',
      symbol: 'SYDO',
      type: 'sell',
      value: -234
    },
    {
      name: 'Yoda Ku Technologies',
      symbol: 'YDKF',
      type: 'buy',
      value: 234
    }
  ])
}
];
const store = mockStore({
  clubs, proposals, invitations
});

describe('General behaviour', () => {
  let wrp,
      rendered;
  beforeEach(() => {
    act(() => {
      wrp = create(<Provider store={store}><Dashboard/></Provider>);
    })
    rendered = wrp.root.findByType(SafeAreaView);
  })
  it('renders component of type RCTSafeAreaView', () => {
    expect(
      wrp.toJSON().type
    ).toEqual('RCTSafeAreaView');
  });
  it('renders with more than one children', () => {
    expect(
      rendered.props.children.length
    ).not.toEqual(undefined);
  });
})