import React, {
  useState,
} from 'react';

import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import * as Location from 'expo-location';

import * as FileSystem from 'expo-file-system/legacy';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

import {
  getCurrentUser,
  insertFinding,
} from '../database/database';

import { getAddress } from '../services/locationService';

import { colors } from '../styles/colors';

export default function AddFindingScreen({
  navigation,
}) {
  const [image, setImage] =
    useState(null);

  const [coords, setCoords] =
    useState(null);

  const [address, setAddress] =
    useState('');

  const [plantName, setPlantName] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [uses, setUses] =
    useState('');

  async function saveImageLocally(
    imageUri,
  ) {
    if (!imageUri) {
      return null;
    }

    const fileName =
      `plant_${Date.now()}.jpg`;

    const newPath =
      FileSystem.documentDirectory + fileName;

    await FileSystem.copyAsync({
      from: imageUri,
      to: newPath,
    });

    return newPath;
  }

  async function pickImage() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Activa el permiso de galería para seleccionar fotografías.'
        );

        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          quality: 0.7,
          allowsEditing: false,
          mediaTypes: ['images'],
        });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch {
      Alert.alert(
        'Error',
        'No se pudo abrir la galería.'
      );
    }
  }

  async function getLocation() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permiso requerido',
        'Activa la ubicación para guardar coordenadas.'
      );

      return;
    }

    const location =
      await Location.getCurrentPositionAsync({});

    setCoords(location.coords);

    const currentAddress =
      await getAddress(
        location.coords.latitude,
        location.coords.longitude
      );

    setAddress(currentAddress);
  }

  async function saveFinding() {
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      Alert.alert(
        'Sesión requerida',
        'Inicia sesión antes de guardar hallazgos.'
      );

      navigation.replace('Login');

      return;
    }

    if (!plantName.trim()) {
      Alert.alert(
        'Dato requerido',
        'Escribe el nombre de la planta.'
      );

      return;
    }

    if (!coords) {
      Alert.alert(
        'Ubicación requerida',
        'Presiona Obtener ubicación GPS antes de guardar.'
      );

      return;
    }

    const localImage =
      await saveImageLocally(image);

    await insertFinding({
      userId: currentUser.id,
      plantName: plantName.trim(),
      description,
      uses,
      image: localImage,
      latitude: coords.latitude,
      longitude: coords.longitude,
      location: address || 'Ubicación desconocida',
      date: new Date().toLocaleDateString(),
      author: currentUser.name,
      category: 'Planta medicinal',
      rarity: 'Común',
      likes: 0,
      comments: 0,
    });

    setPlantName('');
    setDescription('');
    setUses('');
    setImage(null);
    setCoords(null);
    setAddress('');

    navigation.navigate(
      'Main',
      {
        screen: 'Comunidad',
      }
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Nuevo hallazgo
      </Text>

      <TouchableOpacity
        style={styles.photo}
        onPress={pickImage}
        activeOpacity={0.8}
      >
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        ) : (
          <>
            <Ionicons
              name="image-outline"
              size={42}
              color={colors.primary}
            />

            <Text style={styles.photoText}>
              Seleccionar fotografía
            </Text>
          </>
        )}
      </TouchableOpacity>

      <AppInput
        placeholder="Nombre de planta. Ej. Árnica"
        value={plantName}
        onChangeText={setPlantName}
      />

      <AppInput
        placeholder="Descripción del hallazgo"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <AppInput
        placeholder="Usos tradicionales"
        value={uses}
        onChangeText={setUses}
        multiline
      />

      <TouchableOpacity
        style={styles.location}
        onPress={getLocation}
        activeOpacity={0.8}
      >
        <Ionicons
          name="location-outline"
          size={22}
          color={colors.primary}
        />

        <Text style={styles.locationText}>
          {address || 'Obtener ubicación GPS'}
        </Text>
      </TouchableOpacity>

      <AppButton
        title="Guardar hallazgo"
        onPress={saveFinding}
      />

      <AppButton
        title="Simular identificación"
        variant="secondary"
        style={styles.identifyButton}
        onPress={() =>
          navigation.navigate(
            'IdentifyPlant',
            {
              image,
            }
          )
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },

  photo: {
    height: 210,
    borderRadius: 18,
    backgroundColor: colors.greenSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  photoText: {
    color: colors.primary,
    fontWeight: '800',
    marginTop: 8,
  },

  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },

  locationText: {
    flex: 1,
    color: colors.text,
    fontWeight: '700',
  },

  identifyButton: {
    marginTop: 12,
  },
});
