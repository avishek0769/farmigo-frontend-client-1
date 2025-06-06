import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function SellerHeader() {
    const navigation = useNavigation();
    const [unreadNotifications] = useState(3);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <Image
                        source={require("../../assets/icons/brandLogo.png")}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.rightSection}>
                    <Pressable
                        android_ripple={{ color: '#ddd' }}
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('SellerNotifications')}
                    >
                        <Icon name="bell-outline" size={24} color="#333" />
                        {unreadNotifications > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>
                                    {unreadNotifications > 99 ? '99+' : unreadNotifications}
                                </Text>
                            </View>
                        )}
                    </Pressable>

                    <Pressable
                        android_ripple={{ color: '#ddd' }}
                        style={styles.profileButton}
                        onPress={() => navigation.navigate('SellerProfile')}
                    >
                        <Icon name="account-circle" size={24} color="#333" />
                        <View style={styles.statusDot} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 44 : 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logo: {
        width: 120,
        height: 44,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconButton: {
        position: 'relative',
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
    },
    notificationBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: '#dc3545',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontFamily: "Poppins-SemiBold",
    },
    profileButton: {
        position: 'relative',
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
    },
    statusDot: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#198754',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    separator: {
        height: 1,
        backgroundColor: '#dee2e6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
});