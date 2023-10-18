import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingsScreen() {
    const [dailyGoal, setDailyGoal] = useState('2000');
    const [cupSize, setCupSize] = useState('250');

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        const storedGoal = await AsyncStorage.getItem('dailyGoal');
        const storedCupSize = await AsyncStorage.getItem('cupSize');
        if (storedGoal) setDailyGoal(storedGoal);
        if (storedCupSize) setCupSize(storedCupSize);
    }

    const savePreferences = async () => {
        await AsyncStorage.setItem('dailyGoal', dailyGoal);
        await AsyncStorage.setItem('cupSize', cupSize);
        // You can also show a success message or navigate away from this screen after saving
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text>Daily Goal (ml):</Text>
                <TextInput
                    value={dailyGoal}
                    onChangeText={setDailyGoal}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <Text>Cup Size (ml):</Text>
                <TextInput
                    value={cupSize}
                    onChangeText={setCupSize}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <Button title="Save Preferences" onPress={savePreferences} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom: 16,
    },
});

export default SettingsScreen;
