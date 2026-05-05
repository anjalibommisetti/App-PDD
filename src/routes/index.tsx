import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { PhoneShell } from "../components/PhoneShell";

export default function IndexScreen() {
  const navigation = useNavigation<any>();

  return (
    <PhoneShell showNav={false}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {/* Green gradient background */}
          <View style={styles.greenBg} />

          <View style={styles.content}>
            {/* Logo / Icon */}
            <View style={styles.logoCircle}>
              <Feather name="smile" size={44} color="#FFFFFF" />
            </View>

            <Text style={styles.appName}>SmileGuard AI</Text>

            <View style={styles.badge}>
              <Feather name="star" size={14} color="#FFFFFF" />
              <Text style={styles.badgeText}>AI-Powered Dental Care</Text>
            </View>

            <Text style={styles.title}>
              Your Personal{'\n'}
              <Text style={styles.titleHighlight}>Dental</Text> Assistant
            </Text>

            <Text style={styles.subtitle}>
              Detect risks early, track your brushing habits, and get
              personalised advice for a perfect smile.
            </Text>

            <View style={styles.features}>
              <FeatureRow icon="shield" text="Instant Risk Assessment" />
              <FeatureRow icon="activity" text="Track Daily Habits" />
              <FeatureRow icon="star" text="Earn Health Badges" />
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.btnPrimary}
                activeOpacity={0.85}
                onPress={() => {
                  console.log('Navigating to Login');
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.btnPrimaryText}>Get Started</Text>
                <Feather name="arrow-right" size={18} color="#157A6E" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSecondary}
                activeOpacity={0.8}
                onPress={() => {
                  console.log('Navigating to Signup');
                  navigation.navigate("Signup");
                }}
              >
                <Text style={styles.btnSecondaryText}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </PhoneShell>
  );
}

function FeatureRow({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIconBox}>
        <Feather name={icon} size={16} color="#FFFFFF" />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0D4B42',
  },
  greenBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D4B42',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#86F1D4',
    letterSpacing: 1,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 42,
    marginBottom: 12,
  },
  titleHighlight: {
    color: '#86F1D4',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 23,
    paddingHorizontal: 8,
    marginBottom: 36,
  },
  features: {
    width: '100%',
    gap: 14,
    marginBottom: 40,
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
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  actions: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D4B42',
  },
  btnSecondary: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    textDecorationLine: 'underline',
  },
});
