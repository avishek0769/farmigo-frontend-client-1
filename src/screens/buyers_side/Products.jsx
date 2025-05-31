import { useRoute } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import { FilterSection } from '../../components/buyers_side/Filters';
import Header from '../../components/buyers_side/Header';
import ProductCard from '../../components/buyers_side/ProductCard';

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
    {
        id: 5,
        title: "Organic Fresh Apples ",
        actualPrice: "₹199",
        discountPercentage: 0,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
    },
    {
        id: 6,
        title: "Farm Fresh Eggs (Pack of 12) Some Long Title",
        discountedPrice: "₹120",
        actualPrice: "₹170",
        discountPercentage: 30,
        image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05",
    },
];

export default function Products({ navigation,  }) {
    const route = useRoute()
    const { category } = route.params || {};

    const renderProductCard = ({ item }) => (
        <ProductCard data={item} />
    );

    return (
        <>
            <Header showSearchIcon />
            <View style={{ zIndex: 100 }}>
                <FilterSection category={category || undefined} />
            </View>

            <View style={{ marginBottom: 130 }}>
                <FlatList
                    data={cardData}
                    numColumns={2}
                    renderItem={renderProductCard}
                    keyExtractor={(index) => String(Math.random() * 10000000)}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    style={{backgroundColor: "#fff"}}
                    ListHeaderComponent={
                        <Text style={{ fontSize: 26, color: "#343a40", fontFamily: 'Poppins-Bold', paddingHorizontal: 15, paddingVertical: 5, marginTop: 9 }}>Our Collection</Text>
                    }
                    ListFooterComponent={
                        <View style={{ height: 30 }} />
                    }
                />
            </View>
        </>
    )
}