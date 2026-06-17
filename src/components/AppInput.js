import React from 'react';

import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { colors } from '../styles/colors';

export default function AppInput({
  icon,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  multiline,
  ...props
}) {
  return (
    <View
      style={[
        styles.container,
        multiline && styles.multilineContainer,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={colors.muted}
          style={styles.icon}
        />
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 52,
    marginBottom: 14,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },

  multilineContainer: {
    minHeight: 120,
    alignItems: 'flex-start',
    paddingTop: 14,
  },

  multilineInput: {
    textAlignVertical: 'top',
  },
});
