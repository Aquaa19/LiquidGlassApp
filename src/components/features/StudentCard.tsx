// src/components/features/StudentCard.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Image, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export type StudentStatus = 'paid' | 'pending' | 'partial';

export interface StudentCardProps {
  name: string;
  grade: string;
  subject: string;
  avatarUrl?: string;
  initials?: string;
  nextSession: string;
  status: StudentStatus;
  onMoreClick?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

// Config mapping to pure Theme colors instead of Tailwind classes
const statusConfig = {
  paid: {
    label: 'Paid',
    accentColor: theme.colors.secondary, // Fallback for 'from-primary to-secondary' gradient
    badgeBg: `${theme.colors.secondaryContainer}80`, // 50% opacity
    badgeBorder: `${theme.colors.secondary}33`, // 20% opacity
    badgeText: theme.colors.onSecondaryContainer,
    dot: theme.colors.secondary,
  },
  pending: {
    label: 'Pending',
    accentColor: theme.colors.error,
    badgeBg: `${theme.colors.errorContainer}80`,
    badgeBorder: `${theme.colors.error}33`,
    badgeText: theme.colors.onErrorContainer,
    dot: theme.colors.error,
  },
  partial: {
    label: 'Partial',
    accentColor: theme.colors.tertiary,
    badgeBg: `${theme.colors.tertiaryContainer}4D`, // 30% opacity
    badgeBorder: `${theme.colors.tertiary}33`,
    badgeText: theme.colors.onTertiaryContainer,
    dot: theme.colors.tertiary,
  },
};

/**
 * StudentCard Component
 * Displays student summary info with Liquid Glass styling and status indicators.
 */
const StudentCard: React.FC<StudentCardProps> = ({
  name,
  grade,
  subject,
  avatarUrl,
  initials,
  nextSession,
  status,
  onMoreClick,
  onPress,
  style,
}) => {
  const config = statusConfig[status];
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
        style={styles.container}
      >
        {/* Status Accent Bar (Native Fallback for Gradient) */}
        <View style={[styles.accentBar, { backgroundColor: config.accentColor }]} />

        <View style={styles.content}>
          {/* Top Section: Profile & Actions */}
          <View style={styles.topSection}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarWrapper}>
                {avatarUrl ? (
                  <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
                ) : (
                  <Text variant="headline-md" color={theme.colors.primary} style={styles.initialsText}>
                    {initials || name.charAt(0).toUpperCase()}
                  </Text>
                )}
              </View>
              
              <View style={styles.textContainer}>
                <Text variant="headline-md" color={theme.colors.onSurface} numberOfLines={1}>
                  {name}
                </Text>
                <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.subtitle} numberOfLines={1}>
                  {grade} • {subject}
                </Text>
              </View>
            </View>

            {onMoreClick && (
              <Pressable 
                onPress={onMoreClick}
                hitSlop={12}
                style={({ pressed }) => [styles.moreButton, pressed && { opacity: 0.5 }]}
              >
                <Icon name="more_vert" size="sm" color={theme.colors.outline} />
              </Pressable>
            )}
          </View>

          {/* Bottom Section: Next Session & Status Badge */}
          <View style={styles.bottomSection}>
            <View style={styles.nextSessionContainer}>
              <Icon name="calendar_today" size="xs" color={theme.colors.onSurfaceVariant} style={styles.calendarIcon} />
              <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>
                Next: {nextSession}
              </Text>
            </View>

            <View 
              style={[
                styles.badge, 
                { backgroundColor: config.badgeBg, borderColor: config.badgeBorder }
              ]}
            >
              <View style={[styles.badgeDot, { backgroundColor: config.dot }]} />
              <Text variant="label-sm" color={config.badgeText} style={styles.badgeText}>
                {config.label}
              </Text>
            </View>
          </View>
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
    backgroundColor: theme.colors.glass.fillMedium, // Simulates backdrop-blur-2xl bg-white/15
    borderRadius: theme.rounded.card, // 26px
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: theme.colors.glass.borderTopLeft,
    borderLeftColor: theme.colors.glass.borderTopLeft,
    ...theme.elevation.ambientNeutral,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    zIndex: 2,
  },
  content: {
    padding: 24,
    paddingLeft: 32, // Accommodate the accent bar
    gap: 16,
    zIndex: 10,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1, // Allow text truncation
    marginRight: 16,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: `${theme.colors.primary}1A`, // 10% opacity
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  initialsText: {
    textTransform: 'uppercase',
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14, // Slightly smaller than default body-base for dense UI
  },
  moreButton: {
    padding: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 224, 233, 0.3)', // theme.colors.surfaceVariant at 30%
  },
  nextSessionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  calendarIcon: {
    marginTop: -2, // Visual alignment fix
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.rounded.full,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.glass.fillLow, // Simulates the inner gradient gloss
    zIndex: 1,
  },
});

export default StudentCard;