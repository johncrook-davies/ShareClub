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

const Stock = (props, dispatch) => {
    // Initialise state of stocks
    const [stock, setStock] = useState({
        symbol: '', 
        id: 0, 
        name: '', 
        latest_price: "0", 
        "exchange_id": 1, 
        "created_at": '', 
        "updated_at": ''
    });
    // Get websocket connection from redux store
    const { ws } = props;
    
    // Initialisation actions
    useEffect(() => {
        ws.send(JSON.stringify({
            command: "subscribe",
            identifier: JSON.stringify({channel:"StocksChannel", id:'FEX-LN'})
        }))
        // Handle each message
        ws.onmessage = function (event) {
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
    })
    
    // Cleanup actions
    useEffect(() => {
        return () => {
            ws.send(JSON.stringify({
                command: "unsubscribe",
                identifier: JSON.stringify({channel:"StocksChannel", id:'FEX-LN'})
            }))
        };
    }, []);
    
    return <SafeAreaView>
        <Text>{stock.symbol}</Text>
        <Text>{stock.name}</Text>
        <Text>{stock.latest_price}</Text>
    </SafeAreaView>
}

export default connect(
    ({ connection }) => connection
)(Stock)