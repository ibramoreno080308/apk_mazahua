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
  getFindings,
} from '../database/database';

import { formatFinding } from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function CommunityScreen({
  navigation,
}) {
  const [findings, setFindings] =
    useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFindings();
    }, [])
  );

  async function loadFindings() {
    const currentUser =
      await getCurrentUser();

    const savedFindings =
      await getFindings(
        currentUser?.id
      );

    setFindings(
      savedFindings.map(formatFinding)
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Comunidad
      </Text>

      <Text style={styles.subtitle}>
        Aportaciones reales registradas en este dispositivo.
      </Text>

      {findings.length > 0 ? (
        findings.map((item) => (
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
            name="people-outline"
            size={34}
            color={colors.primary}
          />

          <Text style={styles.emptyText}>
            Aún no hay hallazgos. Registra tu primera planta.
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
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
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
