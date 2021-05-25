import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainNavigator from './MainNavigator';
import SearchStockNavigator from './SearchStockNavigator';
import MoveNavigator from './MoveNavigator';

const Drawer = createDrawerNavigator();

function AppNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "MainNavigator" component={MainNavigator} options = {{drawerLabel : '메인'}}/>
            <Drawer.Screen name = "SearchStockNavigator" component={SearchStockNavigator} options = {{drawerLabel : '재고조회'}}/>
            <Drawer.Screen name = "MoveNavigator" component = {MoveNavigator} options = {{drawerLabel : '창고 이동'}} />
        </Drawer.Navigator>
    )
}

export default AppNavigator;