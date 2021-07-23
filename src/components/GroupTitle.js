import React from 'react';
import {Box, usePropsResolution} from 'native-base';

function GroupTitle (props) {
    return (
        <Box p = {2} border={2} borderBottomColor='gray.300' bg = 'white' borderBottomWidth={2} borderTopWidth = {0} borderLeftWidth = {0} borderRightWidth = {0}>
            {props.name}
        </Box>
    )
}

export default GroupTitle;