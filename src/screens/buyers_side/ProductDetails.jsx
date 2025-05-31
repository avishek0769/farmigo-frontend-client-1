import { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/buyers_side/Header';
import RatingStats from '../../components/buyers_side/RatingStats';
import Reviews from '../../components/buyers_side/Reviews';
import { THEME_COLOR } from '../../constant';

const width = Dimensions.get('window').width;

export default function ProductDetails({ navigation, productId }) {
    const product = {
        id: 1,
        title: "Stylish Jacket Stylish Jacket Stylish Jacket Stylish Jacket Stylish Jacket Stylish ",
        price: "₹1,299",
        description: "This stylish jacket is made from high-quality materials, ensuring both comfort and durability. Perfect for any occasion, it combines fashion and functionality.",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        ],
        seller: "Fresh Farm Foods",
        rating: 4.5,
        noOfPeopleRated: 128,
        category: "Organic Produce",
        availability: "In Stock",
        stockCount: 10,
        deliveryTime: "2-3 days",
        features: [
            "100% Organic",
            "Farm Fresh",
            "Pesticide Free",
            "Locally Sourced"
        ],
        actualPrice: "₹2,499",
        discountedPrice: "₹1,299",
        discountPercentage: 48,
        favorite: true,
    }
    const ratingStats = {
        5: 84,
        4: 32,
        3: 8,
        2: 4,
        1: 2
    };

    const reviews = [
        {
            id: 1,
            userName: "John Doe",
            userImage: "https://randomuser.me/api/portraits/men/1.jpg",
            rating: 5,
            date: "2 days ago",
            comment: "Great product! Very satisfied with the quality."
        },
        {
            id: 2,
            userName: "John Doe",
            userImage: "https://randomuser.me/api/portraits/men/1.jpg",
            rating: 5,
            date: "2 days ago",
            comment: "Great product! Very satisfied with the quality."
        },
        {
            id: 3,
            userName: "John Doe",
            userImage: "https://randomuser.me/api/portraits/men/1.jpg",
            rating: 5,
            date: "2 days ago",
            comment: "Great product! Very satisfied with the quality."
        },
        
    ];
    const [isWishlisted, setIsWishlisted] = useState(product.favorite);


    return (
        <View style={styles.container}>
            <Header showSearchIcon={true} inCartScreen={true} />
            
            <ScrollView style={styles.scrollView}>
                {/* Carousel */}
                <View style={styles.carouselContainer}>
                    <Carousel
                        width={width}
                        height={width / 1.4}
                        data={product.images}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Image source={{ uri: item }} style={styles.carouselImage} />
                            </View>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.wishlistButton}
                        onPress={() => setIsWishlisted(!isWishlisted)}
                    >
                        <View style={styles.heartIconContainer}>
                            <Icon
                                name={isWishlisted ? 'favorite' : 'favorite-border'}
                                size={24}
                                color={isWishlisted ? '#dc3545' : '#6c757d'}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.title}</Text>

                    {/* Seller and Rating Section */}
                    <View style={styles.sellerContainer}>
                        <View style={styles.infoItem}>
                            <Icon name="category" size={18} color="#6c757d" />
                            <Text style={styles.infoText}>{product.category}</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={18} color="#ffc107" />
                            <Text style={styles.rating}>{product.rating}</Text>
                            <Text style={styles.noOfPeopleRated}>({product.noOfPeopleRated} raters)</Text>
                        </View>
                    </View>

                    {/* Price and Availability Section */}
                    <View style={styles.priceSection}>
                        <View>
                            <View style={styles.priceRow}>
                                {product.discountPercentage > 0 ? (
                                    <>
                                        <Text style={styles.discountedPrice}>{product.discountedPrice}</Text>
                                        <Text style={styles.actualPrice}>{product.actualPrice}</Text>
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountText}>
                                                {product.discountPercentage}% OFF
                                            </Text>
                                        </View>
                                    </>
                                ) : (
                                    <Text style={[styles.normalPrice, { color: "#343a40" }]}>{product.actualPrice}</Text>
                                )}
                            </View>
                        </View>
                        <View style={[
                            styles.availabilityBadge,
                            product.availability === "Out of Stock" && styles.outOfStockBadge
                        ]}>
                            <Icon
                                name={product.availability === "In Stock" ? "check-circle" : "remove-circle"}
                                size={16}
                                color={product.availability === "In Stock" ? THEME_COLOR : "#dc3545"}
                            />
                            <Text style={[
                                styles.availabilityText,
                                product.availability === "Out of Stock" && styles.outOfStockText
                            ]}>
                                {product.availability}
                            </Text>
                        </View>
                    </View>

                    {/* Delivery Info */}
                    <View style={styles.deliveryInfo}>
                        <Icon name="local-shipping" size={20} color="#6c757d" />
                        <Text style={styles.deliveryText}>Delivery within {product.deliveryTime}</Text>
                    </View>

                    {/* Features Section */}
                    <View style={styles.featuresContainer}>
                        <Text style={styles.featuresTitle}>Key Features</Text>
                        {product.features.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Icon name="check" size={16} color={THEME_COLOR} />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Description */}
                    <Text style={styles.descriptionTitle}>Product Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Ratings & Reviews */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Customer Ratings</Text>
                        <RatingStats ratings={ratingStats} />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Customer Reviews</Text>
                        <Reviews reviews={reviews} />
                    </View>
                </View>
            </ScrollView >

            <View style={styles.bottomButtons}>
                <TouchableOpacity
                    onPress={() => alert("Added to Cart!")}
                    style={[
                        styles.button,
                        styles.addToCartButton,
                        product.availability === "Out of Stock" && styles.disabledButton
                    ]}
                    disabled={product.availability === "Out of Stock"}
                >
                    <Icon
                        name="shopping-cart"
                        size={24}
                        color={product.availability === "Out of Stock" ? "#6c757d" : THEME_COLOR}
                    />
                    <Text style={[
                        styles.buttonText,
                        product.availability === "Out of Stock" && styles.disabledButtonText
                    ]}>
                        Add to Cart
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Checkout")}
                    style={[
                        styles.button,
                        styles.buyNowButton,
                        product.availability === "Out of Stock" && styles.disabledButton
                    ]}
                    disabled={product.availability === "Out of Stock"}
                >
                    <Icon
                        name="flash-on"
                        size={24}
                        color={product.availability === "Out of Stock" ? "#6c757d" : "white"}
                    />
                    <Text style={[
                        styles.buttonText,
                        { color: "white" },
                        product.availability === "Out of Stock" && styles.disabledButtonText
                    ]}>
                        Buy Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#343a40',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: THEME_COLOR,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        marginBottom: 20,
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME_COLOR,
        padding: 15,
        borderRadius: 5,
    },
    addToCartText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        marginLeft: 10,
    },
    sellerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 5,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: {
        fontSize: 14,
        color: '#495057',
        fontFamily: 'Poppins-SemiBold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    rating: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#495057',
    },
    noOfPeopleRated: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    availabilityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    availabilityText: {
        color: THEME_COLOR,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    deliveryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    deliveryText: {
        color: '#495057',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    featuresContainer: {
        marginBottom: 20,
    },
    featuresTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#343a40',
        marginBottom: 10,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    featureText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#495057',
    },
    descriptionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#343a40',
        marginBottom: 10,
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME_COLOR,
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        elevation: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    discountedPrice: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: THEME_COLOR,
    },
    actualPrice: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        textDecorationLine: 'line-through',
    },
    discountBadge: {
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    discountText: {
        color: THEME_COLOR,
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 8,
        elevation: 2,
    },
    addToCartButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: THEME_COLOR,
    },
    buyNowButton: {
        backgroundColor: THEME_COLOR,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        marginLeft: 8,
        color: THEME_COLOR,
    },
    addToCartText: {
        color: THEME_COLOR,
    },
    buyNowText: {
        color: 'white',
    },
    outOfStockBadge: {
        backgroundColor: '#f8d7da',
    },
    outOfStockText: {
        color: '#dc3545',
    },
    disabledButton: {
        backgroundColor: '#e9ecef',
        borderColor: '#e9ecef',
    },
    disabledButtonText: {
        color: '#6c757d',
    },
    outOfStockBadge: {
        backgroundColor: '#ffebee',
    },
    outOfStockText: {
        color: '#dc3545',
    },
    disabledButton: {
        backgroundColor: '#f8f9fa',
        borderColor: '#dee2e6',
        opacity: 0.7,
    },
    disabledButtonText: {
        color: '#6c757d',
    },
    carouselContainer: {
        position: 'relative',
    },
    wishlistButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        zIndex: 10,
    },
    heartIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    normalPrice: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: THEME_COLOR,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        marginBottom: 80, // Height of bottom buttons
    },
    bottomButtons: {
        position: 'absolute',
        bottom: 6,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        flexDirection: 'row',
        gap: 10,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
        marginBottom: 12,
        paddingHorizontal: 16,
    },
});