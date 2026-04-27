// src/components/features/CalendarEventItem.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Image, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export type EventVariant = 'primary' | 'secondary' | 'tertiary' | 'blue';

export interface CalendarEventItemProps {
  /** Time range (e.g., "09:00 AM - 10:30 AM") */
  timeRange: string;
  /** Subject or session title */
  title: string;
  /** Name of the student */
  studentName: string;
  /** URL for student avatar */
  studentAvatar?: string;
  /** Fallback initials */
  initials?: string;
  /** Location or platform (e.g., "Online", "Room 4B") */
  location: string;
  /** Whether the session is conducted online */
  isOnline?: boolean;
  /** Color theme for the left accent bar and highlights */
  variant?: EventVariant;
  /** Click handler */
  onPress?: () => void;
  /** Additional styling classes */
  style?: StyleProp<ViewStyle>;
}

const getVariantColor = (variant: EventVariant): string => {
  switch (variant) {
    case 'primary': return theme.colors.primary;
    case 'secondary': return theme.colors.secondary;
    case 'tertiary': return theme.colors.tertiary;
    case 'blue': return '#60a5fa'; // Tailwind blue-400 mapped for this specific variant
    default: return theme.colors.primary;
  }
};

/**
 * CalendarEventItem Component
 * A "Liquid Glass" timeline card used to display scheduled tutoring sessions.
 * Implements the frosted glass effect with a subject-specific accent border.
 */
const CalendarEventItem: React.FC<CalendarEventItemProps> = ({
  timeRange,
  title,
  studentName,
  studentAvatar,
  initials,
  location,
  isOnline = false,
  variant = 'primary',
  onPress,
  style,
}) => {
  const accentColor = getVariantColor(variant);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
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

  const locationBg = isOnline 
    ? `${theme.colors.secondaryContainer}80` // 50% opacity
    : `${theme.colors.tertiaryContainer}4D`; // 30% opacity
    
  const locationTextColor = isOnline 
    ? theme.colors.onSecondaryContainer 
    : theme.colors.onTertiaryContainer;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.container,
          { borderLeftColor: accentColor },
          pressed && styles.containerPressed
        ]}
      >
        {/* Top Section: Time & Tag */}
        <View style={styles.topSection}>
          <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.timeText}>
            {timeRange}
          </Text>
          
          <View style={[styles.locationTag, { backgroundColor: locationBg }]}>
            <Text variant="label-sm" color={locationTextColor} style={styles.locationText}>
              {location}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text variant="body-base" color={theme.colors.onSurface} style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Student Meta */}
        <View style={styles.studentMeta}>
          <View style={styles.avatarWrapper}>
            {studentAvatar ? (
              <Image source={{ uri: studentAvatar }} style={styles.avatarImage} />
            ) : (
              <Text variant="label-sm" color={theme.colors.primary} style={styles.initialsText}>
                {initials || studentName.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.studentName} numberOfLines={1}>
            {studentName}
          </Text>
        </View>

        {/* Internal Gloss Highlight */}
        <View style={styles.internalGloss} pointerEvents="none" />
        
        {/* Interaction Hint (Chevron - Static for Mobile Discoverability) */}
        <View style={styles.chevronWrapper} pointerEvents="none">
          <Icon name="chevron_right" size={16} color={theme.colors.primary} style={styles.chevronIcon} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row', // Main layout wrapper
    flexWrap: 'wrap',
    padding: 16,
    gap: 4,
    backgroundColor: theme.colors.glass.fillLow, // bg-white/10
    borderRadius: theme.rounded.default, // 8px (rounded-lg)
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 4, // Accent border
    borderTopColor: theme.colors.glass.borderTopLeft,
    borderRightColor: theme.colors.glass.borderBottomRight,
    borderBottomColor: theme.colors.glass.borderBottomRight,
    ...theme.elevation.ambientNeutral, // shadow-[0_4px_16px_rgba(0,0,0,0.02)]
  },
  containerPressed: {
    backgroundColor: theme.colors.glass.fillMedium, // Equivalent to hover:bg-white/20
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    zIndex: 10,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  locationTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.rounded.full,
  },
  locationText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: '600',
    zIndex: 10,
  },
  studentMeta: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    zIndex: 10,
  },
  avatarWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: `${theme.colors.primary}1A`, // primary/10
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  initialsText: {
    fontSize: 10,
  },
  studentName: {
    fontSize: 14,
    opacity: 0.8,
    flex: 1,
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.03)', // Subtle gradient highlight simulation
    zIndex: 1,
  },
  chevronWrapper: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    zIndex: 10,
  },
  chevronIcon: {
    opacity: 0.4, // Static opacity replacing group-hover visibility
  },
});

export default CalendarEventItem;