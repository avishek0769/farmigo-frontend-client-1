import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { THEME_COLOR } from '../constant';
import { useNavigation } from '@react-navigation/native';

const navItems = [
    { label: 'Home', icon: 'home', screen: 'Home' },
    { label: 'Products', icon: 'store', screen: 'AllProducts' },
    { label: 'Orders', icon: 'local-shipping', screen: 'Orders' },
    { label: 'Account', icon: 'person', screen: 'MyAccount' },
];


export default function Navbar() {
    const {activeScreen, setActiveScreen} = AppContext()
    console.log(activeScreen)
    const navigation = useNavigation()

    const handleNavBtnPress = useCallback((screen) => {
        setActiveScreen(screen)
        navigation.navigate(screen)
    })

    return (
        <View style={{ position: "absolute", bottom: 0, width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 22, paddingVertical: 7, backgroundColor: "#e9ecef" }}>
            {navItems.map((item, index) => (
                <Pressable key={index} onPress={() => handleNavBtnPress(item.screen)} style={{ alignItems: "center" }} >
                    <Icon name={item.icon} size={25} color={activeScreen == item.screen && THEME_COLOR} />
                    <Text style={{ letterSpacing: 0.9, color: activeScreen == item.screen && THEME_COLOR }}>{item.label}</Text>
                </Pressable>
            ))}
        </View>
    )
}