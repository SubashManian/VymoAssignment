import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { designTokens } from '../tokens';

type ButtonAtomProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function ButtonAtom({ label, onPress, disabled = false }: ButtonAtomProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
      ]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: designTokens.borderRadius.md,
    backgroundColor: designTokens.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: designTokens.spacing.xxl,
  },
  buttonDisabled: {
    backgroundColor: '#B7C5E1',
  },
  label: {
    color: designTokens.colors.primaryText,
    fontSize: designTokens.typography.button.fontSize,
    lineHeight: designTokens.typography.button.lineHeight,
    fontWeight: designTokens.typography.button.fontWeight,
  },
});
