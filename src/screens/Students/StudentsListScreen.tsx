// src/screens/Students/StudentsListScreen.tsx

import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Pressable, 
  TextInput 
} from 'react-native';
import { theme } from '../../theme/theme';
import ScreenWrapper from '../../components/core/ScreenWrapper';
import GlassHeader from '../../components/glass/GlassHeader';
import Container from '../../components/core/Container';
import Spacer from '../../components/core/Spacer';
import Text from '../../components/core/Text';
import Icon from '../../components/core/Icon';
import GlassTextInput from '../../components/glass/GlassTextInput';
import StudentCard, { StudentStatus } from '../../components/features/StudentCard';

const StudentsListScreen = ({ navigation }: any) => {
  // Mock data based on the Stitch HTML
  const students = [
    {
      id: '1',
      name: 'Emma Thompson',
      grade: 'Grade 10',
      subject: 'Advanced Math',
      status: 'paid' as StudentStatus,
      nextSession: 'Oct 24',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7XRY2lmVGdTo-Au7lPNVUWf0qduhuPFcGWyRYkK-Jfw-eqBP9OaESmOXjJUSwDaiNh1HuN5hS6CCfnupeSlYeKF5hhWlwXCXHUWtulDns36wAAzcyExgUmzUnQ8r4aQt4KTtyyMo-9jsw5wots1bF0RaSynTeCyOPGPo6CCni4yO5HLD4H94X15B7WO0buOLpQ33ONg_SDb_PxZBvhpOBZWhikGU9u3sNIBgzV9J-fnpgkEtaPATSpzWiQ91BcSGvlZ5iWgZFO00'
    },
    {
      id: '2',
      name: 'Lucas Johnson',
      grade: 'Grade 11',
      subject: 'Physics',
      status: 'pending' as StudentStatus,
      nextSession: 'Oct 25',
      initials: 'LJ'
    },
    {
      id: '3',
      name: 'Sophia Davis',
      grade: 'Grade 10',
      subject: 'Chemistry',
      status: 'paid' as StudentStatus,
      nextSession: 'Oct 26',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCXp0cYyjVZPRtrPTMbIhkTsWY1r8N3I0AflksIpZSXHnjvYCqB6UjPmzre8dN-WB4M6gWYegUUdt3BAKn1x7CI9fE0ebE0T9pqt0V456vaFot09e-Fz5tbVdYQbxwiUb-DPaaPxypYND1po1SmXWM98w0ndT8tf-DTrm0fkRhZClBf8NSSiFAzoy1QF9cgAX_MlHDIbAzVx7bXq_4aIe_qBf6cBzCLiKhRYYwQOzhqLVaOmR52j643e9HPt3ee-LrSG_uNO0AJNE'
    },
    {
      id: '4',
      name: 'Oliver Wilson',
      grade: 'Grade 12',
      subject: 'Calculus',
      status: 'partial' as StudentStatus,
      nextSession: 'Oct 24',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVH7bohaSWHEX7eB0Bt6wQgv1ZxXe4Y_I30v4L3SZ8S4339Kp8s9cgkvGF6dgBbMIthHMiqNc_wd5Ts2OsXg_pYrKM7_SqciF2er1FyflQ-x6YTaMBTpcOnw7t9WZxVv6fUrFOORqdN1bjgnqW9J-LTs0T1RE-9A3YDQbzRJHqKqVz33KK-2UBeQ8eXhTjid2G1L8tRe0dMizNy73BydmqEBTLRVD_AQiz_d7Kj_8R9pILxEOov7H3I2bVI9Tn6qJoEXlBE32lw00'
    }
  ];

  return (
    <ScreenWrapper atmospheric={true}>
      <GlassHeader
        title="Students"
        subtitle="Manage your tutoring roster"
        actions={
          <Pressable style={styles.headerAction}>
            <Icon name="notifications" size="md" color={theme.colors.primary} />
          </Pressable>
        }
      />

      {/* Sticky Search & Filter Section */}
      <View style={styles.stickyControls}>
        <Container style={styles.horizontalPadding}>
          <GlassTextInput 
            placeholder="Search students..." 
            leftIcon="search"
          />
          
          <Spacer size="unit" />

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filterScroll}
          >
            <View style={[styles.filterChip, styles.filterChipActive]}>
              <Icon name="filter_list" size={16} color={theme.colors.primary} style={styles.chipIcon} />
              <Text variant="label-sm" color={theme.colors.primary}>All Classes</Text>
            </View>
            <View style={styles.filterChip}>
              <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Grade 10</Text>
            </View>
            <View style={styles.filterChip}>
              <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Grade 11</Text>
            </View>
            <View style={styles.filterChip}>
              <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Paid</Text>
            </View>
            <View style={[styles.filterChip, styles.filterChipError]}>
              <Text variant="label-sm" color={theme.colors.error}>Unpaid</Text>
            </View>
          </ScrollView>
        </Container>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Container style={styles.horizontalPadding}>
          <View style={styles.grid}>
            {students.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                grade={student.grade}
                subject={student.subject}
                status={student.status}
                nextSession={student.nextSession}
                avatarUrl={student.avatar}
                initials={student.initials}
                style={styles.card}
                onPress={() => navigation.navigate('StudentDetail', { studentId: student.id })}
                onMoreClick={() => console.log('Options for', student.name)}
              />
            ))}
          </View>
        </Container>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable style={styles.fab}>
        <Icon name="add" size={28} color={theme.colors.onPrimary} />
      </Pressable>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  stickyControls: {
    paddingTop: 88, // Below GlassHeader
    paddingBottom: 16,
    backgroundColor: 'transparent',
    zIndex: 40,
  },
  horizontalPadding: {
    paddingHorizontal: theme.spacing.containerPadding,
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: theme.colors.glass.fillLow,
    borderWidth: 1,
    borderColor: 'rgba(203, 196, 210, 0.3)',
  },
  filterChipActive: {
    backgroundColor: `${theme.colors.primary}1A`,
    borderColor: `${theme.colors.primary}4D`,
  },
  filterChipError: {
    borderColor: `${theme.colors.error}33`,
  },
  chipIcon: {
    marginRight: 4,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  grid: {
    gap: 24,
  },
  card: {
    width: '100%',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.glass.fillLow,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    zIndex: 100,
  },
});

export default StudentsListScreen;