import { useCallback, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const filters = [
    { key: 'price', label: 'Price', options: ['₹0–₹100', '₹101–₹500', '₹501+'] },
    { key: 'category', label: 'Category', options: ['Bio pesticides', 'Bio Fertilizers', 'Farm Machinery', 'Seeds-Vegetable', 'Seeds', 'Field crop', 'Cash crop', 'Tools & implements'] },
    { key: 'availability', label: 'Availability', options: ['In Stock', 'Out of Stock'] },
    { key: 'sort', label: 'Sort', options: ['Sort by price (Ascending)', 'Sort by price (Decending)'] },
];


export const FilterSection = ({ category }) => {
    const [openFilterKey, setOpenFilterKey] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        category: category || undefined,
    })

    const handleFilterPress = (key) => {
        if (openFilterKey === key) {
            setOpenFilterKey(null);
        }
        else {
            setOpenFilterKey(key);
        }
    }
    useEffect(() => {
        console.log(selectedFilters, "\n")
    }, [selectedFilters])
    
    const handleOptionSelect = useCallback((optionIndex) => {
        if(selectedFilters[openFilterKey] == optionIndex) {
            setSelectedFilters({
                ...selectedFilters,
                [openFilterKey]: undefined,
            })
        }
        else {
            setSelectedFilters({
                ...selectedFilters,
                [openFilterKey]: optionIndex,
            })
        }
        setTimeout(() => {
            setOpenFilterKey(null)
        }, 150);
    }, [openFilterKey, selectedFilters, setSelectedFilters, setOpenFilterKey])

    const FilterDropdown = ({ options, onClose }) => {
        return (
            <View style={styles.dropdown}>
                <View style={styles.dropdownHeader}>
                    <Text style={styles.dropdownTitle}>
                        Select {filters.find(f => f.key === openFilterKey)?.label}
                    </Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>
                {options.map((option, index) => (
                    <TouchableOpacity 
                        onPress={() => handleOptionSelect(index)} 
                        key={index} 
                        style={[
                            styles.dropdownItem, 
                            selectedFilters[openFilterKey] === index && styles.selectedDropdownItem
                        ]}
                    >
                        <Text style={[
                            styles.dropdownItemText,
                            selectedFilters[openFilterKey] === index && styles.selectedDropdownItemText
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.filterBar}
                contentContainerStyle={styles.filterBarContent}
            >
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter.key}
                        style={[
                            styles.filterButton,
                            openFilterKey === filter.key && styles.activeFilterButton,
                            selectedFilters[filter.key] !== undefined && styles.selectedFilterButton
                        ]}
                        onPress={() => handleFilterPress(filter.key)}
                    >
                        <Text style={[
                            styles.filterText,
                            openFilterKey === filter.key && styles.activeFilterText,
                            selectedFilters[filter.key] !== undefined && styles.selectedFilterText
                        ]}>
                            {filter.label} 
                            <Text style={styles.filterArrow}>
                                {openFilterKey === filter.key ? ' ▲' : ' ▼'}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Dropdown Section remains the same */}
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
        backgroundColor: '#fff',
        elevation: 2,
    },
    filterBar: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    filterBarContent: {
        padding: 12,
        paddingBottom: 8,
    },
    filterButton: {
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    activeFilterButton: {
        backgroundColor: '#e8f5e9',
        borderColor: '#4caf50',
    },
    selectedFilterButton: {
        backgroundColor: '#fff',
        borderColor: '#4caf50',
    },
    filterText: {
        fontSize: 14,
        color: '#495057',
        fontFamily: 'Poppins-SemiBold',
    },
    activeFilterText: {
        color: '#2e7d32',
        fontFamily: 'Poppins-Bold',
    },
    selectedFilterText: {
        color: '#2e7d32',
    },
    filterArrow: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    },
    dropdown: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 55,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 12,
        elevation: 4,
        overflow: 'hidden',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dropdownTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        color: '#dc3545',
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
    dropdownItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedDropdownItem: {
        backgroundColor: '#e8f5e9',
    },
    dropdownItemText: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#495057',
    },
    selectedDropdownItemText: {
        color: '#2e7d32',
        fontFamily: 'Poppins-SemiBold',
    },
});


