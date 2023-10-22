import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from "../assets/globalStyles";

function DrinkModal({ visible, onClose, onSelectDrink }) {

    const drinkList = [
        { name: 'Water', percentage: 1 },
        { name: 'Coffee', percentage: 0.98 },
        { name: 'Tea', percentage: 0.99 },
        { name: 'Soda', percentage: 0.95 },
        { name: 'Juice', percentage: 0.90 },
        { name: 'Milk', percentage: 0.87}
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {drinkList.map((drink, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.drinkOption}
                            onPress={() => {
                                onSelectDrink(drink);
                                onClose();
                            }}
                        >
                            <Text style={styles.drinkText}>{drink.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent background
    },
    modalView: {
        width: '80%',
        backgroundColor: globalStyles.appBackgroundSecondary.backgroundColor,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    drinkOption: {
        padding: 10,
        margin: 5,
        width: '45%',
        height: 100,
        borderColor: globalStyles.accent.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
    },
    drinkText: {
        color: globalStyles.textPrimary.color,
    },
    closeButton: {
        backgroundColor: globalStyles.accent.backgroundColor,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        width: '100%'
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
});

export default DrinkModal;
