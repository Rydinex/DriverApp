import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const C = {
  bg: '#131314',
  surfaceLow: '#1b1b1c',
  surface: '#1f1f20',
  surfaceHigh: '#2a2a2b',
  surfaceHighest: '#353436',
  onSurface: '#e5e2e3',
  onSurfaceVariant: '#c2c6d7',
  primary: '#b1c5ff',
  primaryContainer: '#276ef1',
  onPrimaryContainer: '#fffeff',
  tertiary: '#ffb694',
  tertiaryContainer: '#c65100',
  outline: '#8c90a0',
  outlineVariant: '#424654',
  error: '#ffb4ab',
};

const WEEKLY = [
  { day: 'Mon', height: 0.5 },
  { day: 'Tue', height: 0.85 },
  { day: 'Wed', height: 0.6 },
  { day: 'Thu', height: 0.75 },
  { day: 'Fri', height: 0.5 },
  { day: 'Sat', height: 0.95 },
  { day: 'Sun', height: 0.3 },
];

const TRIPS = [
  { date: 'Oct 24, 02:15 PM', rating: '4.9', earned: '$18.40', dist: '12.4 km' },
  { date: 'Oct 24, 11:30 AM', rating: '5.0', earned: '$32.15', dist: '24.8 km' },
  { date: 'Oct 23, 09:45 PM', rating: '4.7', earned: '$12.90', dist: '8.2 km' },
  { date: 'Oct 23, 06:12 PM', rating: '5.0', earned: '$45.00', dist: '31.0 km' },
];

export function ActivityScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}><Text style={styles.avatarText}>D</Text></View>
            <Text style={styles.appTitle}>Rydinex Driver</Text>
          </View>
          <Pressable style={styles.notifBtn}><Text>🔔</Text></Pressable>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero earnings */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>THIS WEEK'S EARNINGS</Text>
          <View style={styles.heroAmountRow}>
            <Text style={styles.heroDollar}>$</Text>
            <Text style={styles.heroAmount}>842.50</Text>
          </View>
          <View style={styles.trendBadge}>
            <Text style={styles.trendText}>↗ +12.4% vs last week</Text>
          </View>
        </View>

        {/* Bar chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartBars}>
            {WEEKLY.map((item, i) => (
              <View key={i} style={styles.barCol}>
                <View style={[styles.bar, { height: 160 * item.height }, i === 1 && styles.barActive]} />
                <Text style={[styles.barLabel, i === 1 && styles.barLabelActive]}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Summary chips */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Text style={styles.chipIcon}>⏱️</Text>
            <Text style={styles.chipLabel}>Online Time</Text>
            <Text style={styles.chipValue}>38h 12m</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipIcon}>🚕</Text>
            <Text style={styles.chipLabel}>Total Trips</Text>
            <Text style={styles.chipValue}>64</Text>
          </View>
        </View>

        {/* Recent trips */}
        <View style={styles.tripsHeader}>
          <Text style={styles.tripsTitle}>Recent Trips</Text>
          <Pressable><Text style={styles.viewAll}>View All</Text></Pressable>
        </View>

        {TRIPS.map((trip, i) => (
          <Pressable key={i} style={styles.tripCard}>
            <View style={styles.tripIcon}><Text style={{ fontSize: 20 }}>🛣️</Text></View>
            <View style={styles.tripInfo}>
              <Text style={styles.tripDate}>{trip.date}</Text>
              <View style={styles.tripRatingRow}>
                <Text style={styles.tripStar}>★</Text>
                <Text style={styles.tripRating}>{trip.rating} Rider Rating</Text>
              </View>
            </View>
            <View style={styles.tripRight}>
              <Text style={styles.tripEarned}>{trip.earned}</Text>
              <Text style={styles.tripDist}>{trip.dist}</Text>
            </View>
          </Pressable>
        ))}

        {/* Demo navigation links */}
        <View style={styles.demoSection}>
          <Text style={styles.demoLabel}>View Other Screens</Text>
          <Pressable style={styles.demoBtn} onPress={() => navigation.navigate('NavigationScreen')}>
            <Text style={styles.demoBtnText}>▶  Active Trip Navigation</Text>
          </Pressable>
          <Pressable style={styles.demoBtn} onPress={() => navigation.navigate('MovingRider')}>
            <Text style={styles.demoBtnText}>▶  Rider Moving View</Text>
          </Pressable>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Cash Out FAB */}
      <Pressable style={styles.fab}>
        <Text style={styles.fabIcon}>💳</Text>
        <Text style={styles.fabText}>Cash Out Now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  headerSafe: { backgroundColor: 'rgba(19,19,20,0.6)', zIndex: 10 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: C.surfaceHighest,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: C.primary, fontWeight: '800', fontSize: 14 },
  appTitle: { color: C.primary, fontWeight: '800', fontSize: 16, letterSpacing: -0.5 },
  notifBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(42,42,43,0.7)', justifyContent: 'center', alignItems: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  heroSection: { marginBottom: 24 },
  heroLabel: {
    color: 'rgba(194,198,215,0.5)', fontSize: 10, fontWeight: '700',
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8,
  },
  heroAmountRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  heroDollar: { color: C.primary, fontWeight: '700', fontSize: 28 },
  heroAmount: { color: C.onSurface, fontWeight: '900', fontSize: 56, letterSpacing: -2 },
  trendBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(177,197,255,0.1)',
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, marginTop: 10, alignSelf: 'flex-start',
  },
  trendText: { color: C.primary, fontSize: 11, fontWeight: '700' },

  chartCard: {
    backgroundColor: C.surfaceLow, borderRadius: 16, padding: 16, marginBottom: 16,
  },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 200, paddingBottom: 28 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 8 },
  bar: { width: '100%', backgroundColor: C.surfaceHighest, borderRadius: 4 },
  barActive: { backgroundColor: C.primaryContainer },
  barLabel: {
    color: 'rgba(194,198,215,0.6)', fontSize: 9, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 1,
  },
  barLabelActive: { color: C.primary, fontWeight: '800' },

  chipsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  chip: { flex: 1, backgroundColor: C.surfaceHigh, padding: 20, borderRadius: 16 },
  chipIcon: { fontSize: 22, marginBottom: 8 },
  chipLabel: {
    color: 'rgba(194,198,215,0.5)', fontSize: 9, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4,
  },
  chipValue: { color: C.onSurface, fontWeight: '800', fontSize: 20 },

  tripsHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
  },
  tripsTitle: { color: C.onSurface, fontWeight: '800', fontSize: 20, letterSpacing: -0.5 },
  viewAll: { color: C.primary, fontWeight: '800', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  tripCard: {
    backgroundColor: C.surfaceLow, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12,
  },
  tripIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: C.surfaceHighest, justifyContent: 'center', alignItems: 'center',
  },
  tripInfo: { flex: 1 },
  tripDate: { color: C.onSurface, fontWeight: '700', fontSize: 13 },
  tripRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  tripStar: { color: C.tertiary, fontSize: 12 },
  tripRating: { color: C.onSurfaceVariant, fontSize: 11, fontWeight: '500' },
  tripRight: { alignItems: 'flex-end' },
  tripEarned: { color: C.primary, fontWeight: '900', fontSize: 18 },
  tripDist: {
    color: 'rgba(194,198,215,0.4)', fontSize: 9, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1,
  },

  demoSection: { gap: 8, marginTop: 8, marginBottom: 16 },
  demoLabel: {
    color: 'rgba(194,198,215,0.5)', fontSize: 9, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.5,
  },
  demoBtn: {
    backgroundColor: 'rgba(39,110,241,0.12)',
    borderWidth: 1, borderColor: 'rgba(177,197,255,0.25)',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
  },
  demoBtnText: { color: C.primary, fontWeight: '700', fontSize: 12 },

  fab: {
    position: 'absolute', bottom: 96, right: 16,
    backgroundColor: C.primaryContainer,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingVertical: 14, borderRadius: 20, elevation: 12,
  },
  fabIcon: { fontSize: 18 },
  fabText: { color: C.onPrimaryContainer, fontWeight: '800', fontSize: 14 },
});
