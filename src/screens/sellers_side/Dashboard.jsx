import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorPopup from '../../components/common/ErrorPopup';
import FilterProductRequest from '../../components/sellers_side/FilterProductRequest';
import ProductRequestCard from '../../components/sellers_side/ProductRequestCard';
import SellerHeader from '../../components/sellers_side/SellersHeader';
import { THEME_COLOR } from '../../constant';

export default function Dashboard() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [priceType, setPriceType] = useState('per_unit');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

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
            price: '250',
            status: 'Pending',
            date: '24/5/2025'
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
            price: '250', // Total price
            status: 'Pending',
            date: '24/5/2025'
        },
        {
            id: 5,
            name: 'Fresh Potatoes',
            image: 'https://images.pexels.com/photos/4596568/pexels-photo-4596568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Add image URLs
            quantity: '50 kg',
            price: '₹25/kg', // Already formatted price
            status: 'Approved',
            date: '24/5/2025'
        }
    ]);

    const handleImagePick = async () => {
        try {
            const remainingSlots = 5 - formData.images.length;

            if (remainingSlots <= 0) {
                setError('Maximum 5 images already selected');
                return;
            }

            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                multiple: false // Only one image at a time
            });

            if (result.canceled || !result.assets?.length) {
                return; // User cancelled
            }

            const pickedImage = result.assets[0];

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, pickedImage]
            }));
            setError('');

        } catch (err) {
            console.error(err);
            setError('Failed to pick image');
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

            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset form on success
            setShowAddModal(false);
            resetForm();
            setEditingProduct(null);
        } catch (err) {
            setError('Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        // Convert the product data to form format
        const isPerQuantity = typeof product.price === 'string' && product.price.includes('/');
        const priceValue = isPerQuantity
            ? product.price.split('/')[0].replace('₹', '')
            : product.price.toString();
        const unitValue = isPerQuantity
            ? product.price.split('/')[1]
            : '';

        setFormData({
            name: product.name,
            description: product.description || '',
            priceType: isPerQuantity ? 'per_quantity' : 'per_unit',
            quantity: product.quantity.split(' ')[0],
            price: priceValue,
            unit: unitValue,
            images: [
                // Add some dummy images for demonstration
                { uri: product.image },
                { uri: product.image },
            ],
        });

        setPriceType(isPerQuantity ? 'per_quantity' : 'per_unit');
        setSelectedUnit(unitValue);
        setEditingProduct(product);
        setShowAddModal(true);
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
        setEditingProduct(null);
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

    useEffect(() => {
        setError('');
    }, [formData.description, formData.name, formData.price, formData.quantity, formData.unit]);

    return (
        <View style={styles.container}>
            <SellerHeader />

            <FilterProductRequest
                onFilterChange={(filters) => {
                    console.log('Selected filters:', filters);
                }}
            />

            <FlatList
                data={productRequests}
                renderItem={({ item }) => (
                    <ProductRequestCard
                        item={item}
                        onEdit={handleEdit}
                    />
                )}
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
                onRequestClose={() => {
                    setShowAddModal(false);
                    resetForm();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </Text>
                        <Pressable
                            android_ripple={{ color: '#ddd' }}
                            onPress={() => {
                                setShowAddModal(false);
                                resetForm();
                            }}
                        >
                            <Icon name="close" size={24} color="#6c757d" />
                        </Pressable>
                    </View>

                    {error && <ErrorPopup error={error} />}

                    <ScrollView
                        contentContainerStyle={styles.formContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Basic Details</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Product Name<Text style={styles.required}>*</Text></Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                    placeholder="e.g., Fresh Organic Tomatoes"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                        </View>

                        <View style={styles.formSection}>
                            <Text style={[styles.sectionTitle, { fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#495057' }]}>
                                Pricing Details
                                <Text style={styles.required}>*</Text>
                            </Text>
                            <View style={[styles.priceTypeToggleContainer, styles.elevation]}>
                                <Pressable
                                    android_ripple={{ color: '#ddd' }}
                                    style={[
                                        styles.priceTypeButton,
                                        priceType === 'per_unit' && styles.activepriceTypeButton
                                    ]}
                                    onPress={handlePriceTypeToggle}
                                >
                                    <Icon name="package-variant" size={18} color={priceType === 'per_unit' ? '#fff' : THEME_COLOR} />
                                    <Text style={[
                                        styles.priceTypeButtonText,
                                        priceType === 'per_unit' && styles.activePriceTypeButtonText
                                    ]}>Per Unit</Text>
                                </Pressable>
                                <Pressable
                                    android_ripple={{ color: '#ddd' }}
                                    style={[
                                        styles.priceTypeButton,
                                        priceType === 'per_quantity' && styles.activepriceTypeButton
                                    ]}
                                    onPress={handlePriceTypeToggle}
                                >
                                    <Icon name="weight-kilogram" size={18} color={priceType === 'per_quantity' ? '#fff' : THEME_COLOR} />
                                    <Text style={[
                                        styles.priceTypeButtonText,
                                        priceType === 'per_quantity' && styles.activePriceTypeButtonText
                                    ]}>Per Quantity</Text>
                                </Pressable>
                            </View>

                            {priceType === 'per_unit' ? (
                                <>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Available Stock*</Text>
                                        <TextInput
                                            style={[styles.input, styles.elevation]}
                                            value={formData.quantity}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
                                            placeholder="Enter total number of items"
                                            keyboardType="numeric"
                                            placeholderTextColor="#adb5bd"
                                        />
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Price per unit (₹)*</Text>
                                        <TextInput
                                            style={[styles.input, styles.elevation]}
                                            value={formData.price}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                                            placeholder="Enter price per unit"
                                            keyboardType="numeric"
                                            placeholderTextColor="#adb5bd"
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
                                                <Pressable
                                                    key={unit.value}
                                                    android_ripple={{ color: '#ddd' }}
                                                    style={[
                                                        styles.unitButton,
                                                        selectedUnit === unit.value && styles.selectedUnitButton
                                                    ]}
                                                    onPress={() => {
                                                        setSelectedUnit(unit.value);
                                                        setFormData(prev => ({ ...prev, unit: unit.value }));
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
                                                </Pressable>
                                            ))}
                                        </ScrollView>
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Price per {selectedUnit || 'unit'} (₹)*</Text>
                                        <TextInput
                                            style={[styles.input, styles.elevation]}
                                            value={formData.price}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                                            placeholder={`Enter price per ${selectedUnit || 'unit'}`}
                                            keyboardType="numeric"
                                            placeholderTextColor="#adb5bd"
                                        />
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Total Quantity*</Text>
                                        <TextInput
                                            style={[styles.input, styles.elevation]}
                                            value={formData.quantity}
                                            onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
                                            placeholder={`Enter total quantity in ${selectedUnit || 'selected unit'}`}
                                            keyboardType="numeric"
                                            placeholderTextColor="#adb5bd"
                                        />
                                    </View>
                                </>
                            )}
                        </View>

                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Product Images</Text>
                            <Text style={styles.helperText}>Add up to 5 images of your product</Text>
                            <View style={styles.inputContainer}>
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
                        </View>

                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Additional Details</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea, styles.elevation]}
                                    value={formData.description}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                                    placeholder="Describe your product (quality, features, storage instructions etc.)"
                                    placeholderTextColor="#adb5bd"
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>
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
        fontFamily: 'Poppins-Bold',
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
        fontFamily: 'Poppins-Bold',
    },
    listContainer: {
        backgroundColor: "#fff",
        padding: 16,
        paddingTop: 8,
        zIndex: 1, // Add this
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
        fontFamily: 'Poppins-Bold',
        color: '#212529'
    },
    formContainer: {
        padding: 20,
    },
    inputContainer: {
        gap: 8,
        marginTop: 10
    },
    label: {
        fontSize: 14,
        color: '#495057',
        fontFamily: 'Poppins-SemiBold',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        fontFamily: 'Poppins-Normal',
        color: '#212529',
    },
    textArea: {
        minHeight: 120,
        lineHeight: 24,
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
        fontFamily: 'Poppins-SemiBold'
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
        padding: 10,
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
        fontFamily: 'Poppins-Bold',
    },
    submitButton: {
        backgroundColor: THEME_COLOR,
        flexDirection: 'row',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
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
        fontFamily: 'Poppins-SemiBold',
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
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
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
        fontFamily: 'Poppins-SemiBold',
    },
    selectedUnitText: {
        color: '#fff',
    },
    formSection: {
        marginBottom: 24,
    },
    required: {
        color: '#dc3545',
        marginLeft: 4,
    },
    helperText: {
        fontSize: 14,
        fontFamily: 'Poppins-Normal',
        color: '#6c757d',
        marginBottom: 12,
    },
    elevation: {
        elevation: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    priceTypeToggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
    },
    priceTypeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 8,
    },
    activepriceTypeButton: {
        backgroundColor: THEME_COLOR,
    },
    priceTypeButtonText: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: THEME_COLOR,
    },
    activePriceTypeButtonText: {
        color: '#fff',
    },
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
        fontFamily: 'Poppins-Normal',
        flex: 1,
        lineHeight: 20,
    }
});