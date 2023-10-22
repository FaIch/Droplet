import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import globalStyles from "../assets/globalStyles";
import DrinkModal from "../components/DrinkModal";
import AmountModal from "../components/AmountModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadPreferences } from '../utility/preferencesUtil';
import {useFocusEffect} from "@react-navigation/native";


/**
 * Main screen of the application, here the user tracks their water intake for the day
 */
function MainScreen() {
    const [dailyGoal, setDailyGoal] = useState(2000);
    const [waterIntake, setWaterIntake] = useState(0);
    const [chooseModalVisible, setChooseModalVisible] =  useState(false);
    const [amountModalVisible, setAmountModalVisible] = useState(false);
    const [currentDrink, setCurrentDrink] = useState(null);

    // The progress of the user for the day, their intake divided by their goal
    const fillPercentage = parseFloat((waterIntake / dailyGoal) * 100).toPrecision(3);
    const emptySpace = 300 - (3 * fillPercentage); // A value to determine how much of the filled droplet image should be seen

    useFocusEffect(
        React.useCallback(() => {
            updateIntakeHistory(waterIntake); //watches for changes in waterIntake and updates state accordingly
            fetchPreferences();

            return () => {};
        }, [waterIntake])
    );

    /**
     * Function to update the water intake.
     * Either creates a new entry for the given day or updates the amount.
     * @param newIntake the new amount of water intake, updated from the useFocusEffect function
     */
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
        try {
            const preferences = await loadPreferences();
            if (preferences.dailyGoal) setDailyGoal(parseInt(preferences.dailyGoal));
        } catch (error) {
            console.error('Failed to fetch preferences:', error)
        }
    };

    const handleDrinkSelect = (selectedDrink) => {
        setChooseModalVisible(false);
        setAmountModalVisible(true);
        setCurrentDrink(selectedDrink);
    };

    const handleAmountSubmit = (amount) => {
        setAmountModalVisible(false);
        if (currentDrink) {
            const intake = amount * currentDrink.percentage;
            setWaterIntake(prevIntake => prevIntake + intake);
        }
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
                    <TouchableOpacity
                        style={styles.plussButton}
                        onPress={() => setChooseModalVisible(true)}
                    >
                        <Text style={styles.plussButtonText}>+</Text>
                    </TouchableOpacity>
                    <DrinkModal
                        visible={chooseModalVisible}
                        onClose={() => setChooseModalVisible(false)}
                        onSelectDrink={handleDrinkSelect}
                    />

                    <AmountModal
                        visible={amountModalVisible}
                        onClose={() => setAmountModalVisible(false)}
                        onSubmit={handleAmountSubmit}
                    />
                </View>
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
    plussButton: {
        marginTop: 10,
        width: '30%',
        height: '100%',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: globalStyles.accent.backgroundColor
    },
    plussButtonText: {
        color: globalStyles.textPrimary.color,
        fontSize: 50
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
