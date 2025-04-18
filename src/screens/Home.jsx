import React from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import Separator from '../components/Separator';
import ProductCard from '../components/ProductCard';
import { THEME_COLOR } from '../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';

const width = Dimensions.get('window').width;
const data = [
    { id: 1, src: require('../assets/images/img1.jpg') },
    { id: 2, src: require('../assets/images/img1.jpg') },
    { id: 3, src: require('../assets/images/img1.jpg') },
    { id: 4, src: require('../assets/images/img1.jpg') },
];

const cardData = [
    {
        id: 1,
        title: "Stylish Ja Stylish Jacket vStylish Jacket vStylish Jacket Stylish Jacket cket Stylish Jacket Stylish Jacket",
        price: "₹1,299",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 2,
        title: "Running Shoes Running Shoes Running Shoes Running Shoes Running Shoes Running Shoes Running Shoes ",
        price: "₹2,499",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 3,
        title: "Leather Wallet",
        price: "₹799",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 4,
        title: "Smart Watch",
        price: "₹3,999",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 5,
        title: "Wireless Earbuds",
        price: "₹1,999",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 6,
        title: "Classic Sunglasses",
        price: "₹1,299",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
];

export default function Home({ navigation }) {
    const renderProductCard = ({ item }) => (
        <ProductCard data={item} />
    );

    return (
        <>
            <Header />
            <FlatList
                data={cardData}
                numColumns={2}
                renderItem={renderProductCard}
                keyExtractor={(index) => String(Math.random() * 10000000000)}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListHeaderComponent={
                    <>
                        {/* Carousel */}
                        <Carousel
                            // autoPlay
                            autoPlayInterval={2000}
                            width={width}
                            height={width / 1.4}
                            data={data}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Image source={item.src} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                </View>
                            )}
                        />

                        {/* Section Title */}
                        <Text style={{ fontWeight: "bold", fontSize: 26, padding: 15, color: "#343a40" }}>New on Farmigo</Text>
                        <Separator />
                    </>
                }

                ListFooterComponent={
                    <>
                        {/* You can repeat similar sections here */}
                        <Separator />
                        <Text style={{ fontWeight: "bold", fontSize: 26, padding: 15, color: "#343a40" }}>Best Selling Products</Text>
                        <Separator />

                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                            {cardData.map(item => (
                                <ProductCard key={String(Math.random() * 100000000000)} data={item} />
                            ))}
                        </View>

                        <Separator />
                        <Text style={{ fontWeight: "bold", fontSize: 26, padding: 15, color: "#343a40" }}>Products from nearby sellers</Text>
                        <Separator />

                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                            {cardData.map(item => (
                                <ProductCard key={String(Math.random() * 100000000)} data={item} />
                            ))}
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("Shop")} style={{ backgroundColor: THEME_COLOR, marginTop: 30, marginBottom: 20, marginHorizontal: 20, borderRadius: 5, padding: 10, flexDirection: "row", justifyContent: "center",  alignItems: "center", gap: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, textAlign: "center", color: "white" }}>View all Products</Text>
                            <Icon name='north-east' size={25} color={"white"} />
                        </TouchableOpacity>
                    </>
                }
            />
        </>
    );
}
