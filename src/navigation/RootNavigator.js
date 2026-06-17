import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import BottomTabs from './BottomTabs';

import CameraScreen from '../screens/CameraScreen';
import IdentifyPlantScreen from '../screens/IdentifyPlantScreen';
import FindingDetailScreen from '../screens/FindingDetailScreen';

import FavoritesScreen from '../screens/FavoritesScreen';
import RoutesScreen from '../screens/RoutesScreen';
import HerbariumScreen from '../screens/HerbariumScreen';

import AchievementsScreen from '../screens/AchievementsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="Main"
        component={BottomTabs}
      />

      <Stack.Screen
        name="Camera"
        component={CameraScreen}
      />

      <Stack.Screen
        name="IdentifyPlant"
        component={IdentifyPlantScreen}
      />

      <Stack.Screen
        name="FindingDetail"
        component={FindingDetailScreen}
      />

      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />

      <Stack.Screen
        name="Routes"
        component={RoutesScreen}
      />

      <Stack.Screen
        name="Herbarium"
        component={HerbariumScreen}
      />

      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}