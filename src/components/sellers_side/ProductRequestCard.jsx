import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';
import { useNavigation } from '@react-navigation/native';

export default function ProductRequestCard({ item, onEdit }) {
    const navigation = useNavigation();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return '#198754';
            case 'Rejected': return '#dc3545';
            default: return '#ffc107';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return 'check-circle';
            case 'Rejected': return 'close-circle';
            default: return 'clock-outline';
        }
    };

    const formatPrice = (price, quantity) => {
        // If price is already formatted with ₹ symbol, return as is
        if (typeof price === 'string' && price.includes('₹')) {
            return price;
        }
        return `₹${price}/unit`;
    };

    const formatLargeNumber = (num) => {
        if (num >= 10000000) { // 1 Crore
            return `${(num / 10000000).toFixed(1)}Cr`;
        } else if (num >= 100000) { // 1 Lakh
            return `${(num / 100000).toFixed(1)}L`;
        } else if (num >= 10000) { // 10 Thousand
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const calculateTotal = (price, quantity) => {
        let totalPrice;
        if (typeof price === 'string' && price.includes('₹')) {
            // Extract numeric value from formatted price
            const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
            totalPrice = numericPrice * parseInt(quantity);
        } else {
            totalPrice = price * parseInt(quantity);
        }

        return `₹${formatLargeNumber(totalPrice)}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.requestItem}>
                <View style={styles.headerSection}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.headerContent}>
                        <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
                        <View style={styles.headerInfo}>
                            <Text style={styles.dateText}>Requested on {item.date || 'Today'}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                                <Icon
                                    name={getStatusIcon(item.status)}
                                    size={12}
                                    color="#fff"
                                    style={styles.statusIcon}
                                />
                                <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailsSection}>
                    <View style={styles.detailsRow}>
                        <View style={styles.detail}>
                            <View style={styles.iconContainer}>
                                <Icon name="package-variant" size={16} color={THEME_COLOR} />
                            </View>
                            <View>
                                <Text style={styles.detailLabel}>Quantity</Text>
                                <Text style={styles.detailText}>{item.quantity}</Text>
                            </View>
                        </View>

                        <View style={[styles.detail, { marginLeft: -5 }]}>
                            <View style={styles.iconContainer}>
                                <Icon name="currency-inr" size={16} color={THEME_COLOR} />
                            </View>
                            <View>
                                <Text style={styles.detailLabel}>Price</Text>
                                <Text style={styles.detailText}>
                                    {formatPrice(item.price, parseInt(item.quantity))}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.detail}>
                            <View style={styles.iconContainer}>
                                <Icon name="cash-multiple" size={16} color={THEME_COLOR} />
                            </View>
                            <View>
                                <Text style={styles.detailLabel}>Total</Text>
                                <Text style={[styles.detailText, { fontWeight: '800' }]}>
                                    {calculateTotal(item.price, parseInt(item.quantity))}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.footerSection}>
                    <Pressable
                        android_ripple={{ color: '#ddd' }}
                        style={styles.footerButton}
                        onPress={() => onEdit(item)}
                    >
                        <Icon name="pencil" size={18} color={THEME_COLOR} />
                        <Text style={styles.footerButtonText}>Edit</Text>
                    </Pressable>

                    <View style={styles.verticalDivider} />

                    <Pressable
                        android_ripple={{ color: '#ddd' }}
                        style={styles.footerButton}
                        onPress={() => navigation.navigate('ProductRequestDetails', { itemId: item.id })}
                    >
                        <Text style={styles.footerButtonText}>View Details</Text>
                        <Icon name="chevron-right" size={20} color={THEME_COLOR} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 3,
    },
    requestItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        paddingBottom: 0,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerSection: {
        flexDirection: 'row',
        gap: 12,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    headerContent: {
        flex: 1,
        gap: 8,
    },
    requestHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212529',
        lineHeight: 20,
        flex: 1,
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#6c757d',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
        gap: 4,
        alignSelf: 'flex-start',
        marginRight: "-2%"
    },
    statusIcon: {
        marginRight: 2,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#dee2e6',
        marginVertical: 12,
    },
    detailsSection: {
        paddingVertical: 8,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 7,
        flex: 1,
    },
    iconContainer: {
        width: 32,
        height: 32,
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 4,
    },
    detailText: {
        color: '#212529',
        fontSize: 14,
        fontWeight: '500',
    },
    perItemText: {
        color: '#6c757d',
        fontSize: 12,
        marginTop: 2,
    },
    footerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#dee2e6',
    },
    footerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        gap: 4,
    },
    footerButtonText: {
        color: THEME_COLOR,
        fontSize: 14,
        fontWeight: '500',
    },
    verticalDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#dee2e6',
    },
});