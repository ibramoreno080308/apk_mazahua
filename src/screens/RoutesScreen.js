import React, {
  useCallback,
  useState,
} from 'react';

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';

import {
  getBotanicalRoutes,
  getCurrentUser,
} from '../database/database';

import { colors } from '../styles/colors';

export default function RoutesScreen() {
  const [routes, setRoutes] =
    useState([]);

  useFocusEffect(
    useCallback(() => {
      loadRoutes();
    }, [])
  );

  async function loadRoutes() {
    const currentUser =
      await getCurrentUser();

    const savedRoutes =
      await getBotanicalRoutes(
        currentUser?.id
      );

    setRoutes(savedRoutes);
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Rutas Botánicas
      </Text>

      <Text style={styles.subtitle}>
        Rutas generadas automáticamente con tus hallazgos con GPS.
      </Text>

      {routes.length > 0 ? (
        routes.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={styles.card}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="trail-sign-outline"
                size={28}
                color={colors.primary}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.routeName}>
                {route.name}
              </Text>

              <Text style={styles.details}>
                🌿 {route.plants} punto(s) registrados
              </Text>

              <Text
                numberOfLines={1}
                style={styles.details}
              >
                📍 {route.lastLocation}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color={colors.muted}
            />
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons
            name="trail-sign-outline"
            size={36}
            color={colors.primary}
          />

          <Text style={styles.emptyText}>
            Guarda plantas con ubicación GPS para crear rutas botánicas.
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },

  subtitle: {
    color: colors.muted,
    marginBottom: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: colors.greenSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  routeName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  details: {
    color: colors.muted,
    marginTop: 2,
  },

  emptyBox: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
  },

  emptyText: {
    color: colors.muted,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '700',
  },
});
