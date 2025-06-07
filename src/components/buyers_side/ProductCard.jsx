import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME_COLOR } from '../../constant';


export default function ProductCard({ data, horizontal = false }) {
    const navigation = useNavigation();

    return (
        <Pressable
            style={[
                styles.card,
                horizontal && {
                    width: 220,
                    margin: 8,
                }
            ]}
            onPress={() => navigation.navigate('ProductDetails', { productId: data.id })}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: data.image }} 
                    style={styles.imageStyle}
                    resizeMode="cover"
                />
                {data.discountPercentage > 0 && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                            {data.discountPercentage}% OFF
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.contentContainer}>
                <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail" 
                    style={styles.title}
                >
                    {data.title}
                </Text>

                <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#ffc107" />
                    <Text style={styles.rating}>{data.rating || 4.5}</Text>
                    <Text style={styles.ratingCount}>({data.noOfPeopleRated || 128})</Text>
                </View>

                <View style={styles.priceSection}>
                    <View style={styles.priceRow}>
                        {data.discountPercentage > 0 ? (
                            <>
                                <Text style={styles.discountedPrice}>
                                    {data.discountedPrice}
                                </Text>
                                <Text style={styles.actualPrice}>
                                    {data.actualPrice}
                                </Text>
                            </>
                        ) : (
                            <Text style={styles.normalPrice}>
                                {data.actualPrice}
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            <Pressable
                style={styles.addToCartButton}
                onPress={(e) => {
                    e.stopPropagation();
                }}
                android_ripple={{
                    color: '#e9ecef',
                    borderless: false
                }}
            >
                <Icon name='shopping-cart' size={20} color={THEME_COLOR} />
                <Text style={{ color: THEME_COLOR }}>Add to Cart</Text>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 170,
        margin: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 320,
    },
    imageContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: 170,
    },
    contentContainer: {
        padding: 12,
        paddingBottom: 60,
    },
    imageStyle: {
        width: '87%',
        height: '87%',
    },
    discountBadge: {
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    discountText: {
        color: '#2e7d32',
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
    },
    contentContainer: {
        padding: 12,
        paddingBottom: 60,
    },
    title: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: "#1d1e18",
        marginBottom: 8,
        lineHeight: 20,
    },
    priceSection: {
        marginBottom: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    normalPrice: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: "black",
    },
    discountedPrice: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: THEME_COLOR,
    },
    actualPrice: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        textDecorationLine: 'line-through',
    },
    addToCartButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: THEME_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    rating: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#495057',
    },
    ratingCount: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
    },
    sellerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    sellerText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#495057',
    },
    deliveryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    deliveryText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
    },
});