import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import { Icon, Container, Header, Title, Footer, Content, List, ListItem, Left, Body, Right, Thumbnail, Button, Form, Item, Input, Label } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MoveListHeader = (props) => {    
    return (
        <ListItem thumbnail>     
            <Body style = {{flex : 1, flexDirection : 'row'}}>
                <View>
                    <Text>품목코드 </Text>
                    <Text>품목명 </Text>
                </View>
                <View>
                    <Text>규격 </Text>
                </View>
          
            </Body>   
        </ListItem>
       
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