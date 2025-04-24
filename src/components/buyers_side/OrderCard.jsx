import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLOR } from '../constant'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import ModalPopUp from './common/ModalPopUp'

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
    const [showCancelModal, setShowCancelModal] = useState(false)
    const navigation = useNavigation()

    // Calculate total amount
    const totalAmount = item.products.reduce((sum, product) => 
        sum + (product.price * product.quantity), 0
    )

    // Add cancel order handler
    const handleCancelOrder = () => {
        // Add your cancel order logic here
        setShowCancelModal(false)
        Alert.prompt('Order cancelled successfully')
    }

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
                <Pressable onPress={() => navigation.navigate("ProductDetails", { productId: product.id })} key={index} style={styles.productItem}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text numberOfLines={2} style={styles.productName}>{product.name}</Text>
                        <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
                        <Text style={styles.price}>${product.price}</Text>
                    </View>
                </Pressable>
            ))}

            <View style={styles.footer}>
                <View style={styles.footerTop}>
                    <View>
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
                    </View>
                    
                    {item.status !== 'Delivered' && (
                        <TouchableOpacity 
                            onPress={() => setShowCancelModal(true)}
                            style={styles.cancelButton}
                        >
                            <Icon name="close-circle-outline" size={18} color="#dc3545" />
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>

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

            {/* Cancel Confirmation Modal */}
            <ModalPopUp 
                showLogoutModal={showCancelModal}
                setShowLogoutModal={setShowCancelModal}
                handleAction={handleCancelOrder}
                icon="info"
                actionBtnTxt="Yes, Cancel"
                cancelBtnTxt="No, Keep It"
                actionTxt={"Cancel Order"}
                actionDescription={`Are you sure you want to cancel Order #${item.orderId}?`}
            />
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
    },
    footerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff5f5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    cancelButtonText: {
        color: '#dc3545',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxWidth: 320,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#dc3545',
        marginTop: 8,
    },
    modalText: {
        fontSize: 16,
        color: '#495057',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    modalButtonFilled: {
        backgroundColor: '#dc3545',
    },
    modalButtonTextOutline: {
        color: '#495057',
        fontSize: 15,
        fontWeight: '600',
    },
    modalButtonTextFilled: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
})