import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, Share, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { THEME_COLOR } from '../constant'
import Header from '../components/Header'
import { AppContext } from '../context/ContextProvider'
import NoAccount from '../components/NoAccount'
import ModalPopUp from '../components/ModalPopUp'
import AddressModal from '../components/AddressModal'

export default function Account({ navigation }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false) // Change to false initially
    const { isLoggedIn, user, setIsLoggedIn } = AppContext()
    const [showAddressModal, setShowAddressModal] = useState(false);

    const handleAddressUpdate = (newAddress) => {
        // Update address in your state management system
        // For now, we'll just console.log
        console.log('New address:', newAddress);
    };

    const handleLogout = () => {
        // Add your logout logic here
        setShowLogoutModal(false)
        setIsLoggedIn(false)
        // Navigate to login screen or clear auth state
        navigation.replace('Main')
    }
    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this amazing farming app! Download now from: https://play.google.com/store/apps/your-app-link',
                title: 'Share Pedo App',
                url: 'https://play.google.com/store/apps/your-app-link' // Add this for iOS
            });

            if (result.action === Share.sharedAction) {
                console.log('Shared successfully');
            }
        }
        catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    const menuItems = [
        {
            icon: "cog-outline",
            title: "Settings",
            subtitle: "App preferences, notifications, privacy",
            route: "Settings"
        },
        {
            icon: "gift-outline",
            title: "Refer & Earn",
            subtitle: "Share with friends, get rewards",
            route: "ReferEarn"
        },
        {
            icon: "heart-outline",
            title: "My Wishlist",
            subtitle: "Your favorite items",
            route: "Wishlist"
        },
        {
            icon: "message-text-outline",
            title: "Chat Support",
            subtitle: "Talk to our farming expert",
            route: "ChatBot"
        },
        {
            icon: "help-circle-outline",
            title: "Help & Support",
            subtitle: "FAQs, contact us, legal info",
            route: "Help"
        },
        {
            icon: "share-variant-outline",
            title: "Share App",
            subtitle: "Spread the word",
            action: handleShare
        },
        {
            icon: "exit-to-app",
            title: "Logout",
            subtitle: "Sign out from the app",
            action: () => setShowLogoutModal(true)
        }
    ]

    return isLoggedIn ? (
        <>
            <Header />
            <ScrollView style={styles.container}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <Image
                            source={{ uri: 'https://ui-avatars.com/api/?name=Avishek+Adhikary&background=random' }}
                            style={styles.avatar}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.phone}>{user.phone}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditProfile')}
                        >
                            <Icon name="pencil" size={20} color={THEME_COLOR} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.addressContainer}>
                        <View style={styles.addressHeader}>
                            <Icon name="map-marker-outline" size={20} color="#6c757d" />
                            <Text style={styles.addressLabel}>Delivery Address</Text>
                            
                            <TouchableOpacity onPress={() => setShowAddressModal(true)}>
                                <Text style={styles.changeText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.address}>{user.address}</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <Pressable
                            key={String(index)}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && styles.menuItemPressed,
                                Platform.OS === 'ios' && pressed && { opacity: 0.6 }
                            ]}
                            android_ripple={{
                                color: '#e9ecef',
                                borderless: false
                            }}
                            onPress={() => {
                                if (item.route) {
                                    navigation.navigate(item.route);
                                } else if (item.action) {
                                    item.action();
                                }
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
                actionBtnTxt={"Logout"}
                handleAction={handleLogout}
                icon={"logout"}
                setShowLogoutModal={setShowLogoutModal}
                showLogoutModal={showLogoutModal}
                cancelBtnTxt={"Cancel"}
                actionTxt={"Logout"}
                actionDescriptionText={"Are you sure you want to logout from the Farmigo?"}
            />
            <AddressModal
                visible={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                onSave={handleAddressUpdate}
                currentAddress={user.address}
            />
        </>
    ) : (
        <NoAccount navigation={navigation} />
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
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15
    },
    profileInfo: {
        flex: 1
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 4
    },
    phone: {
        fontSize: 14,
        color: '#6c757d'
    },
    editButton: {
        padding: 8,
        backgroundColor: '#e9ecef',
        borderRadius: 20
    },
    addressContainer: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 12
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    addressLabel: {
        flex: 1,
        fontSize: 14,
        color: '#6c757d',
        marginLeft: 6
    },
    changeText: {
        color: THEME_COLOR,
        fontSize: 14,
        fontWeight: '500'
    },
    address: {
        fontSize: 14,
        color: '#495057',
        lineHeight: 20
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 12,
        marginHorizontal: 15
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f5'
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
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
    menuItemSubtitle: {
        fontSize: 13,
        color: '#6c757d'
    },
    version: {
        textAlign: 'center',
        color: '#adb5bd',
        fontSize: 12,
        marginVertical: 20
    },
    menuItemPressed: {
        backgroundColor: '#f8f9fa'
    }
})