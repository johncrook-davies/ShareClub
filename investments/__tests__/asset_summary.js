import 'react-native';
import React from 'react';
import { 
  create,
  act
} from 'react-test-renderer';

import { TouchableOpacity } from '../../shared';

import AssetSummary from '../views/asset_summary';

describe('General behaviour', () => {
  let wrp,
      rendered;
  beforeEach(() => {
    act(() => {
      wrp = create(
        <AssetSummary
          type={ 'Stock' }
          name={ 'Stock One' }
          symbol={ 'STON' }
          latest_price= { 364.2443 }
          />
      );
    })
    rendered = wrp.root.findByType(TouchableOpacity);
  })
  it('renders component of type View', () => {
    expect(
      wrp.toJSON().type
    ).toEqual('View');
  });
  it('renders with more than one children', () => {
    expect(
      rendered.props.children.length
    ).not.toEqual(undefined);
  });
})