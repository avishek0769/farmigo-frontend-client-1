import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    Image,
    ActivityIndicator,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';
import { pick, types } from '@react-native-documents/picker';
import ProductRequestCard from '../../components/sellers_side/ProductRequestCard';
import SellerHeader from '../../components/sellers_side/SellersHeader';


export default function Dashboard() {
    const [showAddModal, setShowAddModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [priceType, setPriceType] = useState('per_unit');
    const [selectedUnit, setSelectedUnit] = useState('');

    const units = [
        { label: 'Kilogram', value: 'kg', icon: 'weight-kilogram' },
        { label: 'Liter', value: 'lt', icon: 'cup-water' },
        { label: 'Tonne', value: 'tonne', icon: 'weight' },
        { label: 'Gram', value: 'g', icon: 'weight-gram' },
    ];

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        priceType: 'per_unit', // 'per_unit' or 'per_quantity'
        quantity: '',
        price: '',
        unit: '', // For per_quantity pricing
        images: [],
    });

    // Mock data - replace with API data
    const [productRequests] = useState([
        {
            id: 1,
            name: 'Organic Tomatoes Organic Tomatoes Organic Tomatoes Organic Tomatoes Organic Tomatoes',
            image: 'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Add image URLs
            quantity: '1000',
            price: 250,
            status: 'Pending',
            date: '24 Apr 2025'
        },
        {
            id: 2,
            name: 'Fresh Potatoes Fresh Potatoes Fresh ',
            image: 'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Add image URLs
            quantity: '50 kg',
            price: '₹25/kg',
            status: 'Approved'
        },
        {
            id: 3,
            name: 'Green Peas',
            image: 'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Add image URLs
            quantity: '30 kg',
            price: '₹6000/kg',
            status: 'Rejected'
        },
        {
            id: 4,
            name: 'Organic Tomatoes',
            image: 'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Add image URLs
            quantity: '1000',
            price: 250, // Total price
            status: 'Pending',
            date: '24 Apr 2025'
        },
        {
            id: 5,
            name: 'Fresh Potatoes',
            image: 'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Add image URLs
            quantity: '50 kg',
            price: '₹25/kg', // Already formatted price
            status: 'Approved',
            date: '23 Apr 2025'
        }
    ]);

    const handleImagePick = async () => {
        try {
            // Check how many more images can be added
            const remainingSlots = 5 - formData.images.length;

            if (remainingSlots <= 0) {
                setError('Maximum 5 images already selected');
                return;
            }

            const result = await pick({
                type: [types.images],
                allowMultiSelection: true,
            });

            // Calculate how many images we can actually add
            if (result.length > remainingSlots) {
                setError(`Maximum 5 images allowed. Only first ${remainingSlots} ${remainingSlots === 1 ? 'image' : 'images'} will be selected.`);
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...result.slice(0, remainingSlots)]
                }));
            } else {
                setError('');
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...result]
                }));
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async () => {
        try {
            setError('');
            setLoading(true);

            // Basic validation
            if (!formData.name || !formData.quantity || !formData.price) {
                setError('Please fill all required fields');
                setLoading(false);
                return;
            }

            // Validate per_quantity specific fields
            if (formData.priceType === 'per_quantity' && !formData.unit) {
                setError('Please select a unit for quantity-based pricing');
                setLoading(false);
                return;
            }

            // Format data for API
            const requestData = {
                ...formData,
                price: formData.priceType === 'per_quantity'
                    ? `₹${formData.price}/${formData.unit}`
                    : Number(formData.price),
                quantity: formData.priceType === 'per_quantity'
                    ? `${formData.quantity} ${formData.unit}`
                    : formData.quantity
            };
            console.log(requestData)
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset form on success
            setShowAddModal(false);
            resetForm();
        } catch (err) {
            setError('Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            priceType: 'per_unit',
            quantity: '',
            price: '',
            unit: '',
            images: []
        });
        setPriceType('per_unit');
        setSelectedUnit('');
        setError('');
    };

    // Add this function near your other handlers
    const removeImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handlePriceTypeToggle = () => {
        setPriceType(prev => prev === 'per_unit' ? 'per_quantity' : 'per_unit');
        setSelectedUnit('');
        setFormData(prev => ({
            ...prev,
            priceType: prev.priceType === 'per_unit' ? 'per_quantity' : 'per_unit',
            quantity: '',
            price: '',
            unit: ''
        }));
    };

    return (
        <View style={styles.container}>
            <SellerHeader />

            <FlatList
                data={productRequests}
                renderItem={({ item }) => <ProductRequestCard item={item} />}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => setShowAddModal(true)}
            >
                <Icon name="plus" size={24} color="#fff" />
            </TouchableOpacity>

            <Modal
                visible={showAddModal}
                animationType="slide"
                onRequestClose={() => setShowAddModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add New Product</Text>
                        <TouchableOpacity onPress={() => setShowAddModal(false)}>
                            <Icon name="close" size={24} color="#6c757d" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Product Name*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.name}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                placeholder="Enter product name"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={formData.description}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                                placeholder="Enter product description"
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        <View style={styles.pricingSection}>
                            <View style={styles.priceTypeHeader}>
                                <Text style={styles.sectionTitle}>Pricing Details*</Text>
                                <TouchableOpacity
                                    style={styles.priceTypeToggle}
                                    onPress={handlePriceTypeToggle}
                                >
                                    <Icon
                                        name={priceType === 'per_unit' ? 'package-variant' : 'weight-kilogram'}
                                        size={16}
                                        color={THEME_COLOR}
                                    />
                                    <Text style={styles.priceTypeText}>
                                        {priceType === 'per_unit' ? 'Per Unit' : 'Per Quantity'}
                                    </Text>
                                    <Icon name="swap-horizontal" size={16} color={THEME_COLOR} />
                                </TouchableOpacity>
                            </View>

                            {priceType === 'per_unit' ? (
                                <>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Available Stock*</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={formData.quantity}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
                                            placeholder="Enter total number of items"
                                            keyboardType="numeric"
                                        />
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Price per unit (₹)*</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={formData.price}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                                            placeholder="Enter price per unit"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Select Unit*</Text>
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            style={styles.unitsContainer}
                                        >
                                            {units.map((unit) => (
                                                <TouchableOpacity
                                                    key={unit.value}
                                                    style={[
                                                        styles.unitButton,
                                                        selectedUnit === unit.value && styles.selectedUnitButton
                                                    ]}
                                                    onPress={() => {
                                                        setSelectedUnit(unit.value);
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            unit: unit.value
                                                        }));
                                                    }}
                                                >
                                                    <Icon
                                                        name={unit.icon}
                                                        size={18}
                                                        color={selectedUnit === unit.value ? '#fff' : THEME_COLOR}
                                                    />
                                                    <Text style={[
                                                        styles.unitButtonText,
                                                        selectedUnit === unit.value && styles.selectedUnitText
                                                    ]}>
                                                        {unit.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Price per {selectedUnit || 'unit'} (₹)*</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={formData.price}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                                            placeholder={`Enter price per ${selectedUnit || 'unit'}`}
                                            keyboardType="numeric"
                                        />
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Total Quantity ({selectedUnit})*</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={formData.quantity}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
                                            placeholder={`Enter total quantity in ${selectedUnit || 'selected unit'}`}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </>
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Product Images</Text>
                            <Pressable
                                android_ripple={{ color: '#ddd' }}
                                style={styles.imageUploadButton}
                                onPress={handleImagePick}
                            >
                                <Icon name="image-plus" size={24} color={THEME_COLOR} />
                                <Text style={styles.imageUploadText}>
                                    Add Images (max 5)
                                </Text>
                            </Pressable>

                            {formData.images.length > 0 && (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.imagePreviewContainer}
                                >
                                    {formData.images.map((image, index) => (
                                        <View key={index} style={styles.imagePreviewWrapper}>
                                            <Image
                                                source={{ uri: image.uri }}
                                                style={styles.imagePreview}
                                            />
                                            <TouchableOpacity
                                                style={styles.removeImageButton}
                                                onPress={() => removeImage(index)}
                                            >
                                                <Icon name="minus-circle" size={20} color="#dc3545" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                android_ripple={{ color: '#ddd' }}
                                style={[styles.footerButton, styles.resetButton]}
                                onPress={resetForm}
                                disabled={loading}
                            >
                                <Icon name="refresh" size={20} color={THEME_COLOR} />
                                <Text style={styles.resetButtonText}>Reset Form</Text>
                            </Pressable>

                            <Pressable
                                android_ripple={{ color: '#ddd' }}
                                style={[styles.footerButton, styles.submitButton]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Icon name="check" size={20} color="#fff" />
                                        <Text style={styles.submitButtonText}>Submit request</Text>
                                    </>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212529'
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME_COLOR,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 8
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600'
    },
    listContainer: {
        padding: 16,
        gap: 16
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529'
    },
    formContainer: {
        padding: 16,
        gap: 16
    },
    inputContainer: {
        gap: 8
    },
    label: {
        fontSize: 14,
        color: '#495057',
        fontWeight: '500'
    },
    input: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    imageUploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 8,
        padding: 12,
        gap: 8
    },
    imageUploadText: {
        color: THEME_COLOR,
        fontSize: 16,
        fontWeight: '500'
    },
    imagePreviewContainer: {
        marginTop: 12,
        paddingVertical: 9,
    },
    imagePreviewWrapper: {
        position: 'relative',
        marginRight: 8,
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 2,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    modalFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#dee2e6',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    footerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        gap: 8,
    },
    resetButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: THEME_COLOR,
    },
    resetButtonText: {
        color: THEME_COLOR,
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: THEME_COLOR,
        flexDirection: 'row',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#dc3545',
        marginTop: 8
    },
    fab: {
        position: 'absolute',
        right: 26,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: THEME_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    priceTypeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    priceTypeToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    priceTypeText: {
        fontSize: 14,
        color: THEME_COLOR,
        fontWeight: '500',
    },
    priceInputContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    priceInput: {
        flex: 2,
    },
    unitInput: {
        flex: 1,
    },
    descriptionContainer: {
        marginTop: 8,
    },
    descriptionInput: {
        minHeight: 120,
        maxHeight: 200,
    },
    pricingSection: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 4,
    },
    unitsContainer: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    unitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: THEME_COLOR,
        marginRight: 8,
        gap: 6,
    },
    selectedUnitButton: {
        backgroundColor: THEME_COLOR,
        borderColor: THEME_COLOR,
    },
    unitButtonText: {
        color: THEME_COLOR,
        fontSize: 14,
        fontWeight: '500',
    },
    selectedUnitText: {
        color: '#fff',
    },
});