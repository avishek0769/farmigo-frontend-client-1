import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'


export default function ProductCard({ data }) {

    return (
        <View style={styles.card}>
            <Image source={{ uri: data.image }} style={styles.imageStyle} resizeMode="cover" />
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>{data.price}</Text>

            <TouchableOpacity style={{ borderWidth: 2, borderColor: "#29bf12", padding: 10, margin: 10, borderRadius: 5, flexDirection: "row" }}>
                <Image source={require("../assets/icons/cart.webp")} style={{ width: 22, height: 22, marginRight: 7 }} />
                <Text style={{ color: "#29bf12", fontSize: 16, fontWeight: "bold", letterSpacing: 1 }}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 170,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    imageStyle: {
        width: '100%',
        height: 150,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        padding: 8,
        paddingBottom: 2,
        paddingHorizontal: 10,
        color: "#1d1e18"
    },
    price: {
        fontSize: 22,
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontWeight: "bold",
        letterSpacing: 1
    },
});

