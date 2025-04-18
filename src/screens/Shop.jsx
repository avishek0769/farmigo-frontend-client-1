import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Separator from '../components/Separator'
import { FilterSection } from '../components/Filters'
import Navbar from '../components/Navbar'

export default function Shop() {
    return (
        <View style={{ height: "100%" }}>
            <Header />
            <Separator />

            <View style={{ zIndex: 100 }}>
                <FilterSection />
            </View>
            
            <Navbar />
        </View>
    )
}