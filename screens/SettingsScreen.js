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
import globalStyles from "../assets/globalStyles";
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import {loadPreferences, getDefaultTimes, savePreferences, formatTime} from '../utility/preferencesUtil';


function SettingsScreen() {
    const { defaultWakeUpTime, defaultBedTime } = getDefaultTimes();
    const [dailyGoal, setDailyGoal] = useState(2000);
    const [cupSize, setCupSize] = useState(250);
    const [wakeupTime, setWakeupTime] = useState(defaultWakeUpTime);
    const [bedTime, setBedTime] = useState(defaultBedTime);
    const [showWakeUpPicker, setShowWakeUpPicker] = useState(false);
    const [showBedTimePicker, setShowBedTimePicker] = useState(false);

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
        setShowWakeUpPicker(false);
        if (selectedDate) {
            const currentTime = new Date(wakeupTime);
            currentTime.setHours(selectedDate.getHours());
            currentTime.setMinutes(selectedDate.getMinutes());
            setWakeupTime(currentTime);
        }
    };

    const onBedTimeChange = (event, selectedDate) => {
        setShowBedTimePicker(false);
        if (selectedDate) {
            const currentTime = new Date(bedTime);
            currentTime.setHours(selectedDate.getHours());
            currentTime.setMinutes(selectedDate.getMinutes());
            setBedTime(currentTime);
        }
    };

    const saveUserPreferences = async () => {
        await savePreferences({
            dailyGoal,
            cupSize,
            wakeupTime,
            bedTime
        });

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
                        value={dailyGoal.toString()}
                        onChangeText={setDailyGoal}
                        keyboardType="numeric"
                        style={[styles.input, globalStyles.textPrimary, {color: globalStyles.textSecondary.color}]}
                    />

                    <Text style={[styles.inputPreface, globalStyles.textPrimary]}>Cup Size (ml):</Text>
                    <TextInput
                        value={cupSize.toString()}
                        onChangeText={setCupSize}
                        keyboardType="numeric"
                        style={[styles.input, globalStyles.textPrimary, {color: globalStyles.textSecondary.color}]}
                    />

                    <View style={styles.timeContainer}>
                        <View style={styles.timePickerContainer}>
                            <Feather name="sun" size={24} color={globalStyles.textPrimary.color} style={styles.icon}/>
                            <TouchableOpacity style={styles.timeButton} onPress={() => setShowWakeUpPicker(true)}>
                                <Text style={styles.timeText}>{formatTime(wakeupTime.getHours(), wakeupTime.getMinutes())}</Text>
                            </TouchableOpacity>
                            {showWakeUpPicker && (
                                <DateTimePicker
                                    value={wakeupTime}
                                    mode="time"
                                    display="default"
                                    onChange={onWakeUpTimeChange}
                                    themeVariant='dark'
                                />
                            )}
                        </View>

                        <View style={styles.timePickerContainer}>
                            <Feather name="moon" size={24} color={globalStyles.textPrimary.color} style={styles.icon}/>
                            <TouchableOpacity style={styles.timeButton} onPress={() => setShowBedTimePicker(true)}>
                                <Text style={styles.timeText}>{formatTime(bedTime.getHours(), bedTime.getMinutes())}</Text>
                            </TouchableOpacity>
                            {showBedTimePicker && (
                                <DateTimePicker
                                    value={bedTime}
                                    mode="time"
                                    display="default"
                                    onChange={onBedTimeChange}
                                    themeVariant='dark'
                                />
                            )}
                        </View>
                    </View>

                    <TouchableOpacity onPress={saveUserPreferences} style={[globalStyles.accent, styles.button]}>
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
    timeText: {
        color: globalStyles.textPrimary.color,
        fontSize: 20,
        padding: 3
    },
    timeButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: globalStyles.textSecondary.color,
        marginLeft: 5
    },
});

export default SettingsScreen;
