// src/screens/NotesScreen.tsx

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
import NoteItem from '../components/features/NoteItem';

const NotesScreen = () => {
  // Mock data based on the HTML
  const notes = [
    {
      id: '1',
      title: "Emma's Advanced Algebra",
      date: 'Oct 24, 2026',
      content: 'Emma struggled slightly with quadratic equations today but showed great improvement towards the end of the session. Need to review factoring next week.',
      tags: ['Math', 'Needs Review']
    },
    {
      id: '2',
      title: 'Liam - Physics Prep',
      date: 'Oct 22, 2026',
      content: 'Excellent grasp of kinematics. Ready for the upcoming mid-term. Assigned practice test 4 for homework.',
      tags: ['Physics', 'Exam Prep']
    },
    {
      id: '3',
      title: 'Sophia Reading Comprehension',
      date: 'Oct 20, 2026',
      content: 'Working on identifying the main theme. Used the new short story collection. Engagement was high.',
      tags: ['English']
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
            <Text variant="headline-lg" color={theme.colors.onSurface} style={styles.trackingTight}>
              Student Notes
            </Text>
            <Spacer size="unit" />
            <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.subtitle}>
              Track progress and observations.
            </Text>
          </View>

          <Spacer size="gutter" />

          {/* Notes List */}
          <View style={styles.notesList}>
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                title={note.title}
                date={note.date}
                content={note.content}
                tags={note.tags}
                onPress={() => console.log('Opened note:', note.title)}
              />
            ))}
          </View>

        </Container>
      </ScrollView>

      {/* Floating Action Button */}
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
    marginBottom: 8,
  },
  trackingTight: {
    letterSpacing: -0.5,
  },
  subtitle: {
    opacity: 0.8,
  },
  notesList: {
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
    overflow: 'hidden',
  },
  fabInnerGloss: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 30,
  }
});

export default NotesScreen;