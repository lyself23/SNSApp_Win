import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import SearchStockScreen from '../screens/SearchStockScreen';
import BarcodeScanner from '../screens/BarcodeScanner';
import MoveScreen from '../screens/MoveScreen';

const Stack = createStackNavigator();

function MainNavigator () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown : false}} />
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown : false}} />
            <Stack.Screen name="Stock" component={SearchStockScreen} options={{headerShown : false}} initialParams = {{barcodeNo : ""}}/>
            <Stack.Screen name="Move" component={MoveScreen} options={{headerShown : false}} initialParams = {{barcodeNo : ""}}/>
            <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      </Stack.Navigator>
    )
}

export default MainNavigator;

