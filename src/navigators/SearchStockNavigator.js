import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import SearchStockScreen from '../screens/SearchStockScreen';

const Stack = createStackNavigator();

function SearchStockNavigator () {
    return (
        <Stack.Navigator initialRouteName = "Stock">
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown : false}} />
            <Stack.Screen name="Stock" component={SearchStockScreen} options={{headerShown : false}} />
      </Stack.Navigator>
    )
}

export default SearchStockNavigator;

