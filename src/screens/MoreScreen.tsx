// src/screens/MoreScreen.tsx

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
import SettingRow from '../components/features/SettingRow';

const MoreScreen = () => {
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
          
          <Text variant="headline-md" color={theme.colors.onSurface} style={styles.pageTitle}>
            Settings
          </Text>

          <Spacer size="element-gap" />

          {/* Settings List */}
          <View style={styles.settingsList}>
            <SettingRow 
              label="Subjects" 
              iconName="menu_book" 
              onPress={() => console.log('Navigate to Subjects')}
            />
            
            <SettingRow 
              label="Fee Defaults" 
              iconName="payments" 
              onPress={() => console.log('Navigate to Fee Defaults')}
            />
            
            <SettingRow 
              label="Backup/Restore" 
              iconName="cloud_sync" 
              onPress={() => console.log('Navigate to Backup/Restore')}
            />

            {/* Added an extra row standard for "More" menus to show value usage */}
            <SettingRow 
              label="App Version" 
              iconName="info" 
              value="v2.4.0"
              showChevron={false} 
              onPress={() => console.log('Version info')}
            />
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
  pageTitle: {
    marginTop: 8,
  },
  settingsList: {
    gap: 16, // spacing between rows
  },
});

export default MoreScreen;