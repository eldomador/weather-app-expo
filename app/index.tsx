import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useNavigation } from 'expo-router';

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    const navigateToLogin = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace('/login');
    };

    navigateToLogin();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>SkySync</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#007BFF',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  appTitle: {
    fontSize: 84,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
});
