import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/buyers_side/Header';
import ProductCard from '../../components/buyers_side/ProductCard';
import { GradientSeparator } from "../../components/common/Separator";
import { THEME_COLOR } from '../../constant';


const width = Dimensions.get('window').width;
const data = [
    { id: 1, src: require('../../assets/images/carousel-1.jpg') },
    { id: 2, src: require('../../assets/images/carousel-2.jpeg') },
    { id: 3, src: require('../../assets/images/carousel-3.jpeg') },
    { id: 4, src: require('../../assets/images/carousel-4.jpeg') },
];

const recentlyViewed = [
    {
        id: 1,
        title: "Fresh Tomatoes",
        image: "https://images.unsplash.com/photo-1558818498-28c1e002b655",
    },
    {
        id: 2,
        title: "Organic Eggs",
        image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05",
    },
    {
        id: 3,
        title: "Fresh Milk",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    },
    {
        id: 4,
        title: "Brown Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    },
    {
        id: 5,
        title: "Green Apples",
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
    },
];

const cardData = [
    {
        id: 1,
        title: "Organic Fresh Apples ",
        actualPrice: "₹199",
        discountPercentage: 0,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
    },
    {
        id: 2,
        title: "Farm Fresh Eggs (Pack of 12) Some Long Title",
        discountedPrice: "₹120",
        actualPrice: "₹170",
        discountPercentage: 30,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05",
    },
    {
        id: 3,
        title: "Organic Honey (500g)",
        discountedPrice: "₹299",
        actualPrice: "₹399",
        discountPercentage: 20,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    },
    {
        id: 4,
        title: "Fresh Carrots (1kg)",
        actualPrice: "₹80",
        discountPercentage: 0,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    },
];

const topSellingCategories = [
    {
        id: 1,
        name: "Bio pesticides",
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
    },
    {
        id: 2,
        name: "Bio Fertilizers",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    },
    {
        id: 3,
        name: "Farm Machinery",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    },
    {
        id: 4,
        name: "Seeds-Vegetable",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    },
    {
        id: 5,
        name: "Seeds",
        image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05",
    },
    {
        id: 6,
        name: "Field crop",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
    },
    {
        id: 7,
        name: "Cash crop",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    },
    {
        id: 8,
        name: "Tools & implements",
        image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
    }
];

const generateMoreItems = (startIndex, count) => {
    return Array.from({ length: count }, (_, index) => ({
        id: startIndex + index,
        title: `Product ${startIndex + index}`,
        actualPrice: `₹${Math.floor(Math.random() * 500) + 100}`,
        discountPercentage: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : 0,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
        rating: (Math.random() * 2 + 3).toFixed(1),
        noOfPeopleRated: Math.floor(Math.random() * 500) + 50,
    }));
};

export default function Home({ navigation }) {
    const [products, setProducts] = useState(cardData);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const loadMoreItems = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        // Simulate API call with delay
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const newItems = generateMoreItems(products.length, 4);

            // Simulate when no more items are available
            if (products.length >= 20) {
                setHasMore(false);
                return;
            }

            setProducts(prev => [...prev, ...newItems]);
        }
        catch (error) {
            console.error('Error loading more items:', error);
        }
        finally {
            setLoading(false);
        }
    }, [loading, products.length, hasMore]);

    const renderFooter = () => {
        if (!loading) return null;

        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={THEME_COLOR} />
            </View>
        );
    };

    const renderProductCard = ({ item }) => (
        <ProductCard data={item} />
    );

    const RecentViewCard = ({ item }) => (
        <Pressable android_ripple={{ color: '#e9ecef' }}
            style={{
                width: 100,
                marginRight: 12,
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 8,
                borderWidth: 1,
                borderColor: '#e9ecef',
            }}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <Image
                source={{ uri: item.image }}
                style={{
                    width: '100%',
                    height: 84,
                    borderRadius: 6,
                    marginBottom: 6,
                }}
                resizeMode="cover"
            />
            <Text
                numberOfLines={2}
                style={{
                    fontSize: 12,
                    color: '#495057',
                    fontFamily: "Poppins-SemiBold",
                }}
            >
                {item.title}
            </Text>
        </Pressable>
    );

    const CategoryGridCard = ({ item, index }) => (
        <Pressable android_ripple={{ color: '#rrr' }}
            style={{
                width: (width - 48) / 3,
                aspectRatio: 1,
                backgroundColor: "#f4f4f9",
                borderRadius: 5,
                padding: 12,
                margin: 4,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#e9ecef',
            }}
            onPress={() => navigation.navigate('Products', { category: index })}
            activeOpacity={0.7}
        >
            <View style={{ width: '100%', height: '82%', backgroundColor: '#fff', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 8, }}>
                <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: '100%', borderRadius: 6 }}
                    resizeMode="cover"
                />
            </View>
            <Text numberOfLines={1} style={{ fontSize: 12, color: '#343a40', fontFamily: "Poppins-SemiBold", textAlign: 'center', lineHeight: 18, width: "100%"}} >
                {item.name}
            </Text>
        </Pressable>
    );


    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header category={true} />

            <FlatList
                data={products}
                numColumns={2}
                renderItem={renderProductCard}
                keyExtractor={(index) => String(Math.random() * 10000000000)}
                style={{ backgroundColor: "#fff", marginTop: 25 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={
                    <>
                        {/* Carousel */}
                        <Carousel
                            autoPlay
                            autoPlayInterval={2000}
                            width={width}
                            height={width / 1.5}
                            data={data}
                            renderItem={({ item }) => (
                                <Pressable style={{ flex: 1, justifyContent: "center" }} >
                                    <Image source={item.src} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                </Pressable>
                            )}
                        />

                        {/* Recently Viewed Section */}
                        {recentlyViewed.length && <View style={{ backgroundColor: '#fff', paddingVertical: 12 }}>
                            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: '#343a40', paddingHorizontal: 15, marginBottom: 12}}>
                                Recently Viewed
                            </Text>
                            <FlatList
                                horizontal
                                data={recentlyViewed}
                                renderItem={({ item }) => <RecentViewCard item={item} />}
                                keyExtractor={item => item.id.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                            />
                        </View>}

                        {/* Top Selling Categories Section */}
                        <View style={{ paddingVertical: 20, backgroundColor: '#fff' }}>
                            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 26, paddingHorizontal: 15, marginBottom: 15, color: "#343a40" }}>
                                Top Selling Categories
                            </Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, justifyContent: 'center' }}>
                                {topSellingCategories.map((item, index) => (
                                    <CategoryGridCard key={item.id} item={item} index={index} />
                                ))}
                            </View>
                        </View>

                        <View style={styles.bannerContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e' }}
                                style={styles.bannerImage}
                                resizeMode="cover"
                            />
                        </View>


                        {/* Section Title */}
                        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 26, padding: 15, color: "#343a40" }}>
                            Recommended for you
                        </Text>

                        <View style={styles.recommendedSection}>
                            <FlatList
                                horizontal
                                data={cardData}
                                renderItem={({ item }) => <ProductCard data={item} horizontal={true} />}
                                keyExtractor={(item) => String(item.id)}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                            />
                        </View>

                        <GradientSeparator first='#e5e5e5' />

                        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 26, padding: 15, color: "#343a40" }}>
                            Best Selling
                        </Text>
                    </>
                }

                ListFooterComponent={
                    <>
                        {renderFooter()}
                        {
                            !hasMore && (
                                <Pressable android_ripple={{ color: '#e9ecef' }} onPress={() => navigation.navigate("Products")} style={{ backgroundColor: THEME_COLOR, marginTop: 30, marginBottom: 20, marginHorizontal: 20, borderRadius: 5, padding: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                                    <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", letterSpacing: 1, textAlign: "center", color: "white" }}>View all Products</Text>
                                    <Icon name='north-east' size={25} color={"white"} />
                                </Pressable>
                            )
                        }
                    </>
                }
            />
        </GestureHandlerRootView >
    );
}

const styles = StyleSheet.create({
    bannerContainer: {
        width: '100%',
        height: 150,
        marginVertical: 30,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    loaderContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    endMessage: {
        textAlign: 'center',
        color: '#6c757d',
        padding: 20,
    },
    viewAllButton: {
        backgroundColor: THEME_COLOR,
        marginTop: 30,
        marginBottom: 20,
        marginHorizontal: 20,
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    viewAllButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        textAlign: "center",
        color: "white",
    },
    recommendedSection: {
        marginBottom: 20
    }
});