import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useColorScheme } from 'react-native-appearance';

import {
  Section,
  Div,
  makeStyledScreen,
  colours,
} from '../../shared';

import AssetSummary from './asset_summary';

const Indices = ({ indices, navigation }) => {
  console.log(indices.all)
  return <Div>
    <Section>
      <ListOfIndices 
        indices={ indices.all }
        navigation={ navigation }
        />
    </Section>
  </Div>
}

const ListOfIndices = ({indices, navigation}) => {
  const isDark = useColorScheme() === 'dark';
  return indices.map((i) => {
    return(
      <AssetSummary
        type={ 'Index' }
        key={ i.name }
        name={ i.name }
        symbol={ i.symbol }
        latest_price={ i.latest_price }
        navigation={ navigation }
        style={{
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colours.dark.borderBottomColor : colours.light.borderBottomColor,
          paddingBottom: 8,
          marginBottom: 8
        }}
        />
    )
  })
}

export default connect( (state) => state, null )(makeStyledScreen(Indices))