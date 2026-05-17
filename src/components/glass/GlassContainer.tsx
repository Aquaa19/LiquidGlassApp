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
  // Using explicit rgba values to enforce true translucency natively
  switch (intensity) {
    case 'low': return 'rgba(255, 255, 255, 0.2)';
    case 'medium': return 'rgba(255, 255, 255, 0.45)';
    case 'high': return 'rgba(255, 255, 255, 0.7)';
    default: return 'rgba(255, 255, 255, 0.45)';
  }
};

/**
 * GlassContainer Component
 * Provides a frosted glass surface utilizing the Liquid Glass design tokens.
 * Note: Simulates glass via precise opacities and directional borders.
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
    elevation: 0, // EXTREMELY CRITICAL: Prevent Android dark shadow
  },
  borderStyles: {
    // Directional borders to simulate light catching on the top-left edge
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.8)', // Light catches top-left
    borderLeftColor: 'rgba(255, 255, 255, 0.8)',
    borderRightColor: 'rgba(79, 55, 138, 0.05)', // Shadows drop bottom-right
    borderBottomColor: 'rgba(79, 55, 138, 0.05)',
  },
  contentLayer: {
    zIndex: 10,
  },
});

export default GlassContainer;