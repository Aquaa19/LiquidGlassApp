// src/screens/DashboardScreen.tsx

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../theme/theme';
import ScreenWrapper from '../components/core/ScreenWrapper';
import GlassHeader from '../components/glass/GlassHeader';
import Container from '../components/core/Container';
import Spacer from '../components/core/Spacer';
import Text from '../components/core/Text';
import StatCard from '../components/features/StatCard';
import GlassCard from '../components/glass/GlassCard';
import Icon from '../components/core/Icon';
import CalendarEventItem from '../components/features/CalendarEventItem';
import GlassButton from '../components/glass/GlassButton';

const DashboardScreen = () => {
  return (
    <ScreenWrapper atmospheric={true}>
      <GlassHeader
        title="Welcome, Mentor"
        actions={
          <View style={styles.headerAction}>
            <Icon name="notifications" size="md" color={theme.colors.primary} />
          </View>
        }
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Container style={styles.mainPadding}>
          {/* Hero Experience */}
          <View>
            <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.dateLabel}>
              THURSDAY, OCTOBER 24
            </Text>
            <Text variant="display-xl" color={theme.colors.onSurface}>
              Good Evening, <Text variant="display-xl" color={theme.colors.primary}>Alex</Text>
            </Text>
            <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.heroSub}>
              Your tutoring session metrics for today. Let's make an impact.
            </Text>
          </View>

          <Spacer size="gutter" />

          {/* Bento Grid Metrics */}
          <Container gap="gutter">
            <StatCard
              label="Total Students"
              value="42"
              icon="groups"
              secondaryValue="+3 this week"
              variant="primary"
              blobColor={theme.colors.primaryFixed}
            />
            <StatCard
              label="Attendance Today"
              value="85%"
              icon="fact_check"
              variant="secondary"
              blobColor={theme.colors.secondaryFixed}
              chartType="circular"
              progress={85}
            />
            <StatCard
              label="Fees Pending"
              value="$840"
              icon="payments"
              secondaryValue="from 4 students"
              variant="error"
              blobColor={theme.colors.errorContainer}
            />
          </Container>

          <Spacer size="section-margin" />

          {/* Quick Actions */}
          <View>
            <Text variant="headline-md" color={theme.colors.onSurface}>Quick Actions</Text>
            <Spacer size="element-gap" />
            <Container direction="row" wrap="wrap" gap="unit">
              <View style={styles.actionItem}>
                <GlassCard interactive rounded="xl" style={styles.actionCard}>
                  <View style={[styles.actionIconBg, { backgroundColor: theme.colors.primaryContainer }]}>
                    <Icon name="how_to_reg" size="md" color={theme.colors.onPrimaryContainer} fill />
                  </View>
                  <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.actionText}>
                    Mark Attendance
                  </Text>
                </GlassCard>
              </View>

              <View style={styles.actionItem}>
                <GlassCard interactive rounded="xl" style={styles.actionCard}>
                  <View style={[styles.actionIconBg, { backgroundColor: theme.colors.secondaryContainer }]}>
                    <Icon name="person_add" size="md" color={theme.colors.onSecondaryContainer} fill />
                  </View>
                  <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.actionText}>
                    Add Student
                  </Text>
                </GlassCard>
              </View>

              <View style={styles.actionItem}>
                <GlassCard interactive rounded="xl" style={styles.actionCard}>
                  <View style={[styles.actionIconBg, { backgroundColor: theme.colors.tertiaryContainer }]}>
                    <Icon name="post_add" size="md" color={theme.colors.onTertiaryContainer} fill />
                  </View>
                  <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.actionText}>
                    Add Homework
                  </Text>
                </GlassCard>
              </View>

              <View style={styles.actionItem}>
                <GlassCard interactive rounded="xl" style={styles.actionCard}>
                  <View style={[styles.actionIconBg, { backgroundColor: `${theme.colors.primary}1A` }]}>
                    <Icon name="receipt_long" size="md" color={theme.colors.primary} fill />
                  </View>
                  <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.actionText}>
                    Record Payment
                  </Text>
                </GlassCard>
              </View>
            </Container>
          </View>

          <Spacer size="section-margin" />

          {/* Today's Flow */}
          <View>
            <View style={styles.sectionHeader}>
              <Text variant="headline-md" color={theme.colors.onSurface}>Today's Flow</Text>
              <Text variant="label-sm" color={theme.colors.primary}>View Schedule</Text>
            </View>
            
            <Spacer size="element-gap" />
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
              snapToInterval={320}
              decelerationRate="fast"
            >
              <CalendarEventItem
                title="Sarah Jenkins"
                location="In 30m"
                timeRange="4:00 PM - 5:30 PM"
                studentName="Advanced Calculus"
                variant="primary"
                style={styles.eventCard}
              />
              <CalendarEventItem
                title="Marcus Doe"
                location="Upcoming"
                timeRange="6:00 PM - 7:00 PM"
                studentName="Physics 101"
                variant="tertiary"
                style={styles.eventCard}
              />
              <CalendarEventItem
                title="Emma Stone"
                location="Tonight"
                timeRange="7:30 PM - 8:30 PM"
                studentName="Creative Writing"
                variant="secondary"
                style={styles.eventCard}
              />
            </ScrollView>
          </View>
        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 80, // Offset for sticky header
    paddingBottom: 120, // Bottom nav clearance
  },
  mainPadding: {
    paddingHorizontal: theme.spacing.containerPadding,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateLabel: {
    letterSpacing: 2,
    marginBottom: 4,
  },
  heroSub: {
    marginTop: 8,
    maxWidth: '90%',
  },
  actionItem: {
    width: '48.5%', // 2 columns with gap
    aspectRatio: 1,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  actionIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  actionText: {
    textAlign: 'center',
    fontSize: 11,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  horizontalScroll: {
    paddingRight: theme.spacing.containerPadding,
  },
  eventCard: {
    width: 300,
    marginRight: 16,
  },
});

export default DashboardScreen;