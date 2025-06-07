import { useRoute } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import { FilterSection } from '../../components/buyers_side/Filters';
import Header from '../../components/buyers_side/Header';
import ProductCard from '../../components/buyers_side/ProductCard';

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
        title: "Urea Nitrogen (46%)",
        actualPrice: "₹199",
        discountPercentage: 0,
        image: "https://gogarden.co.in/cdn/shop/files/71yg6hRnpTL._SL1200_fac2b8e7-208b-482d-9493-07d03daaff6f.jpg?v=1741858085",
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
                <FilterSection category={category} />
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