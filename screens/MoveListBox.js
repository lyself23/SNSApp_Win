import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon, Input, Label, TextInput} from 'native-base';

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
            <View style = {styles.container}>
                <Text>품목코드 : {props.data.item.itm_cd}</Text>
                <Text>품목명 : {props.data.item.itm_nm}</Text>
                <Text>규격 : {props.data.item.spec}</Text>

            </View>
        </Swipeable>
    );
};

export default MoveListBox;

const styles = StyleSheet.create({
    container : {
        height : 80,
        width : SCREEN_WIDTH,
        backgroundColor : 'white'
    },
    deleteBox : {
        backgroundColor : 'red',
        justifyContent : 'center',
        alignItems : 'center',
        width : 80,
        height : 80
    }
})