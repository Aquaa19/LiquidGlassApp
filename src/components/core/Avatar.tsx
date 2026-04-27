// src/components/core/Avatar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { theme } from '../../theme/theme';
import Text from './Text'; // Utilizing the fixed Text component from Step 1

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Accessibility label */
  alt?: string;
  /** Fallback initials (e.g., "JD") */
  initials?: string;
  /** Size of the avatar: sm (40px), md (48px), lg (64px), xl (128px) */
  size?: AvatarSize;
  /** Whether to show a pulse animation (e.g., for active sessions) */
  isActive?: boolean;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 40,
  md: 48,
  lg: 64,
  xl: 128,
};

/**
 * Core Avatar Component
 * Renders a circular profile image with specific Liquid Glass borders or initials fallback.
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User profile',
  initials,
  size = 'md',
  isActive = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0)).current;
  
  const dimension = sizeMap[size];
  const textVariant = size === 'sm' ? 'label-sm' : (size === 'xl' ? 'display-xl' : 'headline-md');

  // Handle Active Pulse Animation
  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(0);
    }
  }, [isActive, pulseAnim]);

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });

  return (
    <View style={[styles.wrapper, { width: dimension, height: dimension }]}>
      {/* Active Pulse Effect */}
      {isActive && (
        <Animated.View
          style={[
            styles.pulseBackground,
            {
              transform: [{ scale: pulseScale }],
              opacity: pulseOpacity,
            },
          ]}
          pointerEvents="none"
        />
      )}
      
      {/* Main Avatar Container */}
      <View style={[styles.container, { borderRadius: dimension / 2 }]}>
        {src && !imageError ? (
          <Image
            source={{ uri: src }}
            accessibilityLabel={alt}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.fallbackContainer}>
            {initials ? (
              <Text variant={textVariant} color={theme.colors.primary}>
                {initials}
              </Text>
            ) : (
              // Temporary fallback until Icon component is built
              <Text variant={textVariant} color={theme.colors.outline}>
                👤
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: theme.colors.surfaceContainerLowest,
    ...theme.elevation.ambientNeutral, // Liquid glass subtle shadow
  },
  pulseBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.primary,
    borderRadius: 9999,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: `${theme.colors.primary}1A`, // Primary color at 10% opacity
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Avatar;