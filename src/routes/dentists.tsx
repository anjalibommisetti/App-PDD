import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";

const dentists = [
  { name: "Dr. Sarah Chen", rating: 4.9, exp: "12 yrs", loc: "Downtown · 1.2 km", spec: "Periodontist", initials: "SC" },
  { name: "Dr. Michael Patel", rating: 4.8, exp: "8 yrs", loc: "Westside · 2.4 km", spec: "Cosmetic", initials: "MP" },
  { name: "Dr. Aisha Rahman", rating: 4.7, exp: "15 yrs", loc: "North · 3.8 km", spec: "Orthodontist", initials: "AR" },
  { name: "Dr. Lucas Reyes", rating: 4.9, exp: "10 yrs", loc: "Central · 0.9 km", spec: "General", initials: "LR" },
];

export default function DentistsScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Find a Dentist" subtitle="Verified specialists near you" back="Dashboard" />

      <View style={styles.list}>
        {dentists.map((d) => (
          <View key={d.name} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{d.initials}</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.name}>{d.name}</Text>
                    <Text style={styles.spec}>{d.spec} · {d.exp}</Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Feather name="star" size={12} color="#7C3AED" />
                    <Text style={styles.ratingText}>{d.rating}</Text>
                  </View>
                </View>
                <View style={styles.locWrap}>
                  <Feather name="map-pin" size={12} color="#64748B" />
                  <Text style={styles.locText}>{d.loc}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8} onPress={() => Alert.alert("Appointment Booked!")}>
              <Text style={styles.bookBtnText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 96,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
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
  cardBody: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  spec: {
    fontSize: 12,
    color: '#64748B',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 205, 178, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  locWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  locText: {
    fontSize: 12,
    color: '#64748B',
  },
  bookBtn: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#86F1D4',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  bookBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D4B42',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  }
});
