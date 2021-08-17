import React from 'react';
import {View, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import { Center, Box, Icon, Text, VStack, HStack, useColorModeValue } from "native-base"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input'

 const SCREEN_WIDTH = Dimensions.get('window').width;


function ListBox(props) {
    return (     
        <Center flex = {1}>
            <Box w = "95%" m = {3} border = {1} borderColor = 'blue.300' bg={useColorModeValue("gray.50", "gray.700")} rounded = {5}>
                <VStack>
                    <HStack>
                        <Box borderLeftRadius = {5} bg = "#e0f2fe" w = "20%" alignItems = "center" justifyContent = "center">품명</Box>
                        <Box flex = {1} pl = {2}  justifyContent = "center"><Text>{props.data.item.itm_nm}</Text></Box>                                                 
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

    const listHeader = {fontSize: "sm", }

    return (            
        <Swipeable
            renderLeftActions = {leftSwipe}>
               <Box w = "95%" m = {3} border = {1} borderColor = '#31A1F5' bg={useColorModeValue("gray.50", "gray.700")} rounded = {5}>
                    <HStack>
                        <VStack>
                            <HStack>
                            <Box  _text={listHeader} bg = "#f2faff" w = "25%" alignItems = "center" borderLeftRadius = {5} p = {0.5}>LOTNO</Box>
                                <Text p = {0.5} fontSize = "sm">{props.data.item.mng_no} (순번 : {props.data.item.box_sq})</Text> 
                            </HStack>
                            <HStack>
                                <Box  _text={listHeader} bg = "#f2faff" w = "25%" alignItems = "center" borderLeftRadius = {5} p = {0.5}>품명</Box>
                                <Text p = {0.5} fontSize = "sm">{props.data.item.itm_nm}</Text> 
                            </HStack>
                            <HStack>
                                <Box  _text={listHeader} bg = "#f2faff" w = "25%" alignItems = "center" borderLeftRadius = {5} p = {0.5}>규격</Box>
                                <Text p = {0.5} fontSize = "sm">{props.data.item.spec}</Text> 
                            </HStack>
                            <HStack>
                                <Box  _text={listHeader} bg = "#f2faff" w = "25%" alignItems = "center" borderLeftRadius = {5} p = {0.5}>품번</Box>
                                <Text p = {0.5} fontSize = "sm">{props.data.item.itm_cd}</Text> 
                            </HStack>
                        </VStack>
                        <VStack justifyContent = "center" alignItems = "flex-end" >
                            <NumericInput  rounded onChange = {props.onChangeText} minValue = {0} maxValue = {props.data.item.stock_qty} totalWidth = {100} totalHeight = {35} iconSize = {40}/>
                            <Text style = {styles.fontStock} mr = {1}>재고 {props.data.item.stock_qty} EA</Text>
                        </VStack>
                    </HStack>
                </Box>
        </Swipeable>
    );

}

export {ListBox, InputSwipeListBox};

const styles = StyleSheet.create({
    listContainer : {
        backgroundColor : 'red',
        margin : 5,
        justifyContent : 'center',
        alignItems : 'center',
        width : '95%',     
    },
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
        height : 78,
        marginTop : 13
    },
    listHeader : {
        backgroundColor : "#f2faff",
        width : "20%",
        alignItems : "center",
        justifyContent : "center"
    },
    fontStock : {
        marginTop : 10,
        fontSize : 13,
        justifyContent : 'flex-end',
        alignItems : 'flex-end'
    }
})
