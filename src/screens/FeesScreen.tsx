// src/screens/FeesScreen.tsx

import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View 
} from 'react-native';
import { theme } from '../theme/theme';
import ScreenWrapper from '../components/core/ScreenWrapper';
import GlassHeader from '../components/glass/GlassHeader';
import Container from '../components/core/Container';
import Spacer from '../components/core/Spacer';
import Text from '../components/core/Text';
import Icon from '../components/core/Icon';
import GlassCard from '../components/glass/GlassCard';
import GlassButton from '../components/glass/GlassButton';
import FeeTransactionRow, { TransactionStatus, TransactionVariant } from '../components/features/FeeTransactionRow';

const FeesScreen = () => {
  // Mock transaction data based on HTML
  const transactions = [
    {
      id: '1',
      title: 'Advanced Calculus Prep',
      studentName: 'Sarah Jenkins',
      date: 'Oct 24, 2026',
      amount: 450.00,
      status: 'paid' as TransactionStatus,
      iconName: 'school',
      variant: 'primary' as TransactionVariant,
    },
    {
      id: '2',
      title: 'Literature Review Session',
      studentName: 'Michael Chang',
      date: 'Oct 22, 2026',
      amount: 200.00,
      status: 'paid' as TransactionStatus,
      iconName: 'menu_book',
      variant: 'tertiary' as TransactionVariant,
    },
    {
      id: '3',
      title: 'Physics Lab Assistance',
      studentName: 'Emma Davis',
      date: 'Oct 15, 2026',
      amount: 350.00,
      status: 'overdue' as TransactionStatus,
      iconName: 'science',
      variant: 'error' as TransactionVariant,
    }
  ];

  return (
    <ScreenWrapper atmospheric={true}>
      <GlassHeader
        title="Fees"
        subtitle="Financial Overview"
        actions={
          <View style={styles.headerAction}>
            <Icon name="notifications" size="md" color={theme.colors.primary} />
          </View>
        }
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Container style={styles.horizontalPadding}>
          
          {/* Header Section */}
          <View style={styles.sectionHeader}>
            <View style={styles.headerTextContainer}>
              <Text variant="headline-lg" color={theme.colors.onSurface}>Financial Overview</Text>
              <Text variant="body-base" color={theme.colors.onSurfaceVariant}>
                Track your received payments and outstanding balances.
              </Text>
            </View>
            <GlassButton variant="primary" iconName="add" style={styles.logPaymentBtn}>
              Log Payment
            </GlassButton>
          </View>

          <Spacer size="gutter" />

          {/* Top Dashboard Grid */}
          <View style={styles.dashboardGrid}>
            
            {/* Total Collected Card */}
            <GlassCard rounded="2xl" blobColor={theme.colors.primaryFixed} style={styles.collectedCard}>
              <View style={styles.collectedHeader}>
                <View>
                  <Text variant="label-sm" color={theme.colors.onSurfaceVariant} style={styles.trackingWidest}>
                    TOTAL COLLECTED
                  </Text>
                  <Text variant="display-xl" color={theme.colors.onSurface}>$24,500</Text>
                </View>
                <View style={styles.ytdBadge}>
                  <View style={styles.ytdDot} />
                  <Text variant="label-sm" color={theme.colors.onSurface}>Year to Date</Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressRow}>
                  <Text variant="label-sm" color={theme.colors.onSurfaceVariant}>Collection Progress</Text>
                  <Text variant="label-sm" color={theme.colors.primary} style={styles.progressPercent}>82%</Text>
                </View>
                
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '82%' }]} />
                </View>
                
                <View style={styles.progressFooter}>
                  <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.targetText}>
                    Target: $30,000
                  </Text>
                  <Text variant="body-base" color={theme.colors.onSurfaceVariant} style={styles.targetText}>
                    $5,500 Remaining
                  </Text>
                </View>
              </View>
            </GlassCard>

            <Spacer size="element-gap" />

            {/* Overdue Alert Card */}
            <GlassCard rounded="2xl" style={styles.overdueCard}>
              <View style={styles.overdueHeader}>
                <View style={styles.overdueIconWrapper}>
                  <Icon name="warning" size="md" color={theme.colors.onErrorContainer} />
                </View>
                <Text variant="headline-md" color={theme.colors.error}>Overdue</Text>
              </View>
              
              <Text variant="display-xl" color={theme.colors.onSurface} style={styles.overdueAmount}>
                $1,250
              </Text>
              <Text variant="body-base" color={theme.colors.error} style={styles.overdueSubtitle}>
                3 payments require attention
              </Text>

              <View style={styles.overdueBtnWrapper}>
                 <GlassButton variant="ghost" fullWidth textStyle={{ color: theme.colors.error }}>
                    View Details
                 </GlassButton>
              </View>
            </GlassCard>

          </View>

          <Spacer size="section-margin" />

          {/* Recent Transactions List */}
          <View>
            <View style={styles.listHeader}>
              <Icon name="history" size="md" color={theme.colors.primary} />
              <Text variant="headline-md" color={theme.colors.onSurface}>Recent Transactions</Text>
            </View>
            
            <Spacer size="element-gap" />

            <View style={styles.listContainer}>
              {transactions.map((tx, index) => (
                <FeeTransactionRow
                  key={tx.id}
                  title={tx.title}
                  studentName={tx.studentName}
                  date={tx.date}
                  amount={tx.amount}
                  status={tx.status}
                  iconName={tx.iconName}
                  variant={tx.variant}
                  style={index === 0 ? styles.firstListItem : undefined}
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
    gap: 16,
  },
  headerTextContainer: {
    gap: 4,
  },
  logPaymentBtn: {
    alignSelf: 'flex-start',
  },
  dashboardGrid: {
    gap: 16,
  },
  collectedCard: {
    padding: 24,
    minHeight: 220,
    justifyContent: 'space-between',
  },
  trackingWidest: {
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  collectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  ytdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: theme.colors.surfaceVariant,
  },
  ytdDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.tertiary,
  },
  progressSection: {
    gap: 12,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressPercent: {
    fontWeight: '700',
  },
  progressBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(230, 224, 233, 0.5)', // surface-container-highest/50
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetText: {
    fontSize: 14,
  },
  overdueCard: {
    padding: 24,
    backgroundColor: 'rgba(186, 26, 26, 0.05)', // error-container/10 approximation
    borderColor: 'rgba(186, 26, 26, 0.2)', // border-error/20
  },
  overdueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  overdueIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overdueAmount: {
    marginBottom: 4,
  },
  overdueSubtitle: {
    fontWeight: '500',
    opacity: 0.8,
  },
  overdueBtnWrapper: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.2)',
    borderRadius: theme.rounded.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listContainer: {
    borderRadius: theme.rounded.xl,
    overflow: 'hidden',
    backgroundColor: theme.colors.glass.fillLow, // Groups the rows visually
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  firstListItem: {
    borderTopWidth: 0, // Prevent double border if Row has top border
  },
});

export default FeesScreen;