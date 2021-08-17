import React from 'react'
import { Select, CheckIcon, Text} from 'native-base';

function SelectBox (props) {
    return (
        <Select
            m = {1} 
            size = {props.size} 
            InputLeftElement={<Text fontSize = "sm" m = {3}>{props.labelName}</Text>}
            selectedValue={undefined}
           // accessibilityLabel={"창고 선택"}
            placeholder={props.labelName}
            onValueChange = {props.onValueChange}
            onPress = {props.onPress}
            _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
            }}
        >

            {(props.data !== undefined && props.data.length > 0 ? (
                props.data.map(item => (
                    <Select.Item key = {item.wh_cd} label={item.wh_nm} value={item.wh_cd} />
            ))
            ) : (
                <></> 
            ))}
    </Select>
    )
}

export default SelectBox;