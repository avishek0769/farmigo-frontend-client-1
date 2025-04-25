import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    FlatList, 
    Pressable,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../../constant';

export default function Chat() {
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
        <View style={styles.container}>
            {/* Enhanced Header */}
            <View style={styles.header}>
                <View style={styles.adminInfo}>
                    <View style={styles.adminAvatar}>
                        <Icon name="account" size={24} color="#fff" />
                    </View>
                    <View>
                        <Text style={styles.adminName}>Admin Support</Text>
                        <Text style={styles.onlineStatus}>
                            <Icon name="circle" size={8} color="#198754" /> Online
                        </Text>
                    </View>
                </View>
            </View>

            {/* Messages List with enhanced styling */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.messagesList}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                onLayout={() => flatListRef.current.scrollToEnd()}
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
        </View>
    );
}

// Updated styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#fff',
        padding: 16,
        elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f5',
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
        position: 'relative',
    },
    adminName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 2,
    },
    onlineStatus: {
        fontSize: 12,
        color: '#198754',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    messagesList: {
        padding: 16,
        gap: 8,
    },
    messageContainer: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 16,
        elevation: 1,
        marginVertical: 4,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: THEME_COLOR,
        borderBottomRightRadius: 2,
        
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 2,
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
        padding: 12,
        backgroundColor: '#fff',
        elevation: 8,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f3f5',
    },
    input: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 100,
        fontSize: 15,
        color: '#212529',
        elevation: 1,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: THEME_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    disabledButton: {
        opacity: 0.5,
    }
});