import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function Navbar() {
    return (
        <View style={{position: "absolute", bottom: 0, width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 22, paddingVertical: 7, backgroundColor: "#e9ecef"}}>
            <View style={{alignItems: "center"}}>
                <Icon name="home" size={25} />
                <Text style={{letterSpacing: 0.9}}>Home</Text>
            </View>
            <View style={{alignItems: "center"}}>
                <Icon name="store" size={25} />
                <Text style={{letterSpacing: 0.9}}>Shop</Text>
            </View>
            <View style={{alignItems: "center"}}>
                <Icon name="local-shipping" size={25} />
                <Text style={{letterSpacing: 0.9}}>Orders</Text>
            </View>
            <View style={{alignItems: "center"}}>
                <Icon name="person" size={25} />
                <Text style={{letterSpacing: 0.9}}>Account</Text>
            </View>
        </View>
    )
}