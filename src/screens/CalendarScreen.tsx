// src/screens/CalendarScreen.tsx

import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Pressable,
  Dimensions
} from 'react-native';
import { theme } from '../theme/theme';
import ScreenWrapper from '../components/core/ScreenWrapper';
import GlassHeader from '../components/glass/GlassHeader';
import Container from '../components/core/Container';
import Spacer from '../components/core/Spacer';
import Text from '../components/core/Text';
import Icon from '../components/core/Icon';
import GlassCard from '../components/glass/GlassCard';
import CalendarEventItem, { EventVariant } from '../components/features/CalendarEventItem';

const { width } = Dimensions.get('window');
const cellWidth = (width - theme.spacing.containerPadding * 2 - 48) / 7; // Approx width for calendar grid cells

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState(11);

  // Mock data for the calendar grid
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Generating a simple mock month grid
  const monthDays = Array.from({ length: 35 }, (_, i) => {
    const dayNum = i - 4; // Offset to create empty days at the start (representing prev month)
    return {
      day: dayNum > 0 && dayNum <= 31 ? dayNum : null,
      hasEvent: [1, 3, 10, 11, 15].includes(dayNum),
    };
  });

  // Mock schedule data using 24-hour format
  const scheduleEvents = [
    {
      id: '1',
      timeRange: '09:00 - 10:30',
      title: 'Advanced Calculus',
      studentName: 'Liam Smith',
      location: 'Online',
      isOnline: true,
      variant: 'primary' as EventVariant,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-A9NxTT7doCaVv7HN7sK0h8XDznHXHRFCAnZQAXwRfpQtRKe6t7sX79dqWx9WTgQZLgTmWzBUz0uBEBVMtjHYZ6WBqcmIoZlF4YCc3kJVEFaWqzCufQdMxNjcCMB_5nVcTSepAL6yXno6H4bnmpx1ch0BglRcXhOY_KwVRNwBVa7vPNQW99sAFCHAXpCDqw42X05T1VrzpwVhAek0cbPKjCcmB6pJEXiYN6KoSl3CeDPHmgqWgw0dWJhnaWdYLXlkJd3RwIJ1gj8'
    },
    {
      id: '2',
      timeRange: '11:00 - 12:00',
      title: 'Physics 101 Intro',
      studentName: 'Emma Watson',
      location: 'In-Person',
      isOnline: false,
      variant: 'blue' as EventVariant,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3LjX8aqvbqiROGbMZuGvV15ee__bVKC1ifMlJbkpPgUwTKcK2yWsAE0m6Fzqx8__v34m8RIsIXJPr-wOM5IN9o5JfHBHHcbTjMZwzTHts-zyOxyCMYDsYoxhh1S6uEMvmNO4dMV1dUMNWXx5UPwPlR3UIHK292dXiK69DzTPO544qvgDwFep9MaZV1LJBgA1oDlVDj_hGOFdt5oQ41os5RIsRyxrdJTkgqbrsAQ4gqdgqG3Nxd12y55IkKCH99QAaiiObb26miPQ'
    },
    // Break represented as a special item in rendering
    {
      id: '3',
      timeRange: '14:00 - 15:30',
      title: 'SAT Math Prep',
      studentName: 'Noah Johnson',
      location: 'Online',
      isOnline: true,
      variant: 'primary' as EventVariant,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADFymcNhQpGKOWCTRHeVSecUE5MDcFCpn8Wck4AUj7UVFHfoBxF03Oe8dVeeUaYw1ioTD4w6_k7VWrHuUzERN8fmUJ7JglllSegRYOTL317UUvloB5OLs4KkIsB63RZTOPoSeVFvLAFFPRlNhYnwlUctT-_POGdfw_GsrlQegPBRqhoWZQFNOSTLgMtrbIUuKzsRP_5srXw3PM2AnjDYHFSWHjO_dCzquN7yx5UX8GEJp1ADUFVsHJQMMAN2eWeK63R-hwTAInOL0'
    }
  ];

  return (
    <ScreenWrapper atmospheric={true}>
      <GlassHeader
        title="Calendar"
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
          
          {/* Calendar Grid View */}
          <GlassCard rounded="xl" style={styles.calendarCard}>
            {/* Calendar Header */}
            <View style={styles.calendarHeader}>
              <Text variant="headline-md" color={theme.colors.primary}>October 2026</Text>
              <View style={styles.calendarNav}>
                <Pressable style={styles.navButton}>
                  <Icon name="chevron_left" size="md" color={theme.colors.primary} />
                </Pressable>
                <Pressable style={styles.navButton}>
                  <Icon name="chevron_right" size="md" color={theme.colors.primary} />
                </Pressable>
              </View>
            </View>

            {/* Days of Week */}
            <View style={styles.weekDaysRow}>
              {daysOfWeek.map((day) => (
                <View key={day} style={styles.dayCell}>
                  <Text variant="label-sm" color={theme.colors.secondary} style={styles.weekDayText}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Days Grid */}
            <View style={styles.daysGrid}>
              {monthDays.map((item, index) => {
                const isSelected = item.day === selectedDay;
                
                if (!item.day) {
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                }

                return (
                  <Pressable 
                    key={`day-${item.day}`} 
                    style={[
                      styles.dayCell,
                      styles.dayCellInteractive,
                      isSelected && styles.dayCellSelected
                    ]}
                    onPress={() => setSelectedDay(item.day as number)}
                  >
                    <Text 
                      variant="body-base" 
                      color={isSelected ? theme.colors.onPrimary : theme.colors.onSurface}
                      style={isSelected ? styles.selectedDayText : undefined}
                    >
                      {item.day}
                    </Text>
                    {item.hasEvent && !isSelected && (
                      <View style={styles.eventDot} />
                    )}
                    {isSelected && (
                      <View style={styles.selectedDot} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </GlassCard>

          <Spacer size="section-margin" />

          {/* Schedule View for Selected Date */}
          <GlassCard rounded="xl" style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <View>
                <Text variant="headline-md" color={theme.colors.primary}>Wednesday</Text>
                <Text variant="body-base" color={theme.colors.secondary}>October 11th</Text>
              </View>
              <Pressable style={styles.addEventBtn}>
                <Icon name="add" size="md" color={theme.colors.onPrimary} />
              </Pressable>
            </View>

            {/* Timeline */}
            <View style={styles.timelineContainer}>
              <View style={styles.timelineLine} />

              {/* Event 1 */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineNode}>
                  <View style={[styles.timelineDot, { backgroundColor: theme.colors.primary }]} />
                </View>
                <CalendarEventItem {...scheduleEvents[0]} style={styles.eventCard} />
              </View>

              {/* Event 2 */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineNode}>
                  <View style={[styles.timelineDot, { backgroundColor: theme.colors.surfaceContainerLowest }]} />
                </View>
                <CalendarEventItem {...scheduleEvents[1]} style={styles.eventCard} />
              </View>

              {/* Lunch Break */}
              <View style={styles.lunchBreakContainer}>
                <View style={styles.lunchIconWrapper}>
                  <Icon name="lunch_dining" size={16} color={theme.colors.secondary} style={{ opacity: 0.4 }} />
                </View>
                <View style={styles.lunchLine} />
                <Text variant="label-sm" color={theme.colors.secondary} style={styles.lunchText}>
                  Lunch Break
                </Text>
              </View>

              {/* Event 3 */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineNode}>
                  <View style={[styles.timelineDot, { backgroundColor: theme.colors.surfaceContainerLowest }]} />
                </View>
                <CalendarEventItem {...scheduleEvents[2]} style={styles.eventCard} />
              </View>

            </View>
          </GlassCard>

        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 88,
    paddingBottom: 120,
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
  calendarCard: {
    padding: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  calendarNav: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.glass.fillLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 11,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: cellWidth,
    height: cellWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dayCellInteractive: {
    borderRadius: 8,
  },
  dayCellSelected: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    elevation: 4,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  selectedDayText: {
    fontWeight: 'bold',
  },
  eventDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: `${theme.colors.primary}66`,
  },
  selectedDot: {
    position: 'absolute',
    bottom: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.surfaceContainerLowest,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  scheduleCard: {
    padding: 24,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  addEventBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 12,
  },
  timelineLine: {
    position: 'absolute',
    left: 21, // Centered with the dots
    top: 16,
    bottom: 16,
    width: 2,
    backgroundColor: `${theme.colors.primary}1A`, // faint primary line
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  timelineNode: {
    width: 20,
    alignItems: 'center',
    marginTop: 12, // align with the top of the card
    marginRight: 12,
    zIndex: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  eventCard: {
    flex: 1,
  },
  lunchBreakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    zIndex: 10,
  },
  lunchIconWrapper: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: theme.colors.surfaceContainerLow, // obscure the line behind it
    paddingVertical: 4,
  },
  lunchLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${theme.colors.secondary}33`,
    marginRight: 12,
  },
  lunchText: {
    opacity: 0.6,
  },
});

export default CalendarScreen;