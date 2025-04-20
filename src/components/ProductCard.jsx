import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME_COLOR } from '../constant';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({ data }) {
    const navigation = useNavigation();

    return (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetails', { productId: data.id })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: data.image }} style={styles.imageStyle} resizeMode="cover" />
            </View>

            {data.discountPercentage > 0 && (
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{data.discountPercentage}% OFF</Text>
                </View>
            )}

            <View style={styles.contentContainer}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                    {data.title}
                </Text>

                <View style={styles.priceSection}>
                    <View style={styles.priceRow}>
                        {data.discountPercentage > 0 ? (
                            <>
                                <Text style={styles.discountedPrice}>{data.discountedPrice}</Text>
                                <Text style={styles.actualPrice}>{data.actualPrice}</Text>
                            </>
                        ) : (
                            <Text style={styles.normalPrice}>{data.actualPrice}</Text>
                        )}
                    </View>
                </View>
            </View>

            <Pressable
                style={styles.addToCartButton}
                onPress={(e) => {
                    e.stopPropagation(); // Prevents triggering the card's onPress
                    // Add to cart logic here
                    
                }}
                android_ripple={{
                    color: '#e9ecef',
                    borderless: false
                }}
            >
                <Icon name='shopping-cart' size={20} color={THEME_COLOR} />
                <Text style={{ color: THEME_COLOR }}>Add to Cart</Text>
            </Pressable>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 170,
        margin: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
        position: 'relative', // Added for absolute positioning of children
        minHeight: 320, // Add minimum height to accommodate content
    },
    imageContainer: {
        width: '100%',
        height: 170,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    discountBadge: {
        backgroundColor: '#e8f5e9', // Changed to green shade
        paddingHorizontal: 8,
        paddingVertical: 4,
        // borderRadius: 4,
        position: 'absolute',
        top: 0, // Position it over the bottom of image
        left: 0,
        right: 0,
        // marginBottom: 10,
        // elevation: 2,
    },
    discountText: {
        color: '#2e7d32', // Dark green color
        fontSize: 12,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 12,
        paddingBottom: 60, // Make space for the button
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: "#1d1e18",
        marginBottom: 8,
        lineHeight: 20,
    },
    priceSection: {
        marginBottom: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    normalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black",
    },
    discountedPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME_COLOR,
    },
    actualPrice: {
        fontSize: 14,
        color: '#6c757d',
        textDecorationLine: 'line-through',
    },
    addToCartButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: THEME_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
    }
});