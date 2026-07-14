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
  ShieldCheck,
  Users,
  Activity,
  CheckCircle,
  LogOut,
  Menu,
  Search,
  Bell,
  Database,
  Lock,
  BarChart2,
  Settings,
  UserPlus,
  UserCheck,
  UserX,
  FileText,
} from "lucide-react-native";

import AnalyticsDashboard from "./analytics";
import AdminMonitoring from "./admin-monitoring";
import AdminSecurity from "./admin-security";
import AdminReports from "./admin-reports";
import AdminNotifications from "./admin-notifications";
import AdminSettings from "./admin-settings";

export default function AdminPortal() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(Platform.OS === "web");
  const [userName, setUserName] = useState("Admin");
  const [initials, setInitials] = useState("AD");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        let name =
          session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Admin";
        setUserName(name);
        const init = name
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
    { id: "ManageUsers", icon: Users, label: "Manage Users" },
    { id: "ManageDoctors", icon: UserCheck, label: "Manage Doctors" },
    { id: "Analytics", icon: BarChart2, label: "Platform Analytics" },
    { id: "Reports", icon: FileText, label: "Reports" },
    { id: "Monitoring", icon: Database, label: "Database Monitoring" },
    { id: "Security", icon: Lock, label: "Security Management" },
    { id: "Notifications", icon: Bell, label: "Notifications" },
    { id: "ActivityLogs", icon: Activity, label: "Activity Logs" },
    { id: "Settings", icon: Settings, label: "System Settings" },
  ];

  const MOCK_USERS = [
    { id: "1", name: "Dr. Sarah Smith", role: "Doctor", status: "Active", joined: "May 10, 2026" },
    { id: "2", name: "Emily Chen", role: "Patient", status: "Active", joined: "May 12, 2026" },
    { id: "3", name: "Dr. Michael Jones", role: "Doctor", status: "Pending Approval", joined: "May 14, 2026" },
    { id: "4", name: "John Doe", role: "Patient", status: "Active", joined: "May 15, 2026" },
  ];

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <View style={styles.layoutRow}>
        {/* Sidebar */}
        {sidebarOpen && (
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <View style={styles.logoBadge}>
                <ShieldCheck size={20} color="#fff" />
              </View>
              <Text style={styles.sidebarTitle}>Admin Portal</Text>
            </View>

            <ScrollView style={styles.navMenu}>
              <Text style={styles.navSectionLabel}>ADMINISTRATION</Text>
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
                    <tab.icon size={20} color={isActive ? "#9333EA" : "#64748B"} />
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
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <TouchableOpacity style={styles.menuBtn} onPress={() => setSidebarOpen(!sidebarOpen)}>
                <Menu size={24} color="#64748B" />
              </TouchableOpacity>
              
              {Platform.OS === "web" && (
                <View style={styles.searchContainer}>
                  <Search size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search users, logs, reports..."
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
                    <Text style={styles.profileRole}>Superuser</Text>
                  </View>
                )}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.mainView}>
            {activeTab === "Dashboard" && (
              <ScrollView style={styles.dashboardContainer} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Enterprise Header */}
                <View style={styles.headerRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.welcomeTitle}>Enterprise Overview</Text>
                    <Text style={styles.welcomeSubtitle}>System metrics, security, and platform analytics.</Text>
                  </View>
                  <View style={styles.systemStatusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>System Online</Text>
                  </View>
                </View>

                {/* Stat Cards */}
                <View style={styles.statsGrid}>
                  {[
                    { label: "Total Users", value: "24,892", icon: Users, color: "#A855F7" },
                    { label: "Active Doctors", value: "450", icon: UserCheck, color: "#3B82F6" },
                    { label: "Total Predictions", value: "148,291", icon: Activity, color: "#EC4899" },
                    { label: "System Health", value: "99.99%", icon: CheckCircle, color: "#10B981" },
                  ].map((stat, i) => (
                    <View key={i} style={styles.statCard}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                        <Text style={styles.statValue}>{stat.value}</Text>
                      </View>
                      <View style={[styles.statIconWrapper, { borderColor: stat.color }]}>
                        <stat.icon size={24} color={stat.color} />
                      </View>
                    </View>
                  ))}
                </View>

                {/* Database Health & Security */}
                <View style={styles.twoColGrid}>
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Database size={20} color="#3B82F6" />
                      <Text style={styles.cardTitle}>Database Monitoring</Text>
                    </View>
                    {["PostgreSQL Cluster", "Supabase Auth Node", "AI Endpoint (Render)"].map((node, i) => (
                      <View key={i} style={styles.dbRow}>
                        <Text style={styles.dbNodeText}>{node}</Text>
                        <View style={styles.dbStatusBadge}>
                          <Text style={styles.dbStatusText}>Optimal</Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Lock size={20} color="#F59E0B" />
                      <Text style={styles.cardTitle}>Security Management</Text>
                    </View>
                    <View style={styles.securityAlert}>
                      <ShieldCheck size={32} color="#F59E0B" />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.securityTitle}>Zero Threats Detected</Text>
                        <Text style={styles.securitySubtitle}>
                          All encryption protocols are active. Firewall blocking 14 unauthorized attempts/hr.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}

            {(activeTab === "ManageUsers" || activeTab === "ManageDoctors") && (
              <ScrollView style={styles.dashboardContainer} contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.headerRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.welcomeTitle}>{activeTab === "ManageUsers" ? "Manage Users" : "Manage Doctors"}</Text>
                    <Text style={styles.welcomeSubtitle}>Manage users and Access Controls.</Text>
                  </View>
                  <TouchableOpacity style={styles.addUserBtn}>
                    <UserPlus size={16} color="#fff" />
                    <Text style={{ color: "#fff", fontWeight: "bold", marginLeft: 8 }}>Add User</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.tableCard}>
                  {MOCK_USERS.map((user, i) => (
                    <View key={user.id} style={[styles.tableRow, i !== MOCK_USERS.length - 1 && styles.tableRowBorder]}>
                      <View style={{ flex: 2 }}>
                        <Text style={styles.tableTextMain}>{user.name}</Text>
                        <Text style={styles.tableTextSub}>{user.joined}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.tableRoleText}>{user.role}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.tableStatusText, user.status === "Pending Approval" && { color: "#F59E0B" }]}>
                          {user.status}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TouchableOpacity>
                          <Text style={styles.tableActionText}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}

            {activeTab === "Monitoring" && <AdminMonitoring />}
            {activeTab === "ActivityLogs" && <AdminMonitoring />}
            {activeTab === "Security" && <AdminSecurity />}
            {activeTab === "Reports" && <AdminReports />}
            {activeTab === "Notifications" && <AdminNotifications />}
            {activeTab === "Settings" && <AdminSettings />}
            {activeTab === "Analytics" && <AnalyticsDashboard />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#0F172A" },
  layoutRow: { flex: 1, flexDirection: "row" },
  
  // Sidebar
  sidebar: {
    width: 250,
    backgroundColor: "#1E293B",
    borderRightWidth: 1,
    borderColor: "#334155",
    ...(Platform.OS !== "web" ? { position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 50, elevation: 5 } : {}),
  },
  sidebarHeader: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#334155",
    gap: 12,
  },
  logoBadge: {
    backgroundColor: "#9333EA",
    padding: 6,
    borderRadius: 8,
  },
  sidebarTitle: { fontSize: 18, fontWeight: "bold", color: "#F8FAFC" },
  navMenu: { flex: 1, padding: 12 },
  navSectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
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
  navItemActive: { backgroundColor: "#3B0764" },
  navItemText: { fontSize: 15, color: "#94A3B8", fontWeight: "500" },
  navItemTextActive: { color: "#D8B4FE", fontWeight: "bold" },
  sidebarFooter: { padding: 16, borderTopWidth: 1, borderColor: "#334155" },
  logoutBtn: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12 },
  logoutBtnText: { color: "#EF4444", fontSize: 15, fontWeight: "600" },

  // Content Area
  contentArea: { flex: 1, backgroundColor: "#0F172A" },
  topBar: {
    height: 64,
    backgroundColor: "#1E293B",
    borderBottomWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  menuBtn: { padding: 8, marginRight: 8 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: 300,
  },
  searchInput: { flex: 1, height: "100%", fontSize: 14, color: "#F8FAFC", outlineStyle: "none" as any },
  topBarRight: { flexDirection: "row", alignItems: "center", gap: 16 },
  bellBtn: { position: "relative", padding: 8 },
  bellBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: "#A855F7",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 1,
    borderColor: "#334155",
    paddingLeft: 16,
  },
  profileName: { fontSize: 14, fontWeight: "bold", color: "#F8FAFC" },
  profileRole: { fontSize: 12, color: "#94A3B8" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#7E22CE", fontWeight: "bold" },
  mainView: { flex: 1 },

  // Dashboard Tab
  dashboardContainer: { padding: 16, flex: 1 },
  headerRow: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    justifyContent: "space-between",
    alignItems: Platform.OS === "web" ? "center" : "flex-start",
    marginBottom: 24,
    gap: 16,
  },
  welcomeTitle: { fontSize: 24, fontWeight: "bold", color: "#F8FAFC", marginBottom: 4 },
  welcomeSubtitle: { fontSize: 16, color: "#94A3B8" },
  systemStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#A855F7",
    borderRadius: 8,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#10B981" },
  statusText: { color: "#F3E8FF", fontWeight: "bold", fontSize: 14 },

  statsGrid: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  statLabel: { fontSize: 12, fontWeight: "bold", color: "#94A3B8", marginBottom: 8, textTransform: "uppercase" },
  statValue: { fontSize: 32, fontWeight: "bold", color: "#F8FAFC" },
  statIconWrapper: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },

  twoColGrid: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    gap: 24,
  },
  card: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 24,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#F8FAFC" },
  
  dbRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#0F172A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 12,
  },
  dbNodeText: { color: "#CBD5E1", fontSize: 14, fontWeight: "500" },
  dbStatusBadge: { backgroundColor: "#064E3B", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  dbStatusText: { color: "#34D399", fontSize: 12, fontWeight: "bold" },

  securityAlert: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#451A03",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#78350F",
  },
  securityTitle: { color: "#FBBF24", fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  securitySubtitle: { color: "#94A3B8", fontSize: 12 },

  addUserBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9333EA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  tableCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1E293B",
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderColor: "#334155",
  },
  tableTextMain: { color: "#F8FAFC", fontWeight: "bold", fontSize: 14 },
  tableTextSub: { color: "#94A3B8", fontSize: 12, marginTop: 4 },
  tableRoleText: { color: "#9333EA", fontWeight: "bold", fontSize: 14 },
  tableStatusText: { color: "#10B981", fontWeight: "bold", fontSize: 12 },
  tableActionText: { color: "#D8B4FE", fontWeight: "bold", fontSize: 14 },
});
