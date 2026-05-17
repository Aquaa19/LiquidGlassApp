// src/components/glass/GlassButton.tsx
import React, { useRef } from 'react';
import { 
  StyleSheet, 
  Pressable, 
  Animated, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon, { IconSize } from '../core/Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'ghost' | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface GlassButtonProps {
  children: string; // Restricting to string for simpler Text rendering in RN
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconName?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glow?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'glass',
  size = 'md',
  iconName,
  iconPosition = 'left',
  fullWidth = false,
  glow = false,
  disabled = false,
  onPress,
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 20,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
      }).start();
    }
  };

  // Determine size-based styles
  const sizeStyle = styles[`size_${size}`];
  const iconSize: IconSize = size === 'lg' ? 'md' : (size === 'md' ? 'sm' : 'xs');
  const textVariant = size === 'sm' ? 'label-sm' : 'body-base';

  // Determine variant-based styles and colors
  const isGlass = variant === 'glass';
  const variantStyle = styles[`variant_${variant}`];
  
  let textColor = theme.colors.onSurface;
  if (variant === 'primary') textColor = theme.colors.onPrimary;
  if (variant === 'secondary') textColor = theme.colors.onSecondaryContainer;
  if (variant === 'error') textColor = theme.colors.onError;
  if (variant === 'ghost') textColor = theme.colors.primary;

  return (
    <Animated.View 
      style={[
        fullWidth && styles.fullWidthWrapper,
        { transform: [{ scale: scaleAnim }] },
        style
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={({ pressed }) => [
          styles.base,
          sizeStyle,
          variantStyle,
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          pressed && !disabled && styles.pressed,
          // Apply glow effect
          glow && variant === 'primary' && styles.glowPrimary,
          // Simulate glass active state using explicit rgba
          pressed && isGlass && !disabled && { backgroundColor: 'rgba(255, 255, 255, 0.45)' },
        ]}
      >
        {({ pressed }) => (
          <>
            {iconName && iconPosition === 'left' && (
              <Icon 
                name={iconName} 
                size={iconSize} 
                color={textColor} 
                style={styles.iconLeft} 
              />
            )}
            
            <Text 
              variant={textVariant} 
              color={textColor}
              style={[
                // Ghost button pressed state text color
                pressed && variant === 'ghost' && !disabled && { color: theme.colors.onSurface },
                textStyle
              ]}
            >
              {children}
            </Text>

            {iconName && iconPosition === 'right' && (
              <Icon 
                name={iconName} 
                size={iconSize} 
                color={textColor} 
                style={styles.iconRight} 
              />
            )}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.rounded.button, // 20px
  },
  fullWidthWrapper: {
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    // Opacity change as a fallback for variants without specific pressed states
    opacity: 0.9, 
  },
  
  // Sizes
  size_sm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  size_md: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  size_lg: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },

  // Variants
  variant_primary: {
    backgroundColor: theme.colors.primary,
    elevation: 0, // EXTREMELY CRITICAL: Prevent Android dark shadow
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  variant_secondary: {
    backgroundColor: theme.colors.secondaryContainer,
    elevation: 0, // EXTREMELY CRITICAL: Prevent Android dark shadow
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  variant_glass: {
    // Hardcoded exact values to enforce the glass look natively
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.8)', // Light catches top-left
    borderLeftColor: 'rgba(255, 255, 255, 0.8)',
    borderRightColor: 'rgba(79, 55, 138, 0.05)', // Shadows drop bottom-right
    borderBottomColor: 'rgba(79, 55, 138, 0.05)',
    elevation: 0, // CRITICAL: Prevent Android dark shadow
  },
  variant_ghost: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  variant_error: {
    backgroundColor: theme.colors.error,
    elevation: 0, // EXTREMELY CRITICAL: Prevent Android dark shadow
    shadowColor: theme.colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Effects
  glowPrimary: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 0, // Must remain 0 to avoid harsh black overlays on Android
  },

  // Spacing
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default GlassButton;