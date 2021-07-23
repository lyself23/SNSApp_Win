import * as React from 'react';
import { Wrap, VStack, HStack, Icon, Text, NativeBaseProvider, StatusBar, Container,
  ScrollView, Center, Box, Stack, Heading, HamburgerIcon, Button, SimpleGrid, IconButton, 
  Pressable } from "native-base";
import drawerItems from '../data/DrawerMenus';
import ScreenHeader from '../components/ScreenHeader';
import MainCardView from '../components/MainCardView';
const mainBackColor = '#057DD7'

function MainScreen({navigation}) {
  return (
    <>
      <StatusBar backgroundColor={mainBackColor} barStyle="light-content" />    
      <ScreenHeader headerName = "메인" navigation = {navigation}/>   

      <Box p = {2} border={2} borderBottomColor='gray.300' bg = 'white' borderBottomWidth={2} borderTopWidth = {0} borderLeftWidth = {0} borderRightWidth = {0}>
          <HStack justifyContent = 'space-between'>
            <Text alignItems = 'flex-start'>QUICK MENU</Text>
            <Pressable onPress={() => alert('test')} alignItems = 'flex-end' mr={2} zIndex={1}>
              <Text>편집</Text>
            </Pressable>    
          </HStack>        
      </Box>

      <ScrollView>
        <SimpleGrid columns={2} spacing={10} m = {7}>    
          {(drawerItems.map((menu, index) => (
            menu.subMenu.length > 0 ? (
              //하위메뉴 있을 때
              menu.subMenu.map((subMenu, subIndex) => (
                <MainCardView 
                  key = {subIndex} 
                  screenName = {subMenu.screen} 
                  iconName = {subMenu.icon} 
                  labelName = {subMenu.label} 
                  enLabelName = {subMenu.enlabel} 
                  navigation = {navigation}
                />
              ))
            ) : (
              //하위메뉴 없을 때
              <MainCardView  
                key = {index} 
                screenName = {menu.screen} 
                iconName = {menu.icon} 
                labelName = {menu.label} 
                enLabelName = {menu.enlabel} 
                navigation = {navigation}
              />           
            )
          )))}

        </SimpleGrid>   
      </ScrollView>
    </>
  );
}

export default MainScreen;