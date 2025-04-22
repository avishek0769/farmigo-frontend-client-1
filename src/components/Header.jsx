import { View, Text, Image, TextInput, Pressable, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, BackHandler, Keyboard, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { MotiView, AnimatePresence } from 'moti';
import { useCallback, useEffect, useRef, useState } from 'react';
import { THEME_COLOR } from '../constant';


export default function Header({ inCartScreen = false }) {
    const navigation = useNavigation();
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState('');
    const [topSearches, setTopSearches] = useState(["Fertilisers", "Seeds", "Pesticides"]);
    const [searchHistory, setSearchHistory] = useState(["Fertilisers", "Seeds", "Pesticides", "Kalkarama Fertilisers", "Pesticides"]);
    const [suggestions, setSuggestions] = useState(['Kalkarama Fertilisers', 'Pesticides', 'Mannu Neem Cake', 'Borne Fertilisers', 'Fertilisers', 'Seeds', 'Pesticides', 'Fertilizers', 'Organic Fertilizers', 'Bio Pesticides']);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const inputRef = useRef(null);

    const handleSearchToggle = () => {
        setShowSearch(prev => !prev);
    }

    const handleSearchSubmit = useCallback((pressedQuery) => {
        if (pressedQuery?.length > 0) {
            setShowSearch(false);
            navigation.navigate("SearchResult", { query: pressedQuery });
            setQuery("")
        }
    }, [query, setQuery, setShowSearch, navigation]);

    const filteredSuggestions = suggestions.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
                // Blur the input when keyboard hides
                inputRef.current?.blur();
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        const handleBackPress = () => {
            if (showSearch) {
                if (keyboardVisible) {
                    Keyboard.dismiss();
                    return true;
                }
                setShowSearch(false);
                return true;
            }
            return false;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => backHandler.remove();
    }, [showSearch, keyboardVisible]);

    const handleCloseDropdown = () => {
        if (keyboardVisible) {
            Keyboard.dismiss();
            inputRef.current?.blur(); // Also blur when manually closing
        } else {
            setQuery("");
            setShowSearch(false);
        }
    };


    return (
        <View style={styles.container}>
            {/* Header Bar */}
            <View style={styles.header}>
                <Image
                    source={require("../assets/icons/brandLogo.png")}
                    style={styles.logo}
                    resizeMode="cover"
                />
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleSearchToggle}
                        activeOpacity={0.7}
                    >
                        <Icon name='search' size={24} color="#333" />
                    </TouchableOpacity>

                    {!inCartScreen && (
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate("Cart")}
                            activeOpacity={0.7}
                        >
                            <Icon name='shopping-cart' size={24} color="#333" />
                            {/* Add cart badge if needed */}
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>2</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Search Overlay */}
            {showSearch && (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.searchOverlay}
                >
                    <TouchableWithoutFeedback onPress={handleCloseDropdown}>
                        <View style={styles.overlayContent}>
                            <AnimatePresence>
                                <MotiView
                                    from={{ opacity: 0, translateY: -20 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    exit={{ opacity: 0, translateY: -20 }}
                                    transition={{
                                        type: "spring",
                                        damping: 18,
                                        stiffness: 250
                                    }}
                                    style={styles.dropdown}
                                >
                                    <View style={styles.searchInputContainer}>
                                        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
                                        <TextInput
                                            ref={inputRef}
                                            placeholder="Search products..."
                                            value={query}
                                            onChangeText={setQuery}
                                            style={styles.input}
                                            placeholderTextColor="#999"
                                            autoFocus={true} // Add this
                                            onFocus={() => setKeyboardVisible(true)} // Add this
                                            blurOnSubmit={false} // Add this
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

                                    {searchHistory.length > 0 && query.length <= 0 && (
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.sectionTitle}>Search History</Text>
                                            <FlatList
                                                data={searchHistory}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item }) => (
                                                    <Pressable android_ripple={{ color: "#e9ecef" }} style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }} onPress={() => {
                                                        console.log("History")
                                                        handleSearchSubmit(item);
                                                    }}>
                                                        <Icon name='schedule' size={20} />
                                                        <Text style={styles.suggestionText}>{item}</Text>
                                                    </Pressable>
                                                )}
                                            />
                                        </View>
                                    )}

                                    {/* TOP Seraches */}
                                    {topSearches.length > 0 && query.length <= 0 && (
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.sectionTitle}>Top Searches</Text>
                                            <FlatList
                                                data={topSearches}
                                                keyExtractor={(item, index) => String(index + 30)}
                                                renderItem={({ item }) => (
                                                    <Pressable android_ripple={{ color: "#e9ecef" }} style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }} onPress={() => {
                                                        console.log("TOP")
                                                        handleSearchSubmit(item);
                                                    }}>
                                                        <Icon name='north-east' size={20} />
                                                        <Text style={styles.suggestionText}>{item}</Text>
                                                    </Pressable>
                                                )}
                                                style={{ maxHeight: 140 }}
                                            />
                                        </View>
                                    )}

                                    {/* Suggestions */}
                                    {query.length > 0 && (
                                        <Text style={styles.sectionTitle}>Suggestions</Text>
                                    )}
                                    {query.length > 0 && filteredSuggestions.length > 0 && (
                                        <FlatList
                                            data={filteredSuggestions}
                                            keyExtractor={(item, index) => String(index + 60)}
                                            renderItem={({ item }) => (
                                                <Pressable android_ripple={{ color: "#e9ecef" }} onPress={() => {
                                                    handleSearchSubmit(item);
                                                }}>
                                                    <Text style={styles.suggestionText}>{item}</Text>
                                                </Pressable>
                                            )}
                                            style={{ maxHeight: 220 }}
                                        />
                                    )}
                                </MotiView>
                            </AnimatePresence>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 1000,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
    },
    logo: {
        width: 120,
        height: 40,
    },
    iconRow: {
        flexDirection: "row",
        gap: 16,
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: THEME_COLOR,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    searchOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: Dimensions.get("screen").height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    overlayContent: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    dropdown: {
        position: "absolute",
        top: 80,
        left: 16,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingTop: 16,
        paddingBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        marginHorizontal: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 4,
    },
    suggestionText: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#333',
    },
    searchButton: {
        backgroundColor: THEME_COLOR,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: '#333',
        marginBottom: 8,
        marginTop: 6,
        paddingHorizontal: 16
    },
});
