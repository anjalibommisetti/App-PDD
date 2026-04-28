import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";

const trend = [62, 70, 65, 74, 71, 76, 78];

export default function ReportScreen() {
  const navigation = useNavigation<any>();
  const max = Math.max(...trend);

  return (
    <PhoneShell showNav={false}>
      <ScreenHeader title="Full Report" back="Results" />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Patient</Text>
          <View style={styles.patientRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View>
              <Text style={styles.patientName}>Jane Doe</Text>
              <Text style={styles.patientMeta}>Female · 28 · Urban</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.trendHeader}>
            <Text style={styles.cardTitle}>Risk Trend</Text>
            <View style={styles.trendBadge}>
              <Feather name="trending-up" size={12} color="#EF4444" />
              <Text style={styles.trendBadgeText}>+6 last month</Text>
            </View>
          </View>
          <View style={styles.chart}>
            {trend.map((v, idx) => (
              <View key={idx} style={styles.barCol}>
                <View 
                  style={[styles.barFill, { height: `${(v / max) * 100}%` }]} 
                />
                <Text style={styles.barLabel}>W{idx + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cardBeige}>
          <Text style={styles.cardTitle}>AI Explanation</Text>
          <Text style={styles.explanationText}>
            Model identified gum disease as the strongest risk driver based on bleeding symptoms and infrequent flossing. Probability of decay progression in 6 months: 64%.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Probability Map</Text>
          <View style={styles.probGrid}>
            {[
              { l: "1 mo", v: 28, c: "#10B981" },
              { l: "3 mo", v: 54, c: "#F59E0B" },
              { l: "6 mo", v: 78, c: "#EF4444" },
            ].map((p) => (
              <View key={p.l} style={styles.probBox}>
                <Text style={styles.probLabel}>{p.l}</Text>
                <Text style={styles.probVal}>{p.v}%</Text>
                <View style={styles.probBarBg}>
                  <View style={[styles.probBarFill, { width: `${p.v}%`, backgroundColor: p.c }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.8}>
            <Feather name="share-2" size={16} color="#0F172A" />
            <Text style={styles.btnSecondaryText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8}>
            <Feather name="download" size={16} color="#0D4B42" />
            <Text style={styles.btnPrimaryText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  }
});
