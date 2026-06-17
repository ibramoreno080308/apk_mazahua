import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';
import CategoryBadge from '../components/CategoryBadge';

import {
  deleteFinding,
  getCurrentUser,
  isFavorite,
  toggleFavorite,
} from '../database/database';

import {
  defaultPlantImage,
  formatFinding,
} from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function FindingDetailScreen({
  route,
  navigation,
}) {
  const finding =
    formatFinding(route.params?.finding || {});

  const [favorite, setFavorite] =
    useState(false);

  const latitude =
    Number(finding.lat);

  const longitude =
    Number(finding.lng);

  const hasLocation =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);

  useFocusEffect(
    useCallback(() => {
      loadFavorite();
    }, [])
  );

  async function loadFavorite() {
    const currentUser =
      await getCurrentUser();

    if (!currentUser || !finding.id) {
      return;
    }

    const result =
      await isFavorite(
        currentUser.id,
        finding.id
      );

    setFavorite(result);
  }

  async function handleFavorite() {
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      Alert.alert(
        'Sesión requerida',
        'Inicia sesión para guardar favoritos.'
      );

      return;
    }

    const result =
      await toggleFavorite(
        currentUser.id,
        finding.id
      );

    setFavorite(result);
  }

  function confirmDelete() {
    Alert.alert(
      'Eliminar hallazgo',
      '¿Quieres eliminar este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: handleDelete,
        },
      ]
    );
  }

  async function handleDelete() {
    await deleteFinding(finding.id);

    navigation.navigate(
      'Main',
      {
        screen: 'Comunidad',
      }
    );
  }

  return (
    <ScreenContainer
      style={styles.container}
    >
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

      <Image
        source={{
          uri: finding.image || defaultPlantImage,
        }}
        style={styles.image}
      />

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {finding.plantName}
          </Text>

          <Text style={styles.scientific}>
            ({finding.scientific || 'Sin identificar'})
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleFavorite}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            color={favorite ? colors.danger : colors.muted}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <CategoryBadge
        label={finding.category || 'Planta medicinal'}
      />

      <Text style={styles.meta}>
        Encontrada por {finding.author || 'Explorador'} · {finding.date || 'Sin fecha'}
      </Text>

      <Text style={styles.sectionTitle}>
        Descripción
      </Text>

      <Text style={styles.text}>
        {finding.description || 'Sin descripción registrada.'}
      </Text>

      <Text style={styles.sectionTitle}>
        Usos tradicionales
      </Text>

      <Text style={styles.text}>
        {finding.uses || 'Sin usos tradicionales registrados.'}
      </Text>

      <Text style={styles.sectionTitle}>
        Ubicación
      </Text>

      {hasLocation ? (
        <>
          <MapView
            style={styles.map}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
              title={finding.plantName}
            />
          </MapView>

          <Text style={styles.coordinates}>
            {finding.location || 'Ubicación GPS registrada'}
          </Text>
        </>
      ) : (
        <View style={styles.noLocationBox}>
          <Ionicons
            name="location-outline"
            size={24}
            color={colors.muted}
          />

          <Text style={styles.noLocationText}>
            Este hallazgo no tiene ubicación GPS registrada.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={confirmDelete}
      >
        <Ionicons
          name="trash-outline"
          size={20}
          color={colors.danger}
        />

        <Text style={styles.deleteText}>
          Eliminar hallazgo
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },

  backButton: {
    marginBottom: 8,
  },

  image: {
    height: 260,
    borderRadius: 22,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },

  titleContainer: {
    flex: 1,
    marginRight: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },

  scientific: {
    color: colors.muted,
    marginTop: 2,
  },

  meta: {
    color: colors.muted,
    marginVertical: 12,
  },

  sectionTitle: {
    fontWeight: '900',
    color: colors.text,
    marginTop: 12,
    marginBottom: 6,
    fontSize: 16,
  },

  text: {
    color: colors.text,
    lineHeight: 21,
  },

  map: {
    height: 150,
    borderRadius: 18,
    marginTop: 8,
  },

  coordinates: {
    color: colors.muted,
    marginTop: 6,
  },

  noLocationBox: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  noLocationText: {
    flex: 1,
    color: colors.muted,
    marginLeft: 10,
  },

  deleteButton: {
    marginTop: 20,
    backgroundColor: '#FDECEC',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteText: {
    marginLeft: 8,
    color: colors.danger,
    fontWeight: '800',
  },
});
