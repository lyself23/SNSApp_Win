import React from 'react';
import {StyleSheet} from 'react-native';
import { NativeBaseProvider, Button, IconButton, Box, HamburgerIcon, Pressable,
    Heading, VStack, Text, Center, HStack, Divider, Icon, Stack } from 'native-base';

import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';

import drawerItems from '../data/DrawerMenus'
import MainNavigator from './MainNavigator';
import SearchStockNavigator from './SearchStockNavigator';
import MoveNavigator from './MoveNavigator';
import LoginInfo from '../common/LoginInfo';


const Drawer = createDrawerNavigator();  
const mainBackColor = '#057DD7'

function Component(props) {
    return (
      <HStack alignItems="center" mt={6}>
        <Pressable onPress={() => props.navigation.toggleDrawer()} position="absolute" ml={2} zIndex={1}>
          <HamburgerIcon ml={2} size="sm"/>
        </Pressable>
        <Center flex={1} >
          <Heading size="md">{props.route.name}</Heading>
        </Center>
      </HStack>
    );
  }
  function CustomDrawerContent(props) {   
    return (
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }} {...props}>     
        <Stack  divider={<Divider />} px={4} bg={mainBackColor}>
          <VStack py = {3}>
            <Text bold fontSize={20} color = 'white' mt = {2} mb = {4}>S&S INC</Text>
            <Text bold color="white">{LoginInfo.emp_nm} ( {LoginInfo.emp_no} )</Text>
            <Text fontSize={14} mt={1} color="white" fontWeight={500}>{LoginInfo.dept_nm}</Text>
          </VStack>   

          <VStack>     
              <Pressable py={3}>
                <HStack space={4} alignItems="center">
                  <Icon color='white'
                        size={5} as={<MaterialCommunityIcons name='logout'/>}  />
                  <Text color='white' fontWeight={500}>로그아웃</Text>
                </HStack>
              </Pressable> 
          </VStack> 
        </Stack>

        <VStack divider={<Divider />} space={4} bg = 'white'>
          <VStack>
            {drawerItems.map((menu, index) => (
            
                <List.Accordion
                  key = {index}
                  style = {{backgroundColor : 'white'}}
                  title={menu.label}
                  left={props => <List.Icon {...props} icon={menu.icon} />}
                  >
                    {menu.subMenu.map((sub, index) => (
                      <List.Item key = {index} title={sub.label} onPress={(event) => {props.navigation.navigate(sub.screen)}}/>
                    ))}
                </List.Accordion>         
            ))}
          </VStack>  
        </VStack>
      </DrawerContentScrollView>
    );
  }

function AppNavigator() {
    return (
        <Box safeArea flex={1} >
             <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}             >
                    <Drawer.Screen name="MainNavigator" component={MainNavigator} />
                    <Drawer.Screen name="SearchStockNavigator" component={SearchStockNavigator} />
                    <Drawer.Screen name="MoveNavigator" component={MoveNavigator} />
             </Drawer.Navigator>
        </Box>        
    )
}

export default AppNavigator;
