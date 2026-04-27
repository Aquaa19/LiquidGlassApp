import { colors } from './colors';
import { typography } from './typography';
import { spacing, rounded } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  rounded,
  elevation: {
    // Ultra-soft, multi-step ambient shadows replacing heavy black shadows
    ambientGlow: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 5,
    },
    ambientNeutral: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 16,
      elevation: 2,
    }
  }
};

export type Theme = typeof theme;