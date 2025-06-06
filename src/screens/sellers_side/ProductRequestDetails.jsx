import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';

export default function ProductRequestDetails({ route, navigation }) {
    // In real app, fetch details using route.params.id
    const productDetails = {
        id: 1,
        name: 'Organic Tomatoes',
        description: 'Fresh, organically grown tomatoes from local farmers. Perfect for salads and cooking. No pesticides used.',
        images: [
            'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg',
            'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg',
            'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg',
            'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg',
        ],
        quantity: '5000 kg',
        price: '₹25/kg',
        // quantity: '5000',
        // price: '200',
        status: 'Pending',
        date: '24 Apr 2025',
        requestInfo: {
            requestId: 'REQ123456',
            submittedAt: '24 Apr 2025, 10:30 AM',
            lastUpdated: '24 Apr 2025, 02:45 PM',
            expectedResponse: '48 hours',
        },
        qualityInfo: {
            organic: true,
            freshness: 'Fresh',
            graded: true,
            certification: 'Organic Certification',
        }
    };

    // Helper Components
    const DetailItem = ({ icon, label, value, style }) => (
        <View style={[styles.detailItem, style]}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={18} color={THEME_COLOR} />
            </View>
            <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue} numberOfLines={2}>{value}</Text>
            </View>
        </View>
    );

    // Helper Functions
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'approved': return { backgroundColor: '#198754' };
            case 'rejected': return { backgroundColor: '#dc3545' };
            default: return { backgroundColor: '#ffc107' };
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'approved': return 'check-circle';
            case 'rejected': return 'close-circle';
            default: return 'clock-outline';
        }
    };

    const calculateTotal = (price, quantity) => {
        // Handle both string and number inputs
        const priceValue = typeof price === 'string'
            ? parseFloat(price.replace(/[^\d.]/g, ''))  // Remove non-numeric chars except decimal
            : parseFloat(price);

        const quantityValue = typeof quantity === 'string'
            ? parseFloat(quantity.replace(/[^\d.]/g, ''))
            : parseFloat(quantity);

        if (isNaN(priceValue) || isNaN(quantityValue)) return '0';

        const total = priceValue * quantityValue;

        // Format with Indian numbering system and add commas
        return total.toLocaleString('en-IN');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    android_ripple={{ color: '#ddd' }}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name="arrow-left" size={24} color="#212529" />
                </Pressable>
                <Text style={styles.headerTitle}>Request Details</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Status Banner */}
                    <View style={[styles.statusBanner, getStatusStyle(productDetails.status)]}>
                        <Icon name={getStatusIcon(productDetails.status)} size={20} color="#fff" />
                        <Text style={styles.statusText}>{productDetails.status}</Text>
                    </View>

                    {/* Basic Info Section */}
                    <View style={styles.section}>
                        <Text style={styles.productName}>{productDetails.name}</Text>
                        <Text style={styles.description}>{productDetails.description}</Text>
                    </View>

                    {/* Images Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Images</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.imagesContainer}
                        >
                            {productDetails.images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image }}
                                    style={styles.productImage}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Pricing Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pricing Details</Text>
                        <View style={styles.detailsGrid}>
                            <DetailItem
                                icon="scale"
                                label="Quantity"
                                value={productDetails.quantity}
                            />
                            <DetailItem
                                icon="currency-inr"
                                label="Price per unit"
                                value={`${productDetails.price}`}
                            />
                            <DetailItem
                                icon="cash-multiple"
                                label="Total Value"
                                value={`₹${calculateTotal(productDetails.price, productDetails.quantity)}`}
                                style={styles.fullWidth}
                            />
                        </View>
                    </View>

                    {/* Replace the Request Information section with this */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Request Timeline</Text>
                        <View style={styles.timelineContainer}>
                            <DetailItem
                                icon="calendar-check"
                                label="Request Date"
                                value={productDetails.date}
                            />
                            <DetailItem
                                icon="update"
                                label="Last Updated"
                                value={productDetails.requestInfo.lastUpdated}
                            />
                            <DetailItem
                                icon="clock-time-four"
                                label="Expected Response"
                                value={productDetails.requestInfo.expectedResponse}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 32,
        padding: 8,
        backgroundColor: '#fff',
        elevation: 2,
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        color: '#212529',
    },
    content: {
        padding: 16,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    statusText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Poppins-Bold",
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 1,
    },
    productName: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: '#212529',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        fontFamily: "Poppins-Normal",
        color: '#6c757d',
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: "Poppins-Bold",
        color: '#212529',
        marginBottom: 16,
    },
    imagesContainer: {
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    productImage: {
        width: 200,
        height: 200,
        borderRadius: 12,
        marginRight: 12,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'flex-start',
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        flex: 1,
        minWidth: '45%',
    },
    fullWidth: {
        minWidth: '100%',
    },
    timelineContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0, // Prevent icon from shrinking
    },
    detailValue: {
        fontSize: 14,
        color: '#212529',
        fontFamily: "Poppins-SemiBold",
        flexShrink: 1, // Allow text to wrap
        flexWrap: 'wrap',
        width: 100,
    },
    qualityContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    qualityTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    activeQualityTag: {
        backgroundColor: THEME_COLOR,
        borderColor: THEME_COLOR,
    },
    qualityTagText: {
        fontSize: 14,
        fontFamily: "Poppins-Normal",
        color: '#6c757d',
    },
    activeQualityTagText: {
        color: '#fff',
        fontFamily: "Poppins-Normal",
    },
});