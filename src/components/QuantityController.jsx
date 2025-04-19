import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const QuantityController = ({ id, quantity, setQuantity }) => {
    
    const increase = () => {
        const newQty = quantity + 1;
        setQuantity(id, newQty);
    };

    const decrease = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(id, newQty);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 17, }}>Quantity :</Text>
            <TouchableOpacity onPress={decrease} style={[styles.button, {backgroundColor: "red"}]}>
                <Text style={styles.btnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity onPress={increase} style={styles.button}>
                <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QuantityController;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 8
    },
    button: {
        width: 25,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#38b000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 17,
        fontWeight: '600',
        minWidth: 30,
        textAlign: 'center',
    },
});
