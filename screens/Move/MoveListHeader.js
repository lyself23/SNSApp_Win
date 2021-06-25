import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import { Icon, Container, Header, Title, Footer, Content, List, ListItem, Left, Body, Right, Thumbnail, Button, Form, Item, Input, Label } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MoveListHeader = (props) => {    
    return (
        <ListItem> 
                <View style = {{flex : 3, flexDirection : 'column', alignItems : 'flex-start'}}>
                    <Text style={{fontWeight:"bold"}}>품목명</Text>
                    <Text>LOTNO</Text>         
                    <Text>규격</Text>
                    <Text>품목코드</Text>                                
                </View>      
                <View style = {{flex : 1, alignItems : 'center', paddingLeft : 1, paddingRight : 5}}>
                    <Text>박스순번</Text>                      
                </View>     
                <View style = {{flex : 1, alignItems : 'center'}}>                    
                    <Text>수량</Text>           
                </View>  
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