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
 * Helper to simulate a diffused orb inside the card for the blobColor property
 */
const InternalSoftBlob = ({ color }: { color: string }) => {
  const size = 160;
  return (
    <View style={[styles.ambientBlobContainer, { width: size, height: size }]}>
      <View style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity: 0.05 }} />
      <View style={{ position: 'absolute', width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color, opacity: 0.1 }} />
      <View style={{ position: 'absolute', width: size * 0.6, height: size * 0.6, borderRadius: size * 0.3, backgroundColor: color, opacity: 0.15 }} />
      <View style={{ position: 'absolute', width: size * 0.4, height: size * 0.4, borderRadius: size * 0.2, backgroundColor: color, opacity: 0.2 }} />
    </View>
  );
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
        {blobColor && <InternalSoftBlob color={blobColor} />}
        
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
    // Hardcoded exact values to enforce the glass look natively
    backgroundColor: 'rgba(255, 255, 255, 0.45)', // Translucent white core
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.8)', // Light catches top-left
    borderLeftColor: 'rgba(255, 255, 255, 0.8)',
    borderRightColor: 'rgba(79, 55, 138, 0.05)', // Shadows drop bottom-right
    borderBottomColor: 'rgba(79, 55, 138, 0.05)',
    // iOS ambient shadow
    shadowColor: '#1F2687',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    // EXTREMELY CRITICAL: Set elevation to 0 to prevent Android from overriding the glass with a harsh black shadow
    elevation: 0, 
  },
  ambientBlobContainer: {
    position: 'absolute',
    right: -40,
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLayer: {
    zIndex: 10,
    height: '100%',
  },
});

export default GlassCard;