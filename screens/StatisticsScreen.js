import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarPicker from "react-native-calendar-picker";
import globalStyles from "../assets/globalStyles";

const screenWidth = Dimensions.get("window").width;

function StatisticsScreen() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [weekData, setWeekData] = useState([]);
    const [dailyGoal, setDailyGoal] = useState(2000)

    const loadPreferences = async () => {
        const storedGoal = await AsyncStorage.getItem('dailyGoal');

        if (storedGoal) setDailyGoal(parseInt(storedGoal));
    }

    const fetchWeekData = async () => {
        try {
            const historyRaw = await AsyncStorage.getItem('waterIntakeHistory');
            const parsedHistory = historyRaw ? await JSON.parse(historyRaw) : [];

            const weekStartDate = new Date(selectedDate);
            weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());

            const weekValues = Array.from({length: 7}, (_, index) => {
                const currentDay = new Date(weekStartDate);
                currentDay.setDate(currentDay.getDate() + index);
                const entry = parsedHistory.find(item => item.date === currentDay.toISOString().split('T')[0]);
                return entry ? entry.intake : 0;
            });

            setWeekData(weekValues);
        } catch (error) {
            console.error('Failed to fetch week data:', error);
        }
    };

    useEffect(() => {
        fetchWeekData();
        loadPreferences();
    }, [selectedDate]);

    return (
        <View style={globalStyles.appBackgroundPrimary}>
            <CalendarPicker
                onDateChange={setSelectedDate}
                textStyle={globalStyles.textPrimary}
                selectedDayColor={'#fb8c00'}
            />

            <LineChart
                data={{
                    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [{
                        data: weekData
                    }]
                }}
                width={screenWidth}
                yAxisSuffix="ml"
                height={280}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                }}
                style={styles.lineChart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    lineChart: {
        marginVertical: 20,
        borderRadius: 16
    }
});

export default StatisticsScreen;
