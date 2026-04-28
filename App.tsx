import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from './src/routes/index';
import SignupScreen from './src/routes/signup';
import LoginScreen from './src/routes/login';
import DashboardScreen from './src/routes/dashboard';
import AssessmentScreen from './src/routes/assessment';
import ResultsScreen from './src/routes/results';
import ReportScreen from './src/routes/report';
import ProfileScreen from './src/routes/profile';
import HistoryScreen from './src/routes/history';
import DentistsScreen from './src/routes/dentists';
import AlertsScreen from './src/routes/alerts';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8FBFB' }
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Dentists" component={DentistsScreen} />
        <Stack.Screen name="Alerts" component={AlertsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
