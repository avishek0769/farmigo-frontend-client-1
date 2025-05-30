import { useRoute } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { FilterSection } from '../../components/buyers_side/Filters'
import Header from '../../components/buyers_side/Header'
import ProductCard from '../../components/buyers_side/ProductCard'

const cardData = [
    {
        id: 1,
        title: "Stylish Leather Jacket",
        discountedPrice: "₹1,299",
        actualPrice: "₹2,499",
        discountPercentage: 48,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        availability: "In Stock"
    },
    {
        id: 2,
        title: "Premium Running Shoes",
        actualPrice: "₹2,499",
        discountPercentage: 0,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        availability: "In Stock"
    },
    {
        id: 3,
        title: "Genuine Leather Wallet",
        discountedPrice: "₹599",
        actualPrice: "₹799",
        discountPercentage: 25,
        image: "https://images.unsplash.com/photo-1627123409982-9c693fccaaba",
        availability: "Out of Stock"
    },
    {
        id: 4,
        title: "Smart Watch Pro Series",
        discountedPrice: "₹2,999",
        actualPrice: "₹3,999",
        discountPercentage: 25,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
        availability: "In Stock"
    },
    {
        id: 5,
        title: "Wireless Earbuds with ANC",
        discountedPrice: "₹1,499",
        actualPrice: "₹1,999",
        discountPercentage: 25,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        availability: "In Stock"
    },
    {
        id: 6,
        title: "Classic Aviator Sunglasses",
        actualPrice: "₹1,299",
        discountPercentage: 0,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
        availability: "In Stock"
    },
];

export default function SearchResult({ navigation }) {
    const route = useRoute()
    const { query } = route.params

    const renderProductCard = ({ item }) => (
        <ProductCard data={item} />
    );

    return (
        <>
            <Header defaultQuery={query} showSearchIcon={true} />
            <View style={{ zIndex: 100 }}>
                <FilterSection />
            </View>

            <View>
                <FlatList
                    data={cardData}
                    numColumns={2}
                    renderItem={renderProductCard}
                    keyExtractor={(index) => String(Math.random() * 10000000)}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    ListHeaderComponent={
                        <View style={styles.headerContainer}>
                            <Text style={styles.searchQuery}>Search results for</Text>
                            <Text style={styles.queryText}>"{query}"</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{ margin: 105 }}></View>
                    }
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 15,
        paddingTop: 12,
        paddingBottom: 8
    },
    searchQuery: {
        fontSize: 14,
        color: "#6c757d",
    },
    queryText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#343a40",
        marginTop: 4
    }
});