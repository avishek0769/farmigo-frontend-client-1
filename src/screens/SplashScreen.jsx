import { MotiImage, MotiText } from 'moti'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("UserTypeSelection")
        }, 1500);
    }, [])

    return (
        <View style={{ backgroundColor: "white", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <MotiImage
                source={require('../assets/icons/brandLogo.png')}
                style={{ width: 250, height: 250, borderRadius: 100 }}
                from={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: 'timing',
                    duration: 1000,
                }}
            />
            <MotiText
                style={styles.brandName}
                from={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: 'timing',
                    duration: 1000,
                }}
            >
                w
            </MotiText>
        </View>
    )
}

const styles = StyleSheet.create({
    brandName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        letterSpacing: 2.7
    }
})
