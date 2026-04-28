import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

interface PhoneShellProps {
  children: React.ReactNode;
}

export const PhoneShell = ({ children }: PhoneShellProps) => {
  return (
    <View style={styles.root}>
      <SafeAreaView style={[styles.safeArea, Platform.OS === 'web' && styles.webSafeArea]}>
        <View style={styles.container}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#E2E8F0' : '#F8FAFC', // Darker background on web to frame the phone
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webSafeArea: {
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
