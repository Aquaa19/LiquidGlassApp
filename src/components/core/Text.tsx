// src/components/core/Text.tsx

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

/**
 * Text Variant Definitions based on the Liquid Glass Design System
 * display-xl: 64px, Extra Bold
 * headline-lg: 40px, Bold
 * headline-md: 24px, Semi-Bold
 * body-base: 16px, Regular (Default)
 * label-sm: 13px, Semi-Bold, Uppercase
 */
type TextVariant = 'display-xl' | 'headline-lg' | 'headline-md' | 'body-base' | 'label-sm';

interface TextProps extends RNTextProps {
  /** The typography style to apply */
  variant?: TextVariant;
  /** Custom text color (defaults to theme.colors.onSurface) */
  color?: string;
  children: React.ReactNode;
}

/**
 * Core Text Component
 * Provides a unified way to render typography with consistent scaling and font weights.
 */
const Text: React.FC<TextProps> = ({
  variant = 'body-base',
  color,
  style,
  children,
  ...rest
}) => {
  return (
    <RNText
      style={[
        styles[variant],
        { color: color || theme.colors.onSurface },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  'display-xl': theme.typography.displayXl,
  'headline-lg': theme.typography.headlineLg,
  'headline-md': theme.typography.headlineMd,
  'body-base': theme.typography.bodyBase,
  'label-sm': theme.typography.labelSm,
});

export default Text;