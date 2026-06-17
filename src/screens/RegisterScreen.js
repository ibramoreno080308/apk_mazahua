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

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

import { createUser } from '../database/database';

import { colors } from '../styles/colors';

export default function RegisterScreen({
  navigation,
}) {
  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  async function handleRegister() {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        'Datos requeridos',
        'Completa todos los campos.'
      );

      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Contraseña corta',
        'La contraseña debe tener al menos 6 caracteres.'
      );

      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Contraseñas diferentes',
        'Verifica que ambas contraseñas sean iguales.'
      );

      return;
    }

    try {
      await createUser({
        name,
        email,
        password,
      });

      navigation.replace('Main');
    } catch {
      Alert.alert(
        'Correo registrado',
        'Ya existe una cuenta con ese correo.'
      );
    }
  }

  return (
    <ScreenContainer>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color={colors.text}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Crear cuenta
      </Text>

      <Text style={styles.subtitle}>
        Únete a nuestra comunidad de exploradores
      </Text>

      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={58}
          color={colors.muted}
        />

        <View style={styles.cameraButton}>
          <Ionicons
            name="leaf"
            color="#FFFFFF"
            size={16}
          />
        </View>
      </View>

      <AppInput
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />

      <AppInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AppInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <AppButton
        title="Registrarme"
        onPress={handleRegister}
      />

      <Text style={styles.legal}>
        Al registrarte aceptas cuidar y respetar el conocimiento tradicional.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
  },

  subtitle: {
    textAlign: 'center',
    color: colors.muted,
    marginBottom: 20,
  },

  avatar: {
    alignSelf: 'center',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#D9DED6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  cameraButton: {
    position: 'absolute',
    right: 4,
    bottom: 8,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },

  legal: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.muted,
    marginTop: 18,
  },
});
