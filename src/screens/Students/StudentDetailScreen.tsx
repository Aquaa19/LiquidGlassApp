// src/screens/Students/StudentDetailScreen.tsx

import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Image, 
  Pressable 
} from 'react-native';
import { theme } from '../../theme/theme';
import ScreenWrapper from '../../components/core/ScreenWrapper';
import GlassHeader from '../../components/glass/GlassHeader';
import Container from '../../components/core/Container';
import Spacer from '../../components/core/Spacer';
import Text from '../../components/core/Text';
import Icon from '../../components/core/Icon';
import GlassCard from '../../components/glass/GlassCard';
import GlassButton from '../../components/glass/GlassButton';

const StudentDetailScreen = ({ navigation, route }: any) => {
  // studentId would be used to fetch real data here
  const { studentId } = route.params || { studentId: '1' };

  return (
    <ScreenWrapper atmospheric={true}>
      <GlassHeader
        title="Student Detail"
        onBack={() => navigation.goBack()}
        actions={
          <Pressable style={styles.headerAction}>
            <Icon name="more_vert" size="md" color={theme.colors.primary} />
          </Pressable>
        }
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Container style={styles.horizontalPadding}>
          
          {/* Profile Header Card */}
          <GlassCard rounded="3xl" style={styles.profileCard} blobColor={theme.colors.primaryFixed}>
            <View style={styles.profileContent}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarGlow} />
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdPk1lFpeF2BQVotz3tZPhrhuDlZuOmBxn1MxGaBIHjkNSf9mdg01RXmoLmNR7YG4uqOp_p1ki5ULJsJsT9l55wVsl0G7VWfO9d6Tz4xavo8LugFRrt0J32T1NnmxVUYNpsCutxC263O6xyN_YH0A4LKQXEqd6ST9nBBIhJsZAcbYFL11H5DDlW_9MYwBr6sae4Uaux3VCIoLQkzpX1kUa4MPWuzlJ1OfvX_yLzIRhkn7X7OTtEWlnxJSD8bNzxwK_dwh7CRXyn6E' }} 
                  style={styles.avatarImage} 
                />
              </View>

              <View style={styles.profileText}>
                <View style={styles.badge}>
                  <View style={styles.badgeDot} />
                  <Text variant="label-sm" color={theme.colors.onSecondaryContainer}>
                    Grade 10 - Science
                  </Text>
                </View>
                <Text variant="headline-lg" color={theme.colors.onSurface}>Emma Thompson</Text>
                <View style={styles.emailContainer}>
                  <Icon name="mail" size={18} color={theme.colors.onSurfaceVariant} />
                  <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.emailText}>
                    emma.t@student.edu
                  </Text>
                </View>
              </View>

              <GlassButton variant="primary" iconName="edit" size="md">
                Edit
              </GlassButton>
            </View>
          </GlassCard>

          <Spacer size="element-gap" />

          {/* Stats Grid (Bento Style) */}
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <GlassCard style={styles.statItem}>
                <Icon name="how_to_reg" size={48} color={theme.colors.primary} style={styles.statIconWatermark} />
                <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Attendance %</Text>
                <View style={styles.statValueContainer}>
                  <Text variant="display-xl" color={theme.colors.primary} style={styles.statValue}>94</Text>
                  <Text variant="body-base" color={theme.colors.onSurfaceVariant}>%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '94%', backgroundColor: theme.colors.primary }]} />
                </View>
              </GlassCard>

              <GlassCard style={styles.statItem}>
                <Icon name="payments" size={48} color={theme.colors.error} style={styles.statIconWatermark} />
                <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Fees Due</Text>
                <View style={styles.statValueContainer}>
                  <Text variant="body-base" color={theme.colors.onSurfaceVariant}>$</Text>
                  <Text variant="display-xl" color={theme.colors.error} style={styles.statValue}>150</Text>
                </View>
                <View style={styles.statusFooter}>
                  <Icon name="warning" size={14} color={theme.colors.error} />
                  <Text variant="label-sm" color={theme.colors.error}>Overdue 5 days</Text>
                </View>
              </GlassCard>
            </View>

            <View style={styles.statsRow}>
              <GlassCard style={styles.statItem}>
                <Icon name="trending_up" size={48} color={theme.colors.tertiary} style={styles.statIconWatermark} />
                <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Avg Marks</Text>
                <View style={styles.statValueContainer}>
                  <Text variant="display-xl" color={theme.colors.tertiary} style={styles.statValue}>A-</Text>
                </View>
                <View style={styles.statusFooter}>
                  <Icon name="arrow_upward" size={14} color={theme.colors.tertiary} />
                  <Text variant="label-sm" color={theme.colors.tertiary}>+2% this term</Text>
                </View>
              </GlassCard>

              <GlassCard style={styles.statItem}>
                <Icon name="assignment_turned_in" size={48} color={theme.colors.secondary} style={styles.statIconWatermark} />
                <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Homework</Text>
                <View style={styles.statValueContainer}>
                  <Text variant="display-xl" color={theme.colors.secondary} style={styles.statValue}>88</Text>
                  <Text variant="body-base" color={theme.colors.onSurfaceVariant}>%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '88%', backgroundColor: theme.colors.secondary }]} />
                </View>
              </GlassCard>
            </View>
          </View>

          <Spacer size="gutter" />

          {/* Quick Actions Grid */}
          <Text variant="headline-md" color={theme.colors.onSurface}>Quick Actions</Text>
          <Spacer size="element-gap" />
          
          <View style={styles.actionsGrid}>
            <Pressable style={styles.actionBtn}>
              <GlassCard interactive style={styles.actionInner}>
                <View style={[styles.actionIconCircle, { backgroundColor: `${theme.colors.primaryContainer}33` }]}>
                  <Icon name="how_to_reg" size="md" color={theme.colors.primary} fill />
                </View>
                <Text variant="label-sm" color={theme.colors.onSurface}>Attendance</Text>
              </GlassCard>
            </Pressable>

            <Pressable style={styles.actionBtn}>
              <GlassCard interactive style={styles.actionInner}>
                <View style={[styles.actionIconCircle, { backgroundColor: `${theme.colors.secondaryContainer}33` }]}>
                  <Icon name="trending_up" size="md" color={theme.colors.secondary} fill />
                </View>
                <Text variant="label-sm" color={theme.colors.onSurface}>Progress</Text>
              </GlassCard>
            </Pressable>

            <Pressable style={styles.actionBtn}>
              <GlassCard interactive style={styles.actionInner}>
                <View style={[styles.actionIconCircle, { backgroundColor: `${theme.colors.tertiaryContainer}33` }]}>
                  <Icon name="assignment" size="md" color={theme.colors.tertiary} fill />
                </View>
                <Text variant="label-sm" color={theme.colors.onSurface}>Homework</Text>
              </GlassCard>
            </Pressable>

            <Pressable style={styles.actionBtn}>
              <GlassCard interactive style={styles.actionInner}>
                <View style={[styles.actionIconCircle, { backgroundColor: `${theme.colors.errorContainer}80` }]}>
                  <Icon name="payments" size="md" color={theme.colors.error} fill />
                </View>
                <Text variant="label-sm" color={theme.colors.onSurface}>Fees</Text>
              </GlassCard>
            </Pressable>

            <Pressable style={styles.actionBtnLarge}>
              <GlassCard interactive style={styles.actionInner}>
                <View style={[styles.actionIconCircle, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <Icon name="description" size="md" color={theme.colors.onSurfaceVariant} fill />
                </View>
                <Text variant="label-sm" color={theme.colors.onSurface}>Notes</Text>
              </GlassCard>
            </Pressable>
          </View>

        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 88, // Header offset
    paddingBottom: 120, // Tab bar clearance
  },
  horizontalPadding: {
    paddingHorizontal: theme.spacing.containerPadding,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.glass.fillLow,
  },
  profileCard: {
    padding: 32,
  },
  profileContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    padding: 4,
    backgroundColor: theme.colors.primary, // Outer border ring
    marginBottom: 24,
    position: 'relative',
  },
  avatarGlow: {
    ...StyleSheet.absoluteFill,
    borderRadius: 64,
    backgroundColor: theme.colors.secondaryContainer,
    opacity: 0.4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 4,
    borderColor: theme.colors.surfaceContainerLowest,
  },
  profileText: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(225, 212, 253, 0.3)',
    marginBottom: 12,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  emailText: {
    fontSize: 14,
  },
  statsGrid: {
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    padding: 24,
    minHeight: 140,
  },
  statIconWatermark: {
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: 0.1,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 8,
  },
  statValue: {
    fontSize: 48,
    lineHeight: 52,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 3,
    marginTop: 16,
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  statusFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionBtn: {
    width: '47.5%',
  },
  actionBtnLarge: {
    width: '100%',
  },
  actionInner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StudentDetailScreen;