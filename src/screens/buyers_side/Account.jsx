import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { Image, Platform, Pressable, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AddressModal from '../../components/buyers_side/AddressModal'
import EditProfileModal from '../../components/buyers_side/EditProfileModal'
import Header from '../../components/buyers_side/Header'
import NoAccount from '../../components/buyers_side/NoAccount'
import ModalPopUp from '../../components/common/ModalPopUp'
import { GradientSeparator } from '../../components/common/Separator'
import { THEME_COLOR } from '../../constant'
import { AppContext } from '../../context/ContextProvider'

export default function Account({ navigation }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const { isLoggedIn, user, setIsLoggedIn, setUser } = AppContext()
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleAddressUpdate = (newAddress) => {
        setUser({ ...user, address: newAddress });
    };

    const handleProfileUpdate = (updatedData) => {
        setUser({ ...user, ...updatedData });
    };

    const handleLogout = () => {
        setShowLogoutModal(false)
        setIsLoggedIn(false)
        navigation.replace('BuyersTab')
    }

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this amazing farming app! Download now from: https://play.google.com/store/apps/your-app-link',
                title: 'Share Farmigo App',
                url: 'https://play.google.com/store/apps/your-app-link'
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
        <LinearGradient
            colors={['#f8f9fa', '#ffffff', '#f1f8e9']}
            style={{ flex: 1 }}
        >
            <Header inCartScreen showSearchIcon removeSearch />

            <ScrollView style={styles.container}>
                {/* Profile Header */}
                <View style={styles.header} >
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://ui-avatars.com/api/?name=Avishek+Adhikary&background=random' }}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.phone}>{user.phone}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => setShowEditModal(true)}
                        >
                            <Icon name="pencil" size={20} color={THEME_COLOR} />
                        </TouchableOpacity>
                    </View>

                    <LinearGradient
                        colors={['rgba(248,249,250,0.8)', 'rgba(255,255,255,0.9)']}
                        style={styles.addressContainer}
                    >
                        <View style={styles.addressHeader}>
                            <Icon name="map-marker-outline" size={20} color="#6c757d" />
                            <Text style={styles.addressLabel}>Delivery Address</Text>
                            <TouchableOpacity onPress={() => setShowAddressModal(true)}>
                                <Text style={styles.changeText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.address}>{user.address}</Text>
                    </LinearGradient>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <GradientSeparator first='#c2f8cb' second='#f0fff1' third='#f0fff1' />

                    {menuItems.map((item, index) => (
                        <View key={String(index)} style={styles.menuItemWrapper}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.menuItem,
                                    pressed && styles.menuItemPressed,
                                    Platform.OS === 'ios' && pressed && { opacity: 0.6 }
                                ]}
                                android_ripple={{
                                    color: 'rgba(233, 236, 239, 0.3)',
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
                                    <View style={styles.iconContainer}>
                                        <Icon name={item.icon} size={24} color="#495057" />
                                    </View>
                                    <View style={styles.menuItemText}>
                                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                                    </View>
                                </View>
                                <Icon name="chevron-right" size={24} color="#ced4da" />
                            </Pressable>

                            {/* Separator with gradient background */}
                            <GradientSeparator first='#c2f8cb' second='#f0fff1' third='#f0fff1' />
                        </View>
                    ))}
                </View>

                <View style={styles.versionContainer} >
                    <Text style={styles.version}>Version 1.0.0</Text>
                </View>
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
            <EditProfileModal
                visible={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleProfileUpdate}
                userData={user}
            />
        </LinearGradient>
    ) : (
        <NoAccount navigation={navigation} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    header: {
        padding: 20,
        backgroundColor: "#fff"
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    avatarOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 35,
    },
    profileInfo: {
        flex: 1
    },
    name: {
        fontSize: 20,
        fontFamily: "Poppins-SemiBold",
        color: '#212529',
        marginBottom: 4
    },
    phone: {
        fontSize: 14,
        color: '#6c757d'
    },
    editButton: {
        padding: 8,
        backgroundColor: 'rgba(233, 236, 239, 0.8)',
        borderRadius: 20
    },
    addressContainer: {
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(233, 236, 239, 0.3)'
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    addressLabel: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: '#6c757d',
        marginLeft: 6
    },
    changeText: {
        color: THEME_COLOR,
        fontSize: 14,
        fontFamily: "Poppins-SemiBold",
    },
    address: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: '#495057',
        lineHeight: 20
    },
    menuContainer: {
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingVertical: 7,
        backgroundColor: 'transparent'
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    menuItemWrapper: {
        // backgroundColor: "red"

    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(232, 245, 232, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: 'rgba(232, 245, 232, 0.5)',
    },
    menuItemText: {
        flex: 1
    },
    menuItemTitle: {
        fontSize: 16,
        fontFamily: "Poppins-SemiBold",
        color: '#212529',
        marginBottom: 2
    },
    menuItemSubtitle: {
        fontSize: 13,
        fontFamily: "Poppins-Regular",
        color: '#6c757d'
    },
    versionContainer: {
        marginVertical: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 15,
    },
    version: {
        textAlign: 'center',
        color: '#adb5bd',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
    },
    menuItemPressed: {
        backgroundColor: 'rgba(232, 245, 232, 0.2)'
    }
})