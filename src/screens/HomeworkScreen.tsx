// src/screens/HomeworkScreen.tsx

import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Pressable 
} from 'react-native';
import { theme } from '../theme/theme';
import ScreenWrapper from '../components/core/ScreenWrapper';
import GlassHeader from '../components/glass/GlassHeader';
import Container from '../components/core/Container';
import Spacer from '../components/core/Spacer';
import Text from '../components/core/Text';
import Icon from '../components/core/Icon';
import GlassCard from '../components/glass/GlassCard';
import HomeworkItem, { HomeworkStatus, HomeworkVariant } from '../components/features/HomeworkItem';

const HomeworkScreen = () => {
  // Mock data based on the HTML
  const homeworks = [
    {
      id: '1',
      title: 'Advanced Calculus',
      studentName: 'Sarah Jenkins',
      status: 'pending' as HomeworkStatus,
      dateText: 'Oct 24, 17:00', // Converted to 24-hour format as per personalization preferences
      iconName: 'functions',
      variant: 'primary' as HomeworkVariant,
    },
    {
      id: '2',
      title: 'Organic Chemistry Lab',
      studentName: 'Michael Chang',
      status: 'done' as HomeworkStatus,
      dateText: 'Oct 22',
      iconName: 'science',
      variant: 'secondary' as HomeworkVariant,
    },
    {
      id: '3',
      title: 'World War II Essay',
      studentName: 'Emily Blunt',
      status: 'pending' as HomeworkStatus,
      dateText: 'Oct 26, 23:59',
      iconName: 'history_edu',
      variant: 'primary' as HomeworkVariant,
    }
  ];

  return (
    <ScreenWrapper atmospheric={true}>
      <GlassHeader
        title="Homework"
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
          
          {/* Header Section (Visible on scroll) */}
          <View style={styles.sectionHeader}>
            <Text variant="headline-lg" color={theme.colors.primary}>Homework</Text>
            <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.subtitle}>
              Manage and review student assignments.
            </Text>
          </View>

          <Spacer size="element-gap" />

          {/* Overall Progress Section */}
          <GlassCard rounded="xl" style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text variant="headline-md" color={theme.colors.onSurface}>Weekly Completion</Text>
              <Text variant="label-sm" color={theme.colors.primary} style={styles.progressPercent}>75%</Text>
            </View>
            
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '75%' }]} />
            </View>
          </GlassCard>

          <Spacer size="gutter" />

          {/* Task Cards Layout */}
          <View style={styles.taskList}>
            {homeworks.map((hw) => (
              <HomeworkItem
                key={hw.id}
                title={hw.title}
                studentName={hw.studentName}
                status={hw.status}
                dateText={hw.dateText}
                iconName={hw.iconName}
                variant={hw.variant}
                onPress={() => console.log('Tapped homework:', hw.title)}
              />
            ))}
          </View>

        </Container>
      </ScrollView>

      {/* Floating Action Button (Add Homework) */}
      <Pressable style={styles.fab}>
        <View style={styles.fabInnerGloss} pointerEvents="none" />
        <Icon name="add" size={28} color={theme.colors.onPrimary} />
      </Pressable>
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
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 4,
  },
  progressCard: {
    padding: 24,
    backgroundColor: `${theme.colors.surfaceContainer}80`, // 50% opacity
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  taskList: {
    gap: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 100, // Above mobile nav bar
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    zIndex: 100,
    overflow: 'hidden', // for inner gloss
  },
  fabInnerGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 30,
  }
});

export default HomeworkScreen;