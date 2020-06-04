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
  colours
} from '../../shared';

import { stockStyles as s } from './styles';

const Stats = makeStyledScreen(
  ({ stock }) => <Section>
    <P>Stats here</P>
  </Section>
);
const Graph = makeStyledScreen(
  () => <Section>
    <P>Graph here</P>
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