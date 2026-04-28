import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";

const badges = [
  { name: "Healthy Habits", icon: "star", tone: "mint" },
  { name: "Risk Reducer", icon: "shield", tone: "peach" },
  { name: "Consistent", icon: "award", tone: "beige" },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <PhoneShell>
      <ScreenHeader title="Profile" />

      <View style={styles.content}>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View>
            <Text style={styles.userName}>Jane Doe</Text>
            <Text style={styles.userEmail}>jane@example.com</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>Patient</Text>
            </View>
          </View>
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <View style={styles.streakTop}>
            <Feather name="zap" size={28} color="#7C3AED" />
            <View>
              <Text style={styles.streakDays}>5 days</Text>
              <Text style={styles.streakLabel}>Oral care streak</Text>
            </View>
          </View>
          <View style={styles.streakGrid}>
            {Array.from({ length: 7 }).map((_, i) => (
              <View 
                key={i} 
                style={[styles.streakDay, i < 5 ? styles.streakDayActive : styles.streakDayInactive]} 
              />
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Brushing</Text>
            <Text style={styles.statVal}>86%</Text>
            <Text style={styles.statDesc}>Consistent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Risk change</Text>
            <Text style={styles.statVal}>−12%</Text>
            <Text style={styles.statDesc}>Improving</Text>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgesCard}>
          <Text style={styles.badgesTitle}>Badges</Text>
          <View style={styles.badgesGrid}>
            {badges.map((b) => {
              const bg = b.tone === "mint" ? "rgba(134, 241, 212, 0.4)" : 
                         b.tone === "peach" ? "rgba(255, 205, 178, 0.5)" : "#F1F5F9";
              return (
                <View key={b.name} style={[styles.badgeItem, { backgroundColor: bg }]}>
                  <Feather name={b.icon as any} size={24} color="#0F172A" />
                  <Text style={styles.badgeName}>{b.name}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          <MenuRow icon="settings" label="Settings" />
          <View style={styles.divider} />
          <MenuRow icon="shield" label="Privacy & data sharing" />
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.menuRow}
            onPress={() => navigation.navigate("Index")}
          >
            <View style={styles.menuRowLeft}>
              <Feather name="log-out" size={16} color="#EF4444" />
              <Text style={[styles.menuLabel, { color: '#EF4444' }]}>Log out</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </PhoneShell>
  );
}

function MenuRow({ icon, label }: { icon: any; label: string }) {
  return (
    <TouchableOpacity style={styles.menuRow}>
      <View style={styles.menuRowLeft}>
        <Feather name={icon} size={16} color="#0F172A" />
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Feather name="chevron-right" size={16} color="#94A3B8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 96,
    gap: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#86F1D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D4B42',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  userEmail: {
    fontSize: 12,
    color: '#64748B',
  },
  roleBadge: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(134, 241, 212, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0D4B42',
  },
  streakCard: {
    backgroundColor: '#FFCDB2',
    borderRadius: 24,
    padding: 20,
  },
  streakTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakDays: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  streakLabel: {
    fontSize: 12,
    color: 'rgba(124, 58, 237, 0.8)',
  },
  streakGrid: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  streakDay: {
    flex: 1,
    height: 32,
    borderRadius: 8,
  },
  streakDayActive: {
    backgroundColor: '#FFFFFF',
  },
  streakDayInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  statVal: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  statDesc: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  badgesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  badgesTitle: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  badgesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  badgeItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    borderRadius: 16,
    padding: 12,
  },
  badgeName: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0F172A',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  }
});
