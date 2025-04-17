import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Header() {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingVertical: 4 }}>
            <Image source={require("../assets/icons/brandLogo.png")} style={{ width: 140, height: 75 }} />
            <View style={{ flexDirection: "row", gap: 25, paddingRight: 5 }}>
                <Image source={require("../assets/icons/search.png")} style={{ width: 25, height: 25 }} />
                <Image source={require("../assets/icons/cart.webp")} style={{ width: 30, height: 30 }} />
            </View>
        </View>
    )
}