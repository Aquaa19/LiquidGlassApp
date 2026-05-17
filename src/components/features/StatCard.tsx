// src/components/features/StatCard.tsx
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export interface StatCardProps {
  /** The descriptive title for the statistic */
  label: string;
  /** The primary value to display (e.g., "42" or "85%") */
  value: string | number;
  /** Material Symbol icon name (e.g., 'groups', 'payments') */
  icon: string;
  /** Optional secondary trend or info text (e.g., "+3 this week") */
  secondaryValue?: string;
  /** Color theme for the accents and decorative elements */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error';
  /** Optional decorative background blob color (hex string) */
  blobColor?: string;
  /** Position of the decorative blob: 'top-right' | 'bottom-left' */
  blobPosition?: 'top-right' | 'bottom-left';
  /** Visual representation style */
  chartType?: 'none' | 'circular';
  /** Percentage (0-100) for circular progress; only used if chartType is 'circular' */
  progress?: number;
  /** Additional styling classes */
  style?: StyleProp<ViewStyle>;
}

const getVariantColor = (variant: StatCardProps['variant']): string => {
  switch (variant) {
    case 'primary': return theme.colors.primary;
    case 'secondary': return theme.colors.secondary;
    case 'tertiary': return theme.colors.tertiary;
    case 'error': return theme.colors.error;
    default: return theme.colors.primary;
  }
};

/**
 * Helper to simulate a diffused orb inside the card for the blobColor property
 */
const InternalSoftBlob = ({ color, position }: { color: string, position: 'top-right' | 'bottom-left' }) => {
  const size = 160;
  const posStyle = position === 'top-right' ? { right: -40, top: -40 } : { left: -40, bottom: -40 };
  
  return (
    <View style={[styles.ambientBlobContainer, posStyle, { width: size, height: size }]} pointerEvents="none">
      <View style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity: 0.05 }} />
      <View style={{ position: 'absolute', width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color, opacity: 0.1 }} />
      <View style={{ position: 'absolute', width: size * 0.6, height: size * 0.6, borderRadius: size * 0.3, backgroundColor: color, opacity: 0.15 }} />
      <View style={{ position: 'absolute', width: size * 0.4, height: size * 0.4, borderRadius: size * 0.2, backgroundColor: color, opacity: 0.2 }} />
    </View>
  );
};

/**
 * StatCard Component
 * A "Bento" style metric card that implements the frosted glass aesthetic.
 * Handles different dashboard card layouts natively.
 */
const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  secondaryValue,
  variant = 'primary',
  blobColor,
  blobPosition = 'top-right',
  chartType = 'none',
  progress = 0, // Value preserved for future logic, UI fallback used
  style,
}) => {
  const isCircular = chartType === 'circular';
  const variantColor = getVariantColor(variant);

  return (
    <View style={[styles.container, style]}>
      {/* Decorative Atmospheric Blob (Diffused Glow) */}
      {blobColor && (
        <InternalSoftBlob color={blobColor} position={blobPosition} />
      )}

      {/* Internal Gloss Highlight Simulation */}
      <View style={styles.internalGloss} pointerEvents="none" />

      {/* Header Area */}
      <View style={[styles.header, isCircular && styles.headerCircular]}>
        <View style={styles.labelContainer}>
          {!isCircular && (
            <Icon name={icon} size="sm" color={variantColor} />
          )}
          <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>
            {label}
          </Text>
        </View>

        {isCircular && (
          <Icon name={icon} size="sm" color={variantColor} />
        )}
      </View>

      {/* Metric Content */}
      {isCircular ? (
        <View style={styles.circularContainer}>
          {/* Native Fallback for Circular Progress (No SVG). 
            Renders a thick circular border with the variant color.
          */}
          <View style={[styles.nativeCircleProgress, { borderColor: `${variantColor}40` }]}>
            <View 
              style={[
                styles.nativeCircleProgressInner, 
                { borderTopColor: variantColor, borderRightColor: variantColor }
              ]} 
            />
            <View style={styles.circularValueContainer}>
              <Text variant="headline-md" color={theme.colors.onSurface}>
                {value.toString()}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.metricContainer}>
          <Text variant="display-xl" color={theme.colors.onSurface}>
            {value.toString()}
          </Text>
          {secondaryValue && (
            <Text 
              variant="body-base" 
              color={variant === 'error' ? theme.colors.error : theme.colors.surfaceTint}
              style={styles.secondaryValue}
            >
              {secondaryValue}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    padding: 32,
    minHeight: 200,
    justifyContent: 'space-between',
    // Hardcoded exact values to enforce the glass look natively
    backgroundColor: 'rgba(255, 255, 255, 0.45)', // Translucent white core
    borderRadius: theme.rounded.card, // 26px
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.8)', // Light catches top-left
    borderLeftColor: 'rgba(255, 255, 255, 0.8)',
    borderRightColor: 'rgba(79, 55, 138, 0.05)', // Shadows drop bottom-right
    borderBottomColor: 'rgba(79, 55, 138, 0.05)',
    elevation: 0, // EXTREMELY CRITICAL: Prevent Android dark shadow
  },
  ambientBlobContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Simulates the from-white/10 to-transparent gradient
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    zIndex: 10,
  },
  headerCircular: {
    position: 'absolute',
    top: 32,
    left: 32,
    right: 32,
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metricContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // Aligns the large text with the secondary text
    marginTop: 'auto',
    zIndex: 10,
  },
  secondaryValue: {
    marginLeft: 8,
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    zIndex: 10,
  },
  nativeCircleProgress: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nativeCircleProgressInner: {
    ...StyleSheet.absoluteFill,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: 'transparent',
    transform: [{ rotate: '-45deg' }], // Simulates partial progress visually
  },
  circularValueContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StatCard;