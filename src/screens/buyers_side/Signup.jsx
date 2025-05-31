import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
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
import { THEME_COLOR } from '../../constant';
import { detectLocation } from '../../utils/DetectLocation';


export default function Signup({ navigation }) {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        otp: '',
        address: ''
    });
    const [showOtpInput, setShowOtpInput] = useState(false);

    function argumentFuncOfDetectLoc(data) {
        setFormData(prev => ({
            ...prev,
            address: data.display_name || 'Unknown address'
        }));
    }

    const handleDetectLocation = useCallback(async () => {
        await detectLocation(argumentFuncOfDetectLoc, setLocationLoading, setError)
    }, [setLocationLoading, setError]);


    const handleNextStep = async () => {
        try {
            setError('');
            setLoading(true);

            switch (activeStep) {
                case 0:
                    // Validate name and phone
                    if (!formData.name.trim() || !formData.phone.trim()) {
                        setError('Please fill all fields');
                        return;
                    }
                    // Send OTP
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setActiveStep(1);
                    break;

                case 1:
                    // Verify OTP
                    if (!formData.otp.trim()) {
                        setError('Please enter OTP');
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setActiveStep(2);
                    break;

                case 2:
                    // Complete signup
                    if (!formData.address.trim()) {
                        setError('Please enter address');
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    // Navigate to home or wherever needed
                    navigation.replace('BuyersTab');
                    break;
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <ScrollView style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Create Account</Text>
                        <Text style={styles.stepSubtitle}>Enter your details to get started</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                onPress={() => setError('')}
                                style={styles.input}
                                value={formData.name}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                placeholder="Enter your full name"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                onPress={() => setError('')}
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </ScrollView>
                );

            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Verify Phone</Text>
                        <Text style={styles.stepSubtitle}>Enter the OTP sent to {formData.phone}</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                onPress={() => setError('')}
                                style={[styles.input, styles.otpInput]}
                                value={formData.otp}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, otp: text }))}
                                placeholder="Enter OTP"
                                keyboardType="number-pad"
                                maxLength={6}
                            />
                        </View>
                    </View>
                );

            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Delivery Address</Text>
                        <Text style={styles.stepSubtitle}>Where should we deliver your orders?</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.addressInput]}
                                value={formData.address}
                                onChangeText={(text) => {
                                    setError('');
                                    setFormData(prev => ({ ...prev, address: text }))
                                }}
                                placeholder="Enter your delivery address"
                                multiline
                                numberOfLines={3}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.detectButton}
                            onPress={handleDetectLocation}
                            disabled={loading}
                        >
                            {locationLoading ? (
                                <ActivityIndicator color={THEME_COLOR} />
                            ) : (
                                <>
                                    <Icon name="crosshairs-gps" size={20} color={THEME_COLOR} />
                                    <Text style={styles.detectButtonText}>Detect Current Location</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image
                    source={require('../../assets/icons/brandLogo.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    {[0, 1, 2].map((step) => (
                        <View
                            key={step}
                            style={[
                                styles.progressDot,
                                activeStep >= step && styles.progressDotActive
                            ]}
                        />
                    ))}
                </View>

                {renderStep()}

                {error && <ErrorPopup error={error} />}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Pressable
                    android_ripple={{ color: '#e9ecef' }}
                    style={styles.continueButton}
                    onPress={handleNextStep}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.continueButtonText}>
                            {activeStep === 2 ? 'Complete Signup' : 'Continue'}
                        </Text>
                    )}
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: 170,
        height: 80,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        gap: 8,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#dee2e6',
    },
    progressDotActive: {
        backgroundColor: THEME_COLOR,
        width: 24,
    },
    stepContainer: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 24,
        fontFamily: "Poppins-Bold",
        color: '#212529',
        marginBottom: 8,
    },
    stepSubtitle: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#6c757d',
        marginBottom: 30,
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
    otpInput: {
        textAlign: 'center',
        letterSpacing: 8,
        fontSize: 24,
        fontFamily: "Poppins-Regular",
    },
    addressInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    detectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: THEME_COLOR,
        borderRadius: 8,
        marginTop: 12,
    },
    detectButtonText: {
        color: THEME_COLOR,
        marginLeft: 8,
        fontSize: 16,
        fontFamily: "Poppins-SemiBold",
    },
    continueButton: {
        backgroundColor: THEME_COLOR,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 'auto',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Poppins-SemiBold",
    },
    errorText: {
        color: '#dc3545',
        fontFamily: "Poppins-Regular",
        marginBottom: 8,
        textAlign: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        paddingVertical: 10,
    },
});