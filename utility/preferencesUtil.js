import AsyncStorage from '@react-native-async-storage/async-storage';
import {cancelNotification, scheduleWakeUpNotification} from "./notificationsUtil";

/**
 * Util file for various preference operations
 */
export const getDefaultTimes = () => {
    const defaultWakeUpTime = new Date();
    defaultWakeUpTime.setHours(8);
    defaultWakeUpTime.setMinutes(0);

    const defaultBedTime = new Date();
    defaultBedTime.setHours(23);
    defaultBedTime.setMinutes(0);

    return { defaultWakeUpTime, defaultBedTime };
};

export const loadPreferences = async () => {
    const preferences = {};

    const storedGoal = await AsyncStorage.getItem('dailyGoal');
    const storedWakeUpTime = await AsyncStorage.getItem('wakeupTime');
    const storedBedTime = await AsyncStorage.getItem('bedTime');

    if (storedGoal) preferences.dailyGoal = storedGoal;

    if (storedWakeUpTime) {
        const [hour, minute] = storedWakeUpTime.split(':');
        const date = new Date();
        date.setHours(parseInt(hour));
        date.setMinutes(parseInt(minute));
        preferences.wakeupTime = date;
    }

    if (storedBedTime) {
        const [hour, minute] = storedBedTime.split(':');
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        preferences.bedTime = date;
    }

    return preferences;
};

export const formatTime = (hour, minute) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export const savePreferences = async (preferences) => {
    const { dailyGoal, wakeupTime, bedTime } = preferences;

    await AsyncStorage.setItem('dailyGoal', dailyGoal);

    const wakeUpTimeFormatted = formatTime(wakeupTime.getHours(), wakeupTime.getMinutes());
    const bedTimeFormatted = formatTime(bedTime.getHours(), bedTime.getMinutes());

    await AsyncStorage.setItem("wakeupTime", wakeUpTimeFormatted);
    await AsyncStorage.setItem("bedTime", bedTimeFormatted);

    const identifier = await AsyncStorage.getItem("wakeupIdentifier");
    await cancelNotification(identifier);
    await scheduleWakeUpNotification(wakeupTime);
}
