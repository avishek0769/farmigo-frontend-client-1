import { View, Text, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

export default function Header() {
    const navigation = useNavigation()

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#f6f5f3" }}>
            <Image source={require("../assets/icons/brandLogo.png")} style={{ width: 140, height: 75 }} />
            <View style={{ flexDirection: "row", gap: 25, paddingRight: 5 }}>
                <Icon name='search' size={30} />
                <Icon onPress={() => navigation.navigate("Cart")} name='shopping-cart' size={30} />
            </View>
        </View>
    )
}