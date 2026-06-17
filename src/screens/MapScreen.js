import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import * as Location from 'expo-location';

import {
  getCurrentUser,
  getFindings,
} from '../database/database';

import {
  defaultPlantImage,
  formatFinding,
} from '../utils/findingUtils';

import { colors } from '../styles/colors';

function PlantMarker({
  rarity,
  image,
}) {
  const markerColor =
    rarity === 'Rara'
      ? colors.purple
      : rarity === 'Poco común'
        ? colors.orange
        : colors.primary;

  return (
    <View style={styles.markerWrapper}>
      <View
        style={[
          styles.markerOuterCircle,
          {
            borderColor: markerColor,
          },
        ]}
      >
        <Image
          source={{
            uri: image || defaultPlantImage,
          }}
          style={styles.markerImage}
          resizeMode="cover"
        />
      </View>

      <View
        style={[
          styles.markerDot,
          {
            backgroundColor: markerColor,
          },
        ]}
      />
    </View>
  );
}

export default function MapScreen({
  navigation,
}) {
  const [region, setRegion] =
    useState({
      latitude: 19.6821,
      longitude: -99.6766,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    });

  const [findings, setFindings] =
    useState([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFindings();
    }, [])
  );

  async function getCurrentLocation() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    const location =
      await Location.getCurrentPositionAsync({});

    setRegion((currentRegion) => ({
      ...currentRegion,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
  }

  async function loadFindings() {
    const currentUser =
      await getCurrentUser();

    const savedFindings =
      await getFindings(
        currentUser?.id
      );

    const validFindings =
      savedFindings
        .map(formatFinding)
        .filter(
          (item) =>
            Number.isFinite(item.lat) &&
            Number.isFinite(item.lng)
        );

    setFindings(validFindings);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Tu ubicación"
          anchor={{
            x: 0.5,
            y: 0.5,
          }}
        >
          <View style={styles.userMarker}>
            <View style={styles.userMarkerInner} />
          </View>
        </Marker>

        {findings.map((finding) => (
          <Marker
            key={finding.id}
            coordinate={{
              latitude: finding.lat,
              longitude: finding.lng,
            }}
            title={finding.plantName}
            description={finding.location}
            anchor={{
              x: 0.5,
              y: 0.85,
            }}
            tracksViewChanges
            onCalloutPress={() =>
              navigation.navigate(
                'FindingDetail',
                {
                  finding,
                }
              )
            }
          >
            <PlantMarker
              rarity={finding.rarity}
              image={finding.image}
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={18}
          color={colors.muted}
        />

        <Text style={styles.searchText}>
          Buscar planta o lugar
        </Text>

        <Ionicons
          name="options-outline"
          size={20}
          color={colors.text}
          style={styles.filterIcon}
        />
      </View>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}
        activeOpacity={0.8}
      >
        <Ionicons
          name="locate"
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>

      <View style={styles.bottomSheet}>
        <Text style={styles.bottomSheetTitle}>
          Plantas alrededor
        </Text>

        {findings.length > 0 ? (
          findings
            .slice(0, 3)
            .map((finding) => (
              <TouchableOpacity
                key={finding.id}
                style={styles.row}
                onPress={() =>
                  navigation.navigate(
                    'FindingDetail',
                    {
                      finding,
                    }
                  )
                }
              >
                <View>
                  <Text style={styles.plantName}>
                    {finding.plantName}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={styles.locationText}
                  >
                    {finding.location}
                  </Text>
                </View>

                <Text style={styles.distance}>
                  Ver detalle ›
                </Text>
              </TouchableOpacity>
            ))
        ) : (
          <Text style={styles.emptyMapText}>
            Registra plantas con GPS para verlas aquí.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchBar: {
    position: 'absolute',
    top: 55,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
  },

  searchText: {
    color: colors.muted,
  },

  filterIcon: {
    marginLeft: 'auto',
  },

  locationButton: {
    position: 'absolute',
    right: 16,
    bottom: 260,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  bottomSheet: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 88,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    elevation: 8,
  },

  bottomSheetTitle: {
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 8,
    color: colors.text,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  plantName: {
    fontWeight: '800',
    color: colors.text,
  },

  locationText: {
    maxWidth: 210,
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },

  distance: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },

  emptyMapText: {
    color: colors.muted,
    textAlign: 'center',
    paddingVertical: 10,
  },

  markerWrapper: {
    width: 86,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },

  markerOuterCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    borderWidth: 5,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  markerImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: -3,
  },

  userMarker: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.mapBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  userMarkerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
});
