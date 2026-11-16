export const designTokens = {
  colors: {
    background: '#F4F7FB',
    surface: '#FFFFFF',
    border: '#D9E2F1',
    text: '#102033',
    textSecondary: '#5D6B7A',
    hint: '#74839A',
    primary: '#1D4ED8',
    primaryText: '#FFFFFF',
    danger: '#D92D20',
    success: '#12805C',
    muted: '#EEF2F8',
    checkbox: '#E5ECF8',
    shadow: 'rgba(15, 23, 42, 0.08)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    round: 999,
  },
  typography: {
    title: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '700' as const,
    },
    label: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
    },
    hint: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400' as const,
    },
    error: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400' as const,
    },
    button: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600' as const,
    },
  },
  breakpoints: {
    regular: 768,
  },
};

export const formTokens = {
  inputHeight: 48,
  textareaMinHeight: 112,
};
