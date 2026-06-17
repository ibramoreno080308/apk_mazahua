import React, {
  useCallback,
  useState,
} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';

import {
  getCurrentUser,
  getHerbarium,
} from '../database/database';

import { defaultPlantImage } from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function HerbariumScreen() {
  const [plants, setPlants] =
    useState([]);

  useFocusEffect(
    useCallback(() => {
      loadHerbarium();
    }, [])
  );

  async function loadHerbarium() {
    const currentUser =
      await getCurrentUser();

    const items =
      await getHerbarium(
        currentUser?.id
      );

    setPlants(items);
  }

  const totalGoal =
    Math.max(56, plants.length);

  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Mi Herbario
      </Text>

      <Text style={styles.subtitle}>
        {plants.length} / {totalGoal} plantas descubiertas
      </Text>

      {plants.length > 0 ? (
        <View style={styles.grid}>
          {plants.map((plant) => (
            <View
              key={plant.id}
              style={styles.card}
            >
              <Image
                source={{
                  uri: plant.image || defaultPlantImage,
                }}
                style={styles.image}
              />

              <Text
                numberOfLines={1}
                style={styles.name}
              >
                {plant.name}
              </Text>

              <Text style={styles.count}>
                {plant.discoveries} registro(s)
              </Text>
            </View>
          ))}

          {[1, 2, 3].map((item) => (
            <View
              key={`locked-${item}`}
              style={styles.lockedCard}
            >
              <Ionicons
                name="lock-closed"
                size={28}
                color={colors.muted}
              />

              <Text style={styles.lockedText}>
                ???
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons
            name="book-outline"
            size={36}
            color={colors.primary}
          />

          <Text style={styles.emptyText}>
            Tu herbario se llenará cuando registres plantas reales.
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
    textAlign: 'center',
    color: colors.text,
  },

  subtitle: {
    textAlign: 'center',
    color: colors.muted,
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  card: {
    width: '30%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: '100%',
    height: 80,
    borderRadius: 12,
  },

  name: {
    fontWeight: '800',
    color: colors.text,
    marginTop: 6,
    textAlign: 'center',
  },

  count: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },

  lockedCard: {
    width: '30%',
    height: 120,
    backgroundColor: '#E7E7E7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lockedText: {
    fontWeight: '800',
    color: colors.muted,
    marginTop: 6,
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
