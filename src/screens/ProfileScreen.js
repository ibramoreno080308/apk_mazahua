import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';

import {
  getCurrentUser,
  getDashboardStats,
} from '../database/database';

import { getExplorerLevel } from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function ProfileScreen({
  navigation,
}) {
  const [user, setUser] =
    useState(null);

  const [stats, setStats] =
    useState({
      plantCount: 0,
      routeCount: 0,
      contributionCount: 0,
    });

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  async function loadProfile() {
    const currentUser =
      await getCurrentUser();

    const currentStats =
      await getDashboardStats(
        currentUser?.id
      );

    setUser(currentUser);
    setStats(currentStats);
  }

  const level =
    getExplorerLevel(
      stats.contributionCount
    );

  return (
    <ScreenContainer>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={55}
            color="#FFFFFF"
          />
        </View>

        <Text style={styles.name}>
          {user?.name || 'Explorador'}
        </Text>

        <Text style={styles.email}>
          {user?.email || 'Sin correo registrado'}
        </Text>

        <View style={styles.level}>
          <Ionicons
            name="leaf"
            size={16}
            color="#FFFFFF"
          />

          <Text style={styles.levelText}>
            {level}
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat
          value={String(stats.plantCount)}
          label="Plantas"
        />

        <Stat
          value={String(stats.routeCount)}
          label="Rutas"
        />

        <Stat
          value={String(stats.contributionCount)}
          label="Aportes"
        />
      </View>

      <Option
        icon="book-outline"
        title="Mi Herbario"
        onPress={() =>
          navigation.navigate('Herbarium')
        }
      />

      <Option
        icon="heart-outline"
        title="Favoritos"
        onPress={() =>
          navigation.navigate('Favorites')
        }
      />

      <Option
        icon="trail-sign-outline"
        title="Rutas Botánicas"
        onPress={() =>
          navigation.navigate('Routes')
        }
      />

      <Option
        icon="trophy-outline"
        title="Logros"
        onPress={() =>
          navigation.navigate('Achievements')
        }
      />

      <Option
        icon="settings-outline"
        title="Configuración"
        onPress={() =>
          navigation.navigate('Settings')
        }
      />
    </ScreenContainer>
  );
}

function Stat({
  value,
  label,
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function Option({
  icon,
  title,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.option}
      onPress={onPress}
    >
      <View style={styles.optionLeft}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.primary}
        />

        <Text style={styles.optionText}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.muted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
  },

  email: {
    color: colors.muted,
    marginTop: 4,
  },

  level: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },

  levelText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 6,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
  },

  statLabel: {
    color: colors.muted,
    fontSize: 12,
  },

  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionText: {
    marginLeft: 12,
    fontWeight: '700',
    color: colors.text,
  },
});
