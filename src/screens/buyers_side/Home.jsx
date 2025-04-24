import React from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import Separator from '../../components/common/Separator';
import ProductCard from '../../components/buyers_side/ProductCard';
import { THEME_COLOR } from '../../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/buyers_side/Header';

const width = Dimensions.get('window').width;
const data = [
    { id: 1, src: require('../../assets/images/carousel-1.jpg') },
    { id: 2, src: require('../../assets/images/carousel-2.jpeg') },
    { id: 3, src: require('../../assets/images/carousel-3.jpeg') },
    { id: 4, src: require('../../assets/images/carousel-4.jpeg') },
];

const cardData = [
    {
        id: 1,
        title: "Organic Fresh Apples ",
        actualPrice: "₹199",
        discountPercentage: 0,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
    },
    {
        id: 2,
        title: "Farm Fresh Eggs (Pack of 12) Some Long Title",
        discountedPrice: "₹120",
        actualPrice: "₹170",
        discountPercentage: 30,
        image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05",
    },
    {
        id: 3,
        title: "Organic Honey (500g)",
        discountedPrice: "₹299",
        actualPrice: "₹399",
        discountPercentage: 20,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    },
    {
        id: 4,
        title: "Fresh Carrots (1kg)",
        actualPrice: "₹80",
        discountPercentage: 0,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
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
                            height={width / 1.5}
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

                        <TouchableOpacity onPress={() => navigation.navigate("Products")} style={{ backgroundColor: THEME_COLOR, marginTop: 30, marginBottom: 20, marginHorizontal: 20, borderRadius: 5, padding: 10, flexDirection: "row", justifyContent: "center",  alignItems: "center", gap: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, textAlign: "center", color: "white" }}>View all Products</Text>
                            <Icon name='north-east' size={25} color={"white"} />
                        </TouchableOpacity>
                    </>
                }
            />
        </>
    );
}
