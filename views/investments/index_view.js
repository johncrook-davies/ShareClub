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
        [ind, setInd] = useState([{name: 'Loading...'}]),
        [stocks, setStocks] = useState([]);
  console.log(ind)
  // Load data from database on initialisation
  useEffect(() => {
    if(db.readyState === 'ready') {
      db.call.get({all: 'indices', where: {symbol: {isEqualTo: route.params.symbol}}})
        .then((r)=> {
          setInd(r)
          return r
        })
        .then((r) => {
          
        })
        .catch((e)=> {console.log(`AssetSummary -> ${e}`)})
    }
  },[db.readyState])

  return <Div cs={cs}>
    <H1 cs={cs}>{`Index is ${ind[0].name}`}</H1>
  </Div>
}

export default connect( (state) => state, null )(Index)