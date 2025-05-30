import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const HORIZONTAL_PADDING = 16;
const NUMBER_OF_COLUMNS = 3;

const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - (CARD_GAP * (NUMBER_OF_COLUMNS - 1))) / NUMBER_OF_COLUMNS;

export default function CategoryCard({ category, onPress, icon }) {
    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
            android_ripple={{ color: '#e9ecef' }}
        >
            <Image
                source={{ uri: category.image }}
                style={styles.image}
                // defaultSource={require('../../assets/icons/placeholder.png')}
            />
            {icon && (
                <View style={styles.iconContainer}>
                    <Icon name={icon} size={16} color="#666" />
                </View>
            )}
            <Text style={styles.name} numberOfLines={1}>
                {category.name}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    image: {
        width: CARD_WIDTH - 16,
        height: CARD_WIDTH - 16,
        borderRadius: 6,
        marginBottom: 6,
    },
    name: {
        fontSize: 13,
        fontWeight: '500',
        color: '#495057',
        textAlign: 'center',
    },
    iconContainer: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 4,
        borderRadius: 12,
    }
});