import { View, Text, StyleSheet, Image, ScrollView, Pressable, Share, Platform, Linking } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { THEME_COLOR } from '../../constant'
import SellerHeader from '../../components/sellers_side/SellersHeader'
import { AppContext } from '../../context/ContextProvider'
import ModalPopUp from '../../components/common/ModalPopUp'
import EditProfileModal from '../../components/sellers_side/EditProfileModal';

export default function Account({ navigation }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const { isLoggedIn, seller, setIsLoggedIn, setSeller } = AppContext()
    const [showEditModal, setShowEditModal] = useState(false);

    const handleProfileUpdate = (updatedData) => {
        setSeller({ ...seller, ...updatedData });
    };

    const handleLogout = () => {
        setShowLogoutModal(false)
        setIsLoggedIn(false)
        navigation.replace('Main')
    }

    const handleShare = async () => {
        try {
            await Share.share({
                message: 'Join Pedo App as a seller and grow your business! Download now: https://play.google.com/store/apps/your-app-link',
                title: 'Share Pedo App - Seller',
            });
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    const openNotificationSettings = async () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            const packageName = 'com.pedo_app';
            try {
                await Linking.openURL(`app-settings:notification/${packageName}`);
            }
            catch (err) {
                Linking.openSettings();
            }
        }
    };


    const menuItems = [
        {
            icon: "store-settings",
            title: "Business Settings",
            subtitle: "Update your business information",
            action: () => setShowEditModal(true)
        },
        {
            icon: "bell-outline",
            title: "Notifications",
            subtitle: "Manage your notifications",
            action: openNotificationSettings
        },
        {
            icon: "message-text-outline",
            title: "Chat with Admin",
            subtitle: "Get support from our team",
            route: "Chat"
        },
        {
            icon: "share-variant-outline",
            title: "Share App",
            subtitle: "Invite other sellers",
            action: handleShare
        },
        {
            icon: "exit-to-app",
            title: "Logout",
            subtitle: "Sign out from the app",
            action: () => setShowLogoutModal(true)
        }
    ];

    return (
        <>
            <SellerHeader />
            <ScrollView style={styles.container}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://ui-avatars.com/api/?name=' + seller.businessName }}
                                style={styles.avatar}
                            />
                            {seller.verificationStatus === 'Verified' && (
                                <View style={styles.verificationBadge}>
                                    <Icon name="check-circle" size={16} color="#fff" />
                                </View>
                            )}
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.businessName}>{seller.businessName}</Text>
                            <Text style={styles.ownerName}>Owner: {seller.ownerName}</Text>
                            <Text style={styles.phone}>{seller.phone}</Text>
                            <View style={styles.ratingContainer}>
                                <Icon name="star" size={16} color="#ffc107" />
                                <Text style={styles.rating}>{seller.rating}</Text>
                                <Text style={styles.totalOrders}>({seller.totalOrders} orders)</Text>
                            </View>
                        </View>
                        <Pressable
                            android_ripple={{ color: '#ddd' }}
                            style={styles.editButton}
                            onPress={() => setShowEditModal(true)}
                        >
                            <Icon name="pencil" size={20} color={THEME_COLOR} />
                        </Pressable>
                    </View>

                    <View style={styles.businessDetails}>
                        <View style={styles.detailItem}>
                            <Icon name="license" size={20} color={THEME_COLOR} />
                            <View style={styles.detailText}>
                                <Text style={styles.detailLabel}>License Number</Text>
                                <Text style={styles.detailValue}>{seller.licenseNumber}</Text>
                            </View>
                        </View>

                        <View style={styles.detailItem}>
                            <Icon name="map-marker-outline" size={20} color={THEME_COLOR} />
                            <View style={styles.detailText}>
                                <Text style={styles.detailLabel}>Business Location</Text>
                                <Text style={styles.detailValue}>{seller.areaLocation}</Text>
                            </View>
                        </View>

                        <View style={styles.detailItem}>
                            <Icon name="calendar-check" size={20} color={THEME_COLOR} />
                            <View style={styles.detailText}>
                                <Text style={styles.detailLabel}>Years in Business</Text>
                                <Text style={styles.detailValue}>{seller.yearsInBusiness} years</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && styles.menuItemPressed
                            ]}
                            android_ripple={{ color: '#e9ecef' }}
                            onPress={() => {
                                if (item.route) navigation.navigate(item.route);
                                else if (item.action) item.action();
                            }}
                        >
                            <View style={styles.menuItemLeft}>
                                <Icon name={item.icon} size={24} color="#495057" />
                                <View style={styles.menuItemText}>
                                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                                </View>
                            </View>
                            <Icon name="chevron-right" size={24} color="#ced4da" />
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.version}>Version 1.0.0</Text>
            </ScrollView>

            <ModalPopUp
                actionBtnTxt="Logout"
                handleAction={handleLogout}
                icon="logout"
                setShowLogoutModal={setShowLogoutModal}
                showLogoutModal={showLogoutModal}
                cancelBtnTxt="Cancel"
                actionTxt="Logout"
                actionDescriptionText="Are you sure you want to logout from the app?"
            />

            <EditProfileModal
                visible={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleProfileUpdate}
                sellerData={seller}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6'
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: THEME_COLOR,
    },
    verificationBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#198754',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileInfo: {
        flex: 1
    },
    businessName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 4
    },
    ownerName: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 2
    },
    phone: {
        fontSize: 14,
        color: '#6c757d'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    rating: {
        fontSize: 14,
        color: '#495057',
        fontWeight: '600',
    },
    totalOrders: {
        fontSize: 12,
        color: '#6c757d',
    },
    editButton: {
        padding: 8,
        backgroundColor: '#e7f5ff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#339af0',
    },
    businessDetails: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        gap: 16,
        elevation: 1,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#f1f3f5',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    detailText: {
        flex: 1
    },
    detailLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 2
    },
    detailValue: {
        fontSize: 14,
        color: '#495057'
    },
    detailSubvalue: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 2,
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 12,
        marginHorizontal: 15,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#f1f3f5',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f5',
    },
    menuItemPressed: {
        backgroundColor: '#f8f9fa'
    },
    version: {
        textAlign: 'center',
        color: '#adb5bd',
        fontSize: 12,
        marginVertical: 20
    },
    menuItemText: {
        marginLeft: 15,
        flex: 1
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212529',
        marginBottom: 2
    },
});