import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from 'react';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fullName = user?.user_metadata?.full_name || "User";
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <PhoneShell>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>{fullName}</Text>
        </View>
        <TouchableOpacity 
          style={styles.avatar}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Risk Card */}
        <View style={styles.riskCard}>
          <View style={styles.riskTop}>
            <Text style={styles.riskLabel}>Current Risk Level</Text>
            <View style={styles.riskBadge}>
              <Text style={styles.riskBadgeText}>High</Text>
            </View>
          </View>
          <View style={styles.riskMiddle}>
            <Text style={styles.riskScore}>78</Text>
            <Text style={styles.riskDesc}>Needs attention</Text>
          </View>
          <TouchableOpacity 
            style={styles.riskBtn}
            onPress={() => navigation.navigate("Assessment")}
          >
            <Text style={styles.riskBtnText}>Re-assess now</Text>
            <Feather name="arrow-right" size={16} color="#0D4B42" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.grid}>
            <ActionCard 
              icon="calendar" 
              title="Book Visit" 
              color="#E0E7FF" 
              iconColor="#4F46E5" 
              onPress={() => navigation.navigate("Dentists")}
            />
            <ActionCard 
              icon="activity" 
              title="History" 
              color="#DCFCE7" 
              iconColor="#16A34A" 
              onPress={() => navigation.navigate("History")}
            />
            <ActionCard 
              icon="file-text" 
              title="Reports" 
              color="#FEF9C3" 
              iconColor="#CA8A04" 
              onPress={() => navigation.navigate("Report")}
            />
            <ActionCard 
              icon="bell" 
              title="Alerts" 
              color="#FCE7F3" 
              iconColor="#DB2777" 
              onPress={() => navigation.navigate("Alerts")}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <ActivityItem 
              icon="check-circle" 
              title="Brushed teeth" 
              time="Today, 8:00 AM" 
              color="#10B981" 
            />
            <ActivityItem 
              icon="alert-triangle" 
              title="Gum bleeding reported" 
              time="Yesterday" 
              color="#EF4444" 
            />
            <ActivityItem 
              icon="shield" 
              title="Risk assessment completed" 
              time="3 days ago" 
              color="#3B82F6" 
            />
          </View>
        </View>
      </View>
    </PhoneShell>
  );
}

function ActionCard({ icon, title, color, iconColor, onPress }: any) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.actionIconBox, { backgroundColor: color }]}>
        <Feather name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function ActivityItem({ icon, title, time, color }: any) {
  return (
    <View style={styles.activityItem}>
      <View style={[styles.activityIconBox, { backgroundColor: color + '20' }]}>
        <Feather name={icon} size={16} color={color} />
      </View>
      <View style={styles.activityBody}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#64748B',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#86F1D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D4B42',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 24,
  },
  riskCard: {
    backgroundColor: '#EF4444',
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  riskTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  riskBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  riskMiddle: {
    marginTop: 16,
  },
  riskScore: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  riskDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  riskBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
  },
  riskBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  section: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityBody: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  activityTime: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  }
});
