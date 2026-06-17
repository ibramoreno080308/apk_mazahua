import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';

import { colors } from '../styles/colors';

const notifications = [
  {
    id: 1,
    icon: 'leaf-outline',
    title: 'Nuevo hallazgo cercano',
    message:
      'Se registró una planta de Árnica cerca de tu ubicación.',
    time: 'Hace 10 min',
  },
  {
    id: 2,
    icon: 'heart-outline',
    title: 'Nuevo favorito',
    message:
      'A alguien le gustó tu hallazgo de Epazote.',
    time: 'Hace 1 hora',
  },
  {
    id: 3,
    icon: 'chatbubble-outline',
    title: 'Nuevo comentario',
    message:
      'Recibiste un comentario en tu publicación.',
    time: 'Hace 3 horas',
  },
  {
    id: 4,
    icon: 'trophy-outline',
    title: 'Logro desbloqueado',
    message:
      'Has alcanzado el nivel Explorador.',
    time: 'Ayer',
  },
];

export default function NotificationsScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Notificaciones
      </Text>

      <Text style={styles.subtitle}>
        Mantente al día con la comunidad.
      </Text>

      {notifications.map((notification) => (
        <View
          key={notification.id}
          style={styles.card}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={notification.icon}
              size={24}
              color={colors.primary}
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.notificationTitle}>
              {notification.title}
            </Text>

            <Text style={styles.message}>
              {notification.message}
            </Text>

            <Text style={styles.time}>
              {notification.time}
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

    backgroundColor: colors.card,

    borderRadius: 18,

    padding: 14,

    marginBottom: 12,

    borderWidth: 1,

    borderColor: colors.border,
  },

  iconContainer: {
    width: 50,
    height: 50,

    borderRadius: 25,

    backgroundColor: colors.greenSoft,

    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  notificationTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: colors.text,
  },

  message: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 13,
  },

  time: {
    marginTop: 6,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
});