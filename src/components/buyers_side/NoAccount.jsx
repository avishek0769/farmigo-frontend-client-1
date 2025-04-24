import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { THEME_COLOR } from '../constant'

export default function NoAccount({ navigation }) {
    
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/icons/no-account.png')}
                style={styles.image}
            />

            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>
                Sign up to access all features, track your orders, and get personalized recommendations
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.registerButtonText}>Create Account</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.features}>
                <Feature icon="🌱" text="Access exclusive farming products" />
                <Feature icon="📦" text="Track your orders easily" />
                <Feature icon="💰" text="Get special member discounts" />
            </View>
        </View>
    )
}

const Feature = ({ icon, text }) => (
    <View style={styles.featureItem}>
        <Text style={styles.featureIcon}>{icon}</Text>
        <Text style={styles.featureText}>{text}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 40,
        marginBottom: 30,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#212529',
        marginBottom: 12
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
        paddingHorizontal: 20
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
        marginBottom: 40
    },
    loginButton: {
        backgroundColor: THEME_COLOR,
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        elevation: 2
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    registerButton: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: THEME_COLOR
    },
    registerButtonText: {
        color: THEME_COLOR,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    features: {
        width: '100%',
        gap: 15
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8
    },
    featureIcon: {
        fontSize: 24,
        marginRight: 12
    },
    featureText: {
        fontSize: 15,
        color: '#495057',
        fontWeight: '500'
    }
})