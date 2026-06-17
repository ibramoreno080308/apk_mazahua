import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';

import { clearCurrentUser } from '../database/database';

import { colors } from '../styles/colors';

export default function SettingsScreen({
  navigation,
}) {
  async function logout() {
    await clearCurrentUser();

    navigation.replace('Login');
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>
        Configuración
      </Text>

      <Text style={styles.subtitle}>
        Ajusta tu experiencia dentro del Atlas.
      </Text>

      <SettingRow
        icon="location-outline"
        title="Ubicación GPS"
        subtitle="Permitir guardar coordenadas"
        switchValue
      />

      <SettingRow
        icon="cloud-offline-outline"
        title="Modo offline"
        subtitle="Los registros se guardan en SQLite local"
        switchValue
      />

      <SettingRow
        icon="notifications-outline"
        title="Notificaciones"
        subtitle="Avisos de comunidad y logros"
        switchValue={false}
      />

      <Option
        icon="shield-checkmark-outline"
        title="Privacidad"
      />

      <Option
        icon="information-circle-outline"
        title="Acerca de la app"
      />

      <TouchableOpacity
        style={styles.logout}
        onPress={logout}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color={colors.danger}
        />

        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
  switchValue,
}) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.primary}
        />

        <View style={styles.textContainer}>
          <Text style={styles.rowTitle}>
            {title}
          </Text>

          <Text style={styles.rowSubtitle}>
            {subtitle}
          </Text>
        </View>
      </View>

      <Switch
        value={switchValue}
        trackColor={{
          false: colors.border,
          true: colors.greenSoft,
        }}
        thumbColor={
          switchValue
            ? colors.primary
            : colors.muted
        }
      />
    </View>
  );
}

function Option({
  icon,
  title,
}) {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.left}>
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
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },

  subtitle: {
    color: colors.muted,
    marginBottom: 20,
  },

  row: {
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

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  textContainer: {
    marginLeft: 12,
    flex: 1,
  },

  rowTitle: {
    fontWeight: '800',
    color: colors.text,
  },

  rowSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },

  optionText: {
    marginLeft: 12,
    fontWeight: '800',
    color: colors.text,
  },

  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDECEC',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },

  logoutText: {
    marginLeft: 8,
    fontWeight: '800',
    color: colors.danger,
  },
});
