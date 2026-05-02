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
  const [riskLevel, setRiskLevel] = useState('Low');
  const [riskScore, setRiskScore] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch latest assessment for risk score
        const { data: assessment } = await supabase
          .from('assessments')
          .select('score, level')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (assessment) {
          setRiskScore(assessment.score);
          setRiskLevel(assessment.level);
        }

        // Fetch recent activity
        const { data: activityLogs } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (activityLogs) {
          setActivities(activityLogs);
        }
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
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

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Risk Card */}
        <View style={[styles.riskCard, { backgroundColor: riskLevel === 'High' ? '#EF4444' : riskLevel === 'Medium' ? '#F59E0B' : '#10B981' }]}>
          <View style={styles.riskTop}>
            <Text style={styles.riskLabel}>Current Risk Level</Text>
            <View style={styles.riskBadge}>
              <Text style={styles.riskBadgeText}>{riskLevel}</Text>
            </View>
          </View>
          <View style={styles.riskMiddle}>
            <Text style={styles.riskScore}>{riskScore}</Text>
            <Text style={styles.riskDesc}>{riskLevel === 'Low' ? 'Doing great' : 'Needs attention'}</Text>
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
            {activities.length > 0 ? activities.map((act, idx) => (
              <ActivityItem 
                key={idx}
                icon={act.icon || "check-circle"} 
                title={act.title} 
                time={act.time_display || "Recently"} 
                color={act.color || "#10B981"} 
              />
            )) : (
              <Text style={{ textAlign: 'center', color: '#64748B', padding: 20 }}>No recent activity</Text>
            )}
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 30,
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
