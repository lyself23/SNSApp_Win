import React from 'react';
// import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import SearchStockScreen from '../screens/Search/SearchStockScreen';
 import BarcodeScanner from '../screens/Search/BarcodeScanner';

const Stack = createStackNavigator();

function SearchStockNavigator () {
    return (
        <Stack.Navigator initialRouteName = "Stock">
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown : false}} />
            <Stack.Screen name="Stock" component={SearchStockScreen} options={{headerShown : false}} initialParams = {{barcodeNo : ""}}/>
            <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      </Stack.Navigator>
    )
}

export default SearchStockNavigator;

