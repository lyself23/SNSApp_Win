import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import { Icon, Container, Header, Title, Footer, Content, List, ListItem, Left, Body, Right, Thumbnail, Button, Form, Item, Input, Label } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MoveListHeader = (props) => {    
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

export default MoveListHeader;

const styles = StyleSheet.create({
    container : {
        height : 80,
        width : SCREEN_WIDTH,
        backgroundColor : 'white',
        flex : 1,
        flexDirection : 'column'
    },
    deleteBox : {
        backgroundColor : 'red',
        justifyContent : 'center',
        alignItems : 'center',
        width : 80,
        height : 80
    }
})