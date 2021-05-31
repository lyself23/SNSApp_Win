import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
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
            renderLeftActions = {leftSwipe}
        >
            <ListItem thumbnail>                  
                <Body style = {{flex : 1, flexDirection : 'row'}}>
                    <View style = {{paddingRight : 15}}>
                        <Text>{props.data.item.itm_cd}</Text>
                        <Text>{props.data.item.itm_nm}</Text>
                    </View>
                    <View style = {{paddingRight : 15}}>
                        <Text>{props.data.item.spec}</Text>  
                    </View>
                </Body>
                <Right>
                    <Input>ss</Input>
                </Right>         
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
        height : 80
    }
})