import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import {
  BigPrice,
  Image,
  Div,
  H1,
  H2,
  P,
  Section,
  Tabs,
  makeStyledScreen,
  colours,
  LineGraph,
} from '../../shared';

import { stockStyles as s } from './styles';

const Stats = makeStyledScreen(
  ({ stock }) => 
    <Section
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <Section>
        <P style={{marginBottom:16}}>Range of stats and performance indicators to be included</P>
        <P>Ambition is for these to be customiseable to reflect different metrics valued by different investors eg. Sustainability, equality measures</P>
      </Section>
    </Section>
);

const data = [
  [
    {date: new Date(2007, 3, 24), value: 90.50},
    {date: new Date(2007, 3, 25), value: 95.35},
    {date: new Date(2007, 3, 26), value: 98.84},
    {date: new Date(2007, 3, 27), value: 99.92},
    {date: new Date(2007, 3, 28), value: 99.80},
    {date: new Date(2007, 3, 29), value: 99.47},
  ]
];

const Graph = makeStyledScreen(
  () => <Section>
    <LineGraph
      width={390}
      height={500}
      data={data}
      />
  </Section>
);

const Stock = ({ connection, stocks, route, navigation}) => {
  const { symbol } = route.params,
        [stock, setStock] = useState(stocks.bySymbol[symbol]);
  
  // Subscribe and handle server responses
  useEffect(() => {
    connection.ws.send(JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({channel:"StocksChannel", id:symbol})
    }))
    connection.ws.onmessage = function (event) {
      let data= JSON.parse(event.data),
        type = data.type;
      if(type !== "ping") {
          if( data.message !== undefined ) {
            setStock(data.message.stock)
          } else {
            console.log(data)
          }
      }
    }
    // Cleanup by unsubscribing from connection
    return () => {
      connection.ws.send(JSON.stringify({
        command: "unsubscribe",
        identifier: JSON.stringify({channel:"StocksChannel", id:symbol})
      }))
    };
  },[])

  return( 
    <Tabs 
      stock={stock}
      aboveTabs={
        <Section>
          <H2>{stock.name}</H2>
          <Section style={s.bigPriceSection}>
            <BigPrice>{stock.latest_price}</BigPrice>
          </Section>
        </Section>
      }
      screens={[
        {
          name: 'stats',
          component: <Stats stock={stock}/>
        },
        {
          name: 'performance',
          component: <Graph stock={stock}/>
        }
      ]}
      />
  )
}

export default connect( (state) => state, null )(makeStyledScreen(Stock))