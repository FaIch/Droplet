import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from "./assets/globalStyles";
import {View} from "react-native";
import SettingsScreen from "./screens/SettingsScreen";
import {useEffect, useState} from "react";
import { loadPreferences, getDefaultTimes } from './utility/preferencesUtil';
import {scheduleWakeUpNotification, isNotificationScheduled} from "./utility/notificationsUtil";
import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

export default function App() {
    const { defaultWakeUpTime, defaultBedTime } = getDefaultTimes();

    const [wakeupTime, setWakeupTime] = useState(defaultWakeUpTime);

    useEffect(() => {
        const fetchPreferences = async () => {
            const preferences = await loadPreferences();
            if (preferences.wakeupTime) setWakeupTime(preferences.wakeupTime);
        };
        fetchPreferences();
    }, []);

    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Notification permissions are not granted!');
                return;
            }

            const notificationScheduled = await isNotificationScheduled();

            if (!notificationScheduled){
                const [hours, minutes] = wakeupTime.split(":").map(Number);

                const wakeupTimeDate = new Date();
                wakeupTimeDate.setHours(hours);
                wakeupTimeDate.setMinutes(minutes);

                await scheduleWakeUpNotification(wakeupTimeDate);
            }
        };

        requestPermission();
    }, []);

  return (
      <View style={globalStyles.appBackgroundPrimary}>
          <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Main"
                screenOptions={{
                    tabBarActiveTintColor: '#fb8c00',
                    tabBarInactiveTintColor: '#B0C1C9',
                    tabBarStyle: [
                        {
                            display: 'flex',
                            backgroundColor: '#0B1D3A',
                            borderTopWidth: 1,
                            borderTopColor: '#1C2F4B'
                        },
                        null
                    ]
                }}>
            <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    tabBarLabel: 'Statistics',
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="stats-chart" color={color} size={size}/>
                    )
            }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="settings" color={color} size={size}/>
                    )
                }}
            />
          </Tab.Navigator>
          </NavigationContainer>
      </View>
  );
}
