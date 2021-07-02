import * as React from 'react';
import {
  Text
} from 'react-native';
import {  NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 import AppNavigator from './navigators/AppNavigator';

function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>      

    </NavigationContainer>
  );
}

export default App;