import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { PhoneShell } from "../components/PhoneShell";

export default function IndexScreen() {
  const navigation = useNavigation<any>();

  return (
    <PhoneShell showNav={false}>
      <View style={styles.innerContainer}>
        <View style={styles.content}>
          <View style={styles.badge}>
            <Feather name="star" size={14} color="#157A6E" />
            <Text style={styles.badgeText}>AI-Powered Dental Care</Text>
          </View>
          
          <Text style={styles.title}>
            Your Personal <Text style={styles.titleHighlight}>Dental</Text> Assistant
          </Text>
          
          <Text style={styles.subtitle}>
            Detect risks early, track your brushing habits, and get personalized advice for a perfect smile.
          </Text>

          <View style={styles.features}>
            <FeatureRow icon="shield" text="Instant Risk Assessment" />
            <FeatureRow icon="activity" text="Track Daily Habits" />
            <FeatureRow icon="star" text="Earn Health Badges" />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.btnPrimary}
              activeOpacity={0.8}
              onPress={() => {
                console.log('Navigating to Signup');
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.btnPrimaryText}>Get Started</Text>
              <Feather name="arrow-right" size={18} color="#0D4B42" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.btnSecondary}
              activeOpacity={0.8}
              onPress={() => {
                console.log('Navigating to Login');
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.btnSecondaryText}>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PhoneShell>
  );
}

function FeatureRow({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIconBox}>
        <Feather name={icon} size={16} color="#157A6E" />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFB',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(134, 241, 212, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 24,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#157A6E',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F172A',
    lineHeight: 44,
  },
  titleHighlight: {
    color: '#157A6E',
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#64748B',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  features: {
    marginTop: 40,
    width: '100%',
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  actions: {
    marginTop: 'auto',
    width: '100%',
    gap: 12,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#86F1D4',
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#86F1D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D4B42',
  },
  btnSecondary: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  }
});
