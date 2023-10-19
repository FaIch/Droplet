import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import globalStyles from "../assets/globalStyles";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import AddWaterModal from "../components/AddWaterModal";
import RemoveWaterModal from "../components/RemoveWaterModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadPreferences } from '../utility/preferencesUtil';
import {useFocusEffect} from "@react-navigation/native";

function MainScreen() {
    const [dailyGoal, setDailyGoal] = useState(2000);
    const [cupSize, setCupSize] = useState(250);
    const [waterIntake, setWaterIntake] = useState(0);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);

    const fillPercentage = parseFloat((waterIntake / dailyGoal) * 100).toPrecision(3);
    const emptySpace = 300 - (3 * fillPercentage);

    useFocusEffect(
        React.useCallback(() => {
            updateIntakeHistory(waterIntake);
            fetchPreferences();

            return () => {};
        }, [waterIntake])
    );

    const updateIntakeHistory = async (newIntake) => {
        try {
            const today = new Date().toISOString().split('T')[0];

            const historyRaw = await AsyncStorage.getItem('waterIntakeHistory');
            let history = historyRaw ? JSON.parse(historyRaw) : [];

            const todayEntry = history.find(entry => entry.date === today);

            if (todayEntry) {
                todayEntry.intake = newIntake;
            } else {
                history.push({ date: today, intake: newIntake });
            }

            await AsyncStorage.setItem('waterIntakeHistory', JSON.stringify(history));
        } catch (error) {
            console.error('Failed to update water intake history:', error);
        }
    };

    const fetchPreferences = async () => {
        const preferences = await loadPreferences();
        if (preferences.dailyGoal) setDailyGoal(parseInt(preferences.dailyGoal));
        if (preferences.cupSize) setCupSize(parseInt(preferences.cupSize));
    };

    const addGlass = () => {
        setWaterIntake(prevIntake => prevIntake + cupSize);
    };

    const addCustom = (amount) => {
        setWaterIntake(prevIntake => prevIntake + amount);
    };

    const removeCustom = (amount) => {
        if (waterIntake - amount <= 0 ) setWaterIntake(0);
        else setWaterIntake(prevIntake => prevIntake - amount);
    };

    return (
        <View style={globalStyles.appBackgroundPrimary}>
            <View style={[styles.container]}>
                <Text style={[styles.header, globalStyles.textPrimary]}>Today</Text>
                <Text style={[styles.target, globalStyles.textSecondary]}>Target: {dailyGoal}ml</Text>

                <View style={styles.imageContainer}>
                    <Image source={require('../assets/droplet.png')} style={styles.droplet} />
                    <Image source={require('../assets/filledDroplet.png')} style={styles.filledDroplet} />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: emptySpace, backgroundColor: '#0B1D3A' }} />
                </View>

                <View style={styles.progressContainer}>
                    <Text style={[styles.progressNumber, globalStyles.textPrimary]}>{waterIntake}ml</Text>
                    <Text style={[styles.progressPercentage, globalStyles.textPrimary]}>{fillPercentage}%</Text>
                </View>

                <Text style={[styles.addHeader, globalStyles.textPrimary]}>+ Add water</Text>

                <View style={styles.addContainer}>

                    <TouchableOpacity style={[styles.button, globalStyles.accent]} onPress={addGlass}>
                        <Text style={globalStyles.textPrimary}>Cup</Text>
                        <MaterialCommunityIcons name="cup" size={20} color='#E0E5E9' />
                    </TouchableOpacity>

                    <AddWaterModal
                        visible={addModalVisible}
                        onClose={() => setAddModalVisible(false)}
                        onSubmit={addCustom}
                    />

                    <TouchableOpacity style={[styles.button, globalStyles.accent]} onPress={() => setAddModalVisible(true)}>
                        <Text style={globalStyles.textPrimary}>Other amount</Text>
                        <Ionicons name="water" size={24} color='#E0E5E9' />
                    </TouchableOpacity>
                </View>

                <RemoveWaterModal
                    visible={removeModalVisible}
                    onClose={() => setRemoveModalVisible(false)}
                    onSubmit={removeCustom}
                />

                <TouchableOpacity style={[styles.button, globalStyles.accent]} onPress={() => setRemoveModalVisible(true)}>
                    <Text style={globalStyles.textPrimary}>Remove amount </Text>
                    <MaterialCommunityIcons name="water-remove" size={24} color='#E0E5E9' />
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
        top: 260
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    addHeader: {
        marginBottom: 20
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
        width: 150,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    progressNumber: {
        fontSize: 16,
        marginBottom: 5
    },
    progressPercentage: {

    },
});

export default MainScreen;
