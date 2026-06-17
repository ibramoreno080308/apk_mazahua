import React, {
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  getCurrentUser,
  initDatabase,
} from '../database/database';

export default function SplashScreen({
  navigation,
}) {
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    await initDatabase();

    const user =
      await getCurrentUser();

    setTimeout(() => {
      navigation.replace(
        user ? 'Main' : 'Login'
      );
    }, 1200);
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Ionicons
          name="leaf"
          size={80}
          color="#FFFFFF"
        />

        <Text style={styles.title}>
          Atlas
        </Text>

        <Text style={styles.subtitle}>
          Herbolario Mazahua
        </Text>

        <Text style={styles.phrase}>
          Conservemos el conocimiento que sana
        </Text>

        <Text style={styles.loading}>
          Cargando...
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(15,79,42,0.55)',
  },

  title: {
    fontSize: 54,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 12,
  },

  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 4,
  },

  phrase: {
    marginTop: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    paddingHorizontal: 20,
  },

  loading: {
    position: 'absolute',
    bottom: 50,
    color: '#FFFFFF',
    fontSize: 14,
  },
});
