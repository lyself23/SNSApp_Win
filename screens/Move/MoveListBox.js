import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, TextInput} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon, Container, Header, Title, Footer, Content, List, ListItem, Left, Body, Right, Thumbnail, Button, Form, Item, Input, Label } from 'native-base';

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
                            <Icon name = 'trash' />
                        </Animated.Text>
                    </View>
                             
            </TouchableOpacity>
        )
    }
    return (
        <Swipeable
            renderLeftActions = {leftSwipe}>
            <ListItem> 
                <View style = {{flex : 3, flexDirection : 'column', alignItems : 'flex-start'}}>
                    <Text style={{fontWeight:"bold"}}>{props.data.item.itm_nm}</Text>
                    <Text>{props.data.item.mng_no}</Text>         
                    <Text>{props.data.item.spec}</Text>
                    <Text>{props.data.item.itm_cd}</Text>                                
                </View>      
                <View style = {{flex : 1, alignItems : 'center', paddingLeft : 1, paddingRight : 5}}>
                    <Text>0</Text>                      
                </View>     
                <View style = {{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
                    <Input keyboardType = 'numeric'/>    
                    <Text>EA</Text>           
                </View>  
            </ListItem>
        </Swipeable>
    );
};

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