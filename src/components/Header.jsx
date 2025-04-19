import { View, Text, Image, TextInput, Pressable, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, BackHandler, Keyboard } from 'react-native';
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
    const inputRef = useRef(null);

    const handleSearchToggle = () => {
        setShowSearch(prev => !prev);
    }

    const handleOpenKeyboard = () => {
        inputRef.current?.focus(); // 👈 This opens the keyboard
    };

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

    const handleCloseDropdown = () => {
        console.log("LOL")
        setQuery("")
        setShowSearch(false);
        Keyboard.dismiss();
    }

    useEffect(() => {
        console.log(showSearch)
        const handleBackPress = () => {
            if (showSearch) {
                setShowSearch(false);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => backHandler.remove();
    }, [showSearch]);


    return (
        <View style={styles.container}>
            {/* Header Bar */}
            <View style={styles.header}>
                <Image source={require("../assets/icons/brandLogo.png")} style={{ width: 140, height: 75 }} />
                <View style={styles.iconRow}>
                    <Icon onPress={handleSearchToggle} name='search' size={30} />
                    {!inCartScreen && (
                        <Icon onPress={() => navigation.navigate("Cart")} name='shopping-cart' size={30} />
                    )}
                </View>
            </View>
            {showSearch && (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', height: Dimensions.get("screen").height, position: "absolute", top: 0, left: 0, right: 0, zIndex: 10000000000000 }}>
                    <TouchableWithoutFeedback onPress={handleCloseDropdown}>
                        {/* Floating Dropdown */}
                        <View style={{ flex: 1, height: Dimensions.get("screen").height, width: "100%" }}>
                            <AnimatePresence>
                                {/* {showSearch && ( */}
                                <MotiView
                                    from={{ opacity: 0, translateY: -10 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    exit={{ opacity: 0, translateY: -10 }}
                                    transition={{ type: "timing", duration: 300 }}
                                    style={styles.dropdown}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <TextInput
                                            ref={inputRef}
                                            placeholder="Search products..."
                                            value={query}
                                            onChangeText={setQuery}
                                            style={styles.input}
                                            onPress={handleOpenKeyboard}
                                        />
                                        <Pressable onPress={() => handleSearchSubmit(query)} style={styles.searchButton} >
                                            <Icon name='search' size={20} color="#fff" />
                                        </Pressable>
                                    </View>

                                    {searchHistory.length > 0 && query.length <= 0 && (
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Search History</Text>
                                            <FlatList
                                                data={searchHistory}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item }) => (
                                                    <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
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
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Top Searches</Text>
                                            <FlatList
                                                data={topSearches}
                                                keyExtractor={(item, index) => String(index + 30)}
                                                renderItem={({ item }) => (
                                                    <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {
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
                                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Suggestions</Text>
                                    )}
                                    {query.length > 0 && filteredSuggestions.length > 0 && (
                                        <FlatList
                                            data={filteredSuggestions}
                                            keyExtractor={(item, index) => String(index + 60)}
                                            renderItem={({ item }) => (
                                                <Pressable onPress={() => {
                                                    handleSearchSubmit(item);
                                                }}>
                                                    <Text style={styles.suggestionText}>{item}</Text>
                                                </Pressable>
                                            )}
                                            style={{ maxHeight: 220 }}
                                        />
                                    )}
                                </MotiView>
                                {/* )} */}
                            </AnimatePresence>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView >
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 1000
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        backgroundColor: "#f6f5f3",
        paddingVertical: 5,
        zIndex: 2
    },
    iconRow: {
        flexDirection: "row",
        gap: 25,
        paddingRight: 5
    },
    dropdown: {
        position: "absolute",
        top: 80,
        left: 10,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 999
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        width: "85%",
    },
    suggestionText: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 15
    },
    searchButton: {
        backgroundColor: THEME_COLOR,
        padding: 10,
        marginTop: -10,
        borderRadius: 8,
        alignItems: "center"
    }
});
