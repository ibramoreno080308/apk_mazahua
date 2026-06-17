import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function CategoryBadge({
  label,
  color = '#1F7A3A',
}) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            color + '22',
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 999,
  },

  text: {
    fontSize: 12,

    fontWeight: '700',
  },
});