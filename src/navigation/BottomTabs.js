import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AddFindingScreen from '../screens/AddFindingScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

function TabIcon({
  route,
  color,
  size,
}) {
  const icons = {
    Inicio: 'home-outline',
    Mapa: 'map-outline',
    Agregar: 'leaf',
    Comunidad: 'people-outline',
    Perfil: 'person-outline',
  };

  if (route.name === 'Agregar') {
    return (
      <View style={styles.floatingButton}>
        <Ionicons
          name={icons[route.name]}
          size={34}
          color="#FFFFFF"
        />
      </View>
    );
  }

  return (
    <Ionicons
      name={icons[route.name]}
      size={size}
      color={color}
    />
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: colors.primary,

        tabBarInactiveTintColor: '#8A8A8A',

        tabBarStyle: {
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },

        tabBarIcon: ({ color, size }) => (
          <TabIcon
            route={route}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Mapa"
        component={MapScreen}
      />

      <Tab.Screen
        name="Agregar"
        component={AddFindingScreen}
        options={{
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Comunidad"
        component={CommunityScreen}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 5,
    borderColor: colors.card,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});