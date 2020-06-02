import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  makeStyledScreen,
} from '../../shared';

const Stock = ({ connection, stocks, route, navigation, dispatch }) => {
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

  return <SafeAreaView>
    <Text>{stock.symbol}</Text>
    <Text>{stock.name}</Text>
    <Text>{stock.latest_price}</Text>
  </SafeAreaView>
}

export default connect( (state) => state, null )(makeStyledScreen(Stock))