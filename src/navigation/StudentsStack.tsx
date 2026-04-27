// src/navigation/StudentsStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import Text from '../components/core/Text';

// Placeholder Screens
const StudentsListPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text variant="headline-md">Students List Screen</Text>
  </View>
);

const StudentDetailPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text variant="headline-md">Student Detail Screen</Text>
  </View>
);

const Stack = createStackNavigator();

const StudentsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudentsList" component={StudentsListPlaceholder} />
      <Stack.Screen name="StudentDetail" component={StudentDetailPlaceholder} />
    </Stack.Navigator>
  );
};

export default StudentsStack;