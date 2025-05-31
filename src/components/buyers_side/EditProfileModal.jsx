import { useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';

export default function EditProfileModal({ visible, onClose, onSave, userData }) {
    const [name, setName] = useState(userData?.name || '');
    const [phone, setPhone] = useState(userData?.phone || '');
    const [loading, setLoading] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);


    const handleTabPress = (index) => {
        if (!loading) {
            setActiveTab(index);
            setShowOtpInput(false);
            setError('');
        }
    };

    const handleSave = async () => {
        try {
            setError('');
            setLoading(true);

            if (activeTab === 1) { // Phone tab
                await new Promise(resolve => setTimeout(resolve, 1500));
                setShowOtpInput(true);
            } else { // Name tab
                await new Promise(resolve => setTimeout(resolve, 1000));
                onSave({ name, phone: userData.phone });
                onClose();
            }
        } catch (err) {
            setError('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        try {
            setError('');
            setLoading(true);
            // Verify OTP API call would go here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

            // If OTP is valid, save the profile
            onSave({ name, phone });
            onClose();
            setShowOtpInput(false)
            setActiveTab(0)
        } catch (err) {
            setError('Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        <TouchableOpacity onPress={() => {
                            onClose()
                            setShowOtpInput(false)
                            setActiveTab(0)
                        }}
                            style={styles.closeButton}
                        >
                            <Icon name="close" size={24} color="#6c757d" />
                        </TouchableOpacity>
                    </View>

                    {/* Tab Navigation */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 0 && styles.activeTab]}
                            onPress={() => handleTabPress(0)}
                        >
                            <Icon
                                name="account"
                                size={20}
                                color={activeTab === 0 ? THEME_COLOR : '#6c757d'}
                            />
                            <Text style={[
                                styles.tabText,
                                activeTab === 0 && styles.activeTabText
                            ]}>
                                Name
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tab, activeTab === 1 && styles.activeTab]}
                            onPress={() => handleTabPress(1)}
                        >
                            <Icon
                                name="phone"
                                size={20}
                                color={activeTab === 1 ? THEME_COLOR : '#6c757d'}
                            />
                            <Text style={[
                                styles.tabText,
                                activeTab === 1 && styles.activeTabText
                            ]}>
                                Phone
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Content Area */}
                    <View style={styles.contentContainer}>
                        {activeTab === 0 ? (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Enter your name"
                                />
                            </View>
                        ) : showOtpInput ? (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Enter OTP</Text>
                                <TextInput
                                    style={styles.input}
                                    value={otp}
                                    onChangeText={setOtp}
                                    placeholder="Enter OTP sent to your phone"
                                    keyboardType="number-pad"
                                    maxLength={6}
                                />
                            </View>
                        ) : (
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput
                                    style={styles.input}
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder="Enter phone number"
                                    keyboardType="phone-pad"
                                />
                            </View>
                        )}
 
                        {error && <ErrorPopup error={error} />}
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={showOtpInput ? verifyOtp : handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.saveButtonText}>
                                    {showOtpInput ? 'Verify OTP' : 'Save Changes'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: 300,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: "Poppins-SemiBold",
        color: '#212529',
    },
    closeButton: {
        padding: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: '#495057',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    saveButton: {
        backgroundColor: THEME_COLOR,
    },
    cancelButtonText: {
        color: '#495057',
        fontSize: 16,
        fontFamily: "Poppins-SemiBold",
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Poppins-SemiBold",
    },
    errorText: {
        color: '#dc3545',
        marginBottom: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: THEME_COLOR,
    },
    tabText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#6c757d',
    },
    activeTabText: {
        color: THEME_COLOR,
        fontFamily: "Poppins-SemiBold",
    },
    contentContainer: {
        minHeight: 150,
    }
});