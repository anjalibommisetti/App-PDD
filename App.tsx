import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Animated } from 'react-native';
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
import ScanScreen from './src/routes/scan';

const Stack = createStackNavigator();

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen() {
  const scale = React.useRef(new Animated.Value(0.7)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={splash.container}>
      <Animated.View style={[splash.logoBox, { transform: [{ scale }], opacity }]}>
        <Text style={splash.tooth}>🦷</Text>
        <Text style={splash.appName}>SmileGuard</Text>
        <Text style={splash.tagline}>AI Dental Care</Text>
      </Animated.View>
      <View style={splash.dotsRow}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[splash.dot, { opacity: 0.3 + i * 0.3 }]} />
        ))}
      </View>
    </View>
  );
}

const splash = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D4B42',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  logoBox: { alignItems: 'center', gap: 12 },
  tooth: { fontSize: 72 },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  dotsRow: { flexDirection: 'row', gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#86F1D4',
  },
});

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash for 2.5 seconds
    const splashTimer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    let didFinish = false;

    // Safety timeout — if session check takes >5s, stop loading anyway
    const safetyTimer = setTimeout(() => {
      if (!didFinish) {
        didFinish = true;
        setLoading(false);
      }
    }, 5000);

    // 1. Read session from localStorage (no network call needed)
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession ?? null);
      } catch (err) {
        console.error('Session check error:', err);
      } finally {
        if (!didFinish) {
          didFinish = true;
          clearTimeout(safetyTimer);
          setLoading(false);
        }
      }
    };
    checkSession();

    // 2. Listen for auth state changes (login / logout events)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => {
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, []);

  if (showSplash) return <SplashScreen />;

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
            <Stack.Screen name="Scan" component={ScanScreen} />
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
