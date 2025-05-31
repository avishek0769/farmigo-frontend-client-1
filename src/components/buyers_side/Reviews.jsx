import { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME_COLOR } from '../../constant';

export default function Reviews({ reviews }) {
    const [newReview, setNewReview] = useState('');

    const renderReview = ({ item }) => (
        <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
                <Image 
                    source={{ uri: item.userImage }} 
                    style={styles.userImage} 
                />
                <View style={styles.reviewHeaderContent}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingValue}>{item.rating}</Text>
                        <Icon name="star" size={14} color="#ffc107" />
                        <Text style={styles.reviewDate}>{item.date}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.reviewText}>{item.comment}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.addReviewContainer}>
                <TextInput
                    style={styles.reviewInput}
                    placeholder="Write your review..."
                    value={newReview}
                    onChangeText={setNewReview}
                    multiline
                />
                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={() => {
                        // Handle review submission
                        setNewReview('');
                    }}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={reviews}
                renderItem={renderReview}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    addReviewContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    reviewInput: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        minHeight: 80,
        marginBottom: 12,
        textAlignVertical: 'top',
        fontFamily: 'Poppins-Regular',
    },
    submitButton: {
        backgroundColor: THEME_COLOR,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        letterSpacing: 0.5
    },
    reviewItem: {
        padding: 16,
    },
    reviewHeader: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    reviewHeaderContent: {
        flex: 1,
    },
    userName: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    ratingValue: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#495057',
    },
    reviewDate: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        marginLeft: 8,
    },
    reviewText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#495057',
        lineHeight: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#e9ecef',
    },
});