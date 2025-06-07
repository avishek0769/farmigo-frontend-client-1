import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME_COLOR } from '../../constant';

const categories = [
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
];

function SmallCategoryCard({ category, onPress, icon }) {
    return (
        <Pressable
            style={styles.smallCatContainer}
            onPress={onPress}
            android_ripple={{ color: '#e9ecef' }}
        >
            <Image
                source={{ uri: category.image }}
                style={styles.image}
                resizeMode='cover'
            />
            <Text style={styles.name} numberOfLines={2} lineBreakMode='tail'>
                {category.name}
            </Text>
        </Pressable>
    );
}

export default function Header({ inCartScreen = false, category = false, defaultQuery = "", showSearchIcon = false }) {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { height: category ? 235 : 145 }, { height: showSearchIcon ? 100 : 235 }]}>
            <LinearGradient
                colors={["#99d98c", '#ffffff']}
                style={[styles.gradient, { height: category ? 180 : 130 }, { height: showSearchIcon ? 100 : 180 }]}
            >
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/icons/brandLogo.png")}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                    <View style={styles.iconRow}>
                        {showSearchIcon && (
                            <TouchableOpacity
                                style={[styles.iconButton, styles.glassEffect]}
                                onPress={() => navigation.navigate('Search', { defaultQuery })}
                                activeOpacity={0.7}
                            >
                                <Icon name='search' size={24} color={THEME_COLOR} />
                            </TouchableOpacity>
                        )}
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
                </View>

                {!showSearchIcon && (
                    <TouchableOpacity
                        style={styles.searchBar}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Search', { defaultQuery })}
                    >
                        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
                        <Text style={[styles.searchPlaceholder, { color: defaultQuery.length ? "black" : "#adb5bd" }]}>
                            {defaultQuery.length ? defaultQuery : "Search products..."}
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Add Categories Section */}
                {category && <View style={styles.categoriesContainer}>
                    <FlatList
                        horizontal
                        data={categories}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.categoriesList}
                        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                        renderItem={({ item, index }) => (
                            <SmallCategoryCard
                                category={item}
                                onPress={() => navigation.navigate('Products', { category: index })}
                            />
                        )}
                    />
                </View>}
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
        paddingTop: 20
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
        gap: 12,
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
        fontFamily: 'Poppins-Bold',
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
        touchAction: 'none',
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
        fontFamily: 'Poppins-Regular',
        color: '#333',
    },
    clearButton: {
        padding: 4,
    },
    suggestionText: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
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
        fontFamily: 'Poppins-Bold',
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
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#e9ecef',
        elevation: 2,
    },
    searchPlaceholder: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
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
        fontFamily: 'Poppins-Regular',
        color: '#333',
    },
    suggestionPrice: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#666',
    },
    suggestionsWrapper: {
        maxHeight: 220,
    },
    categoriesContainer: {
        marginTop: 12,
        height: 100,
    },
    categoriesList: {
        paddingHorizontal: 16,
    },
    smallCatContainer: {
        alignItems: 'center',
        borderRadius: 8,
        padding: 2,
        backgroundColor: "transparent",
        width: 75
    },
    image: {
        width: 51,
        height: 51,
        borderRadius: 6,
        marginBottom: 4,
    },
    name: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#495057',
        textAlign: 'center',
        lineHeight: 18,
    }
});
