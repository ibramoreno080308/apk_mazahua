import React from 'react';

import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../styles/colors';

export default function ScreenContainer({
  children,
  scroll = true,
  style,
}) {
  if (!scroll) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        style,
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },
});
