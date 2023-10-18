import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from "./assets/globalStyles";
import {View} from "react-native";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <View style={globalStyles.appBackground}>
          <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Main"
                screenOptions={{
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: [
                        {
                            display: 'flex'
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
