import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    Text,
    View,
    Image,
    Button,
    ScrollView,
    StyleSheet,
    SafeAreaView
} from 'react-native';

const Stack = createStackNavigator();

const Investments = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Browse" component={Types} />
        <Stack.Screen name="Markets" component={Markets} />
        <Stack.Screen name="Stock" component={Stock} />
    </Stack.Navigator>
}

const Types = ({ navigation }) => {
    return <SafeAreaView>
        <Text>Types</Text>
        <Button
            title="Shares"
            onPress={() => navigation.navigate('Markets')}
            />
    </SafeAreaView>
}

const Markets = ({ navigation }) => {
    return <SafeAreaView>
        <Text>Markets</Text>
        <Button
            title="Marks and spencer"
            onPress={() => navigation.navigate('Stock')}
            />
    </SafeAreaView>
}

const Stock = ({ navigation }) => {
    
    const [stock, setStock] = useState({
        symbol: "FEX-LN", 
        id: 3915, 
        name: "First Trust US Large Cap Core AlphaDEX UCITS ETF", 
        latest_price: "0", 
        "exchange_id": 1, 
        "created_at": "2020-04-06T22:22:33.438Z", 
        "updated_at": "2020-04-10T14:15:17.831Z"
    });
    // Initialise a websocket and json request
    const [ws, setWs] = useState(new WebSocket("ws://warm-mesa-02274.herokuapp.com/cable"));
    
    ws.onopen = () => ws.send(JSON.stringify({command: "subscribe",identifier: JSON.stringify({channel:"StocksChannel", id:'FEX-LN'})}))
    
    useEffect(() => {
        // Component will mount        
        // Handle each message
        ws.onmessage = function (event) {
            let data= JSON.parse(event.data),
                type = data.type;
            if(type !== "ping") {
                if( data.message !== undefined ) {
                    console.log(data.message.stock)
                    setStock(data.message.stock)
                } else {
                    console.log(i)
                }
            }
        }
    })
    
    // Cleanup actions
    useEffect(() => {
        return () => {
            ws.send(JSON.stringify({command: "unsubscribe",identifier: JSON.stringify({channel:"StocksChannel", id:'FEX-LN'})}))
            ws.close()
            ws.onclose = () => console.log("cleaned up");
        };
    }, []);
    
    return <SafeAreaView>
        <Text>{stock.symbol}</Text>
        <Text>{stock.name}</Text>
        <Text>{stock.latest_price}</Text>
    </SafeAreaView>
}

export default Investments