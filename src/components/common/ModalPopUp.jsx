import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function ModalPopUp({ showLogoutModal, setShowLogoutModal, handleAction, icon, actionBtnTxt, cancelBtnTxt, actionTxt, actionDescription }) {
    const actionDescriptionText = actionDescription || "Are you sure you want to proceed with this action?"

    return (
        <Modal
            visible={showLogoutModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowLogoutModal(false)}
        >
            <Pressable
                style={styles.modalOverlay}
                onPress={() => setShowLogoutModal(false)}
            >
                <Pressable
                    style={styles.modalContent}
                    onPress={e => e.stopPropagation()}
                >
                    <View style={styles.modalHeader}>
                        <Icon name={icon} size={32} color="#dc3545" />
                        <Text style={styles.modalTitle}>{actionTxt}</Text>
                    </View>

                    <Text style={styles.modalText}>
                        {actionDescriptionText}
                    </Text>

                    <View style={styles.modalButtons}>
                        <Pressable
                            onPress={() => setShowLogoutModal(false)}
                            style={[styles.modalButton, styles.modalButtonOutline]}
                            android_ripple={{
                                color: '#e9ecef',
                                borderless: false
                            }}
                        >
                            <Text style={styles.modalButtonTextOutline}>{cancelBtnTxt}</Text>
                        </Pressable>

                        <Pressable
                            onPress={handleAction}
                            style={[styles.modalButton, styles.modalButtonFilled]}
                            android_ripple={{
                                color: '#e9ecef',
                                borderless: false
                            }}
                        >
                            <Text style={styles.modalButtonTextFilled}>{actionBtnTxt}</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        maxWidth: 320,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 15
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: '#dc3545',
        marginTop: 8
    },
    modalText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#495057',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    modalButtonOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da'
    },
    modalButtonFilled: {
        backgroundColor: '#dc3545'
    },
    modalButtonTextOutline: {
        color: '#495057',
        fontSize: 15,
        fontFamily: "Poppins-Bold",
    },
    modalButtonTextFilled: {
        color: '#fff',
        fontSize: 15,
        fontFamily: "Poppins-Bold",
    }  
})