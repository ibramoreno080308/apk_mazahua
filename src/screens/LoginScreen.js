import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

import { loginUser } from '../database/database';

import { colors } from '../styles/colors';

export default function LoginScreen({
  navigation,
}) {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Datos requeridos',
        'Escribe tu correo y contraseña.'
      );

      return;
    }

    try {
      await loginUser(
        email,
        password
      );

      navigation.replace('Main');
    } catch {
      Alert.alert(
        'Acceso incorrecto',
        'Correo o contraseña inválidos.'
      );
    }
  }

  return (
    <LinearGradient
      colors={[
        '#F8F6EF',
        '#EAF6EA',
      ]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Ionicons
          name="leaf"
          size={80}
          color={colors.primary}
        />
      </View>

      <Text style={styles.title}>
        Atlas Herbolario
      </Text>

      <Text style={styles.subtitle}>
        Conservando el conocimiento ancestral mazahua
      </Text>

      <AppInput
        icon="mail-outline"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AppInput
        icon="lock-closed-outline"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>
          Usuario demo: admin@atlas.com / 123456
        </Text>
      </TouchableOpacity>

      <AppButton
        title="Iniciar sesión"
        onPress={handleLogin}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Register')
        }
      >
        <Text style={styles.register}>
          ¿No tienes cuenta?{' '}
          <Text style={styles.registerHighlight}>
            Regístrate
          </Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.muted,
    marginTop: 6,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  forgot: {
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 18,
    fontWeight: '700',
  },

  register: {
    textAlign: 'center',
    marginTop: 24,
    color: colors.muted,
  },

  registerHighlight: {
    color: colors.primary,
    fontWeight: '800',
  },
});
