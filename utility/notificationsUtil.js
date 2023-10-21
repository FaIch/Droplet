import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Util file for various notification operations
 */

const defaultContent = {
    title: 'Time to Hydrate!',
    body: "Don't forget to drink a glass of water to start your day right.",

};

export const scheduleWakeUpNotification = async (time) => {

    const trigger = {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
    };

    const identifier = await Notifications.scheduleNotificationAsync({
        content: defaultContent,
        trigger,
    });

    await AsyncStorage.setItem('notificationScheduled', 'true');
    await AsyncStorage.setItem('wakeupIdentifier', identifier);

    return identifier;
};

export const cancelNotification = async (identifier) => {
    await Notifications.cancelScheduledNotificationAsync(identifier);
};

export const isNotificationScheduled = async () => {
    const isScheduled = await AsyncStorage.getItem('notificationScheduled');
    return isScheduled === 'true';
};
