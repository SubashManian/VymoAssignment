import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { designTokens, formTokens } from '../tokens';

type TextInputAtomProps = TextInputProps & {
  error?: string;
  hint?: string;
};

export function TextInputAtom({
  value,
  error,
  style,
  placeholderTextColor = designTokens.colors.hint,
  ...props
}: TextInputAtomProps) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value === null || value === undefined ? '' : String(value)}
        placeholderTextColor={placeholderTextColor}
        style={[
          styles.input,
          !!error && styles.inputError,
          style,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    width: '100%',
    minHeight: formTokens.inputHeight,
    backgroundColor: designTokens.colors.surface,
    borderWidth: 1,
    borderColor: designTokens.colors.border,
    borderRadius: designTokens.borderRadius.md,
    paddingHorizontal: designTokens.spacing.lg,
    paddingVertical: designTokens.spacing.md,
    color: designTokens.colors.text,
    fontSize: designTokens.typography.body.fontSize,
    lineHeight: designTokens.typography.body.lineHeight,
  },
  inputError: {
    borderColor: designTokens.colors.danger,
  },
});
