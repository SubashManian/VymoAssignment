import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { designTokens } from '../tokens';

type SelectAtomProps = {
  value?: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
};

export function SelectAtom({
  value,
  options,
  onChange,
  error,
}: SelectAtomProps) {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.segmentedControl,
          !!error && styles.segmentedControlError,
        ]}>
        {options.map(option => {
          const isSelected = value === option;

          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.8}
              onPress={() => onChange(option)}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}>
              <Text
                style={[
                  styles.optionLabel,
                  isSelected && styles.optionLabelSelected,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  segmentedControl: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: designTokens.colors.border,
    backgroundColor: designTokens.colors.muted,
    borderRadius: designTokens.borderRadius.md,
    overflow: 'hidden',
  },
  segmentedControlError: {
    borderColor: designTokens.colors.danger,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: designTokens.spacing.md,
  },
  optionSelected: {
    backgroundColor: designTokens.colors.primary,
  },
  optionLabel: {
    color: designTokens.colors.text,
    fontSize: designTokens.typography.body.fontSize,
    lineHeight: designTokens.typography.body.lineHeight,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: designTokens.colors.primaryText,
  },
});
