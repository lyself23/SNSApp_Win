import * as React from 'react';
import {  NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
 import AppNavigator from './src/navigators/AppNavigator'


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