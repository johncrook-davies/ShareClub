import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

import {
  Div,
  ScrollableSection,
  H1,
  makeStyledScreen,
} from '../../shared';

import AssetSummary from './asset_summary';

const Index = ({ db, route, navigation }) => {
  const { symbol } = route.params,
        isDark = useColorScheme() === 'dark',
        [stocks, setStocks] = useState([]);
  // Load data from database on initialisation
//  useEffect(() => {
//    var stockList = [];
//    if(db.readyState === 'ready') {
//      db.call.get({all: 'indices', where: {symbol: {isEqualTo: route.params.symbol}}})
//        .then(([r])=> {
//          setInd(r)
//          return r
//        })
//        .then((r) => {
//          let arr = JSON.parse(r.stocks);
//          arr.map((s)=> {
//            db.call.get({all: 'stocks', where: {symbol: {isEqualTo: s}}})
//              .then(([r])=> {
//                stockList.push(r)
//                if(arr.indexOf(s) === arr.length -1) {
//                  setStocks(stockList)
//                }
//              })
//              .catch((e)=> {
//                console.log(`Index-> ${e}`)
//              })
//          })
//        })
//        .catch((e)=> {console.log(`Index -> ${e}`)})
//    }
//  },[db.readyState])
  
  return <Div>
    <ScrollableSection>
      <H1>{ symbol }</H1>
      {stocks.map((s) => 
        <AssetSummary
          type={ 'Stock' }
          key={ s.symbol }
          name={ s.name }
          symbol={ s.symbol }
          latest_price={ s.latest_price }
          navigation={ navigation }
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
  (state) => state, 
  null 
)(makeStyledScreen(Index))