import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { OrderCard } from '../../components/buyers_side/OrderCard'
import Header from '../../components/buyers_side/Header'


export default function Order() {
    const [orders] = useState([
        {
            orderId: "ORD001",
            status: "Pending",
            expectedDate: "April 25, 2025",
            paymentMethod: "COD",
            products: [
                {
                    name: "Fresh Organic Apples",
                    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
                    quantity: 2,
                    price: 120
                }
            ]
        },
        {
            orderId: "ORD002",
            status: "Delivered",
            deliveryDate: "April 15, 2025",
            paymentMethod: "UPI",
            rating: 4,
            products: [
                {
                    name: "Farm Fresh Eggs",
                    image: "https://images.pexels.com/photos/129574/pexels-photo-129574.jpeg",
                    quantity: 1,
                    price: 90
                },
                {
                    name: "Organic Tomatoes",
                    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
                    quantity: 2,
                    price: 60
                }
            ]
        },
        {
            orderId: "ORD003",
            status: "Pending",
            expectedDate: "April 25, 2025",
            paymentMethod: "Wallet",
            products: [
                {
                    name: "Fresh Organic Apples",
                    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
                    quantity: 2,
                    price: 120
                }
            ]
        },
        {
            orderId: "ORD004",
            status: "Delivered",
            deliveryDate: "April 15, 2025",
            paymentMethod: "Credit Card",
            rating: 4,
            products: [
                {
                    name: "Farm Fresh Eggs",
                    image: "https://images.pexels.com/photos/129574/pexels-photo-129574.jpeg",
                    quantity: 1,
                    price: 90
                },
                {
                    name: "Organic Tomatoes",
                    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
                    quantity: 2,
                    price: 60
                }
            ]
        }
    ])

    const handleRating = (orderId, rating) => {
        // Implement rating logic here
        console.log(`Order ${orderId} rated ${rating} stars`)
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.orderId}
                    renderItem={({ item }) => (
                        <OrderCard item={item} onRateProduct={handleRating} />
                    )}
                    ListHeaderComponent={<Text style={styles.headerTitle}>My Orders</Text>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: '#212529',
        padding: 15,
        paddingTop: 0

    },
    listContainer: {
        padding: 15,
        paddingTop: 0
    },
})