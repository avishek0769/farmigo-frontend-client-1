import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CartProductCard from '../components/CartProductCard'
import { THEME_COLOR } from '../constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from '../components/Header'
import { View } from 'moti'


export default function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Fresh Organic Apples Fresh Organic Apples Fresh Organic Apples",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            quantity: 2,
            price: 120
        },
        {
            id: 2,
            title: "Farm Fresh Eggs",
            image: "https://images.pexels.com/photos/129574/pexels-photo-129574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            quantity: 1,
            price: 90
        },
        {
            id: 3,
            title: "Almond Milk 1L",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            quantity: 3,
            price: 150
        },
        {
            id: 4,
            title: "Raw Honey Glass Jar",
            image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
            quantity: 1,
            price: 250
        },
        {
            id: 5,
            title: "Organic Tomatoes 1kg",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            quantity: 2,
            price: 60
        },
        {
            id: 6,
            title: "Homemade Bread Loaf",
            image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
            quantity: 1,
            price: 100
        },
    ])
    const [totalPrice, setTotalPrice] = useState(0)
    const [discount, setDiscount] = useState(250)
    const [deliveryCharges, setDeliveryCharges] = useState(20)

    useEffect(() => {
        if (cartItems.length) {
            setTotalPrice(0)
            cartItems.map(item => {
                setTotalPrice(prev => prev + (item.price * item.quantity))
            })
            setTotalPrice(prev => (prev - discount) + deliveryCharges)
        }
    }, [cartItems])

    const setQuantity = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    }

    const removeItem = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    return (
        <>
            <Header />
            <FlatList
                data={cartItems}
                keyExtractor={(item) => String(item.id)}
                ListHeaderComponent={
                    <Text style={{ fontSize: 30, color: "#343a40", fontWeight: "bold", paddingHorizontal: 15 }}>Cart</Text>
                }
                renderItem={({ item }) => (
                    <CartProductCard
                        id={item.id}
                        image={item.image}
                        price={item.price}
                        quantity={item.quantity}
                        title={item.title}
                        setQuantity={setQuantity}
                        removeItem={removeItem}
                    />
                )}
                ListFooterComponent={
                    <>
                        <View style={{marginBottom: 90}}>
                            <View style={{ borderColor: "#ced4da", marginHorizontal: 15, paddingVertical: 8, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                <Text>Gross Total </Text>
                                <Text>${totalPrice}</Text>
                            </View>
                            <View style={{ borderColor: "#ced4da", marginHorizontal: 15, paddingVertical: 8, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                <Text>Discount (-)</Text>
                                <Text>${discount}</Text>
                            </View>
                            <View style={{ borderColor: "#ced4da", marginHorizontal: 15, paddingVertical: 8, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                <Text>Delivery Charges (+) </Text>
                                <Text>${deliveryCharges}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: "#ced4da", marginHorizontal: 15, paddingVertical: 12, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                <Text style={styles.priceText}>Total </Text>
                                <Text style={styles.priceText}>${totalPrice}</Text>
                            </View>
                        </View>
                    </>
                }
            />
            <TouchableOpacity onPress={() => navigation.navigate("Checkout")} style={{ backgroundColor: THEME_COLOR, borderRadius: 5, padding: 10, flexDirection: "row", justifyContent: "center", gap: 15, position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <Icon name='paid' size={27} color={"white"} />
                <Text style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, textAlign: "center", color: "white" }}>Proceed to checkout</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    priceText: {
        fontSize: 20,
        fontWeight: "500"
    }
})