import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Platform, ActivityIndicator } from 'react-native';
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
    // 1. Initial session check
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession) {
          console.log('Session found on mount');
          setSession(currentSession);
        }
      } catch (err) {
        console.error('Initial check error:', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();

    // 2. Live "Auto-Login" background logic
    // We poll the session every 3 seconds ONLY if no session is active.
    let interval: any;
    if (!session) {
      interval = setInterval(async () => {
        const { data: { session: newSession } } = await supabase.auth.getSession();
        if (newSession) {
          console.log('Live background auto-login detected!');
          setSession(newSession);
        }
      }, 3000);
    }

    // 3. Listen for real-time auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log('Auth event:', _event, newSession ? 'Session Active' : 'No Session');
      setSession(newSession);
    });

    return () => {
      if (interval) clearInterval(interval);
      subscription.unsubscribe();
    };
  }, [session]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FBFB' }}>
        <ActivityIndicator size="large" color="#157A6E" />
        <Text style={{ marginTop: 12, color: '#64748B' }}>Loading SmileGuard...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F8FBFB' },
          detachPreviousScreen: Platform.OS !== 'web',
        }}
      >
        {session ? (
          // Protected Screens
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Assessment" component={AssessmentScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Dentists" component={DentistsScreen} />
            <Stack.Screen name="Alerts" component={AlertsScreen} />
          </>
        ) : (
          // Auth Screens
          <>
            <Stack.Screen name="Index" component={IndexScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
