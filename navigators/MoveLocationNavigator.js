import React from 'react';
// import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import SearchStockScreen from '../screens/SearchStockScreen';
 import MoveLocation from '../screens/MoveLocation';

const Stack = createStackNavigator();

function MoveLocationNavigator () {
    return (
        <Stack.Navigator initialRouteName = "Location">
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown : false}} />
            <Stack.Screen name="Location" component={MoveLocation} options={{headerShown : false}} />
      </Stack.Navigator>
    )
}

export default MoveLocationNavigator;

