import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pick, types } from '@react-native-documents/picker';
import { THEME_COLOR } from '../../constant';
import { detectLocation } from '../../utils/DetectLocation';
import ErrorPopup from '../../components/common/ErrorPopup';


export default function SellerRegistration({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        businessName: '',
        phone: '',
        email: '',
        areaLocation: '',
        cityLandmark: '',
        ownerName: '',
        managedBy: '',
        licenseProof: null,
        licenseNumber: '',
        yearsInBusiness: ''
    });
    const [isVerified, setIsVerified] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    const handleFileUpload = async () => {
        try {
            const result = await pick({
                type: [types.images, types.pdf],
            });
            // console.log(result)
            setFormData(prev => ({
                ...prev,
                licenseProof: result[0]
            }));
        }
        catch (err) {
            setError('Failed to upload file');
        }
    };

    const handlePhoneVerify = async () => {
        if (!formData.phone) {
            setError('Please enter phone number');
            return;
        }
        try {
            setVerifyLoading(true);
            // API call to send OTP would go here
            await new Promise(resolve => setTimeout(resolve, 1500));
            setShowOtp(true);
        } catch (err) {
            setError('Failed to send OTP');
        } finally {
            setVerifyLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            setError('Please enter OTP');
            return;
        }
        try {
            setVerifyLoading(true);
            // API call to verify OTP would go here
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsVerified(true);
            setShowOtp(false);
        } catch (err) {
            setError('Invalid OTP');
        } finally {
            setVerifyLoading(false);
        }
    };

    function argumentFuncOfDetectLoc(data) {
        setFormData(prev => ({
            ...prev,
            areaLocation: data.display_name || ''
        }))
    }
    const handleDetectLocation = useCallback(async () => {
        await detectLocation(argumentFuncOfDetectLoc, setLocationLoading, setError)
    }, [setLocationLoading, setError]);

    const handleSubmit = async () => {
        if (!isVerified) {
            setError('Please verify your phone number first');
            return;
        }
        try {
            setError('');
            setLoading(true);
            // Validate form
            const requiredFields = [
                'businessName', 'phone', 'email', 'areaLocation',
                'ownerName', 'licenseNumber', 'yearsInBusiness'
            ];

            const emptyFields = requiredFields.filter(field => !formData[field]);
            if (emptyFields.length > 0) {
                setError('Please fill all required fields');
                return;
            }

            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigation.replace('SellerHome');
        } catch (err) {
            setError('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setError('');
    }, 
    [formData])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require('../../assets/icons/brandLogo.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />

                <Text style={styles.title}>Seller Registration</Text>
                <Text style={styles.subtitle}>Complete your profile to start selling</Text>

                <View style={styles.form}>
                    {/* Basic Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Details</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Business Name*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.businessName}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, businessName: text }))}
                                placeholder="Enter your business name"
                            />
                        </View>

                        {/* Phone Number Input with Verify Button */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number*</Text>
                            <View style={styles.phoneContainer}>
                                <TextInput
                                    style={[styles.input, styles.phoneInput]}
                                    value={formData.phone}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                                    placeholder="Enter phone number"
                                    keyboardType="phone-pad"
                                    editable={!isVerified}
                                />
                                <Pressable
                                    android_ripple={{ color: '#e9ecef' }}
                                    style={[
                                        styles.verifyButton,
                                        isVerified && styles.verifiedButton
                                    ]}
                                    onPress={handlePhoneVerify}
                                    disabled={isVerified || verifyLoading}
                                >
                                    {verifyLoading ? (
                                        <ActivityIndicator color={THEME_COLOR} size="small" />
                                    ) : (
                                        <Text style={[styles.verifyButtonText, { color: isVerified ? '#fff' : THEME_COLOR }]}>
                                            {isVerified ? 'Verified' : 'Verify'}
                                        </Text>
                                    )}
                                </Pressable>
                            </View>

                            {/* OTP Input */}
                            {showOtp && (
                                <View style={styles.otpContainer}>
                                    <TextInput
                                        style={[styles.input, styles.otpInput]}
                                        value={otp}
                                        onChangeText={setOtp}
                                        placeholder="Enter OTP"
                                        keyboardType="number-pad"
                                        maxLength={6}
                                    />
                                    <Pressable
                                        android_ripple={{ color: '#e9ecef' }}
                                        style={styles.verifyButton}
                                        onPress={verifyOtp}
                                        disabled={verifyLoading}
                                    >
                                        {verifyLoading ? (
                                            <ActivityIndicator color={THEME_COLOR} size="small" />
                                        ) : (
                                            <Text style={styles.verifyButtonText}>Verify OTP</Text>
                                        )}
                                    </Pressable>

                                </View>
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.email}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                                placeholder="Enter email address"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Location Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Location Details</Text>

                        {/* Area Location with Detect Button */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Area Location*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.areaLocation}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, areaLocation: text }))}
                                placeholder="Enter area location"
                            />
                            <TouchableOpacity
                                style={styles.detectButton}
                                onPress={handleDetectLocation}
                                disabled={locationLoading}
                            >
                                {locationLoading ? (
                                    <ActivityIndicator color={THEME_COLOR} size="small" />
                                ) : (
                                    <>
                                        <Icon name="crosshairs-gps" size={20} color={THEME_COLOR} />
                                        <Text style={styles.detectButtonText}>Detect Current Location</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>City Landmark</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.cityLandmark}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, cityLandmark: text }))}
                                placeholder="Enter nearby landmark"
                            />
                        </View>
                    </View>

                    {/* Business Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Business Details</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Owner Name*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.ownerName}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, ownerName: text }))}
                                placeholder="Enter owner's name"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Managed By</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.managedBy}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, managedBy: text }))}
                                placeholder="Enter manager's name"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>License Number*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.licenseNumber}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, licenseNumber: text }))}
                                placeholder="Enter license number"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Years in Business*</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.yearsInBusiness}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, yearsInBusiness: text }))}
                                placeholder="Enter years in business"
                                keyboardType="number-pad"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>License Proof*</Text>
                            <Pressable
                                android_ripple={{ color: '#e9ecef' }}
                                style={styles.uploadButton}
                                onPress={handleFileUpload}
                            >
                                <Icon name="file-upload" size={24} color={THEME_COLOR} />
                                <Text style={styles.uploadButtonText}>
                                    {formData.licenseProof ?
                                        formData.licenseProof.name :
                                        'Upload License Document'
                                    }
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {error && <ErrorPopup error={error} />}

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>Register as Seller</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    logo: {
        width: 150,
        height: 60,
        alignSelf: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#212529',
        textAlign: 'center',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 30,
    },
    form: {
        gap: 24,
    },
    section: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 4,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        color: '#495057',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#212529',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 8,
        padding: 12,
        gap: 8,
    },
    uploadButtonText: {
        color: THEME_COLOR,
        fontSize: 16,
        fontWeight: '500',
    },
    bottomContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#dee2e6',
    },
    submitButton: {
        backgroundColor: THEME_COLOR,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#dc3545',
        textAlign: 'center',
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    phoneContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    phoneInput: {
        flex: 1,
    },
    verifyButton: {
        borderColor: THEME_COLOR,
        borderWidth: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    verifiedButton: {
        backgroundColor: THEME_COLOR,
    },
    verifyButtonText: {
        color: THEME_COLOR,
        fontSize: 14,
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    otpInput: {
        flex: 1,
        textAlign: 'center',
        letterSpacing: 4,
    },
    detectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },
    detectButtonText: {
        color: THEME_COLOR,
        fontSize: 14,
        fontWeight: '500',
    },
});