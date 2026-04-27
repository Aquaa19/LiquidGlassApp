// src/components/core/ScreenWrapper.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

interface ScreenWrapperProps {
  children: React.ReactNode;
  /** Whether to show the decorative background blobs/gradients */
  atmospheric?: boolean;
  /** Whether to add standard bottom padding for the mobile navigation bar */
  hasBottomNav?: boolean;
}

/**
 * Core ScreenWrapper Component
 * Handles the base layout, background atmospheric elements, and safe area padding.
 */
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  atmospheric = true,
  hasBottomNav = true,
}) => {
  return (
    <View style={styles.container}>
      {/* Ambient Background Elements (Atmos) */}
      {atmospheric && (
        <View style={styles.ambientContainer} pointerEvents="none">
          {/* Top-Left Blob */}
          <View style={[styles.blob, styles.topLeftBlob]} />
          
          {/* Middle-Right Blob */}
          <View style={[styles.blob, styles.middleRightBlob]} />
          
          {/* Bottom-Center Gradient Orb */}
          <View style={[styles.blob, styles.bottomCenterBlob]} />
        </View>
      )}

      {/* Main Content Layer */}
      <View style={[
        styles.contentLayer,
        hasBottomNav && styles.bottomNavPadding
      ]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  ambientContainer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    zIndex: 0,
  },
  // In React Native, achieving severe blur without heavy external libraries is difficult.
  // We simulate the "glowing blob" effect using large dimensions, absolute positioning, 
  // and specific opacities derived from the design system's fixed/dim colors.
  blob: {
    position: 'absolute',
    borderRadius: 9999, // Perfect circle
  },
  topLeftBlob: {
    top: -100,
    left: -100,
    width: 500,
    height: 500,
    backgroundColor: theme.colors.primaryFixed,
    opacity: 0.6,
  },
  middleRightBlob: {
    top: height * 0.2, // 20% down
    right: -50,
    width: 400,
    height: 400,
    backgroundColor: theme.colors.secondaryFixed,
    opacity: 0.6,
  },
  bottomCenterBlob: {
    bottom: -200,
    left: width * 0.2, // 20% across
    width: 600,
    height: 600,
    backgroundColor: theme.colors.tertiaryFixed,
    opacity: 0.4,
  },
  contentLayer: {
    flex: 1,
    zIndex: 10,
  },
  bottomNavPadding: {
    paddingBottom: 96, // roughly equivalent to pb-24 in tailwind
  },
});

export default ScreenWrapper;