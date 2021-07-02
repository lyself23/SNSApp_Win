import * as React from 'react';
import { Wrap, VStack, HStack, Icon, Text, NativeBaseProvider, StatusBar, Container,
  ScrollView, Center, Box, Stack, Heading, HamburgerIcon, Button, SimpleGrid, IconButton, 
  Pressable } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import drawerItems from '../common/DrawerMenus';
import LoginInfo from '../common/LoginInfo';
import { alignItems } from 'styled-system';

const mainBackColor = '#057DD7'

function MainScreen({navigation}, props) {
  return (
    <>
      <StatusBar backgroundColor={mainBackColor} barStyle="light-content" />

      <Box  backgroundColor={mainBackColor} p = {2} pb = {3}>        
        <HStack alignItems="center" mt={2} >
          <Pressable onPress={() => navigation.toggleDrawer()} position="absolute" ml={2} zIndex={1}>
            <HamburgerIcon ml={2} size="sm" color = 'white'/>
          </Pressable>
          <Center flex={1} backgroundColor={mainBackColor}>
            <Heading size="md" color = 'white'>메인</Heading>
          </Center>
        </HStack>   
      </Box>

      <Box p = {2} border={2} borderBottomColor='gray.300' bg = 'white' borderBottomWidth={2} borderTopWidth = {0} borderLeftWidth = {0} borderRightWidth = {0}
        >
          <HStack justifyContent = 'space-between'>
            <Text alignItems = 'flex-start'>QUICK MENU</Text>
            <Pressable onPress={() => alert('test')} alignItems = 'flex-end' mr={2} zIndex={1}>
              <Text>편집</Text>
            </Pressable>    
          </HStack>        
      </Box>

      <ScrollView>
        <SimpleGrid columns={2} spacing={10} m = {7}>        
          {drawerItems.map((menu) => (
            <>
              {menu.subMenu.map((subMenu) => (
                <Pressable onPress = { () => navigation.navigate(subMenu.screen)}>       
                  <VStack shadow={1}  m = {3}  size={32}  bg="white" rounded="xl">
                    <Center flex = {0.7}>
                      <IconButton icon={<Icon color="blue.400" size="2xl" as={<MaterialIcons name={subMenu.icon}/>} />}/>
                    </Center>
                    <Center backgroundColor = 'blue' flex = {0.3} bg = 'gray.50' borderBottomRadius = {10}>
                      <Text bold>{subMenu.label}</Text>
                      <Text fontSize = "xs" color = "gray.500">{subMenu.enlabel}</Text>
                    </Center> 
                  </VStack>
                </Pressable>
              ))}
            </>
          ))}
        </SimpleGrid>   
      </ScrollView>
    </>
  );
}

export default MainScreen;