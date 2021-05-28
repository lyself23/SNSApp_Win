import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon, Input, Label, TextInput} from 'native-base';
const SCREEN_WIDTH = Dimensions.get('window').width;
const MoveListHeader = (props) => {    
    return (
        <View style = {styles.container}>
            <Text>품목코드</Text>
            <Text>품목명</Text>
            <Text>규격</Text>
        </View>
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