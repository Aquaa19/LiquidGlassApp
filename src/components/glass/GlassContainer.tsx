// src/components/glass/GlassContainer.tsx
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

interface GlassContainerProps {
  children: React.ReactNode;
  /** Intensity of the glass effect: 'low', 'medium' (default), 'high' */
  intensity?: 'low' | 'medium' | 'high';
  /** Additional React Native styles */
  style?: StyleProp<ViewStyle>;
  /** Whether the container should have the signature Liquid Glass border */
  withBorder?: boolean;
  /** Padding level based on design tokens */
  padding?: 'none' | 'unit' | 'element-gap' | 'gutter';
}

const getPaddingValue = (padding: 'none' | 'unit' | 'element-gap' | 'gutter'): number => {
  switch (padding) {
    case 'none': return 0;
    case 'unit': return theme.spacing.unit;
    case 'element-gap': return theme.spacing.elementGap;
    case 'gutter': return theme.spacing.gutter;
    default: return theme.spacing.gutter;
  }
};

const getIntensityFill = (intensity: 'low' | 'medium' | 'high'): string => {
  switch (intensity) {
    case 'low': return theme.colors.glass.fillLow;
    case 'medium': return theme.colors.glass.fillMedium;
    case 'high': return theme.colors.glass.fillHigh;
    default: return theme.colors.glass.fillMedium;
  }
};

/**
 * GlassContainer Component
 * Provides a frosted glass surface utilizing the Liquid Glass design tokens.
 * Note: Simulates glass via precise opacities as native backdrop-blur requires external native modules.
 */
const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  intensity = 'medium',
  style,
  withBorder = true,
  padding = 'gutter',
}) => {
  const paddingValue = getPaddingValue(padding);
  const fillValue = getIntensityFill(intensity);

  return (
    <View 
      style={[
        styles.container,
        { backgroundColor: fillValue, padding: paddingValue },
        withBorder && styles.borderStyles,
        style,
      ]}
    >
      {/* Content Layer */}
      <View style={styles.contentLayer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.rounded.card,
  },
  borderStyles: {
    borderWidth: 1,
    // Using a unified border color as RN doesn't support gradient borders natively without SVG.
    // The top-left highlight is prioritized as per DESIGN.md
    borderColor: theme.colors.glass.borderTopLeft, 
    borderBottomColor: theme.colors.glass.borderBottomRight,
    borderRightColor: theme.colors.glass.borderBottomRight,
  },
  contentLayer: {
    zIndex: 10,
  },
});

export default GlassContainer;