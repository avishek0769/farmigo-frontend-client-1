import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLOR } from '../constant'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const PaymentMethodIcon = ({ method }) => {
    const getIcon = () => {
        switch (method.toLowerCase()) {
            case 'upi':
                return { name: 'qrcode', color: '#6c47ff' }
            case 'credit card':
                return { name: 'credit-card', color: '#2c3e50' }
            case 'wallet':
                return { name: 'wallet', color: THEME_COLOR }
            case 'cod':
                return { name: 'cash', color: '#28a745' }
            default:
                return { name: 'cash', color: '#6c757d' }
        }
    }

    const icon = getIcon()
    
    return (
        <View style={styles.paymentMethod}>
            <Icon name={icon.name} size={20} color={icon.color} />
            <Text style={[styles.paymentText, { color: icon.color }]}>{method}</Text>
        </View>
    )
}

export const OrderCard = ({ item, onRateProduct }) => {
    const [rating, setRating] = useState(item.rating || 0)

    // Calculate total amount
    const totalAmount = item.products.reduce((sum, product) => 
        sum + (product.price * product.quantity), 0
    )

    return (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{item.orderId}</Text>
                <Text style={[
                    styles.status,
                    { color: item.status === 'Delivered' ? '#28a745' : '#ffc107' }
                ]}>
                    {item.status}
                </Text>
            </View>

            {/* Payment Information */}
            <View style={styles.paymentInfo}>
                <PaymentMethodIcon method={item.paymentMethod} />
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Total Amount:</Text>
                    <Text style={styles.amount}>${totalAmount}</Text>
                </View>
            </View>

            {item.products.map((product, index) => (
                <View key={index} style={styles.productItem}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text numberOfLines={2} style={styles.productName}>{product.name}</Text>
                        <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
                        <Text style={styles.price}>${product.price}</Text>
                    </View>
                </View>
            ))}

            <View style={styles.footer}>
                <Text style={styles.dateInfo}>
                    {item.status === 'Delivered'
                        ? `Delivered on ${item.deliveryDate}`
                        : `Expected by ${item.expectedDate}`
                    }
                </Text>

                <Text style={styles.paymentStatus}>
                    {item.status === 'Delivered' 
                        ? 'Payment Completed'
                        : item.paymentMethod === 'COD'
                            ? 'Payment on Delivery'
                            : 'Payment Processed'
                    }
                </Text>

                {item.status === 'Delivered' && (
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingLabel}>Rate this order:</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => {
                                        setRating(star)
                                        onRateProduct(item.orderId, star)
                                    }}
                                >
                                    <Icon
                                        name={rating >= star ? 'star' : 'star-outline'}
                                        size={24}
                                        color={rating >= star ? '#ffc107' : '#6c757d'}
                                        style={styles.starIcon}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6'
    },
    orderId: {
        fontSize: 16,
        fontWeight: '600',
        color: '#495057'
    },
    status: {
        fontSize: 14,
        fontWeight: '600'
    },
    productItem: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f5'
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8
    },
    productInfo: {
        flex: 1,
        marginLeft: 12
    },
    productName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212529',
        marginBottom: 4
    },
    quantity: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 4
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: "#212529"
    },
    dateInfo: {
        fontSize: 14,
        color: '#6c757d'
    },
    ratingContainer: {
        marginTop: 10
    },
    ratingLabel: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 5
    },
    starsContainer: {
        flexDirection: 'row'
    },
    starIcon: {
        marginRight: 5
    },
    paymentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        marginBottom: 15
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6
    },
    paymentText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600'
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    amountLabel: {
        fontSize: 14,
        color: '#6c757d',
        marginRight: 6
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: "#212529"
    },
    footer: {
        // marginTop: 12,
        // paddingTop: 12,
        // borderTopWidth: 1,
        borderTopColor: '#f1f3f5'
    },
    paymentStatus: {
        fontSize: 13,
        color: '#6c757d',
        marginTop: 4,
        fontStyle: 'italic'
    }
})