import React from 'react';
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

interface GlassHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  sticky?: boolean;
  onBack?: () => void;
  style?: StyleProp<ViewStyle>;
}

const GlassHeader: React.FC<GlassHeaderProps> = ({
  title,
  subtitle,
  actions,
  sticky = true,
  onBack,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container,
        sticky && styles.sticky,
        { paddingTop: Math.max(insets.top, 16) + 12 }, 
        style
      ]}
    >
      {/* NATIVE BLUR LAYER */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={25}
        reducedTransparencyFallbackColor="white"
      />

      <View style={styles.content}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: theme.spacing.gutter,
    paddingBottom: 16,
    // Slightly tinted background so the blur has some color to work with
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    zIndex: 40,
    overflow: 'hidden',
  },
  sticky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
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