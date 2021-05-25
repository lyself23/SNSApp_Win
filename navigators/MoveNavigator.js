import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import MoveScreen from '../screens/MoveScreen';
import BarcodeScanner from '../screens/BarcodeScanner';
 
const Stack = createStackNavigator();

function MoveNavigator () {
    return (
        <Stack.Navigator initialRouteName = "Move">
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown : false}} />
            <Stack.Screen name="Move" component={MoveScreen} options={{headerShown : false}} />
            <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      </Stack.Navigator>
    )
}

export default MoveNavigator;

