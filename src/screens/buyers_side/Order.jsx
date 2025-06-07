import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/buyers_side/Header';
import { OrderCard } from '../../components/buyers_side/OrderCard';
import { THEME_COLOR } from '../../constant';

const initialOrders = [
    {
        orderId: "ORD001",
        status: "Pending",
        expectedDate: "April 25, 2025",
        paymentMethod: "COD",
        products: [
            {
                name: "Rogor Dimethoate 30% EC",
                image: "https://badikheti-production.s3.ap-south-1.amazonaws.com/products/202406201730461483887352.jpg",
                quantity: 2,
                price: 120
            }
        ]
    },
    {
        orderId: "ORD002",
        status: "Delivered",
        deliveryDate: "April 15, 2025",
        paymentMethod: "UPI",
        rating: 4,
        products: [
            {
                name: "Confidor	Imidacloprid",
                image: "https://krushidukan.bharatagri.com/cdn/shop/files/Bayer_Confidor_Imidacloprid_200_SL_1.webp?v=1742304486",
                quantity: 1,
                price: 90
            },
            {
                name: "Bavistin	Carbendazim",
                image: "https://krushidukan.bharatagri.com/cdn/shop/files/Crystal_Bavistin____IFC_Sticker.webp?v=1743505329",
                quantity: 2,
                price: 60
            }
        ]
    },
    {
        orderId: "ORD003",
        status: "Pending",
        expectedDate: "April 25, 2025",
        paymentMethod: "Wallet",
        products: [
            {
                name: "PSB Organic Fertilizer",
                image: "https://kisansewakendra.in/cdn/shop/files/psb.png?v=1715857151",
                quantity: 2,
                price: 120
            }
        ]
    },
    {
        orderId: "ORD004",
        status: "Delivered",
        deliveryDate: "April 15, 2025",
        paymentMethod: "Credit Card",
        rating: 4,
        products: [
            {
                name: "Neem Cake Organic pest + fertilizer",
                image: "https://m.media-amazon.com/images/I/7132Fu7fW0L.jpg",
                quantity: 1,
                price: 90
            },
            {
                name: "Vermicompost",
                image: "https://m.media-amazon.com/images/I/71zxEAIaI7L.jpg",
                quantity: 2,
                price: 60
            }
        ]
    }
];

// Generate more orders for infinite scroll
const generateMoreOrders = (startIndex, count) => {
    const productNames = [
        "Bio Fertilizer Premium",
        "Organic Pesticide Spray",
        "Growth Booster Natural",
        "Soil Conditioner Plus",
        "Plant Nutrition Mix",
        "Seed Treatment Solution",
        "Root Development Formula",
        "Flowering Enhancer Bio",
        "Fruit Development Mix",
        "Vegetable Booster Pack"
    ];

    const paymentMethods = ["COD", "UPI", "Credit Card", "Debit Card", "Wallet"];
    const statuses = ["Pending", "Delivered"];

    return Array.from({ length: count }, (_, index) => {
        const orderNumber = String(startIndex + index + 1).padStart(3, '0');
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const isDelivered = status === "Delivered";
        
        return {
            orderId: `ORD${orderNumber}`,
            status,
            [isDelivered ? 'deliveryDate' : 'expectedDate']: isDelivered 
                ? `April ${Math.floor(Math.random() * 20) + 1}, 2025`
                : `April ${Math.floor(Math.random() * 10) + 25}, 2025`,
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            ...(isDelivered && { rating: Math.floor(Math.random() * 3) + 3 }),
            products: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, prodIndex) => ({
                name: productNames[Math.floor(Math.random() * productNames.length)],
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlotJ33HO5vcii9ae4N-7mmHZXjgftS5cJ4Q&s",
                quantity: Math.floor(Math.random() * 3) + 1,
                price: Math.floor(Math.random() * 200) + 50
            }))
        };
    });
};

export default function Order() {
    // State for infinite scroll
    const [orders, setOrders] = useState(initialOrders);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreOrders = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newOrders = generateMoreOrders(orders.length, 4);
            
            // Simulate when no more orders are available
            if (orders.length >= 20) {
                setHasMore(false);
                return;
            }

            setOrders(prev => [...prev, ...newOrders]);
        } catch (error) {
            console.error('Error loading more orders:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, orders.length, hasMore]);

    const renderFooter = () => {
        if (!loading) return null;

        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={THEME_COLOR} />
                <Text style={styles.loadingText}>Loading more orders...</Text>
            </View>
        );
    };

    const handleRating = (orderId, rating) => {
        // Implement rating logic here
        console.log(`Order ${orderId} rated ${rating} stars`);
        
        // Update the order with the new rating
        setOrders(prev => 
            prev.map(order => 
                order.orderId === orderId 
                    ? { ...order, rating }
                    : order
            )
        );
    };

    return (
        <>
            <Header showSearchIcon inCartScreen />
            
            <LinearGradient
                colors={['#f8f9fa', '#ffffff', '#f1f8e9']}
                style={styles.container}
            >
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.orderId}
                    renderItem={({ item }) => (
                        <OrderCard item={item} onRateProduct={handleRating} />
                    )}
                    onEndReached={loadMoreOrders}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={
                        <LinearGradient
                            colors={['#e8f5e8', '#f8f9fa']}
                            style={styles.headerContainer}
                        >
                            <Text style={styles.headerTitle}>My Orders</Text>
                            <Text style={styles.headerSubtitle}>
                                {orders.length} orders • Track your recent purchases
                            </Text>
                        </LinearGradient>
                    }
                    ListFooterComponent={
                        <>
                            {renderFooter()}
                            {!hasMore && (
                                <View style={styles.endContainer} >
                                    <Text style={styles.endMessage}>
                                        That's all your orders! 📦
                                    </Text>
                                    <Text style={styles.endSubMessage}>
                                        You've viewed all {orders.length} orders
                                    </Text>
                                </View>
                            )}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5
    },
    headerContainer: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 12,
        marginBottom: 15,
        marginHorizontal: 15,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 26,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        marginTop: 4,
    },
    listContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    loaderContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#6c757d',
        fontFamily: 'Poppins-Regular',
    },
    endContainer: {
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginTop: 15,
        borderRadius: 12,
        marginHorizontal: 0,
    },
    endMessage: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#28a745',
        textAlign: 'center',
        marginBottom: 8,
    },
    endSubMessage: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        textAlign: 'center',
    },
});