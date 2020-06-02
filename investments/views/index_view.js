import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

import {
  Div,
  ScrollableSection,
  H1,
  colours,
  makeStyledScreen,
} from '../../shared';

import { getStocksForIndex } from '../selectors';

import AssetSummary from './asset_summary';

const mapStateToProps = ( state, ownProps) => {
  const { route, navigation } = ownProps;
  const stocks = getStocksForIndex(state, route.params.symbol);
  return { stocks }
}

const Index = ({ stocks, navigation }) => {
  const isDark = useColorScheme() === 'dark';
  return <Div>
    <ScrollableSection>
      {stocks.map((s) => 
        <AssetSummary
          type={ 'Stock' }
          key={ s.symbol }
          name={ s.name }
          symbol={ s.symbol }
          latest_price={ s.latest_price }
          navigation={ navigation }
          navigation_options={ { title: s.symbol } }
          style={{
            borderBottomWidth: 1,
            borderBottomColor: isDark ? colours.dark.borderBottomColor : colours.light.borderBottomColor,
            paddingBottom: 8,
            marginBottom: 8
          }}
          />
      )}
    </ScrollableSection>
  </Div>
}

export default connect( 
  mapStateToProps, 
  null 
)(makeStyledScreen(Index))