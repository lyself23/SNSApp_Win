import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import { Center, Box, Icon, Input, VStack, HStack, useColorModeValue } from "native-base"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

 const SCREEN_WIDTH = Dimensions.get('window').width;


function ListBox(props) {
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
                        <Box flex = {1} pl = {2} ><Text>{props.data.item.mng_no} (박스순번 : {props.data.item.box_sq}) </Text></Box>  
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

function InputSwipeListBox(props) {
    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange : [0, 100],
            outputRange: [0, 1],
            extrapolate : 'clamp'
        });
        return (
            <TouchableOpacity onPress = {props.handleDelete} activeOpacity = {0.6}>           
                    <View style = {styles.deleteBox}>
                        <Animated.Text style ={{transform : [{scale : scale}]}}>
                            <Icon as={<MaterialCommunityIcons name="trash-can-outline" />}/>
                        </Animated.Text>
                    </View>                             
            </TouchableOpacity>
        )
    }

    return (            
        <Swipeable
            renderLeftActions = {leftSwipe}>
                <Center flex = {1}>
                    <Box w = "95%" m = {3} border = {1} borderColor = '#31A1F5' bg={useColorModeValue("gray.50", "gray.700")} rounded = {5}>
                        <HStack>
                            <VStack flex = {0.9}>
                                <HStack>
                                    <Box borderLeftRadius = {5} bg = "#f2faff" w = "20%" alignItems = "center" justifyContent = "center"><Text>품명</Text></Box>
                                    <Box flex = {1} pl = {2} justifyContent = "center"><Text>{props.data.item.itm_nm}</Text></Box>                                                 
                                </HStack>
                                <HStack>
                                    <Box bg = "#f2faff" w = "20%" alignItems = "center" justifyContent = "center"><Text>규격</Text></Box>
                                    <Box flex = {1} pl = {2} justifyContent = "center"><Text>{props.data.item.spec}</Text></Box>                       
                                </HStack>
                                <HStack>
                                    <Box bg = "#f2faff" w = "20%" alignItems = "center" justifyContent = "center"><Text>품번</Text></Box>
                                    <Box flex = {1} pl = {2} justifyContent = "center"><Text>{props.data.item.itm_cd}</Text></Box>                       
                                </HStack>
                                <HStack>
                                    <Box borderLeftRadius = {5} bg = "#f2faff" w = "20%" alignItems = "center" justifyContent = "center"><Text>LOTNO</Text></Box>
                                    <Box flex = {1} pl = {2}><Text>{props.data.item.mng_no} (순번 : {props.data.item.box_sq})</Text></Box>  
                                </HStack>
                            </VStack>
                            <VStack justifyContent = 'center'>
                                <Center border = {1} borderColor = '#31A1F5' borderBottomWidth={0} borderTopWidth = {0} borderLeftWidth = {1} borderRightWidth = {0}>
                                       <Input placeholder="이동수량" size="xs" keyboardType = 'numeric'></Input>
                                    <Box><Text>재고 {props.data.item.rest_qty} EA</Text></Box>
                                </Center>
                            </VStack>
                        </HStack>
                    </Box>
                </Center>
            
        </Swipeable>
    );

}

export {ListBox, InputSwipeListBox};

const styles = StyleSheet.create({
    container : {
        height : 80,
        width : SCREEN_WIDTH,
        backgroundColor : 'white',
        borderWidth : 1,
        borderRadius : 8, 
        padding : 8, 
        margin : 8
        // flex : 1,
        // flexDirection : 'row'
    },
    deleteBox : {
        backgroundColor : 'red',
        justifyContent : 'center',
        alignItems : 'center',
        width : 90,
        height : 133,
        marginTop : 13
    }
})
