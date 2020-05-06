import React, { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native';

const Stock = ({ connection, db, route, navigation, dispatch }) => {
  // Initialise state of stocks
  const { symbol } = route.params,
        [stock, setStock] = useState({
    symbol: symbol, 
    id: 0, 
    name: '', 
    latest_price: "0", 
    "exchange_id": 1, 
    "created_at": '', 
    "updated_at": ''
  });

  // Get object from database on load
  useEffect(() => {
    db.call.get({all: 'stocks', where: {symbol: {isEqualTo: symbol}}})
      .then(([r])=> {
        setStock(r)
      })
  },[db.readyState])
  
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

export default connect( (state) => state, null )(Stock)