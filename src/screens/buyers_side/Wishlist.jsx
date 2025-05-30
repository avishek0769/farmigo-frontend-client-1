import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/buyers_side/Header'
import ProductCard from '../../components/buyers_side/ProductCard'
import { THEME_COLOR } from '../../constant'

const EmptyWishlist = () => (
    <View style={styles.emptyContainer}>
        <Image 
            source={require('../../assets/icons/empty-wishlist.png')} 
            style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
        <Text style={styles.emptySubtitle}>
            Save your favorite items to purchase them later
        </Text>
    </View>
)

export default function Wishlist() {
    const [wishlistItems] = useState([
        {
            id: 1,
            title: "Fresh Organic Apples Fresh Organic Apples",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 25,
        },
        {
            id: 2,
            title: "Fresh Organic Apples",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 0
        },
        {
            id: 3,
            title: "Fresh Organic Apples",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 0
        },
        {
            id: 4,
            title: "Fresh Organic Apples",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 25
        },
        {
            id: 5,
            title: "Fresh Organic Apples",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 0
        },
    ])

    return (
        <View style={styles.container}>
            <Header />
            
            {wishlistItems.length === 0 ? (
                <EmptyWishlist />
            ) : (
                <>
                    <Text style={styles.headerTitle}>
                        My Wishlist ({wishlistItems.length})
                    </Text>
                    
                    <FlatList 
                        data={wishlistItems}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <ProductCard data={item} />
                        )}
                        numColumns={2}
                        columnWrapperStyle={styles.productRow}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212529',
        padding: 15
    },
    listContainer: {
        // padding: 10,
        paddingBottom: 20
    },
    productRow: {
        justifyContent: 'space-between',
        // paddingHorizontal: 5
    },
    emptyContainer: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
        opacity: 0.8
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 8
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 24
    }
})