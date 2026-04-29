import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import React from 'react';

// Disable native screens on web to prevent aria-hidden and focus warnings
if (Platform.OS === 'web') {
  enableScreens(false);
}
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from './src/lib/supabase';
import { useEffect, useState } from 'react';

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

const Stack = createStackNavigator();

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(true); // Still loading for listener to settle? No, let's just set it.
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null; // Or a splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={session ? "Dashboard" : "Index"}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F8FBFB' },
          detachPreviousScreen: Platform.OS !== 'web' // Only detach on native for performance
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
