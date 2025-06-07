import { useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { FilterSection } from '../../components/buyers_side/Filters';
import Header from '../../components/buyers_side/Header';
import ProductCard from '../../components/buyers_side/ProductCard';
import { THEME_COLOR } from '../../constant';

const cardData = [
    {
        id: 1,
        title: "NPK	(Nitrogen, Phosphorus, Potassium)",
        actualPrice: "₹199",
        discountPercentage: 0,
        image: "https://m.media-amazon.com/images/I/811YlMq1wYL.jpg",
        noOfPeopleRated: 120,
        rating: 4.5,
    },
    {
        id: 2,
        title: "MOP	(Muriate of Potash)",
        discountedPrice: "₹120",
        actualPrice: "₹170",
        discountPercentage: 30,
        image: "https://www.paudhewale.com/s/660a356584d1ac2391ae69de/677eae65e87ac10277560d38/paudhewale-2025-01-08t222649-290.png",
        noOfPeopleRated: 80,
        rating: 4.0,
    },
    {
        id: 3,
        title: "Rhizobium Nitrogen-fixing bacteria for legumes",
        discountedPrice: "₹299",
        actualPrice: "₹399",
        discountPercentage: 20,
        image: "https://m.media-amazon.com/images/I/717MffSAVKL.jpg",
        noOfPeopleRated: 150,
        rating: 4.8,
    },
    {
        id: 4,
        title: "Panchagavya	Liquid organic growth booster",
        actualPrice: "₹80",
        discountPercentage: 0,
        image: "https://m.media-amazon.com/images/I/61LW3qDx2bL.jpg",
        noOfPeopleRated: 90,
        rating: 4.2,
    },
    {
        id: 5,
        title: "Organic Fresh Apples ",
        actualPrice: "₹199",
        discountPercentage: 0,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
        noOfPeopleRated: 120,
        rating: 4.5,
    },
    {
        id: 6,
        title: "PSB (Phosphate Solubilizing Bacteria)",
        discountedPrice: "₹120",
        actualPrice: "₹170",
        discountPercentage: 30,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPI3SoQrsmrzfUwiTE6IARQ48MwgMOspd4A&s",
        noOfPeopleRated: 21,
        rating: 2.3,
    },
];

// Generate more products for infinite scroll
const generateMoreProducts = (startIndex, count) => {
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

    return Array.from({ length: count }, (_, index) => ({
        id: startIndex + index + 1,
        title: `${productNames[index % productNames.length]} ${startIndex + index + 1}`,
        actualPrice: `₹${Math.floor(Math.random() * 500) + 100}`,
        discountPercentage: Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 10 : 0,
        discountedPrice: Math.random() > 0.6 ? `₹${Math.floor(Math.random() * 300) + 80}` : null,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlotJ33HO5vcii9ae4N-7mmHZXjgftS5cJ4Q&s",
        rating: (Math.random() * 2 + 3).toFixed(1),
        noOfPeopleRated: Math.floor(Math.random() * 200) + 20,
    }));
};

export default function Products({ navigation }) {
    const route = useRoute();
    const { category } = route.params || {};
    
    // State for infinite scroll
    const [products, setProducts] = useState(cardData);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreProducts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newProducts = generateMoreProducts(products.length, 6);
            
            // Simulate when no more products are available
            if (products.length >= 100) {
                setHasMore(false);
                return;
            }

            setProducts(prev => [...prev, ...newProducts]);
        } catch (error) {
            console.error('Error loading more products:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, products.length, hasMore]);

    const renderFooter = () => {
        if (!loading) return null;

        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={THEME_COLOR} />
                <Text style={styles.loadingText}>Loading more products...</Text>
            </View>
        );
    };
    
    const renderProductCard = ({ item }) => (
        <ProductCard data={item} />
    );

    return (
        <>
            <Header showSearchIcon />
            <View style={{ zIndex: 100 }}>
                <FilterSection category={category} />
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={renderProductCard}
                    keyExtractor={(item) => String(item.id)}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    style={{ backgroundColor: "#fff" }}
                    onEndReached={loadMoreProducts}
                    onEndReachedThreshold={1.5}
                    ListHeaderComponent={
                        <Text style={styles.headerTitle}>
                            {category ? `${category.name || 'Category'} Products` : 'Our Collection'}
                        </Text>
                    }
                    ListFooterComponent={
                        <>
                            {renderFooter()}
                            {!hasMore && (
                                <View style={styles.endContainer}>
                                    <Text style={styles.endMessage}>
                                        You've reached the end! 🎉
                                    </Text>
                                    <Text style={styles.endSubMessage}>
                                        Showing all {products.length} products
                                    </Text>
                                </View>
                            )}
                            <View style={{ height: 100 }} />
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </>
    );
}

const styles = {
    headerTitle: {
        fontSize: 26,
        color: "#343a40",
        fontFamily: 'Poppins-Bold',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 9
    },
    loaderContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#6c757d',
        fontFamily: 'Poppins-Regular',
    },
    endContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
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
};