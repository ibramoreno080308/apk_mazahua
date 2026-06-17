import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../components/ScreenContainer';
import StatCard from '../components/StatCard';
import PlantCard from '../components/PlantCard';

import {
  getCurrentUser,
  getDashboardStats,
  getFindings,
} from '../database/database';

import { formatFinding } from '../utils/findingUtils';

import { colors } from '../styles/colors';

export default function HomeScreen({
  navigation,
}) {
  const [user, setUser] =
    useState(null);

  const [stats, setStats] =
    useState({
      plantCount: 0,
      routeCount: 0,
      contributionCount: 0,
      favoriteCount: 0,
    });

  const [findings, setFindings] =
    useState([]);

  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, [])
  );

  async function loadHomeData() {
    const currentUser =
      await getCurrentUser();

    const currentStats =
      await getDashboardStats(
        currentUser?.id
      );

    const savedFindings =
      await getFindings(
        currentUser?.id
      );

    setUser(currentUser);

    setStats({
      plantCount:
        currentStats?.plantCount || 0,
      routeCount:
        currentStats?.routeCount || 0,
      contributionCount:
        currentStats?.contributionCount || 0,
      favoriteCount:
        currentStats?.favoriteCount || 0,
    });

    setFindings(
      savedFindings.map(formatFinding)
    );
  }

  const latestFinding =
    findings[0];

  const nearFindings =
    findings.slice(0, 8);

  const level =
    useMemo(() => {
      return getExplorerLevel(
        stats.plantCount
      );
    }, [
      stats.plantCount,
    ]);

  const progressPercent =
    Math.min(
      100,
      Math.round(
        (stats.plantCount / 20) * 100
      )
    );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>
            Hola, {user?.name || 'Explorador'} 🌿
          </Text>

          <Text style={styles.subtitle}>
            Tu atlas personal de plantas medicinales.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() =>
            navigation.navigate(
              'Notifications'
            )
          }
        >
          <Ionicons
            name="notifications-outline"
            size={23}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View>
            <Text style={styles.levelLabel}>
              Nivel de explorador
            </Text>

            <Text style={styles.levelTitle}>
              {level.name}
            </Text>
          </View>

          <View style={styles.levelIcon}>
            <Ionicons
              name={level.icon}
              size={28}
              color="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width:
                  `${progressPercent}%`,
              },
            ]}
  />
        </View>

        <Text style={styles.progressText}>
          {stats.plantCount} de 20 plantas para avanzar
        </Text>
      </View>

      <TouchableOpacity
        style={styles.hero}
        onPress={() =>
          navigation.navigate(
            'Camera'
          )
        }
        activeOpacity={0.85}
      >
        <View style={styles.heroIcon}>
          <Ionicons
            name="camera-outline"
            size={32}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>
            Registrar nuevo hallazgo
          </Text>

          <Text style={styles.heroSubtitle}>
            Agrega foto, ubicación y usos tradicionales.
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <View style={styles.stats}>
        <StatCard
          icon="leaf-outline"
          value={String(stats.plantCount)}
          label="Plantas"
        />

        <StatCard
          icon="map-outline"
          value={String(stats.routeCount)}
          label="Rutas"
        />

        <StatCard
          icon="camera-outline"
          value={String(stats.contributionCount)}
          label="Aportes"
        />
      </View>

      <View style={styles.grid}>
        <Action
          icon="map-outline"
          title="Explorar mapa"
          description="Ver ubicaciones"
          onPress={() =>
            navigation.navigate(
              'Mapa'
            )
          }
        />

        <Action
          icon="book-outline"
          title="Mi herbario"
          description="Colección real"
          onPress={() =>
            navigation.navigate(
              'Herbarium'
            )
          }
        />

        <Action
          icon="people-outline"
          title="Comunidad"
          description="Tus aportes"
          onPress={() =>
            navigation.navigate(
              'Comunidad'
            )
          }
        />

        <Action
          icon="trail-sign-outline"
          title="Rutas"
          description="Recorridos"
          onPress={() =>
            navigation.navigate(
              'Routes'
            )
          }
        />
      </View>

      {latestFinding && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Último hallazgo
            </Text>
          </View>

          <TouchableOpacity
            style={styles.latestCard}
            onPress={() =>
              navigation.navigate(
                'FindingDetail',
                {
                  finding: latestFinding,
                }
              )
            }
            activeOpacity={0.85}
          >
            <View style={styles.latestIcon}>
              <Ionicons
                name="leaf"
                size={26}
                color={colors.primary}
              />
            </View>

            <View style={styles.latestInfo}>
              <Text style={styles.latestName}>
                {latestFinding.plantName}
              </Text>

              <Text
                style={styles.latestLocation}
                numberOfLines={1}
              >
                {latestFinding.location}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.muted}
            />
          </TouchableOpacity>
        </>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Cerca de ti
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Comunidad'
            )
          }
        >
          <Text style={styles.link}>
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      {nearFindings.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {nearFindings.map((finding) => (
            <PlantCard
              key={finding.id}
              plant={finding}
              onPress={() =>
                navigation.navigate(
                  'FindingDetail',
                  {
                    finding,
                  }
                )
              }
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons
            name="leaf-outline"
            size={34}
            color={colors.primary}
          />

          <Text style={styles.emptyTitle}>
            Aún no tienes hallazgos
          </Text>

          <Text style={styles.emptyText}>
            Registra tu primera planta medicinal para construir tu atlas.
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}

function Action({
  icon,
  title,
  description,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.action}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.actionIcon}>
        <Ionicons
          name={icon}
          size={24}
          color={colors.primary}
        />
      </View>

      <Text style={styles.actionText}>
        {title}
      </Text>

      <Text style={styles.actionDescription}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

function getExplorerLevel(
  plantCount,
) {
  if (plantCount >= 50) {
    return {
      name: 'Sabio Mazahua',
      icon: 'star',
    };
  }

  if (plantCount >= 30) {
    return {
      name: 'Herbolario',
      icon: 'medal',
    };
  }

  if (plantCount >= 15) {
    return {
      name: 'Investigador',
      icon: 'search',
    };
  }

  if (plantCount >= 5) {
    return {
      name: 'Explorador',
      icon: 'compass',
    };
  }

  return {
    name: 'Novato',
    icon: 'leaf',
  };
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  headerText: {
    flex: 1,
    marginRight: 12,
  },

  greeting: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.text,
  },

  subtitle: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 19,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  levelCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },

  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  levelLabel: {
    color: '#DDEFE2',
    fontSize: 12,
    fontWeight: '700',
  },

  levelTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
    marginTop: 4,
  },

  levelIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.16)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressTrack: {
    height: 9,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 16,
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 999,
  },

  progressText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
  },

  hero: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  heroIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.17)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 17,
  },

  heroSubtitle: {
    color: '#EAF6EA',
    fontSize: 12,
    marginTop: 3,
  },

  stats: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },

  action: {
    width: '48%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
  },

  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.greenSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  actionText: {
    fontWeight: '900',
    color: colors.text,
  },

  actionDescription: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
  },

  link: {
    color: colors.primary,
    fontWeight: '800',
  },

  latestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
  },

  latestIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.greenSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },

  latestInfo: {
    flex: 1,
    marginLeft: 12,
  },

  latestName: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
  },

  latestLocation: {
    color: colors.muted,
    marginTop: 3,
  },

  emptyBox: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
  },

  emptyTitle: {
    marginTop: 10,
    color: colors.text,
    fontWeight: '900',
    fontSize: 16,
  },

  emptyText: {
    marginTop: 4,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 19,
  },
});