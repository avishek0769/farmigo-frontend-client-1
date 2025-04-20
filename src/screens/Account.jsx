import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, Share, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { THEME_COLOR } from '../constant'
import Header from '../components/Header'
import { AppContext } from '../context/ContextProvider'

export default function Account({ navigation }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const { user } = AppContext()

    const handleLogout = () => {
        // Add your logout logic here
        setShowLogoutModal(false)
        // Navigate to login screen or clear auth state
        navigation.replace('Main')
    }
    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this amazing farming app! Download now from: https://play.google.com/store/apps/your-app-link',
                title: 'Share Pedo App'
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) { // shared with activity type of result.activityType
                    console.log('Shared with activity type');
                }
                else {// shared
                    console.log('Shared');
                }
            }
            else if (result.action === Share.dismissedAction) { // dismissed
                console.log('Share dismissed');
            }
        }
        catch (error) {
            console.error(error.message);
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

    return (
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
                            <TouchableOpacity onPress={() => navigation.navigate('EditAddress')}>
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
                            key={index}
                            style={styles.menuItem}
                            onPress={() => item.route ? navigation.navigate(item.route) : item.action()}
                        >
                            <View style={styles.menuItemLeft}>
                                <Icon name={item.icon} size={24} color="#495057" />
                                <View style={styles.menuItemText}>
                                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                                </View>
                            </View>
                            <Icon naPressableme="chevron-right" size={24} color="#ced4da" />
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.version}>Version 1.0.0</Text>
            </ScrollView>
            <Modal
                visible={showLogoutModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Icon name="logout" size={32} color="#dc3545" />
                            <Text style={styles.modalTitle}>Logout</Text>
                        </View>

                        <Text style={styles.modalText}>
                            Are you sure you want to logout?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => setShowLogoutModal(false)}
                                style={[styles.modalButton, styles.modalButtonOutline]}
                            >
                                <Text style={styles.modalButtonTextOutline}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleLogout}
                                style={[styles.modalButton, styles.modalButtonFilled]}
                            >
                                <Text style={styles.modalButtonTextFilled}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxWidth: 320,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 15
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#dc3545',
        marginTop: 8
    },
    modalText: {
        fontSize: 16,
        color: '#495057',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    modalButtonOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da'
    },
    modalButtonFilled: {
        backgroundColor: '#dc3545'
    },
    modalButtonTextOutline: {
        color: '#495057',
        fontSize: 15,
        fontWeight: '600'
    },
    modalButtonTextFilled: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    }
})