import React, { useCallback, useEffect, useState } from 'react';
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
    { key: 'category', label: 'Category', options: ['Natural Pesticides', 'Chemical Pesticides', 'Natural Fertilisers', 'Chemical Fertilisers'] },
    { key: 'availability', label: 'Availability', options: ['In Stock', 'Out of Stock'] },
    { key: 'sort', label: 'Sort', options: ['Sort by price (Ascending)', 'Sort by price (Decending)'] },
];


export const FilterSection = () => {
    const [openFilterKey, setOpenFilterKey] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({})

    const handleFilterPress = (key) => {
        if (openFilterKey === key) {
            setOpenFilterKey(null);
        }
        else {
            setOpenFilterKey(key);
        }
    }
    useEffect(() => {
        console.log(selectedFilters)
    }, [selectedFilters])
    
    const handleOptionSelect = useCallback((optionIndex) => {
        setSelectedFilters({
            ...selectedFilters,
            [openFilterKey]: optionIndex,
        })
        setTimeout(() => {
            setOpenFilterKey(null)
        }, 150);
    }, [openFilterKey, selectedFilters, setSelectedFilters, setOpenFilterKey])

    const FilterDropdown = ({ options, onClose }) => {
        return (
            <View style={styles.dropdown}>
                {options.map((option, index) => (
                    <TouchableOpacity onPress={() => handleOptionSelect(index)} key={index} style={[styles.dropdownItem, { backgroundColor: selectedFilters[openFilterKey] == index? "#f0fff1" : "" }]}>
                        <Text>{option}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={{ color: 'red' }}>✕ Close</Text>
                </TouchableOpacity>
            </View>
        );
    };

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
    filterBar: {
        padding: 10,
        backgroundColor: '#e9ecef',
        // marginBottom: 10
    },
    filterButton: {
        marginRight: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    filterText: {
        fontSize: 14,
    },
    dropdown: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 40,
        backgroundColor: '#fff',
        marginTop: 4,
        elevation: 3,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    dropdownItem: {
        padding: 13,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    closeButton: {
        margin: 10,
        alignItems: 'flex-end',
    }    
});


