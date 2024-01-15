import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Forecast } from '../app/types';

interface Styles {
  weatherItemContainer: ViewStyle;
  weatherItemWarper: ViewStyle;
}

const styles: Styles = {
  weatherItemContainer: {
    marginBottom: 2,
  },
  weatherItemWarper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
};

interface WeatherItemProps {
  item: Forecast;
}

const WeatherItem: React.FC<WeatherItemProps> = ({ item }) => {
  return (
    <View style={styles.weatherItemContainer}>
      <View style={styles.weatherItemWarper}>
        <Text>
          {item.temperature} °C{' '}
          <Ionicons name="thermometer" size={16} color="#FFF" />
        </Text>
        <Text>
          {item.description} <Ionicons name="cloud" size={16} color="#FFF" />
        </Text>
        <Text>
          {item.humidity}% <Ionicons name="water" size={16} color="#FFF" />
        </Text>
      </View>

      <View style={styles.weatherItemWarper}>
        <Text>
          {item.pressure} hPa{' '}
          <Ionicons name="speedometer" size={16} color="#FFF" />
        </Text>
        <Text>
          {item.windSpeed} m/s <Ionicons name="flag" size={16} color="#FFF" />
        </Text>
        <Text>
          {item.date} <Ionicons name="time" size={16} color="#FFF" />
        </Text>
      </View>
    </View>
  );
};

export default WeatherItem;
