import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native';

const filters = [
    { key: 'price', label: 'Price', options: ['₹0–₹100', '₹101–₹500', '₹501+'] },
    { key: 'category', label: 'Category', options: ['Tops', 'Bottoms', 'Dresses', 'Accessories'] },
    { key: 'availability', label: 'Availability', options: ['In Stock', 'Out of Stock'] },
];

const FilterDropdown = ({ options, onClose }) => {
    return (
        <View style={styles.dropdown}>
            {options.map((option, index) => (
                <TouchableOpacity key={index} style={styles.dropdownItem}>
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ color: 'red' }}>✕ Close</Text>
            </TouchableOpacity>
        </View>
    );
};

export const FilterSection = () => {
    const [openFilterKey, setOpenFilterKey] = useState(null);

    const handleFilterPress = (key) => {
        if (openFilterKey === key) {
            setOpenFilterKey(null);
        } else {
            setOpenFilterKey(key);
        }
    }

    return (
        <View style={styles.container}>
            {/* Filter Bar */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter.key}
                        style={styles.filterButton}
                        onPress={() => handleFilterPress(filter.key)}
                    >
                        <Text style={styles.filterText}>
                            {filter.label} {openFilterKey === filter.key ? '▲' : '▼'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Dropdown Section */}
            {openFilterKey && (
                <FilterDropdown
                    options={filters.find((f) => f.key === openFilterKey)?.options || []}
                    onClose={() => setOpenFilterKey(null)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    filterBar: {
        paddingHorizontal: 10,
        backgroundColor: '#f4f4f4',
    },
    filterButton: {
        marginRight: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    filterText: {
        fontSize: 14,
    },
    dropdown: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 4,
        elevation: 3,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    dropdownItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'flex-end',
    },
    
});


