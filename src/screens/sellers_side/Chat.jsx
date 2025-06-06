import { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';

export default function Chat() {
    const [isOnline, setIsOnline] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! How can I help you today?",
            sender: "admin",
            timestamp: "10:30 AM"
        },
        {
            id: 2,
            text: "I have a question about my product request",
            sender: "seller",
            timestamp: "10:31 AM"
        },
        {
            id: 3,
            text: "Sure, please go ahead and ask",
            sender: "admin",
            timestamp: "10:31 AM"
        },
    ]);
    const flatListRef = useRef(null);

    // Add this effect to scroll to bottom when messages change
    useEffect(() => {
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const sendMessage = () => {
        if (!message.trim()) return;

        // Add new message to UI immediately
        const newMessage = {
            id: messages.length + 1,
            text: message.trim(),
            sender: "seller",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');
    };

    const renderMessage = ({ item }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'seller' ? styles.sentMessage : styles.receivedMessage
        ]}>
            <Text style={[
                styles.messageText,
                item.sender === 'seller' ? styles.sentMessageText : styles.receivedMessageText
            ]}>{item.text}</Text>
            <Text style={[
                styles.timestamp,
                item.sender === 'seller' ? styles.sentTimestamp : styles.receivedTimestamp
            ]}>{item.timestamp}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            {/* Enhanced Header */}
            <View style={styles.header}>
                <View style={styles.adminInfo}>
                    <View style={styles.adminAvatar}>
                        <Icon name="account" size={24} color="#fff" />
                    </View>
                    <View>
                        <Text style={styles.adminName}>Admin Support</Text>
                        {isOnline ?
                            <Text style={[styles.onOffStatus, { color: '#198754' }]}>
                                <Icon name="circle" size={8} color="#198754" /> Online
                            </Text> :
                            <Text style={[styles.onOffStatus, { color: '#adb5bd' }]}>
                                <Icon name="circle" size={8} color="#adb5bd" /> Offline
                            </Text>
                        }
                    </View>
                </View>
            </View>

            {/* Messages List */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.messagesList}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                style={styles.messagesContainer}
            />

            {/* Enhanced Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message..."
                    placeholderTextColor="#adb5bd"
                    multiline
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                />
                <Pressable
                    android_ripple={{ color: '#ddd', borderless: true }}
                    style={[
                        styles.sendButton,
                        !message.trim() && styles.disabledButton
                    ]}
                    onPress={sendMessage}
                    disabled={!message.trim()}
                >
                    <Icon name="send" size={20} color="#fff" />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

// Updated styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 44 : 25,
        backgroundColor: '#fff',
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    adminInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    adminAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: THEME_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adminName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 2,
    },
    onOffStatus: {
        fontSize: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesList: {
        padding: 16,
        flexGrow: 1,
    },
    messageContainer: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 16,
        elevation: 1,
        marginVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: THEME_COLOR,
        borderBottomRightRadius: 4,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    sentMessageText: {
        color: '#fff',
    },
    receivedMessageText: {
        color: '#212529',
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    sentTimestamp: {
        color: 'rgba(255,255,255,0.8)',
    },
    receivedTimestamp: {
        color: '#adb5bd',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 8,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f3f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxHeight: 100,
        fontSize: 15,
        color: '#212529',
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: THEME_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    disabledButton: {
        opacity: 0.5,
    }
});