import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function Navbar() {
    return (
        <View style={{position: "absolute", bottom: 0, backgroundColor: "pink", height: 50, width: "100%"}}>
            <Icon name="chevron-right" size={30} />
            <Text>Navbar</Text>
        </View>
    )
}