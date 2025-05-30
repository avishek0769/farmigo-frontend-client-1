import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Modal, 
    StyleSheet, 
    TextInput, 
    Pressable, 
    ScrollView,
    ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';
import ErrorPopup from '../common/ErrorPopup';

export default function EditProfileModal({ visible, onClose, onSave, sellerData }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        phone: '',
        email: '',
        areaLocation: '',
        licenseNumber: '',
        yearsInBusiness: '',
    });

    useEffect(() => {
        if (sellerData) {
            setFormData({
                businessName: sellerData.businessName || '',
                ownerName: sellerData.ownerName || '',
                phone: sellerData.phone || '',
                email: sellerData.email || '',
                areaLocation: sellerData.areaLocation || '',
                licenseNumber: sellerData.licenseNumber || '',
                yearsInBusiness: sellerData.yearsInBusiness?.toString() || '',
            });
        }
    }, [sellerData]);

    const validateForm = () => {
        if (!formData.businessName.trim()) {
            setError('Business name is required');
            return false;
        }
        if (!formData.ownerName.trim()) {
            setError('Owner name is required');
            return false;
        }
        if (!formData.phone.trim()) {
            setError('Phone number is required');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        setError('');
        if (!validateForm()) return;

        setLoading(true);
        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000));
            onSave(formData);
            onClose();
        } catch (error) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Edit Business Profile</Text>
                    <Pressable
                        android_ripple={{ color: '#ddd' }}
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <Icon name="close" size={24} color="#6c757d" />
                    </Pressable>
                </View>

                {error && <ErrorPopup error={error} />}

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.formContainer}>
                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Basic Information</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Business Name<Text style={styles.required}>*</Text></Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.businessName}
                                    onChangeText={(text) => {
                                        setError('');
                                        setFormData(prev => ({ ...prev, businessName: text }));
                                    }}
                                    placeholder="Enter your business name"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Owner Name<Text style={styles.required}>*</Text></Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.ownerName}
                                    onChangeText={(text) => {
                                        setError('');
                                        setFormData(prev => ({ ...prev, ownerName: text }));
                                    }}
                                    placeholder="Enter owner's name"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                        </View>

                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Contact Details</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Phone Number<Text style={styles.required}>*</Text></Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.phone}
                                    onChangeText={(text) => {
                                        setError('');
                                        setFormData(prev => ({ ...prev, phone: text }));
                                    }}
                                    placeholder="Enter phone number"
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email Address</Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.email}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                                    placeholder="Enter email address"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                        </View>

                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Business Details</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Business Location<Text style={styles.required}>*</Text></Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.areaLocation}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, areaLocation: text }))}
                                    placeholder="Enter business address"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>License Number</Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.licenseNumber}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, licenseNumber: text }))}
                                    placeholder="Enter business license number"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Years in Business</Text>
                                <TextInput
                                    style={[styles.input, styles.elevation]}
                                    value={formData.yearsInBusiness}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, yearsInBusiness: text }))}
                                    placeholder="Enter years of experience"
                                    keyboardType="numeric"
                                    placeholderTextColor="#adb5bd"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.modalFooter}>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            android_ripple={{ color: '#ddd' }}
                            style={[styles.footerButton, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Icon name="close" size={20} color={THEME_COLOR} />
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            android_ripple={{ color: '#ddd' }}
                            style={[styles.footerButton, styles.saveButton]}
                            onPress={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size={20} />
                            ) : (
                                <>
                                    <Icon name="check" size={20} color="#fff" />
                                    <Text style={styles.saveButtonText}>Save Changes</Text>
                                </>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529'
    },
    closeButton: {
        padding: 8
    },
    content: {
        flex: 1
    },
    formContainer: {
        padding: 20,
    },
    formSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 16,
    },
    inputContainer: {
        gap: 8,
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#495057',
        fontWeight: '500'
    },
    required: {
        color: '#dc3545',
        marginLeft: 4
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#212529',
    },
    elevation: {
        elevation: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    modalFooter: {
        padding: 16,
        backgroundColor: '#fff',
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
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: THEME_COLOR,
    },
    saveButton: {
        backgroundColor: THEME_COLOR,
    },
    cancelButtonText: {
        color: THEME_COLOR,
        fontSize: 16,
        fontWeight: '500'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    }
});