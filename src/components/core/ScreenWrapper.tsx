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
 * Helper component to simulate a radial gradient / blurred blob 
 * using concentric circles with decreasing opacity.
 * This avoids needing external dependencies like react-native-svg or blur packages
 * while still achieving the Liquid Glass diffused light aesthetic.
 */
const SoftBlob = ({ color, size, style }: { color: string, size: number, style?: any }) => {
  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center', position: 'absolute' }, style]}>
      <View style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity: 0.03 }} />
      <View style={{ position: 'absolute', width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color, opacity: 0.06 }} />
      <View style={{ position: 'absolute', width: size * 0.6, height: size * 0.6, borderRadius: size * 0.3, backgroundColor: color, opacity: 0.09 }} />
      <View style={{ position: 'absolute', width: size * 0.4, height: size * 0.4, borderRadius: size * 0.2, backgroundColor: color, opacity: 0.12 }} />
      <View style={{ position: 'absolute', width: size * 0.2, height: size * 0.2, borderRadius: size * 0.1, backgroundColor: color, opacity: 0.15 }} />
    </View>
  );
};

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
          <SoftBlob 
            color={theme.colors.primaryFixed} 
            size={width * 1.5} 
            style={{ top: -width * 0.5, left: -width * 0.5 }} 
          />
          
          {/* Middle-Right Blob */}
          <SoftBlob 
            color={theme.colors.secondaryFixed} 
            size={width * 1.2} 
            style={{ top: height * 0.2, right: -width * 0.4 }} 
          />
          
          {/* Bottom-Center Gradient Orb */}
          <SoftBlob 
            color={theme.colors.tertiaryFixed} 
            size={width * 1.8} 
            style={{ bottom: -width * 0.4, left: width * 0.1 }} 
          />
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
  contentLayer: {
    flex: 1,
    zIndex: 10,
  },
  bottomNavPadding: {
    paddingBottom: 96, // roughly equivalent to pb-24 in tailwind
  },
});

export default ScreenWrapper;