import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from 'react';

import { useRoute } from "@react-navigation/native";

export default function ReportScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params as any;
  const assessmentId = params?.id;
  const currentScore: number = params?.score ?? 0;

  const [user, setUser] = useState<any>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [trend, setTrend] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, [assessmentId]);

  const fetchReportData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch specific or latest assessment
        let query: any = supabase.from('assessments').select('*');
        if (assessmentId) {
          query = query.eq('id', assessmentId).single();
        } else {
          query = query.eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single();
        }

        const { data: currentAssessment } = await query;
        setAssessment(currentAssessment);

        // Fetch last 7 assessments for trend
        const { data: history } = await supabase
          .from('assessments')
          .select('score')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(7);

        if (history) {
          setTrend(history.map(h => h.score));
        }
      }
    } catch (err) {
      console.error('Error fetching report data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fullName = user?.user_metadata?.full_name || "User";
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  const answers = assessment?.answers || {};
  const patientAge = answers.q1 || '—';
  const patientGender = answers.q2 || '—';
  const patientArea = answers.q3 || '—';
  const patientEducation = answers.q4 || '—';
  const tobaccoUse = answers.q23 || '—';
  const assessmentDate = assessment?.created_at
    ? new Date(assessment.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const riskLevel = assessment?.level || params?.level || 'Low';
  const riskColor = riskLevel === 'High' ? '#EF4444' : riskLevel === 'Medium' ? '#F59E0B' : '#10B981';
  // Use DB trend if available, otherwise show just the current score
  const displayTrend = trend.length > 0 ? trend : (currentScore > 0 ? [currentScore] : []);
  const CHART_HEIGHT = 100; // px
  const max = Math.max(...displayTrend, 1);

  return (
    <PhoneShell showNav={false}>
      <ScreenHeader title="Full Report" back="Results" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>PATIENT DETAILS</Text>
          <View style={styles.patientRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.patientName}>{fullName}</Text>
              <Text style={styles.patientMeta}>Patient ID: {user?.id?.slice(0, 8) || 'N/A'}</Text>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: riskColor + '20', borderColor: riskColor }]}>
              <Text style={[styles.riskBadgeText, { color: riskColor }]}>{riskLevel} Risk</Text>
            </View>
          </View>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age</Text>
              <Text style={styles.detailValue}>{patientAge} yrs</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>{patientGender}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Area</Text>
              <Text style={styles.detailValue}>{patientArea}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{assessmentDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Education</Text>
              <Text style={styles.detailValue}>{patientEducation}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Tobacco</Text>
              <Text style={styles.detailValue}>{tobaccoUse}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.trendHeader}>
            <Text style={styles.cardTitle}>Risk Trend</Text>
            {trend.length > 1 && (
              <View style={styles.trendBadge}>
                <Feather 
                  name={trend[trend.length-1] >= trend[trend.length-2] ? "trending-up" : "trending-down"} 
                  size={12} 
                  color={trend[trend.length-1] >= trend[trend.length-2] ? "#EF4444" : "#10B981"} 
                />
                <Text style={[styles.trendBadgeText, { color: trend[trend.length-1] >= trend[trend.length-2] ? "#EF4444" : "#10B981" }]}>
                  {trend[trend.length-1] - trend[trend.length-2] > 0 ? `+${trend[trend.length-1] - trend[trend.length-2]}` : trend[trend.length-1] - trend[trend.length-2]} last month
                </Text>
              </View>
            )}
          </View>
          {displayTrend.length === 0 ? (
            <View style={styles.emptyTrend}>
              <Feather name="bar-chart-2" size={32} color="#CBD5E1" />
              <Text style={styles.emptyTrendText}>Complete more assessments to see your risk trend over time.</Text>
            </View>
          ) : (
            <View style={[styles.chart, { height: CHART_HEIGHT + 24 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: CHART_HEIGHT, gap: 6, flex: 1 }}>
                {displayTrend.map((v, idx) => {
                  const barH = Math.max(4, Math.round((v / max) * CHART_HEIGHT));
                  const color = v >= 60 ? '#EF4444' : v >= 30 ? '#F59E0B' : '#10B981';
                  return (
                    <View key={idx} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: CHART_HEIGHT }}>
                      <Text style={{ fontSize: 9, color: '#64748B', marginBottom: 2 }}>{v}</Text>
                      <View style={{ width: '70%', height: barH, backgroundColor: color, borderRadius: 4 }} />
                      <Text style={styles.barLabel}>T{idx + 1}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        <View style={styles.cardBeige}>
          <Text style={styles.cardTitle}>AI Explanation</Text>
          <Text style={styles.explanationText}>
            {assessment?.explanation || "The model analysis identifies risk drivers based on your reported dental symptoms and habits. Maintain regular checkups to monitor progression."}
          </Text>
        </View>

        {assessment?.probabilities && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Probability Map</Text>
            <View style={styles.probGrid}>
              {assessment.probabilities.map((p: any) => (
                <View key={p.label} style={styles.probBox}>
                  <Text style={styles.probLabel}>{p.label}</Text>
                  <Text style={styles.probVal}>{p.value}%</Text>
                  <View style={styles.probBarBg}>
                    <View style={[styles.probBarFill, { width: `${p.value}%`, backgroundColor: p.color || '#86F1D4' }]} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.8} onPress={() => Alert.alert("Shared", "Report shared successfully.")}>
            <Feather name="share-2" size={16} color="#0F172A" />
            <Text style={styles.btnSecondaryText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={() => Alert.alert("Downloaded", "Report downloaded to your device.")}>
            <Feather name="download" size={16} color="#0D4B42" />
            <Text style={styles.btnPrimaryText}>Download</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748B',
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#86F1D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D4B42',
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  patientMeta: {
    fontSize: 12,
    color: '#64748B',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 128,
    marginTop: 20,
    gap: 8,
  },
  barCol: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  barFill: {
    width: '100%',
    backgroundColor: '#86F1D4',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  cardBeige: {
    backgroundColor: '#F1F5F9', // Beige approx
    borderRadius: 24,
    padding: 20,
  },
  explanationText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(15, 23, 42, 0.8)',
  },
  probGrid: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  probBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
  },
  probLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  probVal: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  probBarBg: {
    marginTop: 8,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    overflow: 'hidden',
  },
  probBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  btnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    borderRadius: 16,
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#86F1D4',
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#86F1D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D4B42',
  },
  emptyTrend: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 10,
  },
  emptyTrendText: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  riskBadge: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  riskBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 10,
  },
  detailItem: {
    width: '47%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  detailLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
});
