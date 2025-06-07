import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoryCard from '../../components/buyers_side/CategoryCard';
import { GradientSeparator } from '../../components/common/Separator';
import { THEME_COLOR } from '../../constant';


export default function SearchScreen({ navigation }) {
    const route = useRoute()
    const { defaultQuery } = route.params
    const [query, setQuery] = useState(defaultQuery);
    const [searchHistory] = useState(["Fertilisers", "Seeds", "Pesticides", "Kalkarama Fertilisers"]);
    const [topSearches] = useState(["Fertilisers", "Seeds", "Pesticides", "Farm Equipements"]);
    const [suggestions, setSuggestions] = useState([
        {
            id: 1,
            title: 'Kalkarama Fertilisers',
            price: 549,
            image: 'https://omkarfertilisers.com/wp-content/uploads/2024/03/PhosWin-50-kg.jpg'
        },
        {
            id: 2,
            title: 'Organic Pesticides',
            price: 299,
            image: 'https://omkarfertilisers.com/wp-content/uploads/2024/03/PhosWin-50-kg.jpg'
        },
        {
            id: 3,
            title: 'Neem Oil Pesticide',
            price: 199,
            image: 'https://omkarfertilisers.com/wp-content/uploads/2024/03/PhosWin-50-kg.jpg'
        },
        {
            id: 4,
            title: 'Bio Compost Fertilizer',
            price: 349,
            image: 'https://omkarfertilisers.com/wp-content/uploads/2024/03/PhosWin-50-kg.jpg'
        },
        {
            id: 5,
            title: 'Liquid Growth Booster',
            price: 129,
            image: 'https://omkarfertilisers.com/wp-content/uploads/2024/03/PhosWin-50-kg.jpg'
        }
    ]);

    const [categories] = useState([
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
    ]);

    const filteredSuggestions = suggestions.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleSearchSubmit = useCallback((searchQuery) => {
        if (searchQuery?.length > 0) {
            navigation.navigate("SearchResult", { query: searchQuery });
        }
    }, [navigation]);


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#99d98c", '#ffffff']}
                style={styles.headerGradient}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Icon name="arrow-back" size={24} color="#212529" />
                    </TouchableOpacity>

                    <View style={styles.searchInputContainer}>
                        <Icon name="search" size={20} color="#666" />
                        <TextInput
                            placeholder="Search products..."
                            value={query}
                            onChangeText={setQuery}
                            style={styles.input}
                            placeholderTextColor="#999"
                            autoFocus={false}
                        />
                        {query.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setQuery('')}
                                style={styles.clearButton}
                            >
                                <Icon name="close" size={20} color="#666" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </LinearGradient>

            <FlatList
                data={[]} // Empty data array as we'll use ListHeaderComponent
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <>
                        {query.length === 0 ? (
                            <>
                                {searchHistory.length > 0 && (
                                    <>
                                        <View style={[styles.section, { paddingTop: 2 }]}>
                                            <Text style={styles.sectionTitle}>Recent Searches</Text>
                                            {searchHistory.map((item, index) => (
                                                <Pressable
                                                    key={index}
                                                    android_ripple={{ color: "#e9ecef" }}
                                                    style={styles.historyItem}
                                                    onPress={() => handleSearchSubmit(item)}
                                                >
                                                    <Icon name="schedule" size={20} color="#666" />
                                                    <Text style={styles.historyText}>{item}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                        <GradientSeparator first='#c2f8cb' second='#f0fff1' third='#f0fff1' />
                                    </>
                                )}

                                {topSearches.length > 0 && (
                                    <>
                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Popular Searches</Text>
                                            <View style={styles.topSearchesContainer}>
                                                {topSearches.map((item, index) => (
                                                    <Pressable
                                                        key={index}
                                                        style={styles.topSearchItem}
                                                        onPress={() => handleSearchSubmit(item)}
                                                    >
                                                        <Text style={styles.topSearchText}>{item}</Text>
                                                    </Pressable>
                                                ))}
                                            </View>
                                        </View>
                                        <GradientSeparator first='#c2f8cb' second='#f0fff1' third='#f0fff1' />
                                    </>
                                )}

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Shop by Category</Text>
                                    <View style={styles.categoriesGrid}>
                                        {categories.map((category, index) => (
                                            <CategoryCard
                                                key={category.id}
                                                category={category}
                                                onPress={() => navigation.navigate('BuyersTab', {
                                                    screen: 'Products',
                                                    params: { category: index }
                                                })}
                                            />
                                        ))}
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Suggestions</Text>
                                {filteredSuggestions.map((item) => (
                                    <Pressable
                                        key={item.id}
                                        android_ripple={{ color: "#e9ecef" }}
                                        style={styles.suggestionItem}
                                        onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.suggestionImage}
                                        />
                                        <View style={styles.suggestionContent}>
                                            <Text style={styles.suggestionTitle} numberOfLines={1}>
                                                {item.title}
                                            </Text>
                                            <Text style={styles.suggestionPrice}>
                                                ₹{item.price}
                                            </Text>
                                        </View>
                                        <Icon name="chevron-right" size={20} color="#adb5bd" />
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </>
                )}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingVertical: 17
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        paddingHorizontal: 12,
        gap: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#212529',
    },
    clearButton: {
        padding: 4,
    },
    list: {
        flex: 1,
    },
    section: {
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingVertical: 11,
        gap: 12,
    },
    historyText: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#495057',
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
    },
    suggestionImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
    },
    suggestionContent: {
        flex: 1,
    },
    suggestionTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#212529',
        marginBottom: 4,
    },
    suggestionPrice: {
        fontSize: 14,
        color: THEME_COLOR,
        fontFamily: 'Poppins-Bold',
    },
    topSearchesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 8,
    },
    topSearchItem: {
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
        marginBottom: 8,
    },
    topSearchText: {
        fontSize: 14,
        color: '#495057',
        fontFamily: 'Poppins-SemiBold',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 12,
    },
    headerGradient: {
        width: '100%',
        paddingBottom: 12,
        paddingTop: 20
    },
});