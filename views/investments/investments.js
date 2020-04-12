import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Stock from './stocks';

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

export default Investments