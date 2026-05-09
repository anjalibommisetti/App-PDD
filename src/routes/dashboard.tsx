import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState('User');
  const [initials, setInitials] = useState('U');
  const [riskLevel, setRiskLevel] = useState('');
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [patientName, setPatientName] = useState('');
  const [assessedAt, setAssessedAt] = useState('');
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // getSession reads from localStorage — no network hang
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      const userId = user?.id;

      if (user) {
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        setUserName(fullName);
        setInitials(
          fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        );

        // Fetch the LATEST assessment by this user
        let { data: assessment, error: assessErr } = await supabase
          .from('assessments')
          .select('score, level, patient_name, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Fallback: if nothing found by user_id, fetch any latest assessment
        // (handles case where old assessments were saved under a different user_id)
        if (!assessment) {
          const { data: fallback } = await supabase
            .from('assessments')
            .select('score, level, patient_name, created_at')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          assessment = fallback;
        }

        if (assessment) {
          setRiskScore(assessment.score ?? null);
          setRiskLevel(assessment.level ?? '');
          setPatientName(assessment.patient_name || '');
          setAssessedAt(
            new Date(assessment.created_at).toLocaleDateString('en-IN', {
              day: '2-digit', month: 'short', year: 'numeric',
            })
          );
        }

        // Recent activity: last 3 assessments
        let { data: recent } = await supabase
          .from('assessments')
          .select('id, score, level, patient_name, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(3);

        // Fallback if empty
        if (!recent || recent.length === 0) {
          const { data: fallbackRecent } = await supabase
            .from('assessments')
            .select('id, score, level, patient_name, created_at')
            .order('created_at', { ascending: false })
            .limit(3);
          recent = fallbackRecent;
        }

        if (recent && recent.length > 0) {
          setActivities(
            recent.map((r: any) => ({
              id: r.id,
              icon: r.level === 'High' ? 'alert-triangle' : r.level === 'Medium' ? 'alert-circle' : 'check-circle',
              color: r.level === 'High' ? '#EF4444' : r.level === 'Medium' ? '#F59E0B' : '#10B981',
              title: `Risk Assessment — ${r.level ?? 'Unknown'} (${r.score ?? 0}%)`,
              subtitle: r.patient_name || 'Anonymous',
              time: new Date(r.created_at).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'short',
              }),
            }))
          );
        }
      }
    } catch (err) {
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const riskColor =
    riskLevel === 'High' ? '#EF4444' :
    riskLevel === 'Medium' ? '#F59E0B' :
    riskScore !== null ? '#10B981' : '#157A6E';

  return (
    <PhoneShell>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Risk Card */}
        {riskScore !== null ? (
          <View style={[styles.riskCard, { backgroundColor: riskColor }]}>
            <View style={styles.riskTop}>
              <Text style={styles.riskLabel}>Current Risk Level</Text>
              <View style={styles.riskBadge}>
                <Text style={styles.riskBadgeText}>{riskLevel}</Text>
              </View>
            </View>

            <View style={styles.riskMiddle}>
              <View style={styles.scoreRow}>
                <Text style={styles.riskScore}>{riskScore}</Text>
                <Text style={styles.riskScoreUnit}>%</Text>
              </View>
              {patientName ? (
                <Text style={styles.riskPatient}>Patient: {patientName}</Text>
              ) : null}
              <Text style={styles.riskDesc}>
                {riskLevel === 'Low'
                  ? '✓ Doing great — keep it up!'
                  : riskLevel === 'Medium'
                  ? '⚠ Moderate risk — take action'
                  : '🚨 Needs immediate attention'}
              </Text>
              {assessedAt ? (
                <Text style={styles.riskDate}>Last assessed: {assessedAt}</Text>
              ) : null}
            </View>

            {/* Progress bar */}
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${riskScore}%` as any }]} />
            </View>

            <TouchableOpacity
              style={styles.riskBtn}
              onPress={() => navigation.navigate('Assessment')}
            >
              <Text style={styles.riskBtnText}>Re-assess now</Text>
              <Feather name="arrow-right" size={16} color="#0D4B42" />
            </TouchableOpacity>
          </View>
        ) : (
          /* No assessment yet */
          <View style={styles.noAssessCard}>
            <View style={styles.noAssessIcon}>
              <Feather name="clipboard" size={28} color="#157A6E" />
            </View>
            <Text style={styles.noAssessTitle}>No Assessment Yet</Text>
            <Text style={styles.noAssessSub}>
              Take a 30-question assessment to get your personalized oral health risk score.
            </Text>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => navigation.navigate('Assessment')}
            >
              <Feather name="play" size={16} color="#0D4B42" />
              <Text style={styles.startBtnText}>Start Assessment</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.grid}>
            <ActionCard
              icon="cpu"
              title="Teeth Scan"
              color="#FEF3C7"
              iconColor="#D97706"
              onPress={() => navigation.navigate('Scan')}
            />
            <ActionCard
              icon="clipboard"
              title="Assessment"
              color="#DCFCE7"
              iconColor="#157A6E"
              onPress={() => navigation.navigate('Assessment')}
            />
            <ActionCard
              icon="calendar"
              title="Book Visit"
              color="#E0E7FF"
              iconColor="#4F46E5"
              onPress={() => navigation.navigate('Dentists')}
            />
            <ActionCard
              icon="activity"
              title="History"
              color="#FCE7F3"
              iconColor="#DB2777"
              onPress={() => navigation.navigate('History')}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {activities.length > 0 ? (
              activities.map((act, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.activityItem}
                  onPress={() => act.id && navigation.navigate('Results', { id: act.id })}
                  activeOpacity={0.7}
                >
                  <View style={[styles.activityIconBox, { backgroundColor: act.color + '20' }]}>
                    <Feather name={act.icon} size={16} color={act.color} />
                  </View>
                  <View style={styles.activityBody}>
                    <Text style={styles.activityTitle}>{act.title}</Text>
                    <Text style={styles.activityTime}>{act.subtitle} · {act.time}</Text>
                  </View>
                  <Feather name="chevron-right" size={16} color="#CBD5E1" />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyActivity}>
                <Feather name="inbox" size={28} color="#CBD5E1" />
                <Text style={styles.emptyActivityText}>No recent activity</Text>
                <Text style={styles.emptyActivitySub}>Complete an assessment to start tracking</Text>
              </View>
            )}
        </View>

        {/* Notifications & Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminders & Notifications</Text>
          <View style={styles.notificationCard}>
            <View style={styles.notifRow}>
              <View style={[styles.notifIcon, { backgroundColor: '#FEE2E2' }]}>
                <Feather name="bell" size={16} color="#EF4444" />
              </View>
              <View style={styles.notifBody}>
                <Text style={styles.notifTitle}>Dental Checkup Overdue</Text>
                <Text style={styles.notifTime}>It's been 6 months since your last visit.</Text>
              </View>
            </View>
            <View style={[styles.notifRow, { borderTopWidth: 1, borderColor: '#F1F5F9', paddingTop: 12 }]}>
              <View style={[styles.notifIcon, { backgroundColor: '#E0F2FE' }]}>
                <Feather name="info" size={16} color="#0284C7" />
              </View>
              <View style={styles.notifBody}>
                <Text style={styles.notifTitle}>Daily Tip</Text>
                <Text style={styles.notifTime}>Drink water after coffee to reduce enamel staining.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Admin/Doctor Dashboard Section */}
        {userName === 'Admin' || userName.toLowerCase().includes('dr') ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doctor / Admin Dashboard</Text>
            <View style={styles.adminGrid}>
              <View style={styles.adminStatCard}>
                <Text style={styles.adminStatNum}>1,248</Text>
                <Text style={styles.adminStatLabel}>Total Patients</Text>
              </View>
              <View style={styles.adminStatCard}>
                <Text style={styles.adminStatNum}>3,402</Text>
                <Text style={styles.adminStatLabel}>AI Scans</Text>
              </View>
              <View style={styles.adminStatCard}>
                <Text style={styles.adminStatNum}>94%</Text>
                <Text style={styles.adminStatLabel}>AI Accuracy</Text>
              </View>
              <View style={styles.adminStatCard}>
                <Text style={styles.adminStatNum}>12</Text>
                <Text style={styles.adminStatLabel}>Pending Appts</Text>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </PhoneShell>
  );
}

function ActionCard({ icon, title, color, iconColor, onPress }: any) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.actionIconBox, { backgroundColor: color }]}>
        <Feather name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
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
  greeting: { fontSize: 13, color: '#64748B' },
  name: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#86F1D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '800', color: '#0D4B42' },
  content: { paddingHorizontal: 20, paddingBottom: 30, gap: 24 },

  // ─── Risk Card ───────────────────────────────────────────
  riskCard: {
    borderRadius: 28,
    padding: 24,
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  riskTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  riskBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskBadgeText: { fontSize: 11, fontWeight: '800', color: '#FFF' },
  riskMiddle: { marginTop: 14 },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  riskScore: { fontSize: 56, fontWeight: '900', color: '#FFF', lineHeight: 60 },
  riskScoreUnit: { fontSize: 22, fontWeight: '700', color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  riskPatient: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  riskDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 6, fontWeight: '500' },
  riskDate: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4 },
  progressBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginTop: 18,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#FFF', borderRadius: 3 },
  riskBtn: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 14,
  },
  riskBtnText: { fontSize: 14, fontWeight: '700', color: '#0D4B42' },

  // ─── No Assessment Card ───────────────────────────────────
  noAssessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#86F1D4',
    borderStyle: 'dashed',
  },
  noAssessIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(21,122,110,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  noAssessTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  noAssessSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  startBtn: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#86F1D4',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
  },
  startBtnText: { fontSize: 15, fontWeight: '700', color: '#0D4B42' },

  // ─── Quick Actions ────────────────────────────────────────
  section: {},
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
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
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },

  // ─── Activity ─────────────────────────────────────────────
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    gap: 14,
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
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityBody: { flex: 1 },
  activityTitle: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  activityTime: { fontSize: 11, color: '#64748B', marginTop: 2 },
  emptyActivity: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 6,
  },
  emptyActivityText: { fontSize: 14, fontWeight: '500', color: '#94A3B8' },
  emptyActivitySub: { fontSize: 12, color: '#CBD5E1', textAlign: 'center' },

  // ─── Notifications & Admin ────────────────────────────────
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    gap: 12,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: { flex: 1 },
  notifTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  notifTime: { fontSize: 12, color: '#64748B', marginTop: 2 },
  adminGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  adminStatCard: {
    width: '48%',
    backgroundColor: '#0D4B42',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  adminStatNum: {
    fontSize: 24,
    fontWeight: '800',
    color: '#86F1D4',
  },
  adminStatLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
});
