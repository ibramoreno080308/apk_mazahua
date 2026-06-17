import React from 'react';

import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { defaultPlantImage } from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function PlantCard({
  plant,
  onPress,
}) {
  const name =
    plant.name || plant.plantName;

  const info =
    plant.location ||
    plant.distance ||
    plant.rarity ||
    'Hallazgo registrado';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.8}
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
        {name}
      </Text>

      <Text
        numberOfLines={2}
        style={styles.info}
      >
        {info}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: '100%',
    height: 82,
    borderRadius: 12,
  },

  name: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },

  info: {
    marginTop: 2,
    fontSize: 11,
    color: colors.muted,
  },
});
