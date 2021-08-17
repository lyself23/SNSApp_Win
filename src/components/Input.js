import React, {useState} from 'react'
import { Input,  Text, Icon, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function InputIcon (props) {
    return (
         <Input 
            name = {props.name}
            m = {1} 
            size = {props.formSize}
            value = {props.value}
            isReadOnly = {props.isReadOnly}
            onChangeText = {props.onChangeText} 
            onKeyPress = {props.onKeyPress}
            returnKeyType = 'none'      
            autoCapitalize = 'characters'   
            keyboardType = 'email-address'   
            bg="#fff"
            borderRadius={4}
            py={3}
            px={1}
            fontSize={14}
            _web={{
                _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                }}
            InputLeftElement={<Text fontSize = {props.fontSize} m = {3}>{props.labelName}</Text>}
            InputRightElement={<Icon size={props.iconSize} mr = {3}
                                color="gray.400" 
                                as={<MaterialIcons 
                                       name={props.iconName} 
                                       onPress = {props.onIconPress}
                                    />} 
                                />}
        />
    )
}

export {InputIcon};