import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { colors } from '../styles/colors';

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  style,
}) {
  const isSecondary =
    variant === 'secondary';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        isSecondary &&
          styles.secondaryButton,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isSecondary &&
            styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,

    minHeight: 54,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 20,
  },

  text: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',
  },

  secondaryButton: {
    backgroundColor: colors.greenSoft,

    borderWidth: 1,

    borderColor: colors.primary,
  },

  secondaryText: {
    color: colors.primaryDark,
  },
});