import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { designTokens } from './tokens';

type FieldMoleculeProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function FieldMolecule({
  label,
  required = false,
  hint,
  error,
  children,
}: FieldMoleculeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      {children}
      {!!hint && !error && <Text style={styles.hint}>{hint}</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: designTokens.spacing.xl,
  },
  label: {
    marginBottom: designTokens.spacing.sm,
    color: designTokens.colors.text,
    fontSize: designTokens.typography.label.fontSize,
    lineHeight: designTokens.typography.label.lineHeight,
    fontWeight: designTokens.typography.label.fontWeight,
  },
  required: {
    color: designTokens.colors.danger,
  },
  hint: {
    marginTop: designTokens.spacing.xs,
    color: designTokens.colors.hint,
    fontSize: designTokens.typography.hint.fontSize,
    lineHeight: designTokens.typography.hint.lineHeight,
  },
  error: {
    marginTop: designTokens.spacing.xs,
    color: designTokens.colors.danger,
    fontSize: designTokens.typography.error.fontSize,
    lineHeight: designTokens.typography.error.lineHeight,
  },
});
