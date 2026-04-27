// src/components/core/Divider.tsx
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

interface DividerProps {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Additional React Native styles */
  style?: StyleProp<ViewStyle>;
  /** Whether to use a subtle (lower opacity) style */
  subtle?: boolean;
}

/**
 * Core Divider Component
 * A simple line separator that follows the Liquid Glass "outline" and "surface" tokens.
 */
const Divider: React.FC<DividerProps> = ({ 
  orientation = 'horizontal', 
  style, 
  subtle = false 
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <View 
      importantForAccessibility="no"
      style={[
        styles.base,
        isHorizontal ? styles.horizontal : styles.vertical,
        { opacity: subtle ? 0.3 : 0.6 },
        style
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.outlineVariant,
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});

export default Divider;