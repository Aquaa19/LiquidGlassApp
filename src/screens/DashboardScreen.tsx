// src/screens/DashboardScreen.tsx

import React from 'react';
import { ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { theme } from '../theme/theme';
import ScreenWrapper from '../components/core/ScreenWrapper';
import Container from '../components/core/Container';
import Spacer from '../components/core/Spacer';
import Text from '../components/core/Text';
import StatCard from '../components/features/StatCard';
import GlassCard from '../components/glass/GlassCard';
import Icon from '../components/core/Icon';
import CalendarEventItem from '../components/features/CalendarEventItem';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper atmospheric={true}>
      {/* NATIVE BLUR GLASS HEADER */}
      <View style={[styles.customHeader, { paddingTop: Math.max(insets.top, 16) + 12 }]}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={30}
          reducedTransparencyFallbackColor="white"
        />
        
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarBorder}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARXip4NGFTGlozijdP3p68tXZB6lGyWJfASm7m0C8VJzI-1Bmp5kBO4HzK4e_HYup-aVzae65eFoiOcmyn-LKVdoEBivjq3BkN3MofJcPWKYEirSVABVMDX4tVAOwGQlkbM0A-GB2Iler5zgnSpgg-ndpHLc18uWYAZc4vyDEubnqx8at2nbZam8eQIc5Lvnr71fbgNmHJFzh6zaU-mSXmGpZXhQUNQSp6NdEX-u7T1YBrsfzJV-pQlmpbDaVmVxVgq3cLXgaL-7M' }} 
                style={styles.avatar} 
              />
            </View>
            <Text variant="headline-md" color={theme.colors.primary} style={styles.headerTitle}>
              Welcome, Mentor
            </Text>
          </View>
          <View style={styles.headerAction}>
            <Icon name="notifications" size="md" color={theme.colors.primary} />
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 100 }]}
      >
        <Container style={styles.mainPadding}>
          <View style={styles.heroSection}>
            <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.dateLabel}>
              THURSDAY, OCTOBER 24
            </Text>
            <Text variant="display-xl" color={theme.colors.onSurface} style={styles.heroTitle}>
              Good Evening, <Text variant="display-xl" color={theme.colors.primary}>Alex</Text>
            </Text>
            <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.heroSub}>
              Your tutoring session metrics for today. Let's make an impact.
            </Text>
          </View>

          <Spacer size="gutter" />

          <View style={styles.metricsGrid}>
            <StatCard
              label="Total Students"
              value="42"
              icon="groups"
              secondaryValue="+3 this week"
              variant="primary"
              blobColor={theme.colors.primaryFixed}
              style={styles.metricCardFull}
            />
            
            <View style={styles.metricsRow}>
              <StatCard
                label="Attendance Today"
                value="85%"
                icon="fact_check"
                variant="secondary"
                blobColor={theme.colors.secondaryFixed}
                chartType="circular"
                progress={85}
                style={styles.metricCardHalf}
              />
              <StatCard
                label="Fees Pending"
                value="$840"
                icon="payments"
                secondaryValue="from 4 students"
                variant="error"
                blobColor={theme.colors.errorContainer}
                style={styles.metricCardHalf}
              />
            </View>
          </View>

          <Spacer size="section-margin" />

          <View>
            <Text variant="headline-md" color={theme.colors.onSurface} style={styles.sectionTitle}>Quick Actions</Text>
            <Spacer size="element-gap" />
            <View style={styles.quickActionsContainer}>
              {[
                { icon: 'how_to_reg', label: 'Mark Attendance', color: theme.colors.primaryContainer, onColor: theme.colors.onPrimaryContainer },
                { icon: 'person_add', label: 'Add Student', color: theme.colors.secondaryContainer, onColor: theme.colors.onSecondaryContainer },
                { icon: 'post_add', label: 'Add Homework', color: theme.colors.tertiaryContainer, onColor: theme.colors.onTertiaryContainer },
                { icon: 'receipt_long', label: 'Record Payment', color: `${theme.colors.primary}1A`, onColor: theme.colors.primary },
              ].map((action, index) => (
                <View key={index} style={styles.actionItem}>
                  <GlassCard interactive rounded="xl" style={styles.actionCard}>
                    <View style={styles.actionCardInner}>
                      <View style={[styles.actionIconBg, { backgroundColor: action.color }]}>
                        <Icon name={action.icon} size="md" color={action.onColor} fill />
                      </View>
                      <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.actionText}>
                        {action.label}
                      </Text>
                    </View>
                  </GlassCard>
                </View>
              ))}
            </View>
          </View>

          <Spacer size="section-margin" />

          <View>
            <View style={styles.sectionHeader}>
              <Text variant="headline-md" color={theme.colors.onSurface}>Today's Flow</Text>
              <Text variant="label-sm" color={theme.colors.primary} style={styles.viewSchedule}>View Schedule</Text>
            </View>
            
            <Spacer size="element-gap" />
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
              snapToInterval={316}
              decelerationRate="fast"
            >
              <CalendarEventItem
                title="Sarah Jenkins"
                location="In 30m"
                timeRange="16:00 - 17:30"
                studentName="Advanced Calculus"
                variant="primary"
                style={styles.eventCard}
              />
              <CalendarEventItem
                title="Marcus Doe"
                location="Upcoming"
                timeRange="18:00 - 19:00"
                studentName="Physics 101"
                variant="tertiary"
                style={styles.eventCard}
              />
              <CalendarEventItem
                title="Emma Stone"
                location="Tonight"
                timeRange="19:30 - 20:30"
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
  customHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 100,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarBorder: {
    padding: 2,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTitle: {
    letterSpacing: -0.5,
    fontWeight: '700',
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  mainPadding: {
    paddingHorizontal: 24,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  heroSection: {
    marginTop: 8,
  },
  dateLabel: {
    letterSpacing: 2,
    marginBottom: 6,
    fontSize: 11,
    opacity: 0.6,
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -1,
  },
  heroSub: {
    marginTop: 10,
    maxWidth: '90%',
    lineHeight: 22,
    opacity: 0.7,
  },
  metricsGrid: {
    gap: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCardFull: {
    width: '100%',
  },
  metricCardHalf: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: -0.3,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionItem: {
    width: (width - 48 - 12) / 2,
    aspectRatio: 1,
  },
  actionCard: {
    flex: 1,
  },
  actionCardInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  actionIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  viewSchedule: {
    fontWeight: '700',
    fontSize: 13,
  },
  horizontalScroll: {
    paddingRight: 24,
  },
  eventCard: {
    width: 300,
    marginRight: 16,
  },
});

export default DashboardScreen;