import React from 'react';
// import { View, Text } from 'react-native';
import { Form, Item, Label, Input, Left, Body, Title, Right, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner, Picker, Drawer } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';

function MoveLocation ({navigation}) {
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                    <Icon name='arrow-back' 
                        onPress = {() => navigation.goBack()}/>
                    </Button>
                </Left>
                <Body>
                    <Title>Header</Title>
                </Body>
                <Right>
                    <Button transparent>
                    <Icon name='menu' 
                        onPress = {() => navigation.openDrawer()}/>
                    </Button>
                </Right>
            </Header>
        </Container>
    )
};

export default MoveLocation;