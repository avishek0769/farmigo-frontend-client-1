import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME_COLOR } from '../../constant';

export default function RatingStats({ ratings }) {
    const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);
    const totalStars = Object.entries(ratings).reduce((acc, [stars, count]) => acc + (stars * count), 0);
    const averageRating = (totalStars / totalRatings).toFixed(1);
    
    const calculatePercentage = (value) => (value / totalRatings) * 100;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Icon 
                    key={`full-${i}`} 
                    name="star" 
                    size={20} 
                    color="#ffc107"
                />
            );
        }

        // Add half star if needed
        if (hasHalfStar) {
            stars.push(
                <Icon 
                    key="half" 
                    name="star-half" 
                    size={20} 
                    color="#ffc107"
                />
            );
        }

        // Add empty stars
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Icon 
                    key={`empty-${i}`} 
                    name="star-outline" 
                    size={20} 
                    color="#ffc107"
                />
            );
        }

        return stars;
    };

    return (
        <View style={styles.container}>
            <View style={styles.overallRating}>
                <Text style={styles.ratingNumber}>{averageRating}</Text>
                <View style={styles.starsRow}>
                    {renderStars(parseFloat(averageRating))}
                </View>
                <Text style={styles.totalRatings}>{totalRatings} ratings</Text>
            </View>

            <View style={styles.ratingBars}>
                {Object.entries(ratings)
                    .sort((a, b) => b[0] - a[0])
                    .map(([stars, count]) => (
                        <View key={stars} style={styles.ratingBar}>
                            <Text style={styles.starCount}>{stars}★</Text>
                            <View style={styles.progressBarBackground}>
                                <View 
                                    style={[
                                        styles.progressBarFill,
                                        { width: `${calculatePercentage(count)}%` }
                                    ]} 
                                />
                            </View>
                            <Text style={styles.ratingCount}>{count}</Text>
                        </View>
                    ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        gap: 20,
        elevation: 2,
    },
    overallRating: {
        alignItems: 'center',
        paddingRight: 20,
        borderRightWidth: 1,
        borderRightColor: '#e9ecef',
        width: '35%',
    },
    ratingNumber: {
        fontSize: 40,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },
    starsRow: {
        flexDirection: 'row',
        gap: 2,
        marginVertical: 6,
    },
    totalRatings: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        marginTop: 4,
    },
    ratingBars: {
        flex: 1,
        gap: 8,
        justifyContent: 'center',
        width: '65%',
    },
    ratingBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, // Reduced from 12
    },
    starCount: {
        width: 32,
        fontSize: 14,
        color: '#495057',
        fontFamily: 'Poppins-SemiBold',
    },
    progressBarBackground: {
        flex: 1,
        height: 6, // Reduced from 8
        backgroundColor: '#e9ecef',
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: THEME_COLOR,
        borderRadius: 3,
    },
    ratingCount: {
        width: 35, // Reduced from 40
        fontSize: 13, // Reduced from 14
        color: '#6c757d',
        textAlign: 'right',
        fontFamily: 'Poppins-SemiBold',
    },
});