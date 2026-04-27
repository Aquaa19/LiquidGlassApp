// src/components/glass/GlassCard.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

export type CardAccent = 'primary' | 'secondary' | 'tertiary' | 'error' | 'none';
export type RoundedVariant = 'xl' | '2xl' | '3xl' | 'none';

interface GlassCardProps {
  children: React.ReactNode;
  /** Additional React Native styles */
  style?: StyleProp<ViewStyle>;
  /** Click handler for interactive cards */
  onPress?: () => void;
  /** Whether the card should respond to press states (scaling) */
  interactive?: boolean;
  /** Optional status-based accent border on the left side */
  accent?: CardAccent;
  /** Optional hex color for a decorative ambient blob in the corner */
  blobColor?: string;
  /** Corner radius styling based on design system tokens */
  rounded?: RoundedVariant;
}

const getAccentColor = (accent: CardAccent): string => {
  switch (accent) {
    case 'primary': return theme.colors.primary;
    case 'secondary': return theme.colors.secondary;
    case 'tertiary': return theme.colors.tertiary;
    case 'error': return theme.colors.error;
    default: return 'transparent';
  }
};

const getRoundedValue = (rounded: RoundedVariant): number => {
  switch (rounded) {
    case 'xl': return theme.rounded.xl; // 24px
    case '2xl': return 28; // Custom value based on Liquid Glass design intent
    case '3xl': return 32;
    case 'none': return 0;
    default: return theme.rounded.card; // 26px default
  }
};

/**
 * GlassCard Component
 * A premium surface component implementing the frosted glass effect with 
 * configurable accents, interactivity, and decorative background elements.
 */
const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  onPress,
  interactive = false,
  accent = 'none',
  blobColor,
  rounded = '3xl',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const radius = getRoundedValue(rounded);
  const accentColor = getAccentColor(accent);
  const hasAccent = accent !== 'none';

  const handlePressIn = () => {
    if (interactive) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
        speed: 20,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (interactive) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
      }).start();
    }
  };

  const ContainerComponent = interactive || onPress ? Pressable : View;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <ContainerComponent
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.container,
          { borderRadius: radius },
          hasAccent && { borderLeftWidth: 4, borderLeftColor: accentColor }
        ]}
      >
        {/* Decorative Internal Ambient Blob (Simulated Blur) */}
        {blobColor && (
          <View 
            style={[
              styles.ambientBlob,
              { backgroundColor: blobColor }
            ]}
            pointerEvents="none"
          />
        )}
        
        {/* Content Layer */}
        <View style={styles.contentLayer}>
          {children}
        </View>
      </ContainerComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.colors.glass.fillMedium, // Simulated backdrop-blur bg
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.glass.borderTopLeft,
    borderLeftColor: theme.colors.glass.borderTopLeft,
    borderRightColor: theme.colors.glass.borderBottomRight,
    borderBottomColor: theme.colors.glass.borderBottomRight,
    ...theme.elevation.ambientGlow, // Uses standard shadow since inset shadows aren't native
  },
  ambientBlob: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.3, // Lower opacity to simulate the blurred diffusion
  },
  contentLayer: {
    zIndex: 10,
    height: '100%',
  },
});

export default GlassCard;