import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Modal, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';
import { detectLocation } from '../../utils/DetectLocation';
import ErrorPopup from '../common/ErrorPopup';


export const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'App needs access to your location',
                buttonPositive: 'OK',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};

export default function AddressModal({ visible, onClose, onSave, currentAddress }) {
    const [address, setAddress] = useState(currentAddress);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function argumentFuncOfDetectLoc(data) {
        setAddress(data.display_name || 'Unknown address');
    }

    const handleDetectLocation = useCallback(async () => {
        await detectLocation(argumentFuncOfDetectLoc, setLoading, setError)
    }, [setLoading, setError]);


    const handleSave = () => {
        if (address.trim()) {
            onSave(address.trim());
            onClose();
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
                        <Text style={styles.modalTitle}>Update Delivery Address</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Icon name="close" size={24} color="#6c757d" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        onPress={() => setError("")}
                        placeholder="Enter your delivery address"
                        multiline
                        numberOfLines={3}
                    />

                    {error && <ErrorPopup error={error} />}

                    <TouchableOpacity
                        style={styles.detectButton}
                        onPress={handleDetectLocation}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={THEME_COLOR} />
                        ) : (
                            <>
                                <Icon name="crosshairs-gps" size={20} color={THEME_COLOR} />
                                <Text style={styles.detectButtonText}>Detect Current Location</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => {
                                onClose()
                                setError("")
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save Address</Text>
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
        fontWeight: '600',
        color: '#212529',
    },
    closeButton: {
        padding: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 15,
    },
    detectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 8,
        marginBottom: 20,
    },
    detectButtonText: {
        color: THEME_COLOR,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
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
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#dc3545',
        marginBottom: 10,
    },
});