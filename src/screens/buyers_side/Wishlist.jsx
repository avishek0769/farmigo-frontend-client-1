import { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/buyers_side/Header'
import ProductCard from '../../components/buyers_side/ProductCard'

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
            title: "Panchagavya	Liquid organic growth booster",
            image: "https://agribegri.com/admin/images/prod_image/13465198701739771114.webp",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 25,
        },
        {
            id: 2,
            title: "SSP	(Single Super Phosphate)",
            image: "https://mahadhan.co.in/wp-content/uploads/2017/05/single-phosper-sulfate.png",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 0
        },
        {
            id: 3,
            title: "Karate Lambda-Cyhalothrin",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9zIrMOyXyCOurrCStIb3K0OO-uqTvGh6DgA&s",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 0
        },
        {
            id: 4,
            title: "Seaweed Extract	Plant tonic",
            image: "https://m.media-amazon.com/images/I/61uzenjVmjL.jpg",
            actualPrice: "₹199",
            discountedPrice: "₹149",
            discountPercentage: 25
        },
        {
            id: 5,
            title: "MOP	(Muriate of Potash)",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ788VZMsiHrPa2cnTb8HlQ_n68O3nVcheRnw&s",
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