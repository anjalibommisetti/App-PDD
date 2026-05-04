import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

export default function HistoryScreen() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<"assessments" | "reports">("assessments");
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
      // Use getSession() — reads from localStorage, doesn't require network
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        // Not logged in — show empty state gracefully
        setLoading(false);
        setError('Please log in to view your history.');
        return;
      }

      const userId = session.user.id;

      // Only assessments table exists; reports tab shows assessments too
      const tableName = tab === 'assessments' ? 'assessments' : 'assessments';

      const { data, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setItems(
          data.map((it: any) => ({
            ...it,
            date: new Date(it.created_at).toLocaleDateString('en-IN', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            score: it.score ?? 0,
            status: it.level || 'Unknown',
            tone:
              (it.level || '').toLowerCase() === 'high'
                ? 'alert'
                : (it.level || '').toLowerCase() === 'medium'
                ? 'warning'
                : 'success',
          }))
        );
      }
    } catch (err: any) {
      console.error('Error fetching history:', err);
      setError('Could not load history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneShell>
      <ScreenHeader title="History" subtitle="Your past activity" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs */}
        <View style={styles.tabsWrap}>
          {(['assessments', 'reports'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === 'assessments' ? 'Assessments' : 'Reports'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.list}>
          {/* Loading state */}
          {loading && (
            <View style={styles.centerBox}>
              <Feather name="loader" size={28} color="#86F1D4" />
              <Text style={styles.centerText}>Loading history…</Text>
            </View>
          )}

          {/* Error state */}
          {!loading && error !== '' && (
            <View style={styles.centerBox}>
              <Feather name="alert-circle" size={28} color="#EF4444" />
              <Text style={[styles.centerText, { color: '#EF4444' }]}>{error}</Text>
              <TouchableOpacity style={styles.retryBtn} onPress={fetchHistory}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Empty state */}
          {!loading && error === '' && items.length === 0 && (
            <View style={styles.centerBox}>
              <Feather name="inbox" size={36} color="#CBD5E1" />
              <Text style={styles.centerText}>No {tab} found.</Text>
              <Text style={styles.centerSub}>
                Complete an assessment to see your history here.
              </Text>
            </View>
          )}

          {/* Data list */}
          {!loading &&
            items.map((it) => {
              const bgTone =
                it.tone === 'alert'
                  ? 'rgba(239, 68, 68, 0.12)'
                  : it.tone === 'warning'
                  ? 'rgba(245, 158, 11, 0.12)'
                  : 'rgba(134, 241, 212, 0.3)';
              const fgTone =
                it.tone === 'alert'
                  ? '#EF4444'
                  : it.tone === 'warning'
                  ? '#D97706'
                  : '#0D4B42';

              return (
                <TouchableOpacity
                  key={it.id || it.date}
                  onPress={() => navigation.navigate('Results', { id: it.id })}
                  style={styles.itemCard}
                  activeOpacity={0.8}
                >
                  {/* Score bubble */}
                  <View style={[styles.scoreBox, { backgroundColor: bgTone }]}>
                    <Text style={[styles.scoreText, { color: fgTone }]}>
                      {it.score}
                    </Text>
                    <Text style={[styles.scorePercent, { color: fgTone }]}>%</Text>
                  </View>

                  {/* Body */}
                  <View style={styles.itemBody}>
                    <Text style={styles.itemTitle}>
                      {it.patient_name ? it.patient_name : 'Risk Assessment'}
                    </Text>
                    <Text style={styles.itemDate}>{it.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: bgTone }]}>
                      <Text style={[styles.statusText, { color: fgTone }]}>
                        {it.status} risk
                      </Text>
                    </View>
                  </View>

                  <Feather name="chevron-right" size={20} color="#94A3B8" />
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
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
    paddingVertical: 10,
    alignItems: 'center',
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
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
  },
  list: {
    marginTop: 16,
    gap: 12,
  },
  centerBox: {
    alignItems: 'center',
    paddingVertical: 50,
    gap: 10,
  },
  centerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
  },
  centerSub: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: '#86F1D4',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D4B42',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
  scoreText: {
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 20,
  },
  scorePercent: {
    fontSize: 10,
    fontWeight: '600',
  },
  itemBody: {
    flex: 1,
    gap: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemDate: {
    fontSize: 12,
    color: '#64748B',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
