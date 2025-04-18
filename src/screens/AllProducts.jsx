import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Separator from '../components/Separator'
import { FilterSection } from '../components/Filters'
import Navbar from '../components/Navbar'
import { FlatList } from 'react-native'
import ProductCard from '../components/ProductCard'

const cardData = [
    {
        id: 1,
        title: "Stylish Ja Stylish Jacket vStylish Jacket vStylish Jacket Stylish Jacket cket Stylish Jacket Stylish Jacket",
        price: "₹1,299",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 2,
        title: "Running Shoes Running Shoes Running Shoes Running Shoes Running Shoes Running Shoes Running Shoes ",
        price: "₹2,499",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 3,
        title: "Leather Wallet",
        price: "₹799",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 4,
        title: "Smart Watch",
        price: "₹3,999",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 5,
        title: "Wireless Earbuds",
        price: "₹1,999",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 6,
        title: "Classic Sunglasses",
        price: "₹1,299",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
];

export default function AllProducts() {
    const renderProductCard = ({ item }) => (
        <ProductCard data={item} />
    );

    return (
        <View style={{ height: "100%" }}>
            <Header />
            <Separator />

            <View style={{ zIndex: 100 }}>
                <FilterSection />
            </View>

            <View style={{marginBottom: 200}}>
                <FlatList
                    data={cardData}
                    numColumns={2}
                    renderItem={renderProductCard}
                    keyExtractor={(index) => String(Math.random() * 10000000)}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    ListHeaderComponent={
                        <Text style={{fontSize: 30, color: "#343a40", fontWeight: "bold", paddingHorizontal: 15, paddingVertical: 5}}>Our Collection</Text>
                    }
                />
            </View>

            <Navbar />
        </View>
    )
}