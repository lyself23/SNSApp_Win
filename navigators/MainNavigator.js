import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import SearchStockScreen from '../screens/SearchStockScreen';
 import BarcodeScanner from '../screens/BarcodeScanner';

const Stack = createStackNavigator();

function MainNavigator () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown : false}} />
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown : false}} />
            <Stack.Screen name="Stock" component={SearchStockScreen} options={{headerShown : false}} />
            <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{headerShown : false}} />
      </Stack.Navigator>
    )
}

export default MainNavigator;

