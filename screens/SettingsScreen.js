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
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../assets/globalStyles";
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { loadPreferences, getDefaultTimes } from '../utility/preferencesUtil';


function SettingsScreen() {
    const { defaultWakeUpTime, defaultBedTime } = getDefaultTimes();

    const [dailyGoal, setDailyGoal] = useState('2000');
    const [cupSize, setCupSize] = useState('250');
    const [wakeupTime, setWakeupTime] = useState(defaultWakeUpTime);
    const [bedTime, setBedTime] = useState(defaultBedTime);

    useEffect(() => {
        const fetchPreferences = async () => {
            const preferences = await loadPreferences();
            if (preferences.dailyGoal) setDailyGoal(preferences.dailyGoal);
            if (preferences.cupSize) setCupSize(preferences.cupSize);
            if (preferences.wakeupTime) setWakeupTime(preferences.wakeupTime);
            if (preferences.bedTime) setBedTime(preferences.bedTime);
        };
        fetchPreferences();
    }, []);

    const onWakeUpTimeChange = (event, selectedDate) => {
        if (selectedDate) {
            const currentTime = new Date(wakeupTime);
            currentTime.setHours(selectedDate.getHours());
            currentTime.setMinutes(selectedDate.getMinutes());
            setWakeupTime(currentTime);
        }
    };

    const onBedTimeChange = (event, selectedDate) => {
        if (selectedDate) {
            const currentTime = new Date(bedTime);
            currentTime.setHours(selectedDate.getHours());
            currentTime.setMinutes(selectedDate.getMinutes());
            setBedTime(currentTime);
        }
    };

    const formatTime = (hour, minute) => {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }

    const savePreferences = async () => {
        await AsyncStorage.setItem('dailyGoal', dailyGoal);
        await AsyncStorage.setItem('cupSize', cupSize);

        const wakeUpTimeFormatted = formatTime(wakeupTime.getHours(), wakeupTime.getMinutes());
        const bedTimeFormatted = formatTime(bedTime.getHours(), bedTime.getMinutes());

        await AsyncStorage.setItem("wakeupTime", wakeUpTimeFormatted);
        await AsyncStorage.setItem("bedTime", bedTimeFormatted);

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

                    <View style={styles.timeContainer}>
                        <View style={styles.timePickerContainer}>
                            <Feather name="sun" size={24} color={globalStyles.textPrimary.color} style={styles.icon}/>
                            <DateTimePicker
                                value={wakeupTime}
                                mode="time"
                                display="default"
                                onChange={onWakeUpTimeChange}
                                themeVariant='dark'
                            />
                        </View>

                        <View style={styles.timePickerContainer}>
                            <Feather name="moon" size={24} color={globalStyles.textPrimary.color} style={styles.icon}/>
                            <DateTimePicker
                                value={bedTime}
                                mode="time"
                                display="default"
                                onChange={onBedTimeChange}
                                themeVariant='dark'
                            />
                        </View>
                    </View>

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
        height: '90%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: globalStyles.textSecondary.color
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    timePickerContainer: {
        alignItems: 'center',

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
    },
    icon: {
        marginLeft: 10,
        marginBottom: 5
    },
});

export default SettingsScreen;
