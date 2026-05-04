import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

export default function HistoryScreen() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<"assessments" | "appointments">("assessments");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, [tab]);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    setItems([]);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (tab === 'assessments') {
        // Try with user_id first
        let { data } = await supabase
          .from('assessments')
          .select('*')
          .order('created_at', { ascending: false });

        if (userId) {
          const { data: userData } = await supabase
            .from('assessments')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
          // Use user-specific data if available, else show all
          if (userData && userData.length > 0) data = userData;
        }

        if (data && data.length > 0) {
          setItems(data.map((it: any) => ({
            ...it,
            type: 'assessment',
            displayDate: new Date(it.created_at).toLocaleDateString('en-IN', {
              day: '2-digit', month: 'short', year: 'numeric',
            }),
            displayTime: new Date(it.created_at).toLocaleTimeString('en-IN', {
              hour: '2-digit', minute: '2-digit',
            }),
            score: it.score ?? 0,
            status: it.level || 'Unknown',
            tone: (it.level || '').toLowerCase() === 'high' ? 'alert'
              : (it.level || '').toLowerCase() === 'medium' ? 'warning' : 'success',
          })));
        }

      } else {
        // Appointments tab
        let { data } = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false });

        if (userId) {
          const { data: userAppts } = await supabase
            .from('appointments')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
          if (userAppts && userAppts.length > 0) data = userAppts;
        }

        if (data && data.length > 0) {
          setItems(data.map((it: any) => ({
            ...it,
            type: 'appointment',
            displayDate: it.appointment_date
              ? new Date(it.appointment_date).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                })
              : '—',
            displayTime: it.appointment_time || '—',
            status: it.status || 'pending',
            tone: it.status === 'confirmed' ? 'success'
              : it.status === 'cancelled' ? 'alert' : 'warning',
          })));
        }
      }
    } catch (err: any) {
      console.error('History error:', err);
      setError('Could not load history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneShell>
      <ScreenHeader title="History" subtitle="Your past activity" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabsWrap}>
          {[
            { key: 'assessments', label: 'Assessments', icon: 'clipboard' },
            { key: 'appointments', label: 'Appointments', icon: 'calendar' },
          ].map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setTab(t.key as any)}
              style={[styles.tabBtn, tab === t.key && styles.tabBtnActive]}
            >
              <Feather name={t.icon as any} size={14} color={tab === t.key ? '#157A6E' : '#94A3B8'} />
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.list}>
          {/* Loading */}
          {loading && (
            <View style={styles.centerBox}>
              <Feather name="loader" size={28} color="#86F1D4" />
              <Text style={styles.centerText}>Loading…</Text>
            </View>
          )}

          {/* Error */}
          {!loading && error !== '' && (
            <View style={styles.centerBox}>
              <Feather name="alert-circle" size={28} color="#EF4444" />
              <Text style={[styles.centerText, { color: '#EF4444' }]}>{error}</Text>
              <TouchableOpacity style={styles.retryBtn} onPress={fetchHistory}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Empty */}
          {!loading && error === '' && items.length === 0 && (
            <View style={styles.centerBox}>
              <Feather name="inbox" size={36} color="#CBD5E1" />
              <Text style={styles.centerText}>
                {tab === 'assessments' ? 'No assessments yet.' : 'No appointments booked yet.'}
              </Text>
              <Text style={styles.centerSub}>
                {tab === 'assessments'
                  ? 'Complete an assessment to see your history here.'
                  : 'Book a dentist visit to see your appointments here.'}
              </Text>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={() => navigation.navigate(tab === 'assessments' ? 'Assessment' : 'Dentists')}
              >
                <Text style={styles.retryText}>
                  {tab === 'assessments' ? 'Start Assessment' : 'Book Visit'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Assessment Items */}
          {!loading && tab === 'assessments' && items.map((it) => {
            const bgTone = it.tone === 'alert' ? 'rgba(239,68,68,0.12)'
              : it.tone === 'warning' ? 'rgba(245,158,11,0.12)'
              : 'rgba(134,241,212,0.3)';
            const fgTone = it.tone === 'alert' ? '#EF4444'
              : it.tone === 'warning' ? '#D97706' : '#0D4B42';

            return (
              <TouchableOpacity
                key={it.id}
                onPress={() => navigation.navigate('Results', { id: it.id })}
                style={styles.itemCard}
                activeOpacity={0.8}
              >
                <View style={[styles.scoreBox, { backgroundColor: bgTone }]}>
                  <Text style={[styles.scoreText, { color: fgTone }]}>{it.score}</Text>
                  <Text style={[styles.scorePercent, { color: fgTone }]}>%</Text>
                </View>
                <View style={styles.itemBody}>
                  <Text style={styles.itemTitle}>
                    {it.patient_name || 'Risk Assessment'}
                  </Text>
                  <Text style={styles.itemDate}>{it.displayDate} · {it.displayTime}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: bgTone }]}>
                    <Text style={[styles.statusText, { color: fgTone }]}>{it.status} risk</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={18} color="#CBD5E1" />
              </TouchableOpacity>
            );
          })}

          {/* Appointment Items */}
          {!loading && tab === 'appointments' && items.map((it) => {
            const bgTone = it.tone === 'success' ? 'rgba(16,185,129,0.12)'
              : it.tone === 'alert' ? 'rgba(239,68,68,0.12)'
              : 'rgba(245,158,11,0.12)';
            const fgTone = it.tone === 'success' ? '#10B981'
              : it.tone === 'alert' ? '#EF4444' : '#D97706';

            return (
              <View key={it.id} style={styles.itemCard}>
                <View style={[styles.apptIconBox, { backgroundColor: bgTone }]}>
                  <Feather name="calendar" size={20} color={fgTone} />
                </View>
                <View style={styles.itemBody}>
                  <Text style={styles.itemTitle}>{it.dentist_name || 'Appointment'}</Text>
                  <Text style={styles.itemSpec}>{it.dentist_specialty || ''}</Text>
                  <Text style={styles.itemDate}>
                    {it.displayDate} · {it.displayTime}
                  </Text>
                  {it.note ? (
                    <Text style={styles.itemNote} numberOfLines={1}>📝 {it.note}</Text>
                  ) : null}
                  <View style={[styles.statusBadge, { backgroundColor: bgTone }]}>
                    <Text style={[styles.statusText, { color: fgTone, textTransform: 'capitalize' }]}>
                      {it.status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  tabsWrap: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F1F5F9',
    padding: 6,
    borderRadius: 16,
    marginBottom: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabText: { fontSize: 13, fontWeight: '600', color: '#94A3B8' },
  tabTextActive: { color: '#157A6E' },
  list: { marginTop: 16, gap: 12 },
  centerBox: { alignItems: 'center', paddingVertical: 50, gap: 10 },
  centerText: { fontSize: 14, fontWeight: '500', color: '#64748B', textAlign: 'center' },
  centerSub: { fontSize: 12, color: '#94A3B8', textAlign: 'center' },
  retryBtn: {
    marginTop: 8,
    backgroundColor: '#86F1D4',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: { fontSize: 13, fontWeight: '700', color: '#0D4B42' },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  scoreBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: { fontSize: 18, fontWeight: '900', lineHeight: 20 },
  scorePercent: { fontSize: 10, fontWeight: '600' },
  apptIconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBody: { flex: 1, gap: 2 },
  itemTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  itemSpec: { fontSize: 12, color: '#64748B' },
  itemDate: { fontSize: 11, color: '#94A3B8' },
  itemNote: { fontSize: 11, color: '#64748B', fontStyle: 'italic' },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 4,
  },
  statusText: { fontSize: 10, fontWeight: '700' },
});
