// src/navigation/StudentsStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import actual screens built in Phase 5
import StudentsListScreen from '../screens/Students/StudentsListScreen';
import StudentDetailScreen from '../screens/Students/StudentDetailScreen';

export type StudentsStackParamList = {
  StudentsList: undefined;
  StudentDetail: { studentId: string };
};

const Stack = createStackNavigator<StudentsStackParamList>();

const StudentsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudentsList" component={StudentsListScreen} />
      <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
    </Stack.Navigator>
  );
};

export default StudentsStack;