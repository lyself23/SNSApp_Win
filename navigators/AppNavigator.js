import * as React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainNavigator from './MainNavigator';
import SearchStockNavigator from './SearchStockNavigator';
import MoveLocation from './MoveLocationNavigator';
const Drawer = createDrawerNavigator();

function AppNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "MainNavigator" component={MainNavigator} options = {{drawerLabel : '메인'}}/>
            <Drawer.Screen name = "SearchStockNavigator" component={SearchStockNavigator} options = {{drawerLabel : '재고조회'}}/>
            <Drawer.Screen name = "MoveLocation" component = {MoveLocation} options = {{drawerLabel : '위치 이동'}} />
        </Drawer.Navigator>
    )
}

export default AppNavigator;