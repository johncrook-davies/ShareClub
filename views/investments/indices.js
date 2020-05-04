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

const Indices = ({ db, navigation }) => {
  const cs = useColorScheme(),
        [indices, setIndices] = useState([]);
  // Load data from database on initialisation
  useEffect(() => {
    if(db.readyState === 'ready') {
      db.call.get({all: 'indices'})
        .then((r)=> setIndices(r))
    }
  },[db.readyState])

  return <Div cs={cs}>
    <Section>
      <ListOfIndices 
        cs={ cs }
        indices={ indices }
        navigation={ navigation }
        />
    </Section>
  </Div>
}

const ListOfIndices = ({cs, indices, navigation}) => 
  indices.map((i) => {
    return(
      <AssetSummary
        type={ 'Index' }
        cs={ cs }
        key={ i.name }
        name={ i.name }
        symbol={ i.symbol }
        latest_price={ i.latest_price }
        navigation={ navigation }
        />
    )
  })

export default connect( (state) => state, null )(Indices)