import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import globalStyles from "../assets/globalStyles";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

function MainScreen() {
    const [waterIntake, setWaterIntake] = useState(0);

    const addGlass = () => {
        setWaterIntake(prevIntake => prevIntake + 250);
    };

    const addCustomAmount = () => {
        setWaterIntake(prevIntake => prevIntake + 100);
    };

    const removeAmount = (amount) => {
        setWaterIntake(prevIntake => prevIntake - amount);
    }

    const fillPercentage = (waterIntake / 2000) * 100;

    const emptySpace = 300 - (3 * fillPercentage);

    return (
        <View style={globalStyles.appBackground}>
            <View style={styles.container}>
                <Text style={styles.header}>Today</Text>
                <Text style={styles.target}>Target: 2000ml</Text>

                <View style={styles.imageContainer}>
                    <Image source={require('../assets/droplet.png')} style={styles.droplet} />
                    <Image source={require('../assets/filledDroplet.png')} style={styles.filledDroplet} />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: emptySpace, backgroundColor: 'white' }} />
                </View>

                <View style={styles.progressContainer}>
                    <Text style={styles.progressNumber}>{waterIntake}ml</Text>
                    <Text style={styles.progressPercentage}>{fillPercentage}%</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={addGlass}>
                    <Text>Add a Glass</Text>
                    <MaterialCommunityIcons name="cup" size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={addCustomAmount}>
                    <Text>Add Custom Amount</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={removeAmount}>
                    <Text>Remove amount </Text>
                    <MaterialCommunityIcons name="water-remove" size={24} color="black" />
                </TouchableOpacity>
            </View>
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
    progressContainer: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        top: 280
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    target: {
        fontSize: 18,
        marginBottom: 30,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 200,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    progressNumber: {
        fontSize: 16,
        marginBottom: 5
    },
    progressPercentage: {

    },
});

export default MainScreen;
