// src/components/core/Icon.tsx
import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { theme } from '../../theme/theme';

/**
 * Supported Icon Sizes
 * xs: 16px (Dense UI)
 * sm: 20px (Secondary Actions)
 * md: 24px (Standard - Default)
 * lg: 32px (Feature Icons)
 * xl: 48px (Hero/Stat Icons)
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

interface IconProps extends TextProps {
  /** The name of the Material Symbol (e.g., 'dashboard', 'settings') */
  name: string;
  /** Size variant or specific pixel number */
  size?: IconSize;
  /** Custom color string (defaults to theme.colors.onSurface) */
  color?: string;
  /** Whether to use the "filled" version of the symbol */
  fill?: boolean;
}

const sizeMap: Record<string, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

/**
 * Core Icon Component
 * Renders Material Symbols using standard React Native text rendering.
 * * IMPORTANT: For this to work in React Native CLI, ensure you have downloaded 
 * the Material Symbols TTF files (e.g., 'MaterialSymbols-Outlined.ttf' and 
 * 'MaterialSymbols-Filled.ttf'), placed them in your assets folder, and 
 * linked them via react-native.config.js.
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  fill = false,
  style,
  ...rest
}) => {
  const isCustomSize = typeof size === 'number';
  const iconSize = isCustomSize ? size : sizeMap[size as string];
  
  const fontFamily = fill ? 'MaterialSymbols-Filled' : 'MaterialSymbols-Outlined';

  return (
    <Text
      style={[
        styles.icon,
        {
          fontSize: iconSize,
          color: color || theme.colors.onSurface,
          fontFamily: fontFamily,
          height: iconSize,
          lineHeight: iconSize,
        },
        style,
      ]}
      allowFontScaling={false}
      importantForAccessibility="no"
      {...rest}
    >
      {name}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
});

export default Icon;