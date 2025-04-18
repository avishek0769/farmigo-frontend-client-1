import { Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CartProductCard from '../components/CartProductCard'
import { THEME_COLOR } from '../constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

const cartItems = [
    {
        id: 1,
        title: "Fresh Organic Apples",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        initialQuantity: 2,
        price: 120
    },
    {
        id: 2,
        title: "Farm Fresh Eggs",
        image: "https://images.unsplash.com/photo-1585238342028-0c01fef9e1d2",
        initialQuantity: 1,
        price: 90
    },
    {
        id: 3,
        title: "Almond Milk 1L",
        image: "https://images.unsplash.com/photo-1604908177522-f69f4d6d8b65",
        initialQuantity: 3,
        price: 150
    },
    {
        id: 4,
        title: "Raw Honey Glass Jar",
        image: "https://images.unsplash.com/photo-1582719478174-ade57f6d55b4",
        initialQuantity: 1,
        price: 250
    },
    {
        id: 5,
        title: "Organic Tomatoes 1kg",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        initialQuantity: 2,
        price: 60
    },
    {
        id: 6,
        title: "Homemade Bread Loaf",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
        initialQuantity: 1,
        price: 100
    },
];

export default function Cart({ navigation }) {

    return (
        <>
            <Header />
            <FlatList
                data={cartItems}
                keyExtractor={() => String(Math.random() * 10000000000)}
                ListHeaderComponent={
                    <Text style={{ fontSize: 30, color: "#343a40", fontWeight: "bold", paddingHorizontal: 15 }}>Cart</Text>
                }
                renderItem={({ item }) => (
                    <CartProductCard key={item.id.toString()} price={item.price} title={item.title} initialQuantity={item.initialQuantity} />
                )}
                ListFooterComponent={
                    <TouchableOpacity onPress={() => navigation.navigate("Shop")} style={{ backgroundColor: THEME_COLOR, marginTop: 30, marginBottom: 20, marginHorizontal: 20, borderRadius: 5, padding: 10, flexDirection: "row", justifyContent: "center", gap: 15 }}>
                        <Icon name='paid' size={27} color={"white"} />
                        <Text style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, textAlign: "center", color: "white" }}>Proceed to checkout</Text>
                    </TouchableOpacity>
                }
            />
        </>
    )
}