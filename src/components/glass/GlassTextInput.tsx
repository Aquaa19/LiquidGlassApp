// src/components/glass/GlassTextInput.tsx
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Pressable, 
  TextInputProps, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export interface GlassTextInputProps extends TextInputProps {
  /** Optional label text displayed above the input */
  label?: string;
  /** Material Symbol name for the left side (e.g., 'search') */
  leftIcon?: string;
  /** Material Symbol name for the right side (e.g., 'visibility') */
  rightIcon?: string;
  /** Click handler for the right icon */
  onRightIconClick?: () => void;
  /** Error message text */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Whether the input should take up full width */
  fullWidth?: boolean;
  /** Additional container styles */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * GlassTextInput Component
 * A specialized input field implementing the "Liquid Glass" aesthetic with 
 * simulated backdrop blur, internal highlights, and status-aware focus states.
 */
const GlassTextInput: React.FC<GlassTextInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  onRightIconClick,
  error,
  helperText,
  fullWidth = true,
  containerStyle,
  onFocus,
  onBlur,
  editable = true,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const hasError = !!error;
  const isDisabled = editable === false;

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth, containerStyle]}>
      {/* Label */}
      {label && (
        <Text 
          variant="label-sm" 
          color={theme.colors.onSurfaceVariant} 
          style={styles.label}
        >
          {label}
        </Text>
      )}

      {/* Input Wrapper */}
      <View 
        style={[
          styles.wrapper,
          isFocused && styles.wrapperFocused,
          hasError && styles.wrapperError,
          isDisabled && styles.wrapperDisabled,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <Icon 
            name={leftIcon} 
            size="sm" 
            color={hasError ? theme.colors.error : theme.colors.outline} 
            style={styles.leftIcon} 
          />
        )}

        {/* Text Input */}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={`${theme.colors.outline}99`} // ~60% opacity
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <Pressable 
            onPress={onRightIconClick} 
            disabled={!onRightIconClick || isDisabled}
            style={({ pressed }) => [
              styles.rightIconPressable,
              pressed && { opacity: 0.7 }
            ]}
          >
            <Icon 
              name={rightIcon} 
              size="sm" 
              color={
                hasError ? theme.colors.error : 
                isFocused ? theme.colors.primary : 
                theme.colors.outline
              } 
            />
          </Pressable>
        )}
      </View>

      {/* Footer Text (Error or Helper) */}
      {(error || helperText) && (
        <View style={styles.footer}>
          {error ? (
            <Text variant="label-sm" color={theme.colors.error} style={styles.footerText}>
              {error}
            </Text>
          ) : (
            <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.helperText}>
              {helperText}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    marginLeft: 16,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.rounded.input, // 20px
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.glass.fillLow,
    borderWidth: 1,
    borderColor: 'rgba(203, 196, 210, 0.3)', // theme.colors.outlineVariant at 30%
  },
  wrapperFocused: {
    borderColor: 'rgba(79, 55, 138, 0.5)', // theme.colors.primary at 50%
    backgroundColor: theme.colors.glass.fillMedium,
    ...theme.elevation.ambientGlow, // Simulate the outer focus glow
  },
  wrapperError: {
    borderColor: 'rgba(186, 26, 26, 0.5)', // theme.colors.error at 50%
    backgroundColor: 'rgba(186, 26, 26, 0.05)', // theme.colors.error at 5%
  },
  wrapperDisabled: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIconPressable: {
    marginLeft: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    fontFamily: theme.typography.bodyBase.fontFamily as string,
    fontSize: theme.typography.bodyBase.fontSize,
    color: theme.colors.onSurface,
  },
  footer: {
    marginLeft: 16,
  },
  footerText: {
    fontSize: 11, // Overriding label-sm 13px to match design spec
    lineHeight: 14,
  },
  helperText: {
    fontSize: 11,
    lineHeight: 14,
    opacity: 0.7,
  },
});

export default GlassTextInput;