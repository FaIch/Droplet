import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function MainScreen() {
    const [waterIntake, setWaterIntake] = useState(0);

    const addGlass = () => {
        setWaterIntake(prevIntake => prevIntake + 250);
    };

    const addCustomAmount = () => {
        setWaterIntake(prevIntake => prevIntake + 100);
    };

    const fillPercentage = (waterIntake / 2000) * 100; // Assuming 2L is 100%

    const gradientTransparency = 1 - (fillPercentage / 100);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Today</Text>

            <View style={styles.imageContainer}>
                <Image source={require('../assets/droplet.png')} style={styles.droplet} />
                <Image source={require('../assets/filledDroplet.png')} style={styles.filledDroplet} />
            </View>

            <TouchableOpacity style={styles.button} onPress={addGlass}>
                <Text>Add a Glass</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={addCustomAmount}>
                <Text>Add Custom Amount</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        width: 250,
        height: 300,
        position: 'relative',
        marginBottom: 20,
        overflow: 'hidden',
    },
    droplet: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    filledDroplet: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#EEE',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default MainScreen;
