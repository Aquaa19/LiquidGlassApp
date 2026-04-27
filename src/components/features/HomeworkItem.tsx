// src/components/features/HomeworkItem.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export type HomeworkStatus = 'pending' | 'done';
export type HomeworkVariant = 'primary' | 'secondary' | 'tertiary';

export interface HomeworkItemProps {
  /** The name of the assignment */
  title: string;
  /** The student assigned to the homework */
  studentName: string;
  /** Current completion status */
  status: HomeworkStatus;
  /** Formatted due date or completion date */
  dateText: string;
  /** Material Symbol icon name (e.g., 'functions', 'science') */
  iconName: string;
  /** Color theme for the icon background */
  variant?: HomeworkVariant;
  /** Click handler */
  onPress?: () => void;
  /** Additional styling classes */
  style?: StyleProp<ViewStyle>;
}

const getVariantConfig = (variant: HomeworkVariant) => {
  switch (variant) {
    case 'primary':
      return { bg: `${theme.colors.primary}1A`, text: theme.colors.primary }; // 10% opacity
    case 'secondary':
      return { bg: `${theme.colors.secondary}1A`, text: theme.colors.secondary };
    case 'tertiary':
      return { bg: `${theme.colors.tertiaryContainer}33`, text: theme.colors.tertiaryFixedDim }; // 20% opacity
    default:
      return { bg: `${theme.colors.primary}1A`, text: theme.colors.primary };
  }
};

/**
 * HomeworkItem Component
 * A task-style card that implements the "Liquid Glass" aesthetic.
 * Supports "Done" states with strikethrough text and "Pending" states with swipe hints.
 */
const HomeworkItem: React.FC<HomeworkItemProps> = ({
  title,
  studentName,
  status,
  dateText,
  iconName,
  variant = 'primary',
  onPress,
  style,
}) => {
  const isDone = status === 'done';
  const vConfig = getVariantConfig(variant);
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

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.container,
          isDone && styles.containerDone,
          pressed && !isDone && styles.containerPressed
        ]}
      >
        {/* Top Edge Gloss Highlight */}
        <View style={styles.topEdgeGloss} pointerEvents="none" />
        
        {/* Subtle Bottom Right Accent */}
        <View style={styles.bottomAccent} pointerEvents="none" />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconWrapper, { backgroundColor: vConfig.bg }]}>
              <Icon name={iconName} size="md" color={vConfig.text} />
            </View>
            <View style={styles.titleContainer}>
              <Text 
                variant="headline-md" 
                color={theme.colors.onSurface} 
                style={[
                  styles.title, 
                  isDone && styles.textDone
                ]}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text 
                variant="label-sm" 
                color={theme.colors.onSurfaceVariant} 
                style={[
                  styles.studentName,
                  isDone && { opacity: 0.5 }
                ]}
                numberOfLines={1}
              >
                {studentName}
              </Text>
            </View>
          </View>

          {/* Status Badge */}
          <View 
            style={[
              styles.badge, 
              isDone ? styles.badgeDone : styles.badgePending
            ]}
          >
            <Text 
              variant="label-sm" 
              color={isDone ? theme.colors.primary : theme.colors.tertiaryFixedDim}
              style={styles.badgeText}
            >
              {isDone ? 'Done' : 'Pending'}
            </Text>
          </View>
        </View>

        {/* Bottom Meta Section */}
        <View style={styles.metaSection}>
          <View style={[styles.dateContainer, isDone && { opacity: 0.7 }]}>
            <Icon 
              name={isDone ? 'check_circle' : 'event'} 
              size={18} 
              color={theme.colors.onSurfaceVariant} 
            />
            <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.dateText}>
              {isDone ? `Completed: ${dateText}` : `Due: ${dateText}`}
            </Text>
          </View>

          {/* Mobile Swipe Action Hint (Static for mobile discoverability) */}
          {!isDone && (
            <View style={styles.swipeHintContainer}>
              <Text variant="label-sm" color={theme.colors.primary} style={styles.swipeHintText}>
                Swipe
              </Text>
              <Icon name="swipe" size={14} color={theme.colors.primary} style={{ opacity: 0.6 }} />
            </View>
          )}
        </View>

        {/* Internal Gloss bloom */}
        <View style={styles.internalGloss} pointerEvents="none" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    padding: 20,
    backgroundColor: `${theme.colors.surfaceContainerLow}99`, // 60% opacity
    borderRadius: theme.rounded.md, // 12px
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)', // Slightly reduced from 0.5 for mobile rendering
    ...theme.elevation.ambientNeutral, // shadow-[0_4px_24px_rgba(0,0,0,0.03)]
  },
  containerDone: {
    opacity: 0.9,
  },
  containerPressed: {
    backgroundColor: `${theme.colors.surfaceContainerLowest}99`, // Equivalent to hover:bg-white/30
    ...theme.elevation.ambientGlow,
  },
  topEdgeGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    zIndex: 2,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 2, // Slightly thicker than 1px for visibility on high-DPI screens
    height: '100%',
    backgroundColor: `${theme.colors.primary}1A`, // primary/10
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16, // Override headline-md default to match text-base
    lineHeight: 22,
  },
  textDone: {
    opacity: 0.6,
    textDecorationLine: 'line-through',
  },
  studentName: {
    fontWeight: '400',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDone: {
    backgroundColor: `${theme.colors.primaryContainer}33`, // 20% opacity
  },
  badgePending: {
    backgroundColor: `${theme.colors.tertiaryContainer}33`,
  },
  badgeText: {
    fontSize: 12,
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
  },
  swipeHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  swipeHintText: {
    opacity: 0.6,
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.glass.fillLow, // from-white/5 to-transparent
    zIndex: 1,
  },
});

export default HomeworkItem;