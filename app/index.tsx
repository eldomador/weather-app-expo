import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { baseURL } from './config';

export default function Home() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Wysłanie żądania logowania do backendu
      const response = await axios.post(`${baseURL}/user/login`, {
        email: email,
        password: password,
      });

      // Jeśli logowanie powiodło się, zapisz token w AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      router.replace('/details');
      // Nawiązanie nawigacji do innego ekranu po zalogowaniu
      // Przykład: navigation.navigate('MainScreen');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd logowania:', error.message);
        // Obsługa błędów logowania
      } else {
        console.error('Błąd logowania:', 'Nieznany błąd');
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Welcome to the weather app!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Log in</Text>
      </TouchableOpacity>
      {/* Dodaj link do ekranu rejestracji */}
      <TouchableOpacity>
        <Link
          // @ts-ignore
          href={{ pathname: 'details', params: { name: 'Registration' } }}
        >
          Go to Registration
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: 200,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
