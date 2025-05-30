import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import QuantityController from './QuantityController'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

export default function CartProductCard({ id, price, title, image, quantity, setQuantity, removeItem }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("ProductDetails", { productId: id })} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </Pressable>

            <View style={styles.contentContainer}>
                <Text
                    lineBreakMode='tail'
                    numberOfLines={2}
                    style={styles.title}
                >
                    {title}
                </Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Unit Price:</Text>
                    <Text style={styles.priceValue}>₹{price}</Text>
                </View>

                <QuantityController id={id} quantity={quantity} setQuantity={setQuantity} />
            </View>

            <View style={styles.bottomActionsContainer}>
                <TouchableOpacity onPress={() => removeItem(id)} style={styles.removeButton}>
                    <Icon name='delete-outline' size={20} color={"#dc3545"} />
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>{quantity} × ₹{price} = </Text>
                    <Text style={styles.totalPrice}>₹{price * quantity}</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginHorizontal: 15,
        marginVertical: 10,
        paddingBottom: 55,
        borderBottomWidth: 1,
        borderBottomColor: "#ced4da",
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    imageContainer: {
        borderRadius: 10,
        height: 120,
        overflow: 'hidden',
        elevation: 3,
        backgroundColor: '#fff',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: "#1d1e18",
        marginBottom: 8,
        lineHeight: 22,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#6c757d',
        marginRight: 6,
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '600',
        color: "#495057",
    },
    totalContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 6,
        width: "61%",
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: '#495057',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: "600",
        color: "#212529",
    },
    removeButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: 6,
        width: "35%",
        justifyContent: "center",
        borderRadius: 6,
        backgroundColor: "#fff0f1",
    },
    removeButtonText: {
        color: "#dc3545",
        fontWeight: "600",
        fontSize: 14,
    },
    bottomActionsContainer: {
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});