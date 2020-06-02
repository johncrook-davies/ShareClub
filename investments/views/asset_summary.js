import React from 'react';
import {
  View,
  TouchableOpacity,
  P,
  H2,
  Div,
  Image,
  Currency,
  ImageAndText
} from '../../shared';

const AssetSummary = ({type, name, symbol, latest_price, navigation, navigation_options, style, ...other}) => 
  <TouchableOpacity
    onPress={() => navigation.navigate(type,{symbol: symbol, ...navigation_options})}
    style={style}
    >
    <View 
      style={{flexDirection: 'row'}}
      { ...other }
      >
      <View style={{flex: 1}}>
        <ImageAndText
          text={<H2>{name}</H2>}
          image={ <Icon/> }
          />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
        <H2>
          <Currency>{latest_price}</Currency>
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
          <Stat>{'0.86x'}</Stat>
          <Stat>{'5%'}</Stat>
          <Stat>{'1.054'}</Stat>
        </View>
    </View>
  </TouchableOpacity>

const Icon = () =>
  <Image 
    style={{ 
      width: 48, 
      height: 48, 
      borderWidth: 1, 
      borderRadius: 48 
    }} 
    />

const Stat = ({children, style}) => 
  <P
    style={{marginBottom: 8, ...style}}
    >
    { children }
  </P>

export default AssetSummary