import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { BottomNav } from './BottomNav';

interface PhoneShellProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export const PhoneShell = ({ children, showNav = true }: PhoneShellProps) => {
  return (
    <View style={styles.root}>
      <SafeAreaView style={[styles.safeArea, Platform.OS === 'web' && styles.webSafeArea]}>
        <View style={[styles.container, showNav && styles.containerWithNav]}>
          {children}
        </View>
        {showNav && <BottomNav />}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#E2E8F0' : '#F8FAFC',
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    position: 'relative', // Ensure absolute positioned children like BottomNav stay within safe area
  },
  webSafeArea: {
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden', // Keep the phone frame clean
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  containerWithNav: {
    paddingBottom: 80, // Space for the fixed BottomNav
  },
});
