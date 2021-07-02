import React from 'react';
 import {Text} from 'react-native';
import { Box, FlatList, Center, NativeBaseProvider, VStack, HStack } from "native-base"

const SearchListHeader = (props) => {    
    return (
        <Box w = "100%" px={5} py={2} my={2}>
            <HStack>
                <VStack>
                    <Text style={{fontWeight:"bold"}}>품목명</Text>                        
                    <Text>규격</Text>
                    <Text>품목코드</Text> 
                </VStack>
                <VStack alignItems="center" px = {3}>
                    <Text>LOTNO</Text> 
                    <Text>박스순번</Text>                      
                </VStack> 
                <VStack alignItems="flex-end" px = {3}>
                    <Text>재고</Text>
                </VStack>
             </HStack>
        </Box>
       
    );
};

export default SearchListHeader;
