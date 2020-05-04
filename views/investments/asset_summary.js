import React from 'react';
import {
  View,
  TouchableOpacity,
  P,
  H2,
  Div,
  Image,
  Currency,
  ImageAndText,
  setStyle
} from '../../shared';

const AssetSummary = ({type, cs, name, symbol, latest_price, navigation, ...other}) => 
  <TouchableOpacity
    onPress={() => navigation.navigate(type,{symbol: symbol})}
    >
    <View 
      style={{flexDirection: 'row'}}
      { ...other }
      >
      <View style={{flex: 1}}>
        <ImageAndText
          cs={cs}
          text={<H2 cs={cs}>{name}</H2>}
          image={ <Icon cs={cs}/> }
          />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
        <H2 cs={cs}>
          <Currency cs={cs}>{latest_price}</Currency>
        </H2>
      </View>
    </View>
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <Stat style={{paddingLeft: 64}}>First stat: </Stat>
        <Stat style={{paddingLeft: 64}}>Second stat:</Stat>
        <Stat style={{paddingLeft: 64}}>Third stat:</Stat>
      </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
          <Stat cs={cs}>{'0.86x'}</Stat>
          <Stat cs={cs}>{'5%'}</Stat>
          <Stat cs={cs}>{'1.054'}</Stat>
        </View>
    </View>
  </TouchableOpacity>

const Icon = ({cs}) =>
  <Image 
    style={setStyle(cs,'outline',{ 
      width: 48, 
      height: 48, 
      borderWidth: 1, 
      borderRadius: 48 
    })} 
    />

const Stat = ({children, style, cs}) => 
  <P
    style={{marginBottom: 8, ...style}}
    cs={cs}
    >
    { children }
  </P>

export default AssetSummary