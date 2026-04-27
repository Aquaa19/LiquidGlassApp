// src/navigation/BottomTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { theme } from '../theme/theme';
import Icon from '../components/core/Icon';
import Text from '../components/core/Text';
import StudentsStack from './StudentsStack';

// Placeholder Screens
const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text variant="headline-md">{name} Screen</Text>
  </View>
);

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
          else if (route.name === 'Attendance') iconName = 'calendar_today';
          else if (route.name === 'Fees') iconName = 'payments';
          else if (route.name === 'More') iconName = 'menu';

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={() => <Placeholder name="Dashboard" />} />
      <Tab.Screen 
        name="StudentsTab" 
        component={StudentsStack} 
        options={{ tabBarLabel: 'Students' }} 
      />
      <Tab.Screen name="Attendance" component={() => <Placeholder name="Attendance" />} />
      <Tab.Screen name="Fees" component={() => <Placeholder name="Fees" />} />
      <Tab.Screen name="More" component={() => <Placeholder name="More" />} />
    </Tab.Navigator>
  );
};

export default BottomTabs;