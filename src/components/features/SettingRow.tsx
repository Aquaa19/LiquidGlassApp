// src/components/features/SettingRow.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export interface SettingRowProps {
  /** The primary label for the setting */
  label: string;
  /** Optional secondary text or current value */
  value?: string;
  /** Material Symbol icon name for the left side */
  iconName?: string;
  /** Click handler for the row */
  onPress?: () => void;
  /** Whether to show the chevron icon on the right */
  showChevron?: boolean;
  /** Additional React Native styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * SettingRow Component
 * A high-fidelity interactive row for settings menus.
 * Implements the frosted glass aesthetic with subtle internal depth highlights.
 */
const SettingRow: React.FC<SettingRowProps> = ({
  label,
  value,
  iconName,
  onPress,
  showChevron = true,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98, // Slightly deeper than 0.99 for better mobile feel
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
        <View style={styles.contentWrapper}>
          {/* Left Section: Icon and Text */}
          <View style={styles.leftSection}>
            {iconName && (
              <View style={styles.iconWrapper}>
                <Icon name={iconName} size="md" color={theme.colors.primary} />
              </View>
            )}
            
            <View style={styles.textContainer}>
              <Text variant="body-base" color={theme.colors.onSurface} numberOfLines={1}>
                {label}
              </Text>
              {value && (
                <Text 
                  variant="label-sm" 
                  color={theme.colors.onSurfaceVariant} 
                  style={styles.valueText}
                  numberOfLines={1}
                >
                  {value}
                </Text>
              )}
            </View>
          </View>

          {/* Right Section: Chevron */}
          {showChevron && (
            <Icon 
              name="chevron_right" 
              size="md" 
              color={theme.colors.outline} 
              style={styles.chevronIcon}
            />
          )}
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
    backgroundColor: `${theme.colors.surfaceContainerLowest}4D`, // 30% opacity
    borderRadius: theme.rounded.lg, // 16px (rounded-xl)
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.6)',
    borderLeftColor: 'rgba(255, 255, 255, 0.6)',
    borderRightColor: `${theme.colors.primary}1A`, // primary/10
    borderBottomColor: `${theme.colors.primary}1A`, // primary/10
    ...theme.elevation.ambientNeutral, // shadow-[0_4px_24px_0_rgba(0,0,0,0.02)]
  },
  containerPressed: {
    backgroundColor: `${theme.colors.surfaceContainerLowest}80`, // hover:bg-surface-container-lowest/50
    ...theme.elevation.ambientGlow, // hover:shadow-[0_8px_32px_0_rgba(79,55,138,0.08)]
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.gutter, // 24px
    zIndex: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    paddingRight: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${theme.colors.primary}0D`, // primary/5
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  valueText: {
    opacity: 0.7,
    marginTop: 2,
  },
  chevronIcon: {
    opacity: 0.8,
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // bg-gradient-to-br from-white/10 simulation
    zIndex: 1,
  },
});

export default SettingRow;