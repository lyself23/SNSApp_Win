import React, {useState} from 'react'
import {  HamburgerIcon,  ArrowBackIcon,  Pressable,  Heading, Box,
    Center,  HStack} from 'native-base';

function ScreenHeader(props) {
    return (
      <Box backgroundColor='#057DD7' p = {2}> 
        <HStack alignItems="center" mt={2}>
            <Pressable onPress={() => props.navigation.goBack()} margin={2} zIndex={1}>
                <ArrowBackIcon ml={2} size="sm" color = 'white'/>
            </Pressable>
            <Center flex={1} >
                <Heading size="md" color = 'white'>{props.headerName}</Heading>
            </Center>
            <Pressable onPress={() => props.navigation.toggleDrawer()} margin={2} zIndex={1}>
                <HamburgerIcon mr={2} size="sm" color = 'white'/>
            </Pressable>
        </HStack>  
      </Box>
    )
}

export default ScreenHeader;