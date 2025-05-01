import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { THEME_COLOR } from '../../constant';
import LinearGradient from 'react-native-linear-gradient';

export default function Header({ inCartScreen = false }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#99d98c", '#ffffff']}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/icons/brandLogo.png")}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                    {!inCartScreen && (
                        <TouchableOpacity
                            style={[styles.iconButton, styles.glassEffect]}
                            onPress={() => navigation.navigate("Cart")}
                            activeOpacity={0.7}
                        >
                            <Icon name='shopping-cart' size={24} color={THEME_COLOR} />
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>2</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.searchBar}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Search products...</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 1000,
        backgroundColor: '#fff',
    },
    gradient: {
        width: '100%',
        paddingBottom: 12,
        height: 120,
        // borderWidth: 1
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    logo: {
        width: 136,
        height: 50,
    },
    iconRow: {
        flexDirection: "row",
        gap: 16,
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
    },
    glassEffect: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
        borderWidth: 2,
        borderColor: '#fff',
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
        touchAction: 'none', // Add this
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
        marginRight: 12,
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
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
        elevation: 2,
    },
    searchPlaceholder: {
        fontSize: 15,
        color: '#adb5bd',
        flex: 1,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    suggestionImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
    },
    suggestionContent: {
        flex: 1,
    },
    suggestionTitle: {
        fontSize: 15,
        color: '#333',
    },
    suggestionPrice: {
        fontSize: 14,
        color: '#666',
    },
    suggestionsWrapper: {
        maxHeight: 220,
    },
});
