import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonAtom } from '../design/atoms/Button';
import { CheckboxAtom } from '../design/atoms/Checkbox';
import { SelectAtom } from '../design/atoms/Select';
import { TextInputAtom } from '../design/atoms/TextInput';
import { designTokens } from '../design/tokens';
import { FieldMolecule } from '../design/Field';
import {
  DEFAULT_LEAD_VALUES,
  LEAD_FORM_CONFIG,
  LeadFieldConfig,
} from './config';
import { validateForm } from './validation';

type FieldValueMap = Record<string, string | boolean>;

function groupFieldsForLayout(
  fields: LeadFieldConfig[],
  isRegularLayout: boolean,
) {
  const grouped: LeadFieldConfig[][] = [];
  let currentRow: LeadFieldConfig[] = [];

  fields.forEach(field => {
    if (isRegularLayout && field.layout === 'half') {
      if (currentRow.length === 2) {
        grouped.push(currentRow);
        currentRow = [];
      }
      currentRow.push(field);
      if (currentRow.length === 2) {
        grouped.push(currentRow);
        currentRow = [];
      }
      return;
    }

    if (currentRow.length > 0) {
      grouped.push(currentRow);
      currentRow = [];
    }

    grouped.push([field]);
  });

  if (currentRow.length > 0) {
    grouped.push(currentRow);
  }

  return grouped;
}

export function LeadCaptureScreen() {
  const { width } = useWindowDimensions();
  const isRegularLayout = width >= designTokens.breakpoints.regular;

  const [values, setValues] = useState<FieldValueMap>(DEFAULT_LEAD_VALUES);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedValues, setSubmittedValues] = useState<FieldValueMap | null>(
    null,
  );
  const scrollViewRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const fieldRefs = useRef<
    Record<string, React.ComponentRef<typeof View> | null>
  >({});
  const focusedFieldName = useRef<string | null>(null);

  const scrollFieldIntoView = useCallback((fieldName: string) => {
    const field = fieldRefs.current[fieldName];
    const scrollView = scrollViewRef.current;

    if (!field || !scrollView) {
      return;
    }

    field.measureLayout(scrollView, (_x, y) => {
      scrollView.scrollTo({
        y: Math.max(0, y - designTokens.spacing.lg),
        animated: true,
      });
    });
  }, []);

  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const subscription = Keyboard.addListener(keyboardShowEvent, () => {
      if (focusedFieldName.current) {
        scrollFieldIntoView(focusedFieldName.current);
      }
    });

    return () => subscription.remove();
  }, [scrollFieldIntoView]);

  const visibleFields = useMemo(
    () =>
      LEAD_FORM_CONFIG.filter(
        field => field.name !== 'companyName' || values.leadType === 'Company',
      ),
    [values.leadType],
  );

  const errors = useMemo(
    () => validateForm(visibleFields, values),
    [values, visibleFields],
  );

  const groupedFields = useMemo(
    () => groupFieldsForLayout(visibleFields, isRegularLayout),
    [visibleFields, isRegularLayout],
  );

  const isSubmitDisabled = Object.keys(errors).length > 0;

  const updateValue = (name: string, value: string | boolean) => {
    const shouldClearCompanyName = name === 'leadType' && value !== 'Company';

    setTouched(prev => ({
      ...prev,
      [name]: true,
      ...(shouldClearCompanyName ? { companyName: false } : {}),
    }));
    setValues(prev => ({
      ...prev,
      [name]: value,
      ...(shouldClearCompanyName ? { companyName: '' } : {}),
    }));
    setSubmittedValues(null);
  };

  const handleSubmit = () => {
    const nextTouched = visibleFields.reduce<Record<string, boolean>>(
      (acc, field) => {
        acc[field.name] = true;
        return acc;
      },
      {},
    );

    setTouched(prev => ({ ...prev, ...nextTouched }));

    const nextErrors = validateForm(visibleFields, values);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmittedValues({ ...values });
  };

  const renderField = (field: LeadFieldConfig) => {
    const error = touched[field.name] ? errors[field.name] : undefined;
    const isRequired = Boolean(
      field.required ||
        (field.name === 'companyName' && values.leadType === 'Company'),
    );

    const input = (() => {
      switch (field.type) {
        case 'text':
        case 'email': {
          return (
            <TextInputAtom
              value={String(values[field.name] ?? '')}
              onChangeText={text => updateValue(field.name, text)}
              onFocus={() => {
                focusedFieldName.current = field.name;
                scrollFieldIntoView(field.name);
              }}
              onBlur={() =>
                setTouched(prev => ({ ...prev, [field.name]: true }))
              }
              placeholder={field.placeholder}
              autoCapitalize={field.autoCapitalize ?? 'none'}
              autoCorrect={false}
              keyboardType={field.keyboardType ?? 'default'}
              error={error}
            />
          );
        }
        case 'select':
          return (
            <SelectAtom
              value={String(values[field.name] ?? 'Individual')}
              options={field.options ?? []}
              onChange={value => updateValue(field.name, value)}
              error={error}
            />
          );
        case 'textarea':
          return (
            <TextInputAtom
              value={String(values[field.name] ?? '')}
              onChangeText={text => updateValue(field.name, text)}
              onFocus={() => {
                focusedFieldName.current = field.name;
                scrollFieldIntoView(field.name);
              }}
              onBlur={() =>
                setTouched(prev => ({ ...prev, [field.name]: true }))
              }
              placeholder={field.placeholder}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.textarea}
              error={error}
            />
          );
        case 'checkbox':
          return (
            <CheckboxAtom
              checked={Boolean(values[field.name])}
              label={field.label}
              onChange={value => updateValue(field.name, value)}
              error={error}
            />
          );
        default:
          return null;
      }
    })();

    return (
      <View
        key={field.name}
        ref={node => {
          fieldRefs.current[field.name] = node;
        }}
        style={[
          styles.fieldWrapper,
          isRegularLayout && field.layout === 'half' && styles.halfField,
          isRegularLayout && field.layout === 'full' && styles.fullField,
        ]}
      >
        <FieldMolecule
          label={field.label}
          required={isRequired}
          hint={field.hint}
          error={error}
        >
          {input}
        </FieldMolecule>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? undefined : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.header]}>
            <Text style={styles.title}>Lead capture</Text>
          </View>

          <View style={styles.formContainer}>
            {groupedFields.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.formRow}>
                {row.map(field => renderField(field))}
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <ButtonAtom
              label="Submit lead"
              onPress={handleSubmit}
              disabled={isSubmitDisabled}
            />
          </View>

          {submittedValues && (
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Submitted value</Text>
              {visibleFields.map(field => {
                const value = submittedValues[field.name];
                if (field.type === 'checkbox' && !value) {
                  return null;
                }

                const displayValue =
                  typeof value === 'boolean'
                    ? value
                      ? 'Yes'
                      : 'No'
                    : String(value || '');

                return (
                  <Text key={field.name} style={styles.summaryItem}>
                    {field.label}: {displayValue}
                  </Text>
                );
              })}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: designTokens.colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: designTokens.spacing.xl,
    paddingTop: designTokens.spacing.xxl,
    paddingBottom: designTokens.spacing.xxxl,
  },
  header: {
    marginBottom: designTokens.spacing.xxl,
  },
  headerRegular: {
    maxWidth: 720,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    color: designTokens.colors.text,
    fontSize: designTokens.typography.title.fontSize,
    lineHeight: designTokens.typography.title.lineHeight,
    fontWeight: designTokens.typography.title.fontWeight,
    marginBottom: designTokens.spacing.sm,
  },
  formContainer: {
    width: '100%',
  },
  formRow: {
    flexDirection: 'row',
    width: '100%',
  },
  fieldWrapper: {
    width: '100%',
  },
  halfField: {
    flex: 1,
    marginRight: designTokens.spacing.md,
  },
  fullField: {
    width: '100%',
  },
  textarea: {
    minHeight: 120,
    paddingTop: designTokens.spacing.md,
    textAlignVertical: 'top',
  },
  actions: {
    marginTop: designTokens.spacing.sm,
    marginBottom: designTokens.spacing.xl,
  },
  summary: {
    backgroundColor: designTokens.colors.surface,
    borderRadius: designTokens.borderRadius.md,
    borderWidth: 1,
    borderColor: designTokens.colors.border,
    padding: designTokens.spacing.xl,
    marginTop: designTokens.spacing.md,
  },
  summaryTitle: {
    color: designTokens.colors.text,
    fontSize: designTokens.typography.label.fontSize,
    lineHeight: designTokens.typography.label.lineHeight,
    fontWeight: designTokens.typography.label.fontWeight,
    marginBottom: designTokens.spacing.md,
  },
  summaryItem: {
    color: designTokens.colors.textSecondary,
    fontSize: designTokens.typography.body.fontSize,
    lineHeight: designTokens.typography.body.lineHeight,
    marginBottom: designTokens.spacing.xs,
  },
});
