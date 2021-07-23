import * as React from 'react';
import {TouchableOpacity} from "react-native"
import { VStack, Icon, Text, Center, IconButton } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function MainCardView(props) {  
  function MoveScreen () {
    (props.screenName === null ? null : props.navigation.navigate(props.screenName))
  }

  return (
    <TouchableOpacity onPress = {MoveScreen}>
      <VStack shadow={1}  m = {3}  size={32}  bg="white" rounded="xl">      
        <Center flex = {0.7}>
          <Icon color="blue.400" size="2xl" as={<MaterialIcons name={props.iconName}/>}/>
        </Center>
        <Center backgroundColor = 'blue' flex = {0.3} bg = 'gray.50' borderBottomRadius = {10}>
          <Text bold>{props.labelName}</Text>
          <Text fontSize = "xs" color = "gray.500">{props.enLabelName}</Text>
        </Center> 
      </VStack>
    </TouchableOpacity>      
  )
}

export default MainCardView;