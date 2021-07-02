import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Center, Box, Icon, Input, VStack, HStack, useColorModeValue } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MoveListBox = (props) => {
    console.log(props);
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
                            <Icon as={<MaterialCommunityIcons name="trash" />}/>
                        </Animated.Text>
                    </View>
                             
            </TouchableOpacity>
        )
    }
    return (            
        <Swipeable
            renderLeftActions = {leftSwipe}>
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
            
        </Swipeable>
    );
};





// const MoveListBox = (props) => {
//     console.log(props);
//     const leftSwipe = (progress, dragX) => {
//         const scale = dragX.interpolate({
//             inputRange : [0, 100],
//             outputRange: [0, 1],
//             extrapolate : 'clamp'
//         });
//         return (
//             <TouchableOpacity onPress = {props.handleDelete} activeOpacity = {0.6}>           
//                     <View style = {styles.deleteBox}>
//                         <Animated.Text style ={{transform : [{scale : scale}]}}>
//                             <Icon as={<MaterialCommunityIcons name="trash" />}/>
//                         </Animated.Text>
//                     </View>
                             
//             </TouchableOpacity>
//         )
//     }
//     return (
//              <Box w = "100%" px={5} py={2} my={2}>
//                 <View style = {{flex : 3, flexDirection : 'column', alignItems : 'flex-start'}}>
//                     <Text style={{fontWeight:"bold"}}>{props.data.item.itm_nm}</Text>
//                     <Text>{props.data.item.mng_no}</Text>         
//                     <Text>{props.data.item.spec}</Text>
//                     <Text>{props.data.item.itm_cd}</Text>                                
//                 </View>      
//                 <View style = {{flex : 1, alignItems : 'center', paddingLeft : 1, paddingRight : 5}}>
//                     <Text>0</Text>                      
//                 </View>     
//                 <View style = {{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
//                     {/* <Input keyboardType = 'numeric'/>     */}
//                     <Text>EA</Text>           
//                 </View>  
//             </Box>
//         // <Swipeable
//         //     renderLeftActions = {leftSwipe}>
//         //     <Box w = "100%" px={5} py={2} my={2}>
//         //         <View style = {{flex : 3, flexDirection : 'column', alignItems : 'flex-start'}}>
//         //             <Text style={{fontWeight:"bold"}}>{props.data.item.itm_nm}</Text>
//         //             <Text>{props.data.item.mng_no}</Text>         
//         //             <Text>{props.data.item.spec}</Text>
//         //             <Text>{props.data.item.itm_cd}</Text>                                
//         //         </View>      
//         //         <View style = {{flex : 1, alignItems : 'center', paddingLeft : 1, paddingRight : 5}}>
//         //             <Text>0</Text>                      
//         //         </View>     
//         //         <View style = {{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
//         //             {/* <Input keyboardType = 'numeric'/>     */}
//         //             <Text>EA</Text>           
//         //         </View>  
//         //     </Box>
//         // </Swipeable>
//     );
// };

export default MoveListBox;

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
        width : 80,
        height : 110
    }
})