import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";

export default function ResultsScreen() {
  const navigation = useNavigation<any>();
  const score = 78;
  const breakdown = [
    { label: "Cavities", value: 72, color: "#F59E0B" },
    { label: "Gum Disease", value: 84, color: "#EF4444" },
    { label: "Infection", value: 41, color: "#10B981" },
  ];

  return (
    <PhoneShell showNav={false}>
      <ScreenHeader title="Risk Results" subtitle="AI analysis complete" back="Dashboard" />

      <View style={styles.content}>
        {/* Risk hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <Text style={styles.heroLabel}>Risk Score</Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>High</Text>
            </View>
          </View>
          <View style={styles.scoreWrap}>
            <Text style={styles.scoreMain}>{score}</Text>
            <Text style={styles.scoreUnit}>%</Text>
          </View>
          <View style={styles.scoreBarBg}>
            <View style={[styles.scoreBarFill, { width: `${score}%` }]} />
          </View>
          <View style={styles.heroWarning}>
            <Feather name="alert-triangle" size={20} color="#FFFFFF" />
            <Text style={styles.heroWarningText}>Immediate Attention Required</Text>
          </View>
        </View>

        {/* Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Risk Breakdown</Text>
          <View style={styles.breakdownList}>
            {breakdown.map((b) => (
              <View key={b.label} style={styles.breakdownItem}>
                <View style={styles.bdTop}>
                  <Text style={styles.bdLabel}>{b.label}</Text>
                  <Text style={styles.bdVal}>{b.value}%</Text>
                </View>
                <View style={styles.bdBarBg}>
                  <View style={[styles.bdBarFill, { width: `${b.value}%`, backgroundColor: b.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Insight */}
        <View style={styles.cardBeige}>
          <View style={styles.insightHeader}>
            <View style={styles.insightIcon}>
              <Feather name="cpu" size={16} color="#157A6E" />
            </View>
            <Text style={styles.cardTitle}>AI Insight</Text>
            <View style={styles.confBadge}>
              <Text style={styles.confText}>92% confidence</Text>
            </View>
          </View>
          <Text style={styles.insightText}>
            Your reported bleeding gums combined with infrequent flossing and high sugar intake significantly elevate your gum disease risk. Early intervention can reduce this score by up to 40%.
          </Text>
        </View>

        {/* Recommendations */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          <View style={styles.recList}>
            {[
              "Brush twice daily with fluoride toothpaste",
              "Floss at least once per day",
              "Reduce sugar intake — especially before sleep",
              "Schedule a dental visit within 2 weeks",
            ].map((r) => (
              <View key={r} style={styles.recItem}>
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text style={styles.recText}>{r}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.btnSecondary} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Report")}
          >
            <Feather name="file-text" size={16} color="#0F172A" />
            <Text style={styles.btnSecondaryText}>Full Report</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.btnPrimary} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Dentists")}
          >
            <Feather name="calendar" size={16} color="#0D4B42" />
            <Text style={styles.btnPrimaryText}>Book Visit</Text>
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
  heroCard: {
    backgroundColor: '#EF4444', // Alert bg approx
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  heroBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 12,
  },
  scoreMain: {
    fontSize: 60,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 64,
  },
  scoreUnit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  scoreBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginTop: 20,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  heroWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  heroWarningText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  breakdownList: {
    marginTop: 16,
    gap: 16,
  },
  breakdownItem: {},
  bdTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  bdLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  bdVal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  bdBarBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bdBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  cardBeige: {
    backgroundColor: '#F1F5F9', // Beige approx
    borderRadius: 24,
    padding: 20,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confBadge: {
    marginLeft: 'auto',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  confText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#10B981',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(15, 23, 42, 0.8)',
  },
  recList: {
    marginTop: 12,
    gap: 10,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 12,
  },
  recText: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
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
