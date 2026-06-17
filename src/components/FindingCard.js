import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { defaultPlantImage } from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function FindingCard({
  item,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: item.image || defaultPlantImage,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {item.plantName}
        </Text>

        <Text
          numberOfLines={2}
          style={styles.location}
        >
          {item.location}
        </Text>

        <Text style={styles.date}>
          {item.date}
        </Text>

        <View style={styles.stats}>
          <Ionicons
            name="leaf-outline"
            size={15}
            color={colors.primary}
          />

          <Text style={styles.statText}>
            {item.category}
          </Text>

          <Ionicons
            name="heart"
            size={15}
            color={colors.danger}
          />

          <Text style={styles.statText}>
            {item.likes || 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: 82,
    height: 82,
    borderRadius: 12,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  location: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },

  date: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },

  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  statText: {
    fontSize: 12,
    color: colors.muted,
    marginLeft: 4,
    marginRight: 10,
  },
});
