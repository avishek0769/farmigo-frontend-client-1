import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ErrorPopup({ error }) {
    return (
        <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={20} color="#dc3545" />
            <Text style={styles.errorText}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#dc354520',
        padding: 16,
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dc354530',
    },
    errorText: {
        color: '#dc3545',
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        flex: 1,
        lineHeight: 20,
    },
})