// src/components/features/FeeTransactionRow.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Text from '../core/Text';
import Icon from '../core/Icon';

export type TransactionStatus = 'paid' | 'overdue' | 'pending';
export type TransactionVariant = 'primary' | 'secondary' | 'tertiary' | 'error';

export interface FeeTransactionRowProps {
  /** Description of the transaction or course name */
  title: string;
  /** Name of the student associated with the payment */
  studentName: string;
  /** Date of the transaction */
  date: string;
  /** Amount in currency format (e.g., 450.00 or "$450.00") */
  amount: string | number;
  /** Current payment status */
  status: TransactionStatus;
  /** Material Symbol icon name */
  iconName: string;
  /** Color theme for the icon container and status text */
  variant?: TransactionVariant;
  /** Click handler */
  onPress?: () => void;
  /** Additional styling classes */
  style?: StyleProp<ViewStyle>;
}

const getVariantConfig = (variant: TransactionVariant) => {
  switch (variant) {
    case 'primary':
      return { 
        bg: `${theme.colors.primaryContainer}33`, // 20% opacity 
        text: theme.colors.primary, 
        border: `${theme.colors.primary}1A` // 10% opacity
      };
    case 'secondary':
      return { 
        bg: `${theme.colors.secondaryContainer}33`, 
        text: theme.colors.secondary, 
        border: `${theme.colors.secondary}1A` 
      };
    case 'tertiary':
      return { 
        bg: `${theme.colors.tertiaryContainer}33`, 
        text: theme.colors.tertiary, 
        border: `${theme.colors.tertiary}1A` 
      };
    case 'error':
      return { 
        bg: `${theme.colors.errorContainer}4D`, // 30% opacity
        text: theme.colors.error, 
        border: `${theme.colors.error}33` // 20% opacity
      };
    default:
      return { 
        bg: `${theme.colors.primaryContainer}33`, 
        text: theme.colors.primary, 
        border: `${theme.colors.primary}1A` 
      };
  }
};

/**
 * FeeTransactionRow Component
 * A list-style row for displaying financial transactions with Liquid Glass styling.
 * Adapts its visual state based on the payment status (Paid, Overdue, etc.).
 */
const FeeTransactionRow: React.FC<FeeTransactionRowProps> = ({
  title,
  studentName,
  date,
  amount,
  status,
  iconName,
  variant = 'primary',
  onPress,
  style,
}) => {
  const isOverdue = status === 'overdue';
  const displayVariant = isOverdue ? 'error' : variant;
  const vConfig = getVariantConfig(displayVariant);
  
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

  const formattedAmount = typeof amount === 'number' ? `$${amount.toFixed(2)}` : amount;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.container,
          isOverdue && styles.containerOverdue,
          pressed && styles.containerPressed
        ]}
      >
        {/* Left Section: Icon & Transaction Info */}
        <View style={styles.leftSection}>
          <View 
            style={[
              styles.iconWrapper, 
              { backgroundColor: vConfig.bg, borderColor: vConfig.border }
            ]}
          >
            <Icon name={iconName} size="md" color={vConfig.text} />
          </View>
          
          <View style={styles.infoContainer}>
            <Text variant="body-base" color={theme.colors.onSurface} style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
            <Text 
              variant="label-sm" 
              color={isOverdue ? `${theme.colors.error}CC` : theme.colors.onSurfaceVariant} 
              style={styles.subtitleText}
              numberOfLines={1}
            >
              {studentName} • {date}
            </Text>
          </View>
        </View>

        {/* Right Section: Amount & Status Badge */}
        <View style={styles.rightSection}>
          <Text variant="body-base" color={theme.colors.onSurface} style={styles.amountText}>
            {formattedAmount}
          </Text>
          
          <View style={styles.statusContainer}>
            <Icon 
              name={isOverdue ? 'schedule' : 'check_circle'} 
              size={14} 
              color={isOverdue ? theme.colors.error : theme.colors.primary} 
            />
            <Text 
              variant="label-sm" 
              color={isOverdue ? theme.colors.error : theme.colors.primary}
              style={styles.statusText}
            >
              {status}
            </Text>
          </View>
        </View>

        {/* Internal Gloss Highlight Simulation */}
        <View style={styles.internalGloss} pointerEvents="none" />
      </Pressable>
    </Animated.View>
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
    backgroundColor: theme.colors.glass.fillLow, // bg-white/5
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 224, 233, 0.3)', // surface-variant/30
  },
  containerOverdue: {
    backgroundColor: `${theme.colors.errorContainer}0D`, // error-container/5
  },
  containerPressed: {
    backgroundColor: `${theme.colors.surfaceContainerHighest}33`, // Equivalent to hover:bg-surface-container-highest/20
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    zIndex: 10,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12, // rounded-xl in Tailwind
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600', // font-semibold
  },
  subtitleText: {
    marginTop: 4,
    fontWeight: '400',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 10,
    marginLeft: 16,
  },
  amountText: {
    fontWeight: '700', // font-bold
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  statusText: {
    textTransform: 'capitalize',
  },
  internalGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.03)', // Subtle gradient highlight simulation
    zIndex: 0,
  },
});

export default FeeTransactionRow;