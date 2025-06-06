import { useCallback, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { THEME_COLOR } from '../../constant';

const filters = [
    {
        key: 'status',
        label: 'Status',
        options: ['All', 'Pending', 'Approved', 'Rejected']
    },
    {
        key: 'date',
        label: 'Date',
        options: ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last year']
    },
    {
        key: 'price',
        label: 'Price Range',
        options: ['Under ₹10000', '₹10000 - ₹50000', '₹50000 - ₹100000', 'Above ₹100000']
    },
    {
        key: 'sort',
        label: 'Sort By',
        options: ['Newest first', 'Oldest first', 'Price: High to Low', 'Price: Low to High']
    }
];

export default function FilterProductRequest({ onFilterChange }) {
    const [openFilterKey, setOpenFilterKey] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterPress = (key) => {
        setOpenFilterKey(openFilterKey === key ? null : key);
    };

    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(selectedFilters);
        }
    }, [selectedFilters, onFilterChange]);

    const handleOptionSelect = useCallback((optionIndex) => {
        setSelectedFilters(prev => ({
            ...prev,
            [openFilterKey]: prev[openFilterKey] === optionIndex ? undefined : optionIndex
        }));
        setTimeout(() => {
            setOpenFilterKey(null);
        }, 150);
    }, [openFilterKey]);

    const FilterDropdown = ({ options, onClose }) => (
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
                    key={index}
                    onPress={() => handleOptionSelect(index)}
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

            {openFilterKey && (
                <FilterDropdown
                    options={filters.find(f => f.key === openFilterKey)?.options || []}
                    onClose={() => setOpenFilterKey(null)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // elevation: 2,
        zIndex: 1000,
        position: 'relative',
    },
    filterBar: {
        backgroundColor: '#fff',
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
        backgroundColor: `${THEME_COLOR}15`,
        borderColor: THEME_COLOR,
    },
    selectedFilterButton: {
        backgroundColor: '#fff',
        borderColor: THEME_COLOR,
    },
    filterText: {
        fontSize: 14,
        fontFamily: "Poppins-SemiBold",
        color: '#495057',
    },
    activeFilterText: {
        color: THEME_COLOR,
        fontFamily: "Poppins-Bold",
    },
    selectedFilterText: {
        color: THEME_COLOR,
    },
    filterArrow: {
        fontSize: 12,
        fontFamily: "Poppins-Normal",
    },
    dropdown: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 75,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 12,
        elevation: 8,
        overflow: 'hidden',
        zIndex: 1000,
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
        fontFamily: "Poppins-SemiBold",
        color: '#212529',
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        color: '#dc3545',
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    },
    dropdownItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedDropdownItem: {
        backgroundColor: `${THEME_COLOR}15`,
    },
    dropdownItemText: {
        fontSize: 15,
        fontFamily: "Poppins-Normal",
        color: '#495057',
    },
    selectedDropdownItemText: {
        color: THEME_COLOR,
        fontFamily: "Poppins-SemiBold",
    },
});