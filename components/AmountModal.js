import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import globalStyles from "../assets/globalStyles";

function AmountModal({ visible, onClose, onSubmit }) {
    const [amount, setAmount] = useState('0');
    const [selectedSize, setSelectedSize] = useState(null);
    const [isCustomInputSelected, setCustomInputSelected] = useState(false);
    const predefinedSizes = [100, 250, 330, 500, 1000];

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setCustomInputSelected(false);
        setAmount('0');
    };

    const handleAdd = () => {
        if (selectedSize) {
            onSubmit(selectedSize);
        } else if (amount) {
            onSubmit(parseInt(amount, 10));
        }
        onClose();
    };


    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalView}>
                <View style={[styles.modalContent, globalStyles.appBackgroundSecondary]}>
                    <Text style={[styles.title, globalStyles.textPrimary]}>
                        Amount:
                    </Text>

                    <View style={styles.sizesContainer}>
                        {predefinedSizes.map((size, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.sizeButton,
                                    selectedSize === size ? styles.selectedSize : {}
                                ]}
                                onPress={() => handleSizeSelect(size)}
                            >
                                <Text style={styles.buttonText}>{size} ml</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={(text) => {
                            setAmount(text);
                            setSelectedSize(null);
                            setCustomInputSelected(true);
                        }}
                        style={[
                            styles.input,
                            isCustomInputSelected ? styles.selectedInput : {}
                        ]}
                        placeholder="0"
                        placeholderTextColor={globalStyles.textSecondary.color}
                    />

                    <TouchableOpacity
                        style={[styles.button, globalStyles.accent]}
                        onPress={handleAdd}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
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
    addButtonText: {
        fontSize: 20,
        color: globalStyles.textPrimary.color,
    },
    buttonText: {
        fontSize: 16,
        color: globalStyles.textPrimary.color,
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
    sizesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    sizeButton: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
    },
    selectedSize: {
        borderWidth: 3,
        borderColor: globalStyles.accent.backgroundColor,
    },
    selectedInput: {
        borderWidth: 3,
        borderColor: globalStyles.accent.backgroundColor,
    },
});
export default AmountModal;