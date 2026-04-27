// src/components/features/AttendanceRow.tsx
import React from 'react';
import { View, StyleSheet, Pressable, Image, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export type AttendanceStatus = 'present' | 'absent' | 'unmarked';

export interface AttendanceRowProps {
  /** Student name */
  name: string;
  /** Student identification number */
  studentId: string;
  /** Student avatar image URL */
  avatarUrl?: string;
  /** Fallback initials */
  initials?: string;
  /** Current attendance status */
  status: AttendanceStatus;
  /** Callback when the present button is clicked */
  onMarkPresent: () => void;
  /** Callback when the absent button is clicked */
  onMarkAbsent: () => void;
  /** Additional styling classes */
  style?: StyleProp<ViewStyle>;
}

// Success Color Mapping (Teal-500 equivalent for "Present" state)
const SUCCESS_COLOR = '#14b8a6';

/**
 * AttendanceRow Component
 * A "Liquid Glass" list item for marking student attendance with 
 * status-specific visual feedback and interactive states.
 */
const AttendanceRow: React.FC<AttendanceRowProps> = ({
  name,
  studentId,
  avatarUrl,
  initials,
  status,
  onMarkPresent,
  onMarkAbsent,
  style,
}) => {
  const isPresent = status === 'present';
  const isAbsent = status === 'absent';

  return (
    <View 
      style={[
        styles.container,
        isAbsent && styles.containerAbsent,
        isPresent && styles.containerPresent,
        style
      ]}
    >
      {/* Student Identity Section */}
      <View style={styles.identitySection}>
        <View style={[styles.avatarWrapper, isAbsent && styles.avatarAbsent]}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text variant="headline-md" color={theme.colors.primary} style={styles.initialsText}>
                {initials || name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text variant="label-sm" color={theme.colors.onSurface} numberOfLines={1}>
            {name}
          </Text>
          <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.studentIdText}>
            ID: {studentId}
          </Text>
        </View>
      </View>

      {/* Action Buttons Section */}
      <View style={styles.actionsSection}>
        {/* Present Button */}
        <Pressable
          onPress={onMarkPresent}
          style={({ pressed }) => [
            styles.actionButton,
            isPresent ? styles.presentActive : styles.actionButtonInactive,
            pressed && !isPresent && styles.actionButtonPressed
          ]}
          accessibilityLabel="Mark Present"
        >
          <Icon 
            name="check_circle" 
            fill={isPresent} 
            size="md"
            color={isPresent ? SUCCESS_COLOR : theme.colors.onSurfaceVariant} 
          />
        </Pressable>

        {/* Absent Button */}
        <Pressable
          onPress={onMarkAbsent}
          style={({ pressed }) => [
            styles.actionButton,
            isAbsent ? styles.absentActive : styles.actionButtonInactive,
            pressed && !isAbsent && styles.actionButtonPressed
          ]}
          accessibilityLabel="Mark Absent"
        >
          <Icon 
            name="cancel" 
            fill={isAbsent} 
            size="md"
            color={isAbsent ? theme.colors.error : theme.colors.onSurfaceVariant} 
          />
        </Pressable>
      </View>

      {/* Subtle Inner Highlight Simulation */}
      <View style={styles.internalGloss} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: theme.rounded.md, // 12px (rounded-xl in Tailwind)
    backgroundColor: theme.colors.glass.fillMedium, // bg-white/15
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...theme.elevation.ambientNeutral,
  },
  containerAbsent: {
    borderLeftWidth: 3, // Thicker border to replace border-l-2
    borderLeftColor: 'rgba(186, 26, 26, 0.5)', // error/50
    backgroundColor: 'rgba(186, 26, 26, 0.05)', // error/5
  },
  containerPresent: {
    backgroundColor: `${theme.colors.primary}0D`, // primary/5 (Hex 0D)
  },
  identitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    marginRight: 16,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: theme.colors.surfaceContainerLowest,
  },
  avatarAbsent: {
    opacity: 0.7,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: `${theme.colors.primary}1A`, // primary/10
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  studentIdText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  presentActive: {
    backgroundColor: 'rgba(20, 184, 166, 0.1)', // teal-500/10
    borderColor: 'rgba(20, 184, 166, 0.3)', // teal-500/30
    // Glowing shadow
    shadowColor: SUCCESS_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  absentActive: {
    backgroundColor: 'rgba(186, 26, 26, 0.1)', // error/10
    borderColor: 'rgba(186, 26, 26, 0.3)', // error/30
    // Glowing shadow
    shadowColor: theme.colors.error,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.glass.fillLow,
    zIndex: 0,
  },
});

export default AttendanceRow;