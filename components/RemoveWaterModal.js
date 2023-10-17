import React, { useState } from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';

function RemoveWaterModal({ visible, onClose, onSubmit }) {
    const [amount, setAmount] = useState('');

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalView}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Enter water amount in ml:</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        style={styles.input}
                        placeholder={"amount in ml"}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => { onSubmit(parseInt(amount, 10)); onClose(); }}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        height: '50%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        width: 100,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20
    },
    input: {
        borderWidth: 1,
        width: '60%',
        height: 30,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 10
    },
});
export default RemoveWaterModal;