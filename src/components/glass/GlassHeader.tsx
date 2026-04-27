// src/components/glass/GlassHeader.tsx
import React from 'react';
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

interface GlassHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Right-side actions (e.g., buttons, avatars) */
  actions?: React.ReactNode;
  /** Whether the header should be fixed at the top of the screen */
  sticky?: boolean;
  /** Whether to show the back button */
  onBack?: () => void;
  /** Additional React Native styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * GlassHeader Component
 * A layout component for page headers that uses the frosted glass effect.
 * It handles the standard "Title + Subtitle + Actions" pattern found in the app.
 */
const GlassHeader: React.FC<GlassHeaderProps> = ({
  title,
  subtitle,
  actions,
  sticky = true,
  onBack,
  style,
}) => {
  return (
    <View 
      style={[
        styles.container,
        sticky && styles.sticky,
        style
      ]}
    >
      <View style={styles.leftSection}>
        {onBack && (
          <Pressable 
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed
            ]}
          >
            <Icon name="arrow_back" size="md" color={theme.colors.onSurface} />
          </Pressable>
        )}
        
        <View style={styles.titleContainer}>
          <Text variant="headline-md" color={theme.colors.onSurface}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {actions && (
        <View style={styles.actionsContainer}>
          {actions}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: theme.spacing.gutter,
    paddingVertical: 16,
    backgroundColor: theme.colors.glass.fillMedium, // Simulates backdrop-blur-xl
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.glass.borderBottomRight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 40,
  },
  sticky: {
    // In React Native, absolute positioning mimics web's sticky top-0.
    // Ensure parent container handles SafeArea padding to avoid notch overlap.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.glass.fillLow,
  },
  backButtonPressed: {
    backgroundColor: theme.colors.glass.fillHigh,
  },
  titleContainer: {
    justifyContent: 'center',
    gap: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default GlassHeader;