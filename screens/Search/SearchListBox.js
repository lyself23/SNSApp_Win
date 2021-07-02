import React from 'react';
 import {Text} from 'react-native';
 import { Center, Box, Icon, Input, VStack, HStack, useColorModeValue } from "native-base"

const SearcheListBox = (props) => {
    return (     
        <Center flex = {1}>
            <Box w = "95%" m = {3} border = {1} borderColor = 'blue.300' bg={useColorModeValue("gray.50", "gray.700")} rounded = {5}>
                <VStack>
                    <HStack>
                        <Box borderLeftRadius = {5} bg = "#e0f2fe" w = "20%" alignItems = "center" justifyContent = "center">품명</Box>
                        <Box flex = {1} pl = {2}  justifyContent = "center">{props.data.item.itm_nm}</Box>                                                 
                    </HStack>
                    <HStack>
                        <Box bg = "#e0f2fe" w = "20%" alignItems = "center" justifyContent = "center">규격</Box>
                        <Box flex = {1} pl = {2} justifyContent = "center">{props.data.item.spec}</Box>                       
                    </HStack>
                    <HStack>
                        <Box bg = "#e0f2fe" w = "20%" alignItems = "center" justifyContent = "center">품번</Box>
                        <Box flex = {1} pl = {2} justifyContent = "center">{props.data.item.itm_cd}</Box>                       
                    </HStack>
                    <HStack>
                        <Box borderLeftRadius = {5} bg = "#e0f2fe" w = "20%" alignItems = "center" justifyContent = "center">LOTNO</Box>
                        <Box flex = {1} pl = {2} >{props.data.item.mng_no} (박스순번 : ) </Box>  
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default SearcheListBox;
