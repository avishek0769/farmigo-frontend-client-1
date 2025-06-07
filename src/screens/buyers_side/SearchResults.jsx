import { useRoute } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { FilterSection } from '../../components/buyers_side/Filters'
import Header from '../../components/buyers_side/Header'
import ProductCard from '../../components/buyers_side/ProductCard'

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

export default function SearchResult({ navigation }) {
    const route = useRoute()
    const { query } = route.params

    const renderProductCard = ({ item }) => (
        <ProductCard data={item} />
    );

    return (
        <>
            <Header defaultQuery={query} showSearchIcon={true} />
            <View style={{ zIndex: 100 }}>
                <FilterSection />
            </View>

            <View>
                <FlatList
                    data={cardData}
                    numColumns={2}
                    renderItem={renderProductCard}
                    keyExtractor={(index) => String(Math.random() * 10000000)}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    ListHeaderComponent={
                        <View style={styles.headerContainer}>
                            <Text style={styles.searchQuery}>Search results for</Text>
                            <Text style={styles.queryText}>"{query}"</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{ margin: 105 }}></View>
                    }
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 15,
        paddingTop: 12,
        paddingBottom: 8
    },
    searchQuery: {
        fontSize: 14,
        color: "#6c757d",
    },
    queryText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#343a40",
        marginTop: 4
    }
});