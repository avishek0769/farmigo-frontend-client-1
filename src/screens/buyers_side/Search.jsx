import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME_COLOR } from '../../constant';
import CategoryCard from '../../components/buyers_side/CategoryCard';
import LinearGradient from 'react-native-linear-gradient';

export default function SearchScreen({ navigation }) {
    const [query, setQuery] = useState('');
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
            name: 'Fertilizers',
            image: 'https://s3-eu-west-1.amazonaws.com/yara-links/lvej.png'
        },
        {
            id: 2,
            name: 'Seeds',
            image: 'https://images.pexels.com/photos/401213/pexels-photo-401213.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            id: 3,
            name: 'Pesticides',
            image: 'https://agrijunction.s3.ap-south-1.amazonaws.com/uploads/products/meta/PVaagfZX1VVt7rJTzukcEvGmSzsDGGYYtecmvX8I.webp'
        },
        {
            id: 4,
            name: 'Tools',
            image: 'https://jcblhandtools.com/wp-content/uploads/2024/05/Garden-Fork.webp'
        },
        {
            id: 5,
            name: 'Fertilizers',
            image: 'https://s3-eu-west-1.amazonaws.com/yara-links/lvej.png'
        },
        {
            id: 6,
            name: 'Seeds',
            image: 'https://images.pexels.com/photos/401213/pexels-photo-401213.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            id: 7,
            name: 'Pesticides',
            image: 'https://agrijunction.s3.ap-south-1.amazonaws.com/uploads/products/meta/PVaagfZX1VVt7rJTzukcEvGmSzsDGGYYtecmvX8I.webp'
        },
        {
            id: 8,
            name: 'Tools',
            image: 'https://jcblhandtools.com/wp-content/uploads/2024/05/Garden-Fork.webp'
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

    const Separator = () => (
        <View style={styles.separator}>
            <LinearGradient
                colors={['#c2f8cb', '#f0fff1', '#f0fff1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.separatorGradient}
            />
        </View>
    );

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
                                        <View style={[styles.section, {paddingTop: 2}]}>
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
                                        <Separator />
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
                                        <Separator />
                                    </>
                                )}

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Shop by Category</Text>
                                    <View style={styles.categoriesGrid}>
                                        {categories.map((category) => (
                                            <CategoryCard
                                                key={category.id}
                                                category={category}
                                                onPress={() => navigation.navigate('Category', { category })}
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
                                        onPress={() => handleSearchSubmit(item.title)}
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
        fontWeight: '600',
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
        color: '#212529',
        marginBottom: 4,
    },
    suggestionPrice: {
        fontSize: 14,
        color: THEME_COLOR,
        fontWeight: '600',
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
        fontWeight: '500',
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
    },
    separator: {
        // marginVertical: 1,
    },
    separatorGradient: {
        height: 8,
        width: '100%',
    },
});