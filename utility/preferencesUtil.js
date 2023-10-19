import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const storedCupSize = await AsyncStorage.getItem('cupSize');
    const storedWakeUpTime = await AsyncStorage.getItem('wakeupTime');
    const storedBedTime = await AsyncStorage.getItem('bedTime');

    if (storedGoal) preferences.dailyGoal = storedGoal;
    if (storedCupSize) preferences.cupSize = storedCupSize;

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
