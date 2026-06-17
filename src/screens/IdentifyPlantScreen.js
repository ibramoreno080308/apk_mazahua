import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';
import AppButton from '../components/AppButton';

import { colors } from '../styles/colors';

const fallbackImage =
  'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=900';

export default function IdentifyPlantScreen({
  route,
  navigation,
}) {
  const image =
    route.params?.image || fallbackImage;

  return (
    <ScreenContainer>
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

      <Text style={styles.title}>
        Analizando imagen...
      </Text>

      <Text style={styles.subtitle}>
        Estas son las coincidencias:
      </Text>

      <Image
        source={{
          uri: image,
        }}
        style={styles.hero}
      />

      <Match
        image={fallbackImage}
        percent="85%"
        name="Árnica"
        scientific="Heterotheca inuloides"
      />

      <Match
        image="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400"
        percent="10%"
        name="Manzanilla"
        scientific="Matricaria chamomilla"
      />

      <Match
        image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=400"
        percent="5%"
        name="Otra planta"
        scientific="Especie no identificada"
      />

      <AppButton
        title="Confirmar esta planta"
        onPress={() => navigation.navigate('Main')}
      />
    </ScreenContainer>
  );
}

function Match({
  image,
  percent,
  name,
  scientific,
}) {
  return (
    <View style={styles.match}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.thumbnail}
      />

      <Text style={styles.percent}>
        {percent}
      </Text>

      <View style={styles.matchInfo}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.scientific}>
          {scientific}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: colors.muted,
    marginBottom: 16,
  },

  hero: {
    height: 220,
    borderRadius: 18,
    marginBottom: 14,
  },

  match: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  thumbnail: {
    width: 58,
    height: 58,
    borderRadius: 12,
    marginRight: 10,
  },

  percent: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
    marginRight: 10,
  },

  matchInfo: {
    flex: 1,
  },

  name: {
    fontWeight: '800',
    color: colors.text,
  },

  scientific: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
});