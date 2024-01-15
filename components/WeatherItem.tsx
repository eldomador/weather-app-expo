import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Forecast } from '../app/types';

interface WeatherItemProps {
  item: Forecast;
}

const WeatherItem: React.FC<WeatherItemProps> = ({ item }) => {
  return (
    <View style={styles.weatherItemContainer}>
      <View style={styles.weatherItemWrapper}>
        <View style={styles.iconTextWrapper}>
          <Ionicons name="time" size={12} color="#FFF" />
          <Text style={styles.weatherItemText}>{item.date}</Text>
        </View>
        <View style={styles.iconTextWrapper}>
          <Ionicons name="thermometer" size={12} color="#FFF" />
          <Text style={styles.weatherItemText}>{item.temperature} °C</Text>
        </View>
        <View style={styles.iconTextWrapper}>
          <Text style={styles.weatherItemText}>{item.description}</Text>
        </View>
      </View>

      <View style={styles.weatherItemWrapper}>
        <View style={styles.iconTextWrapper}>
          <Ionicons name="water" size={12} color="#FFF" />
          <Text style={styles.weatherItemText}>{item.humidity}%</Text>
        </View>
        <View style={styles.iconTextWrapper}>
          <Ionicons name="speedometer" size={12} color="#FFF" />
          <Text style={styles.weatherItemText}>{item.pressure} hPa</Text>
        </View>
        <View style={styles.iconTextWrapper}>
          <Ionicons name="flag" size={12} color="#FFF" />
          <Text style={styles.weatherItemText}>{item.windSpeed} m/s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherItemContainer: {
    backgroundColor: 'rgba(0, 86, 179, 0.5)',
    paddingHorizontal: 4,
    borderRadius: 10,
    gap: 2,
    padding: 2,
  },
  weatherItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconTextWrapper: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  weatherItemText: {
    color: '#FFF',
    fontSize: 12,
  },
});

export default WeatherItem;
