import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { baseURL } from './config';
import { WeatherData } from './types';
import WeatherItem from '../components/WeatherItem';

export default function Weather() {
  const [token, setToken] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const retrieveTokenAndFavorites = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          console.log('Token:', storedToken);

          // Fetch user's favorite locations
          const favoritesResponse = await axios.get(
            `${baseURL}/user/favorites`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            },
          );
          setFavorites(favoritesResponse.data);
          console.log('Favorites:', favoritesResponse.data);
        } else {
          console.log('Token not found');
        }
      } catch (error: any) {
        console.error('Error retrieving token and favorites:', error.message);
      }
    };

    retrieveTokenAndFavorites();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/login'); // Update to '/login'
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  const getWeather = async (cityParam: string) => {
    try {
      const response = await axios.get(`${baseURL}/weather/${cityParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const weatherData = response.data;
      console.log('Weather Data:', weatherData);

      setWeatherData(weatherData);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Weather data error:', error.message);
      } else {
        console.error('Weather data error: Unknown error');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => getWeather(city)}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.favoriteLocationsContainer}>
        {favorites.map((favorite) => (
          <TouchableOpacity
            key={favorite}
            style={styles.favoriteLocationButton}
            onPress={() => getWeather(favorite)}
          >
            <Text style={styles.buttonText}>{favorite}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {weatherData && (
        <View style={styles.weatherInfoContainer}>
          {weatherData.forecast.map((item) => (
            <View key={item.date} style={styles.weatherItem}>
              <WeatherItem key={item.date} item={item} />
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 4,
  },
  searchButton: {
    height: 40,
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#FFF',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherInfoContainer: {
    marginTop: 20,
  },
  weatherItem: {
    marginBottom: 10,
  },
  favoriteLocationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '83%',
  },
  favoriteLocationButton: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
});
