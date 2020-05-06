import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

import {
  View,
  TouchableOpacity,
  Section,
  P,
  H1,
  H2,
  Div,
  Image,
  Currency,
  ImageAndText,
  setStyle
} from '../../shared';

import AssetSummary from './asset_summary';

const Index = ({ db, route, navigation }) => {
  const cs = useColorScheme(),
        [ind, setInd] = useState({name: 'Loading...'}),
        [stocks, setStocks] = useState([]);
  //console.log(ind)
  // Load data from database on initialisation
  useEffect(() => {
    var stockList = [];
    if(db.readyState === 'ready') {
      db.call.get({all: 'indices', where: {symbol: {isEqualTo: route.params.symbol}}})
        .then(([r])=> {
          setInd(r)
          return r
        })
        .then((r) => {
          let arr = JSON.parse(r.stocks);
          arr.map((s)=> {
            db.call.get({all: 'stocks', where: {symbol: {isEqualTo: s}}})
              .then(([r])=> {
                stockList.push(r)
                if(arr.indexOf(s) === arr.length -1) {
                  setStocks(stockList)
                }
              })
              .catch((e)=> {
                console.log(`AssetSummary -> ${e}`)
              })
          })
        })
        .catch((e)=> {console.log(`AssetSummary -> ${e}`)})
    }
  },[db.readyState])
  
  return <Div cs={cs}>
    {stocks.map((s) => 
      <AssetSummary
        type={ 'Stock' }
        cs={ cs }
        key={ s.name }
        name={ s.name }
        symbol={ s.symbol }
        latest_price={ s.latest_price }
        navigation={ navigation }
        />
    )}
  </Div>
}

export default connect( (state) => state, null )(Index)