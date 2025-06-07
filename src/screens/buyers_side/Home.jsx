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
    { id: 2, src: require('../../assets/images/carousel-2.jpg') },
    { id: 3, src: require('../../assets/images/carousel-3.jpg') },
    { id: 4, src: require('../../assets/images/carousel-4.jpg') },
    { id: 4, src: require('../../assets/images/carousel-5.jpg') },
    { id: 4, src: require('../../assets/images/carousel-6.jpg') },
];

const recentlyViewed = [
    {
        id: 1,
        title: "Urea Nitrogen (46%)",
        image: "https://gogarden.co.in/cdn/shop/files/71yg6hRnpTL._SL1200_fac2b8e7-208b-482d-9493-07d03daaff6f.jpg?v=1741858085",
    },
    {
        id: 2,
        title: "DAP	Di-Ammonium Phosphate (18-46-0)",
        image: "https://www.igsas.com.tr/uploads/new-products/taban-g%C3%BCbreleri/%C4%B0GSA%C5%9E-DAP-%C3%87UVAL.png",
    },
    {
        id: 3,
        title: "Power Sprayer (16L)",
        image: "https://pre-live-admin.balwaan.com/uploads/media/2023/knapsack-agricultural-power-sprayer-bks-35-1.jpg",
    },
    {
        id: 4,
        title: "Vermicompost (Organic Fertilizer)",
        image: "https://www.urbanplant.in/cdn/shop/products/8copy4.webp?v=1677084445",
    },
    {
        id: 5,
        title: "NPK	(Nitrogen, Phosphorus, Potassium)",
        image: "https://m.media-amazon.com/images/I/811YlMq1wYL.jpg",
    },
];

const cardData = [
    {
        id: 1,
        title: "Azospirillum Nitrogen-fixing bacteria",
        actualPrice: "₹199",
        discountPercentage: 0,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://m.media-amazon.com/images/I/510DQkxfRhL.jpg",
    },
    {
        id: 2,
        title: "Rhizobium Nitrogen-fixing bacteria for legumes",
        discountedPrice: "₹120",
        actualPrice: "₹170",
        discountPercentage: 30,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://m.media-amazon.com/images/I/717MffSAVKL.jpg",
    },
    {
        id: 3,
        title: "Urea Nitrogen (46%)",
        discountedPrice: "₹299",
        actualPrice: "₹399",
        discountPercentage: 20,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://gogarden.co.in/cdn/shop/files/71yg6hRnpTL._SL1200_fac2b8e7-208b-482d-9493-07d03daaff6f.jpg?v=1741858085",
    },
    {
        id: 4,
        title: "NPK	(Nitrogen, Phosphorus, Potassium)",
        actualPrice: "₹80",
        discountPercentage: 0,
        noOfPeopleRated: 120,
        rating: 4.5,
        image: "https://m.media-amazon.com/images/I/811YlMq1wYL.jpg",
    },
];

const topSellingCategories = [
    {
        id: 1,
        name: "Bio pesticides",
        image: "https://kaybeebio.com/wp-content/uploads/2023/05/Insecticide-For-Cotton-Crop-Pesto-Raze-Cotton-Special-300x300.webp",
    },
    {
        id: 2,
        name: "Bio Fertilizers",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uwaWrDuCwZv81offuXOxBEZtMYynwsvd_A&s",
    },
    {
        id: 3,
        name: "Farm Machinery",
        image: "https://mahindrafarmmachinery.com/sites/default/files/2023-10/Land%20preparation.png",
    },
    {
        id: 4,
        name: "Seeds-Vegetable",
        image: "https://organicbazar.net/cdn/shop/products/Summer-Vegetable-Seeds-Kit-Hybrid-3.jpg?v=1743923646",
    },
    {
        id: 5,
        name: "Seeds",
        image: "https://www.kanzandmuhul.com/cdn/shop/products/packof5seeds.png?v=1637936532",
    },
    {
        id: 6,
        name: "Field crop",
        image: "https://media.istockphoto.com/id/1901542091/photo/tractor-spraying-soybean-crops-field.jpg?s=612x612&w=0&k=20&c=38X2xY_f3DSOGGg94LuhYYhbGlizYyg18lCsimMTbuU=",
    },
    {
        id: 7,
        name: "Cash crop",
        image: "https://www.taropumps.com/media/3350/taro-pumps-cash-crops-2.jpg",
    },
    {
        id: 8,
        name: "Tools & implements",
        image: "https://4.imimg.com/data4/YV/LU/ANDROID-59112053/product-500x500.jpeg",
    }
];

const generateMoreItems = (startIndex, count) => {
    return Array.from({ length: count }, (_, index) => ({
        id: startIndex + index,
        title: `Product ${startIndex + index}`,
        actualPrice: `₹${Math.floor(Math.random() * 500) + 100}`,
        discountPercentage: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : 0,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlotJ33HO5vcii9ae4N-7mmHZXjgftS5cJ4Q&s",
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
            await new Promise(resolve => setTimeout(resolve, 500));
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
                            // autoPlay
                            autoPlayInterval={2000}
                            width={width}
                            height={width / 2}
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
                                source={require('../../assets/images/promotionImg.jpg')}
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
        position: 'relative',
    },
    bannerImage: {
        position: 'absolute',
        top: 0,
        left: -20,
        width: '110.5%',
        height: '115%',
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