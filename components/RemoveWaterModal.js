import React, { useState } from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from "../assets/globalStyles";

function RemoveWaterModal({ visible, onClose, onSubmit }) {
    const [amount, setAmount] = useState('0');

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalView}>
                <View style={[styles.modalContent, globalStyles.appBackgroundSecondary]}>
                    <Text style={[styles.title, globalStyles.textPrimary]}>Enter water amount in ml:</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        style={styles.input}
                    />
                    <TouchableOpacity style={[styles.button, globalStyles.accent]} onPress={() => { onSubmit(parseInt(amount, 10)); onClose(); }}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, globalStyles.accent]} onPress={onClose}>
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
        borderRadius: 10,
        borderColor: '#E0E5E9',
        color: '#E0E5E9',
    },
});
export default RemoveWaterModal;