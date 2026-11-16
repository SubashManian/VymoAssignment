import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { designTokens } from '../tokens';

type CheckboxAtomProps = {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  error?: string;
};

export function CheckboxAtom({
  checked,
  label,
  onChange,
  error,
}: CheckboxAtomProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChange(!checked)}
        style={styles.row}>
        <View
          style={[
            styles.box,
            checked && styles.boxChecked,
            !!error && styles.boxError,
          ]}>
          {checked && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: designTokens.colors.border,
    backgroundColor: designTokens.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing.md,
  },
  boxChecked: {
    backgroundColor: designTokens.colors.primary,
    borderColor: designTokens.colors.primary,
  },
  boxError: {
    borderColor: designTokens.colors.danger,
  },
  checkMark: {
    color: designTokens.colors.primaryText,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  label: {
    color: designTokens.colors.text,
    fontSize: designTokens.typography.body.fontSize,
    lineHeight: designTokens.typography.body.lineHeight,
    flexShrink: 1,
  },
});
