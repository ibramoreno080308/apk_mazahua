import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { colors } from '../styles/colors';

export default function StatCard({
  icon,
  value,
  label,
}) {
  return (
    <View style={styles.card}>
      <Ionicons
        name={icon}
        size={22}
        color={colors.primary}
      />

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    backgroundColor: colors.card,

    borderRadius: 16,

    padding: 12,

    alignItems: 'center',

    borderWidth: 1,

    borderColor: colors.border,
  },

  value: {
    fontSize: 20,

    fontWeight: '800',

    color: colors.text,

    marginTop: 4,
  },

  label: {
    fontSize: 12,

    color: colors.muted,

    marginTop: 2,
  },
});