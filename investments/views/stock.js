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
  Line,
} from '../../shared';

import { stockStyles as s } from './styles';

const Stats = makeStyledScreen(
  ({ stock }) => <Section>
    <P>Stats here</P>
  </Section>
);

const data = [
  {date: new Date(2007, 3, 24), value: 93.24},
  {date: new Date(2007, 3, 25), value: 95.35},
  {date: new Date(2007, 3, 26), value: 98.84},
  {date: new Date(2007, 3, 27), value: 99.92},
  {date: new Date(2007, 3, 30), value: 99.80},
  {date: new Date(2007, 4,  1), value: 99.47},
];

const Graph = makeStyledScreen(
  () => <Section>
    <P>Graph here</P>
    <Line
      width={300}
      height={400}
      data={data}
      style={{borderColor: 'red', borderWidth:1}}
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