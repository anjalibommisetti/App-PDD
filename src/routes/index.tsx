import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Shield, Brain, Activity, Upload, Target, Users } from "lucide-react-native";

export default function LandingPage() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Navbar */}
        <View style={styles.navBar}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIconBg}>
              <Shield size={20} color="#fff" />
            </View>
            <Text style={styles.logoText}>SmileGuard AI</Text>
          </View>
          <View style={styles.navActions}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("RoleSelection")}
              style={styles.getStartedBtn}
            >
              <Text style={styles.getStartedBtnText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>✨ AI-Powered Oral Healthcare</Text>
          </View>
          <Text style={styles.heroTitle}>Predictive Analytics for Early Intervention</Text>
          <Text style={styles.heroSubtitle}>
            Advanced risk assessment and disease detection using state-of-the-art AI. Transforming
            dental care from reactive treatment to proactive prevention.
          </Text>
          <TouchableOpacity
            style={styles.heroCta}
            onPress={() => navigation.navigate("RoleSelection")}
          >
            <Text style={styles.heroCtaText}>Select Your Portal →</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Users size={32} color="#2563eb" />
            <Text style={styles.statValue}>10,000+</Text>
            <Text style={styles.statLabel}>Patients Analyzed</Text>
          </View>
          <View style={styles.statBox}>
            <Target size={32} color="#2563eb" />
            <Text style={styles.statValue}>98.5%</Text>
            <Text style={styles.statLabel}>AI Accuracy</Text>
          </View>
        </View>

        {/* Workflow */}
        <View style={styles.workflowSection}>
          <Text style={styles.workflowTitle}>How SmileGuard AI Works</Text>
          
          <View style={styles.workflowStep}>
            <View style={styles.stepIcon}>
              <Upload size={24} color="#fff" />
            </View>
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>1. Upload Image</Text>
              <Text style={styles.stepDesc}>Securely upload dental images or take a live scan.</Text>
            </View>
          </View>

          <View style={styles.workflowStep}>
            <View style={styles.stepIcon}>
              <Brain size={24} color="#fff" />
            </View>
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>2. AI Analysis</Text>
              <Text style={styles.stepDesc}>Our CNN model analyzes for microscopic signs of decay.</Text>
            </View>
          </View>

          <View style={styles.workflowStep}>
            <View style={styles.stepIcon}>
              <Activity size={24} color="#fff" />
            </View>
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>3. Risk Prediction</Text>
              <Text style={styles.stepDesc}>Get a comprehensive risk score and health status.</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© {new Date().getFullYear()} SmileGuard AI. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIconBg: {
    backgroundColor: "#2563eb",
    padding: 6,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  loginBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  loginBtnText: {
    color: "#475569",
    fontWeight: "600",
  },
  getStartedBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  getStartedBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  heroSection: {
    padding: 24,
    alignItems: "center",
    marginTop: 20,
  },
  heroBadge: {
    backgroundColor: "#DBEAFE",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: "#1D4ED8",
    fontWeight: "600",
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 600,
  },
  heroCta: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  heroCtaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 24,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginTop: 4,
  },
  workflowSection: {
    padding: 24,
    marginTop: 20,
  },
  workflowTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 24,
  },
  workflowStep: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: "#64748b",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 12,
  },
});
