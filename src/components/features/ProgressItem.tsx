// src/components/features/ProgressItem.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export type ProgressVariant = 'primary' | 'secondary' | 'tertiary' | 'error';

export interface ProgressItemProps {
  /** Title of the assessment or milestone */
  title: string;
  /** Date of the record */
  date: string;
  /** Primary score achieved (e.g., "88%") */
  score: string | number;
  /** Average score for the cohort (e.g., "Avg: 76%") */
  avgScore: string | number;
  /** Material Symbol icon name */
  iconName: string;
  /** Color theme for the icon background and text highlights */
  variant?: ProgressVariant;
  /** Click handler */
  onPress?: () => void;
  /** Additional styling classes */
  style?: StyleProp<ViewStyle>;
}

// Config mapping to pure Theme colors
const variantConfig = {
  primary: {
    bg: `${theme.colors.primaryContainer}33`, // 20% opacity
    text: theme.colors.primary,
    sub: `${theme.colors.primary}B3`, // 70% opacity
  },
  secondary: {
    bg: `${theme.colors.secondaryContainer}33`,
    text: theme.colors.secondary,
    sub: `${theme.colors.secondary}B3`,
  },
  tertiary: {
    bg: `${theme.colors.tertiaryContainer}33`,
    text: theme.colors.tertiary,
    sub: `${theme.colors.tertiary}B3`,
  },
  error: {
    bg: `${theme.colors.errorContainer}33`,
    text: theme.colors.error,
    sub: `${theme.colors.error}B3`,
  },
};

/**
 * ProgressItem Component
 * A list-style component for displaying assessment results and milestones.
 * Implements the frosted glass aesthetic with subtle interactive transitions.
 */
const ProgressItem: React.FC<ProgressItemProps> = ({
  title,
  date,
  score,
  avgScore,
  iconName,
  variant = 'primary',
  onPress,
  style,
}) => {
  const config = variantConfig[variant];
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed
        ]}
      >
        {/* Left Section: Icon & Info */}
        <View style={styles.leftSection}>
          <View style={[styles.iconWrapper, { backgroundColor: config.bg }]}>
            <Icon name={iconName} size="sm" color={config.text} />
          </View>
          
          <View style={styles.infoContainer}>
            <Text variant="body-base" color={theme.colors.onSurface} style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
            <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.dateText}>
              {date}
            </Text>
          </View>
        </View>

        {/* Right Section: Scores & Actions */}
        <View style={styles.rightSection}>
          <View style={styles.scoreContainer}>
            <Text variant="body-base" color={theme.colors.onSurface} style={styles.scoreText}>
              {score.toString()}
            </Text>
            <Text variant="label-sm" color={config.sub} style={styles.avgText}>
              Avg: {avgScore.toString()}
            </Text>
          </View>
          
          <Icon name="chevron_right" size="sm" color={theme.colors.onSurfaceVariant} style={styles.chevronIcon} />
        </View>

        {/* Internal Gloss Highlight Simulation */}
        <View style={styles.internalGloss} pointerEvents="none" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: `${theme.colors.surfaceContainerLowest}80`, // 50% opacity
    borderRadius: theme.rounded.md, // 12px
    borderWidth: 1,
    borderColor: 'rgba(203, 196, 210, 0.4)', // outline-variant/40
    ...theme.elevation.ambientNeutral, // shadow-sm
  },
  containerPressed: {
    backgroundColor: theme.colors.surfaceContainerLowest,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    zIndex: 10,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600', // font-semibold
  },
  dateText: {
    fontWeight: '400', // Override label-sm bold
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // Reduced from 24 (gap-6) for better mobile fit
    zIndex: 10,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 18, // Override body-base to match text-lg
    fontWeight: '700', // font-bold
  },
  avgText: {
    fontSize: 11,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  chevronIcon: {
    opacity: 0.7,
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.glass.fillLow, // Simulates the from-white/5 to-transparent gradient
    zIndex: 0,
  },
});

export default ProgressItem;