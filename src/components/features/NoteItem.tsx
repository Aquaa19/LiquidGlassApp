// src/components/features/NoteItem.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';

export interface NoteItemProps {
  /** Title of the note (e.g., student name or subject) */
  title: string;
  /** Formatted date string (e.g., "Oct 24, 2026") */
  date: string;
  /** Main body text of the note */
  content: string;
  /** Array of tag labels (e.g., ["Math", "Needs Review"]) */
  tags?: string[];
  /** Click handler for when the note is selected */
  onPress?: () => void;
  /** Additional styling classes */
  style?: StyleProp<ViewStyle>;
}

/**
 * NoteItem Component
 * A "Liquid Glass" card designed for student observations and tutoring session logs.
 * Includes interactive press states and automatic content truncation.
 */
const NoteItem: React.FC<NoteItemProps> = ({
  title,
  date,
  content,
  tags = [],
  onPress,
  style,
}) => {
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
        {/* Header: Title and Date */}
        <View style={styles.header}>
          <Text 
            variant="headline-md" 
            color={theme.colors.onSurface} 
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text 
            variant="label-sm" 
            color={theme.colors.onSurfaceVariant} 
            style={styles.dateText}
            numberOfLines={1}
          >
            {date}
          </Text>
        </View>

        {/* Content Preview: Clamped to 2 lines */}
        <Text 
          variant="body-base" 
          color={theme.colors.onSurfaceVariant} 
          style={styles.contentText}
          numberOfLines={2}
        >
          {content}
        </Text>

        {/* Footer: Tags List */}
        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <View key={`${tag}-${index}`} style={styles.tagBadge}>
                <Text 
                  variant="label-sm" 
                  color={theme.colors.primary} 
                  style={styles.tagText}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Surface Depth Effects */}
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
    backgroundColor: theme.colors.glass.fillMedium, // bg-white/15
    borderRadius: theme.rounded.md, // rounded-xl (12px)
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopColor: theme.colors.glass.borderTopLeft,
    borderLeftColor: theme.colors.glass.borderTopLeft,
    borderBottomColor: `${theme.colors.primary}1A`, // border-primary/10
    borderRightColor: `${theme.colors.primary}1A`,
    ...theme.elevation.ambientNeutral, // shadow-[0_4px_30px_rgba(0,0,0,0.05)]
  },
  containerPressed: {
    backgroundColor: theme.colors.glass.fillHigh, // hover:bg-white/25 equivalent
    ...theme.elevation.ambientGlow,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    zIndex: 10,
  },
  title: {
    flex: 1,
    fontSize: 16, // Matching standard text-base
    lineHeight: 22,
  },
  dateText: {
    marginLeft: 16,
    marginTop: 2,
    opacity: 0.6,
  },
  contentText: {
    fontSize: 14, // text-sm
    opacity: 0.8,
    lineHeight: 22, // leading-relaxed
    zIndex: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    zIndex: 10,
  },
  tagBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.rounded.full,
    backgroundColor: `${theme.colors.secondaryContainer}4D`, // bg-secondary-container/30
    borderWidth: 1,
    borderColor: `${theme.colors.primary}0D`, // border-primary/5
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.glass.fillLow, // bg-gradient-to-br from-white/15 to-transparent simulation
    zIndex: 1,
  },
});

export default NoteItem;