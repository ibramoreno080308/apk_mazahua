import React, {
  useCallback,
  useState,
} from 'react';

import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';
import FindingCard from '../components/FindingCard';

import {
  getCurrentUser,
  getFavoriteFindings,
} from '../database/database';

import { formatFinding } from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function FavoritesScreen({
  navigation,
}) {
  const [favorites, setFavorites] =
    useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  async function loadFavorites() {
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      setFavorites([]);
      return;
    }

    const items =
      await getFavoriteFindings(
        currentUser.id
      );

    setFavorites(
      items.map(formatFinding)
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Favoritos
      </Text>

      <Text style={styles.subtitle}>
        Tus plantas favoritas guardadas.
      </Text>

      {favorites.length > 0 ? (
        favorites.map((item) => (
          <FindingCard
            key={item.id}
            item={item}
            onPress={() =>
              navigation.navigate(
                'FindingDetail',
                {
                  finding: item,
                }
              )
            }
          />
        ))
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons
            name="heart-outline"
            size={34}
            color={colors.primary}
          />

          <Text style={styles.emptyText}>
            Marca hallazgos como favoritos desde el detalle.
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
    marginBottom: 16,
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
    marginTop: 10,
    color: colors.muted,
    textAlign: 'center',
    fontWeight: '700',
  },
});
