import React, { useState } from 'react';
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
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';
import { pick, types } from '@react-native-documents/picker';
import ProductRequestCard from '../../components/sellers_side/ProductRequestCard';
import SellerHeader from '../../components/sellers_side/SellersHeader';


export default function Dashboard() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
        images: []
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
            const result = await pick({
                type: [types.images],
                allowMultiSelection: true,
                maxCount: 5
            });
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...result]
            }));
        }
        catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async () => {
        try {
            setError('');
            setLoading(true);
            // Validate form
            if (!formData.name || !formData.quantity || !formData.price) {
                setError('Please fill all required fields');
                return;
            }
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1500));
            setShowAddModal(false);
            setFormData({ name: '', description: '', quantity: '', price: '', images: [] });
        } catch (err) {
            setError('Failed to submit request');
        } finally {
            setLoading(false);
        }
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

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Quantity*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.quantity}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
                                placeholder="Enter quantity (e.g., 100 kg)"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Price*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.price}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                                placeholder="Enter price per unit"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Product Images</Text>
                            <TouchableOpacity
                                style={styles.imageUploadButton}
                                onPress={handleImagePick}
                            >
                                <Icon name="image-plus" size={24} color={THEME_COLOR} />
                                <Text style={styles.imageUploadText}>
                                    Add Images (max 5)
                                </Text>
                            </TouchableOpacity>

                            {formData.images.length > 0 && (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.imagePreviewContainer}
                                >
                                    {formData.images.map((image, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: image.uri }}
                                            style={styles.imagePreview}
                                        />
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.submitButtonText}>Submit for Approval</Text>
                            )}
                        </TouchableOpacity>
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
        marginTop: 12
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 8
    },
    modalFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#dee2e6'
    },
    submitButton: {
        backgroundColor: THEME_COLOR,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center'
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
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
});