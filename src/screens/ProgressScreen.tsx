// src/screens/ProgressScreen.tsx

import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Pressable,
  Image
} from 'react-native';
import { theme } from '../theme/theme';
import ScreenWrapper from '../components/core/ScreenWrapper';
import GlassHeader from '../components/glass/GlassHeader';
import Container from '../components/core/Container';
import Spacer from '../components/core/Spacer';
import Text from '../components/core/Text';
import Icon from '../components/core/Icon';
import GlassCard from '../components/glass/GlassCard';
import StatCard from '../components/features/StatCard';
import ProgressItem, { ProgressVariant } from '../components/features/ProgressItem';

const ProgressScreen = () => {
  // Mock data for recent assessments based on HTML
  const recentAssessments = [
    {
      id: '1',
      title: 'Organic Chemistry Midterm',
      date: 'Oct 24, 2026',
      score: '88%',
      avgScore: '76%',
      iconName: 'science',
      variant: 'primary' as ProgressVariant,
    },
    {
      id: '2',
      title: 'Linear Algebra Quiz 4',
      date: 'Oct 18, 2026',
      score: '92%',
      avgScore: '81%',
      iconName: 'calculate',
      variant: 'tertiary' as ProgressVariant,
    }
  ];

  return (
    <ScreenWrapper atmospheric={true}>
      <GlassHeader
        title="Welcome, Mentor"
        actions={
          <Pressable style={styles.headerAction}>
            <Icon name="notifications" size="md" color={theme.colors.primary} />
          </Pressable>
        }
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Container style={styles.horizontalPadding}>
          
          {/* Header Section */}
          <View style={styles.sectionHeader}>
            <Text variant="headline-lg" color={theme.colors.onSurface}>Performance Tracking</Text>
            <Spacer size="unit" />
            <Text variant="body-base" color={theme.colors.onSurfaceVariant}>
              Monitor student aggregate scores and identify trending improvements across all cohorts.
            </Text>
          </View>

          <Spacer size="element-gap" />

          {/* Hero Chart Section */}
          <GlassCard rounded="3xl" style={styles.heroChartCard}>
            <View style={styles.chartHeader}>
              <Text variant="headline-md" color={theme.colors.onSurface}>Cohort Progress Over Time</Text>
              
              <Pressable style={styles.dropdownBtn}>
                <Text variant="label-sm" color={theme.colors.onPrimaryContainer}>This Quarter</Text>
                <Icon name="expand_more" size={18} color={theme.colors.onPrimaryContainer} />
              </Pressable>
            </View>

            {/* Abstract Chart Graphic (Placeholder Image) */}
            <View style={styles.chartImageContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_DWnNMaz6nB9G5iABIZESHvG0HPzkDhzzuAMFOoFd1HM1NL1XgXy-s15PQT347sH2eVnUmO42nT1O7FeQKWbjmw_dILcRzyaZ6mM1m3J-FJYrhkwR91TXkqXtTTFC_alLW1B_i4WI2e7QhEc4DGWeWwAX9WXFySDlxEXgD1cihFY3-4umQJ8kt3uprnNq7QROcodSXhh6aODs0ZTq1ttCTh74q_jtxuipdHNQZA3XmViLIVj-6aUsVEcb-0aHIacCiwcPXNPhTV4' }} 
                style={styles.chartImage} 
              />
              <View style={styles.chartGradientOverlay} pointerEvents="none" />
            </View>
          </GlassCard>

          <Spacer size="element-gap" />

          {/* Stats Bento Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              label="Average Score"
              value="84"
              icon="trending_up" // Providing a default icon although HTML didn't use it for this specific layout, helps keep it consistent
              secondaryValue="+4%"
              variant="primary"
              style={styles.statCardFixed}
            />
            
            <View style={styles.statsRow}>
              <StatCard
                label="Highest Mark"
                value="98"
                icon="emoji_events"
                secondaryValue="Adv. Calc"
                variant="secondary"
                style={styles.statCardHalf}
              />
              <StatCard
                label="Lowest Mark"
                value="62"
                icon="warning"
                secondaryValue="Physics 101"
                variant="error"
                style={styles.statCardHalf}
              />
            </View>
          </View>

          <Spacer size="element-gap" />

          {/* Test List Section */}
          <View>
            <Text variant="headline-md" color={theme.colors.onSurface} style={styles.listTitle}>
              Recent Assessments
            </Text>
            
            <View style={styles.listContainer}>
              {recentAssessments.map((assessment) => (
                <ProgressItem
                  key={assessment.id}
                  title={assessment.title}
                  date={assessment.date}
                  score={assessment.score}
                  avgScore={assessment.avgScore}
                  iconName={assessment.iconName}
                  variant={assessment.variant}
                />
              ))}
            </View>
          </View>

        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 88, // Below Sticky Header
    paddingBottom: 120, // Tab bar margin
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
  sectionHeader: {
    marginTop: 8,
  },
  heroChartCard: {
    padding: 24,
    backgroundColor: `${theme.colors.surfaceContainerLowest}66`, // 40% opacity equivalent
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    zIndex: 10,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: `${theme.colors.primaryContainer}4D`, // 30% opacity
    borderWidth: 1,
    borderColor: `${theme.colors.primary}1A`,
  },
  chartImageContainer: {
    width: '100%',
    height: 200, // Reduced from 300px for mobile proportionality
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(203, 196, 210, 0.2)', // outline-variant/20
    backgroundColor: 'rgba(253, 247, 255, 0.3)', // surface/30
    zIndex: 10,
  },
  chartImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  chartGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Gradient simulation
  },
  statsGrid: {
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCardFixed: {
    minHeight: 140, // Keeping consistency with bento grid
  },
  statCardHalf: {
    flex: 1,
    minHeight: 140,
  },
  listTitle: {
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
});

export default ProgressScreen;