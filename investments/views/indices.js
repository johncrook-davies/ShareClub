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
  makeStyledScreen
} from '../../shared';

import AssetSummary from './asset_summary';

const Indices = ({ indices, navigation }) => {

  return <Div>
    <Section>
      <ListOfIndices 
        indices={ indices }
        navigation={ navigation }
        />
    </Section>
  </Div>
}

const ListOfIndices = ({indices, navigation}) => 
  indices.map((i) => {
    return(
      <AssetSummary
        type={ 'Index' }
        key={ i.name }
        name={ i.name }
        symbol={ i.symbol }
        latest_price={ i.latest_price }
        navigation={ navigation }
        />
    )
  })

export default connect( (state) => state, null )(makeStyledScreen(Indices))