import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
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

  useEffect(() => {
    fetchHistory();
  }, [tab]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let query = supabase
          .from(tab === 'assessments' ? 'assessments' : 'reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        const { data } = await query;
        if (data) {
          setItems(data.map(it => ({
            ...it,
            date: new Date(it.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            score: it.score || 0,
            status: it.level || "Unknown",
            tone: (it.level || "").toLowerCase() === "high" ? "alert" : (it.level || "").toLowerCase() === "medium" ? "warning" : "success"
          })));
        }
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneShell>
      <ScreenHeader title="History" subtitle="Your past activity" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tabsWrap}>
          {(["assessments", "reports"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.list}>
          {items.length > 0 ? items.map((it) => {
            const bgTone = it.tone === "alert" ? "rgba(239, 68, 68, 0.15)" :
              it.tone === "warning" ? "rgba(255, 205, 178, 0.4)" :
              "rgba(134, 241, 212, 0.4)";
            const fgTone = it.tone === "alert" ? "#EF4444" :
              it.tone === "warning" ? "#7C3AED" :
              "#0D4B42";

            return (
              <TouchableOpacity
                key={it.id || it.date}
                onPress={() => navigation.navigate("Results", { id: it.id })}
                style={styles.itemCard}
                activeOpacity={0.8}
              >
                <View style={[styles.scoreBox, { backgroundColor: bgTone }]}>
                  <Text style={[styles.scoreText, { color: fgTone }]}>{it.score}</Text>
                </View>
                <View style={styles.itemBody}>
                  <Text style={styles.itemTitle}>
                    {tab === "assessments" ? "Risk Assessment" : "Report"}
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
          }) : (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <Text style={{ color: '#64748B' }}>{loading ? 'Fetching history...' : `No ${tab} found.`}</Text>
            </View>
          )}
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
    textTransform: 'capitalize',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
  },
  list: {
    marginTop: 20,
    gap: 12,
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
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemBody: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemDate: {
    fontSize: 12,
    color: '#64748B',
  },
  statusBadge: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  }
});
