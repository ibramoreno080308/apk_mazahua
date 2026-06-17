import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';

import {
  getCurrentUser,
  getDashboardStats,
} from '../database/database';

import { colors } from '../styles/colors';

export default function AchievementsScreen() {
  const [stats, setStats] =
    useState({
      plantCount: 0,
      routeCount: 0,
      contributionCount: 0,
    });

  useFocusEffect(
    useCallback(() => {
      loadAchievements();
    }, [])
  );

  async function loadAchievements() {
    const currentUser =
      await getCurrentUser();

    const currentStats =
      await getDashboardStats(
        currentUser?.id
      );

    setStats(currentStats);
  }

  const achievements = [
    {
      id: 1,
      icon: 'leaf-outline',
      title: 'Primer hallazgo',
      description: 'Registra tu primera planta medicinal.',
      unlocked: stats.contributionCount >= 1,
    },
    {
      id: 2,
      icon: 'camera-outline',
      title: 'Explorador visual',
      description: 'Registra 5 hallazgos con fotografía.',
      unlocked: stats.contributionCount >= 5,
    },
    {
      id: 3,
      icon: 'map-outline',
      title: 'Guardián del territorio',
      description: 'Guarda 5 ubicaciones GPS.',
      unlocked: stats.routeCount >= 5,
    },
    {
      id: 4,
      icon: 'trophy-outline',
      title: 'Sabio Mazahua',
      description: 'Descubre 50 plantas medicinales.',
      unlocked: stats.plantCount >= 50,
    },
  ];

  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Logros
      </Text>

      <Text style={styles.subtitle}>
        Avanza como explorador del conocimiento herbolario.
      </Text>

      {achievements.map((achievement) => (
        <View
          key={achievement.id}
          style={[
            styles.card,
            !achievement.unlocked && styles.lockedCard,
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={
                achievement.unlocked
                  ? achievement.icon
                  : 'lock-closed-outline'
              }
              size={28}
              color={
                achievement.unlocked
                  ? colors.primary
                  : colors.muted
              }
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.achievementTitle}>
              {achievement.title}
            </Text>

            <Text style={styles.description}>
              {achievement.description}
            </Text>
          </View>
        </View>
      ))}
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

  lockedCard: {
    opacity: 0.55,
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

  achievementTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  description: {
    color: colors.muted,
    marginTop: 3,
    fontSize: 13,
  },
});
