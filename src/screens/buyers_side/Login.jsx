import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';
import { AppContext } from '../../context/ContextProvider';


export default function Login({ navigation }) {
    const { setIsLoggedIn } = AppContext();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsLoggedIn(true);
            navigation.replace('Main');
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleNextStep = async () => {
        try {
            setError('');
            setLoading(true);

            switch (activeStep) {
                case 1: // Phone verification
                    if (!formData.phone.trim()) {
                        setError('Please enter phone number');
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setActiveStep(2);
                    break;

                case 2: // OTP verification
                    if (!formData.otp.trim()) {
                        setError('Please enter OTP');
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setActiveStep(3);
                    break;

                case 3: // New password
                    if (!formData.newPassword.trim() || !formData.confirmPassword.trim()) {
                        setError('Please fill all fields');
                        return;
                    }
                    if (formData.newPassword !== formData.confirmPassword) {
                        setError('Passwords do not match');
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setActiveStep(0); // Return to login
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
            case 0: // Login
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Welcome Back!</Text>
                        <Text style={styles.stepSubtitle}>Login to continue</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                placeholderTextColor={"#6c757d"}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.passwordInput, { color: '#000' }]}
                                    value={formData.password}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#6c757d"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon 
                                        name={showPassword ? "eye-off" : "eye"} 
                                        size={24} 
                                        color="#6c757d" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => setActiveStep(1)}
                            style={styles.forgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 1: // Phone number for reset
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Reset Password</Text>
                        <Text style={styles.stepSubtitle}>Enter your registered phone number</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                placeholderTextColor={"#6c757d"}
                            />
                        </View>
                    </View>
                );

            case 2: // OTP verification
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Verify OTP</Text>
                        <Text style={styles.stepSubtitle}>Enter the OTP sent to {formData.phone}</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.otpInput]}
                                value={formData.otp}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, otp: text }))}
                                placeholder="Enter OTP"
                                keyboardType="number-pad"
                                maxLength={6}
                                placeholderTextColor={"#6c757d"}
                            />
                        </View>
                    </View>
                );

            case 3: // New password
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>New Password</Text>
                        <Text style={styles.stepSubtitle}>Create a new password</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>New Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.passwordInput, { color: '#000' }]}
                                    value={formData.newPassword}
                                    onChangeText={(text) => {
                                        setError('');
                                        setFormData(prev => ({ ...prev, newPassword: text }))
                                    }}
                                    placeholder="Enter new password"
                                    placeholderTextColor="#6c757d"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon 
                                        name={showPassword ? "eye-off" : "eye"} 
                                        size={24} 
                                        color="#6c757d" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.passwordInput, { color: '#000' }]}
                                    value={formData.confirmPassword}
                                    onChangeText={(text) => {
                                        setError('');
                                        setFormData(prev => ({ ...prev, confirmPassword: text }))
                                    }}
                                    placeholder="Confirm new password"
                                    placeholderTextColor="#6c757d"
                                    secureTextEntry={!showPassword}
                                />
                            </View>
                        </View>
                    </View>
                );
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Image 
                    source={require('../assets/icons/brandLogo.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />

                {/* Progress Indicator - Only show when in forgot password flow */}
                {activeStep > 0 && (
                    <View style={styles.progressContainer}>
                        {[1, 2, 3].map((step) => (
                            <View 
                                key={step} 
                                style={[
                                    styles.progressDot,
                                    activeStep >= step && styles.progressDotActive
                                ]}
                            />
                        ))}
                    </View>
                )}

                {renderStep()}
            </ScrollView>

            {/* Move error message here */}
            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={activeStep === 0 ? handleLogin : handleNextStep}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.continueButtonText}>
                            {activeStep === 0 ? 'Login' : 
                             activeStep === 3 ? 'Reset Password' : 'Continue'}
                        </Text>
                    )}
                </TouchableOpacity>

                {activeStep === 0 && (
                    <TouchableOpacity
                        style={styles.createAccount}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.createAccountText}>
                            Don't have an account? <Text style={styles.signupText}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                )}
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
    scrollContent: {
        flexGrow: 1,
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
        fontWeight: '700',
        color: '#212529',
        marginBottom: 8,
    },
    stepSubtitle: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: '#000',
    },
    eyeIcon: {
        padding: 12,
    },
    otpInput: {
        textAlign: 'center',
        letterSpacing: 8,
        fontSize: 24,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    forgotPasswordText: {
        color: THEME_COLOR,
        fontSize: 14,
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
        fontWeight: '600',
    },
    createAccount: {
        marginTop: 16,
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: 14,
        color: '#6c757d',
    },
    signupText: {
        color: THEME_COLOR,
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    errorText: {
        color: '#dc3545',
        textAlign: 'center',
        fontSize: 14,
    },
    bottomContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});