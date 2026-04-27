// src/screens/AttendanceScreen.tsx

import React, { useState } from 'react';
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
import AttendanceRow, { AttendanceStatus } from '../components/features/AttendanceRow';

const AttendanceScreen = () => {
  const [selectedDate, setSelectedDate] = useState(14); // Mock active date

  // Mock student data from HTML
  const [students, setStudents] = useState([
    {
      id: 'PH101-042',
      name: 'Emma Thompson',
      status: 'present' as AttendanceStatus,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSf8_vulZF4jGpqNtX67ULtd9gVxeSH2OpEdi1xK9wp4dCZTOu7cBVqMUr0IWu7AvNS9lNyCG_NOi5RgdvsRGNQHVPMYNeGybWQWjI3w3PKo2lXRoD2FeJxH6CjQiONnR6hOtyUnJK4yIwL2RPCJsRK-WL8Vq8_UdkYGULEYiOK6cgnmNe1dGBJTzdRavzcb6FhzBtp36x9dD2tSSz5lVbRCoNjA5-dKgX8WtymxCPkYtxu4ZzTmB7_LHeBQzVCGcKuW7OIhk3ZUw'
    },
    {
      id: 'PH101-018',
      name: 'Liam Chen',
      status: 'absent' as AttendanceStatus,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7sdJStNQQ1TszINcpbviR3yUxLcNys7hSgLV40TmxhFVfMlA3I0Aye3zCmYyb_KZLSQGF3-Owr1ISPWyfbCX3bs0rBnYWLLF9n6BmtAlzHScCj09UDkdIMUe_KbUW2zWUbS7SkIgfD6rW5OAGbfBt7KuISQZty-NpVAhM-6kkUE3FXvWtSeubrH0jxqbOWev7AdtFtuQkPR4sIkfSD_S3pXul1S7p7WFJeKcSOwACb1b_ocPt1PIHNFRxzFKwUrBgjQIIAT2Yfzg'
    },
    {
      id: 'PH101-089',
      name: 'Sophia Patel',
      status: 'unmarked' as AttendanceStatus,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMO0Rfnm8zHZDU2Ry9ihFVmoiFORfsdx_Hq2Vq5r5BOPfgJjx9kJGs-t6tUFdZZe1421jgwllropn48N1ZMNb1OpmHbCKthr1RvjB8bP6r26QoMznLGZWqIlAWjxZc1AzruXVwu_-R_VswH5cEzH8_0fZEV_reFyrw7AT5geGouwTRxL0Hv9HVUMhIZ3xDVj7DU5uA1uyi_zrc6150k6qhJytXBYf3e710JA7kP4RFE48rV4NI-hRsOyGVMOtuRMul_szeqpkj_8g'
    },
    {
      id: 'PH101-095',
      name: 'Noah Williams',
      status: 'unmarked' as AttendanceStatus,
      initials: 'NW'
    }
  ]);

  const dates = [
    { day: 'Mon', date: 12 },
    { day: 'Tue', date: 13 },
    { day: 'Wed', date: 14 },
    { day: 'Thu', date: 15 },
    { day: 'Fri', date: 16 },
  ];

  const handleMark = (studentId: string, status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status } : s));
  };

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
            <View>
              <Text variant="headline-lg" color={theme.colors.onSurface}>Attendance</Text>
              <Text variant="body-base" color={theme.colors.onSurfaceVariant}>
                Physics 101 - Morning Batch
              </Text>
            </View>
            
            <View style={styles.desktopActionFallback}>
               <Pressable style={styles.bulkActionBtn}>
                  <Icon name="done_all" size="sm" color={theme.colors.onPrimary} />
                  <Text variant="label-sm" color={theme.colors.onPrimary}>Mark All Present</Text>
               </Pressable>
            </View>
          </View>

          <Spacer size="gutter" />

          {/* Date Selector */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.dateSelector}
          >
            {dates.map((item) => {
              const isActive = selectedDate === item.date;
              return (
                <Pressable 
                  key={item.date}
                  onPress={() => setSelectedDate(item.date)}
                  style={[
                    styles.dateChip,
                    isActive && styles.dateChipActive
                  ]}
                >
                  {isActive && <View style={styles.activeDot} />}
                  <Text 
                    variant="label-sm" 
                    color={isActive ? theme.colors.primary : theme.colors.onSurfaceVariant}
                    style={styles.dateLabel}
                  >
                    {item.day}
                  </Text>
                  <Text 
                    variant="headline-md" 
                    color={isActive ? theme.colors.primary : theme.colors.onSurface}
                  >
                    {item.date}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Spacer size="gutter" />

          {/* Student Attendance List */}
          <View style={styles.listContainer}>
            {students.map((student) => (
              <AttendanceRow
                key={student.id}
                name={student.name}
                studentId={student.id}
                avatarUrl={student.avatar}
                initials={student.initials}
                status={student.status}
                onMarkPresent={() => handleMark(student.id, 'present')}
                onMarkAbsent={() => handleMark(student.id, 'absent')}
                style={styles.rowItem}
              />
            ))}
          </View>
        </Container>
      </ScrollView>

      {/* Floating Action Button for Mobile Bulk Mark */}
      <Pressable style={styles.fab}>
        <Icon name="done_all" size={28} color={theme.colors.onPrimary} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  desktopActionFallback: {
    // Hide on small mobile if screen width is too low, but present for design fidelity
  },
  bulkActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 4,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  dateSelector: {
    gap: 16,
    paddingVertical: 8,
  },
  dateChip: {
    minWidth: 80,
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.glass.fillLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.7,
  },
  dateChipActive: {
    backgroundColor: 'rgba(79, 55, 138, 0.1)',
    borderColor: 'rgba(79, 55, 138, 0.3)',
    opacity: 1,
  },
  dateLabel: {
    marginBottom: 4,
  },
  activeDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  listContainer: {
    gap: 12,
  },
  rowItem: {
    width: '100%',
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
  },
});

export default AttendanceScreen;