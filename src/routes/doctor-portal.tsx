import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import {
  Users,
  Activity,
  Calendar,
  FileText,
  Settings,
  Bell,
  MessageSquare,
  ShieldAlert,
  Search,
  LogOut,
  Menu,
} from "lucide-react-native";

import DoctorDashboard from "./doctor-dashboard";
import AnalyticsDashboard from "./analytics";
import ProfileScreen from "./profile";
import PatientsModule from "./patients";
import AppointmentsModule from "./appointments";
import CommunicationModule from "./communication";
import EmergencyModule from "./emergency";
import ChatbotScreen from "./chatbot";

export default function DoctorPortal() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(Platform.OS === "web");
  const [userName, setUserName] = useState("Doctor");
  const [initials, setInitials] = useState("DR");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        let name =
          session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Doctor";
        if (!name.toLowerCase().startsWith("dr.") && !name.toLowerCase().startsWith("dr ")) {
          name = `Dr. ${name}`;
        }
        setUserName(name);
        const init = name
          .replace(/^Dr\.\s*/, "")
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        setInitials(init);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const TABS = [
    { id: "Dashboard", icon: Activity, label: "Dashboard" },
    { id: "Patients", icon: Users, label: "Patients" },
    { id: "MedicalRecords", icon: FileText, label: "Medical Records" },
    { id: "PredictionReviews", icon: Activity, label: "Prediction Reviews" },
    { id: "Appointments", icon: Calendar, label: "Appointments" },
    { id: "Prescriptions", icon: FileText, label: "Prescriptions" },
    { id: "Analytics", icon: Activity, label: "Analytics" },
    { id: "Emergency", icon: ShieldAlert, label: "High-Risk Alerts" },
    { id: "Notifications", icon: Bell, label: "Notifications" },
    { id: "Chat", icon: MessageSquare, label: "Chat" },
    { id: "Settings", icon: Settings, label: "Profile Settings" },
  ];

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <View style={styles.layoutRow}>
        {/* Sidebar */}
        {sidebarOpen && (
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <View style={styles.logoBadge}>
                <Activity size={20} color="#fff" />
              </View>
              <Text style={styles.sidebarTitle}>SmileGuard</Text>
            </View>

            <ScrollView style={styles.navMenu}>
              <Text style={styles.navSectionLabel}>DOCTOR PORTAL</Text>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={[styles.navItem, isActive && styles.navItemActive]}
                    onPress={() => {
                      setActiveTab(tab.id);
                      if (Platform.OS !== "web") setSidebarOpen(false);
                    }}
                  >
                    <tab.icon size={20} color={isActive ? "#2563EB" : "#64748B"} />
                    <Text style={[styles.navItemText, isActive && styles.navItemTextActive]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.sidebarFooter}>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <LogOut size={20} color="#DC2626" />
                <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Content Area */}
        <View style={styles.contentArea}>
          <View style={styles.topBar}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <TouchableOpacity style={styles.menuBtn} onPress={() => setSidebarOpen(!sidebarOpen)}>
                <Menu size={24} color="#64748B" />
              </TouchableOpacity>
              
              {Platform.OS === "web" && (
                <View style={styles.searchContainer}>
                  <Search size={16} color="#94A3B8" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search patients, reports..."
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              )}
            </View>

            <View style={styles.topBarRight}>
              <TouchableOpacity style={styles.bellBtn}>
                <Bell size={24} color="#64748B" />
                <View style={styles.bellBadge} />
              </TouchableOpacity>
              
              <View style={styles.profileSection}>
                {Platform.OS === "web" && (
                  <View style={{ marginRight: 12, alignItems: "flex-end" }}>
                    <Text style={styles.profileName}>{userName}</Text>
                    <Text style={styles.profileRole}>Chief Orthodontist</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.avatar} onPress={() => setActiveTab("Settings")}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.mainView}>
            {activeTab === "Dashboard" && <DoctorDashboard />}
            {activeTab === "Patients" && <PatientsModule />}
            {activeTab === "MedicalRecords" && <PatientsModule />}
            {activeTab === "PredictionReviews" && <DoctorDashboard />}
            {activeTab === "Appointments" && <AppointmentsModule />}
            {activeTab === "Prescriptions" && <PatientsModule />}
            {activeTab === "Analytics" && <AnalyticsDashboard />}
            {activeTab === "Emergency" && <EmergencyModule />}
            {activeTab === "Chat" && <ChatbotScreen />}
            {activeTab === "Notifications" && <CommunicationModule />}
            {activeTab === "Settings" && <ProfileScreen />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  layoutRow: { flex: 1, flexDirection: "row" },
  
  // Sidebar
  sidebar: {
    width: 250,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderColor: "#E2E8F0",
    ...(Platform.OS !== "web" ? { position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 50, elevation: 5 } : {}),
  },
  sidebarHeader: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  logoBadge: {
    backgroundColor: "#2563EB",
    padding: 6,
    borderRadius: 8,
  },
  sidebarTitle: { fontSize: 18, fontWeight: "bold", color: "#0F172A" },
  navMenu: { flex: 1, padding: 12 },
  navSectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#94A3B8",
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
    gap: 12,
  },
  navItemActive: { backgroundColor: "#EFF6FF" },
  navItemText: { fontSize: 15, color: "#64748B", fontWeight: "500" },
  navItemTextActive: { color: "#2563EB", fontWeight: "bold" },
  sidebarFooter: { padding: 16, borderTopWidth: 1, borderColor: "#E2E8F0" },
  logoutBtn: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12 },
  logoutBtnText: { color: "#DC2626", fontSize: 15, fontWeight: "600" },

  // Content Area
  contentArea: { flex: 1, backgroundColor: "#F8FAFC" },
  topBar: {
    height: 64,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  menuBtn: { padding: 8, marginRight: 8 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: 300,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: "100%", fontSize: 14, color: "#0F172A", outlineStyle: "none" as any },
  topBarRight: { flexDirection: "row", alignItems: "center", gap: 16 },
  bellBtn: { position: "relative", padding: 8 },
  bellBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 1,
    borderColor: "#E2E8F0",
    paddingLeft: 16,
  },
  profileName: { fontSize: 14, fontWeight: "bold", color: "#0F172A" },
  profileRole: { fontSize: 12, color: "#64748B" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#BFDBFE",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#1E40AF", fontWeight: "bold" },
  mainView: { flex: 1 },
});
