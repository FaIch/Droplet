import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../assets/globalStyles";
import Toast from 'react-native-toast-message';

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

        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Preferences saved successfully!',
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 50
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.window, globalStyles.appBackgroundPrimary]}>
                <View style={[styles.container, globalStyles.appBackgroundSecondary]}>
                    <Text style={[styles.header, globalStyles.textPrimary]}>Edit preferences</Text>

                    <Text style={[styles.inputPreface, globalStyles.textPrimary]}>Daily Goal (ml):</Text>
                    <TextInput
                        value={dailyGoal}
                        onChangeText={setDailyGoal}
                        keyboardType="numeric"
                        style={[styles.input, globalStyles.textPrimary, {color: globalStyles.textSecondary.color}]}
                    />

                    <Text style={[styles.inputPreface, globalStyles.textPrimary]}>Cup Size (ml):</Text>
                    <TextInput
                        value={cupSize}
                        onChangeText={setCupSize}
                        keyboardType="numeric"
                        style={[styles.input, globalStyles.textPrimary, {color: globalStyles.textSecondary.color}]}
                    />

                    <TouchableOpacity onPress={savePreferences} style={[globalStyles.accent, styles.button]}>
                        <Text style={styles.buttonText}>Save preferences</Text>
                    </TouchableOpacity>
                </View>
                <Toast/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    window: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        padding: 16,
        height: '70%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: globalStyles.textSecondary.color
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputPreface: {
        fontSize: 18,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: globalStyles.textSecondary.color,
        width: '40%',
        alignContent: 'center',
        textAlign: 'center',
        padding: 8,
        marginBottom: 20,
        borderRadius: 5
    },
    button: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 20,

    }
});

export default SettingsScreen;
