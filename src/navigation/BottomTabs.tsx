// src/navigation/BottomTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../theme/theme';
import Icon from '../components/core/Icon';
import StudentsStack from './StudentsStack';

// Import the actual screens we built in Phase 5
import DashboardScreen from '../screens/DashboardScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import FeesScreen from '../screens/FeesScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceContainerLow,
          borderTopColor: theme.colors.outlineVariant,
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'dashboard';

          if (route.name === 'Dashboard') iconName = 'dashboard';
          else if (route.name === 'StudentsTab') iconName = 'groups';
          else if (route.name === 'Attendance') iconName = 'how_to_reg';
          else if (route.name === 'Fees') iconName = 'payments';
          else if (route.name === 'More') iconName = 'menu';

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen 
        name="StudentsTab" 
        component={StudentsStack} 
        options={{ tabBarLabel: 'Students' }} 
      />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Fees" component={FeesScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;