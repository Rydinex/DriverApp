import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
  emerald: '#34d399',
};

const PAYOUT_DAYS = [
  { day: 'Monday', label: 'Oct 21', amount: '$142.50' },
  { day: 'Tuesday', label: 'Oct 22', amount: '$168.20' },
  { day: 'Wednesday', label: 'Oct 23', amount: '$121.80' },
  { day: 'Thursday', label: 'Oct 24 (Today)', amount: '$18.50 so far', today: true },
  { day: 'Friday', label: 'Oct 25', amount: 'Upcoming' },
  { day: 'Saturday', label: 'Oct 26', amount: 'Upcoming' },
  { day: 'Sunday', label: 'Oct 27', amount: 'Upcoming' },
];

export function IncomingRequestScreen() {
  const navigation = useNavigation<any>();
  const [countdown, setCountdown] = useState(12);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Countdown timer
    countdownRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          navigation.goBack();
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    // Ring fill animation over 12 seconds
    Animated.timing(ringProgress, {
      toValue: 1,
      duration: 12000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();

    // Pulse animation for urgency
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, []);

  const handleAccept = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    navigation.navigate('NavigationScreen');
  };

  const handleDecline = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    navigation.goBack();
  };

  const ringColor = ringProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [C.emerald, C.tertiary, C.error],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* Dark map background */}
      <View style={styles.mapBg}>
        <View style={[styles.roadH, { top: '30%' }]} />
        <View style={[styles.roadH, { top: '55%', opacity: 0.06 }]} />
        <View style={[styles.roadV, { left: '30%' }]} />
        <View style={[styles.roadV, { left: '65%' }]} />
        <View style={styles.mapGlow} />
      </View>

      {/* Dark overlay */}
      <View style={styles.overlay} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Top pill */}
        <View style={styles.topRow}>
          <View style={styles.newRequestPill}>
            <Text style={styles.newRequestText}>NEW REQUEST</Text>
          </View>
        </View>

        {/* Countdown circle */}
        <View style={styles.countdownWrap}>
          <Animated.View style={[styles.countdownRing, { borderColor: ringColor, transform: [{ scale: pulseAnim }] }]}>
            <Text style={styles.countdownNum}>{countdown}</Text>
            <Text style={styles.countdownSec}>seconds</Text>
          </Animated.View>
        </View>

        {/* Elite Ride badge */}
        <View style={styles.eliteRow}>
          <View style={styles.eliteBadge}>
            <Text style={styles.eliteIcon}>⭐</Text>
            <Text style={styles.eliteText}>Elite Ride</Text>
          </View>
        </View>

        {/* Rider rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.riderName}>Rider Rating</Text>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map(i => (
              <Text key={i} style={styles.starFilled}>★</Text>
            ))}
            <Text style={styles.ratingNum}>4.9</Text>
          </View>
        </View>

        {/* Trust badge */}
        <View style={styles.trustBadge}>
          <Text style={styles.trustIcon}>🛡️</Text>
          <Text style={styles.trustText}>Premium Passenger · 247 rides</Text>
        </View>

        {/* Trip details card */}
        <View style={styles.tripCard}>
          <View style={styles.tripDetailRow}>
            <View style={styles.tripDetailItem}>
              <Text style={styles.tripDetailValue}>3.2</Text>
              <Text style={styles.tripDetailUnit}>miles</Text>
              <Text style={styles.tripDetailLabel}>Distance</Text>
            </View>
            <View style={styles.tripDetailDivider} />
            <View style={styles.tripDetailItem}>
              <Text style={styles.tripDetailValue}>14</Text>
              <Text style={styles.tripDetailUnit}>min</Text>
              <Text style={styles.tripDetailLabel}>ETA</Text>
            </View>
            <View style={styles.tripDetailDivider} />
            <View style={styles.tripDetailItem}>
              <Text style={[styles.tripDetailValue, { color: C.emerald }]}>$18.50</Text>
              <Text style={styles.tripDetailLabel}>Earnings</Text>
            </View>
          </View>

          {/* Pickup / dropoff */}
          <View style={styles.locationSection}>
            <View style={styles.locationRow}>
              <View style={styles.pickupDot} />
              <View style={styles.locationLine}>
                <Text style={styles.locationLabel}>PICKUP</Text>
                <Text style={styles.locationAddr}>123 Main St, Chicago, IL</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.locationRow}>
              <View style={styles.dropoffDot} />
              <View style={styles.locationLine}>
                <Text style={styles.locationLabel}>DROPOFF</Text>
                <Text style={styles.locationAddr}>456 Lake Shore Dr, Chicago, IL</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly payout breakdown */}
        <View style={styles.payoutCard}>
          <Text style={styles.payoutTitle}>This Week's Payout</Text>
          {PAYOUT_DAYS.map((d, i) => (
            <View key={i} style={[styles.payoutRow, d.today && styles.payoutRowToday]}>
              <View>
                <Text style={[styles.payoutDay, d.today && styles.payoutDayToday]}>{d.day}</Text>
                <Text style={styles.payoutDate}>{d.label}</Text>
              </View>
              <Text style={[
                styles.payoutAmt,
                d.today && styles.payoutAmtToday,
                d.amount === 'Upcoming' && styles.payoutUpcoming,
              ]}>
                {d.amount}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Action buttons (fixed bottom) */}
      <View style={styles.actionBar}>
        <Pressable style={styles.declineBtn} onPress={handleDecline}>
          <Text style={styles.declineBtnText}>DECLINE</Text>
        </Pressable>
        <Pressable style={styles.acceptBtn} onPress={handleAccept}>
          <Text style={styles.acceptBtnText}>ACCEPT</Text>
          <Text style={styles.acceptBtnSub}>${18.50}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  mapBg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#060810' },
  roadH: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: C.primary, opacity: 0.07 },
  roadV: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: C.primary, opacity: 0.07 },
  mapGlow: {
    position: 'absolute', left: '15%', top: '20%',
    width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35,
    backgroundColor: 'rgba(39,110,241,0.18)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,13,14,0.72)',
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 56, alignItems: 'center' },

  topRow: { width: '100%', alignItems: 'center', marginBottom: 20 },
  newRequestPill: {
    backgroundColor: 'rgba(39,110,241,0.3)',
    paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(177,197,255,0.3)',
  },
  newRequestText: {
    color: C.primary, fontWeight: '900', fontSize: 12,
    letterSpacing: 3, textTransform: 'uppercase',
  },

  countdownWrap: { marginBottom: 16 },
  countdownRing: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 5, borderColor: C.emerald,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(27,27,28,0.8)',
  },
  countdownNum: { color: C.onSurface, fontWeight: '900', fontSize: 36, letterSpacing: -1 },
  countdownSec: { color: C.onSurfaceVariant, fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },

  eliteRow: { marginBottom: 8 },
  eliteBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(42,42,43,0.8)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(66,70,84,0.4)',
  },
  eliteIcon: { fontSize: 16 },
  eliteText: { color: C.onSurface, fontWeight: '800', fontSize: 15 },

  ratingRow: { alignItems: 'center', marginBottom: 4 },
  riderName: { color: C.onSurfaceVariant, fontSize: 11, marginBottom: 4 },
  ratingStars: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  starFilled: { color: '#FFD700', fontSize: 18 },
  ratingNum: { color: C.onSurface, fontWeight: '800', fontSize: 16, marginLeft: 6 },

  trustBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20,
    backgroundColor: 'rgba(52,211,153,0.12)',
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(52,211,153,0.25)',
  },
  trustIcon: { fontSize: 14 },
  trustText: { color: C.emerald, fontWeight: '700', fontSize: 12 },

  tripCard: {
    width: '100%', backgroundColor: 'rgba(42,42,43,0.92)',
    borderRadius: 20, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.12)',
  },
  tripDetailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  tripDetailItem: { flex: 1, alignItems: 'center' },
  tripDetailValue: { color: C.onSurface, fontWeight: '900', fontSize: 28, letterSpacing: -1 },
  tripDetailUnit: { color: C.onSurfaceVariant, fontSize: 11, fontWeight: '600', marginTop: -2 },
  tripDetailLabel: {
    color: 'rgba(194,198,215,0.4)', fontSize: 9, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4,
  },
  tripDetailDivider: { width: 1, height: 48, backgroundColor: 'rgba(66,70,84,0.5)' },

  locationSection: { gap: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  pickupDot: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: C.primaryContainer, borderWidth: 2, borderColor: C.primary,
  },
  dropoffDot: {
    width: 12, height: 12, borderRadius: 2,
    backgroundColor: C.error, borderWidth: 2, borderColor: 'rgba(255,180,171,0.5)',
  },
  routeLine: {
    width: 1, height: 20, backgroundColor: 'rgba(66,70,84,0.6)',
    marginLeft: 5, marginVertical: 2,
  },
  locationLine: { flex: 1 },
  locationLabel: {
    color: 'rgba(194,198,215,0.4)', fontSize: 8, fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: 1.5,
  },
  locationAddr: { color: C.onSurface, fontWeight: '600', fontSize: 13, marginTop: 1 },

  payoutCard: {
    width: '100%', backgroundColor: 'rgba(42,42,43,0.85)',
    borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.1)',
  },
  payoutTitle: { color: C.onSurface, fontWeight: '800', fontSize: 16, marginBottom: 12, letterSpacing: -0.3 },
  payoutRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(66,70,84,0.2)',
  },
  payoutRowToday: {
    backgroundColor: 'rgba(39,110,241,0.1)',
    marginHorizontal: -12, paddingHorizontal: 12, borderRadius: 10,
    borderBottomWidth: 0,
  },
  payoutDay: { color: C.onSurface, fontWeight: '700', fontSize: 13 },
  payoutDayToday: { color: C.primary },
  payoutDate: { color: 'rgba(194,198,215,0.4)', fontSize: 10, marginTop: 1 },
  payoutAmt: { color: C.onSurface, fontWeight: '800', fontSize: 14 },
  payoutAmtToday: { color: C.emerald },
  payoutUpcoming: { color: 'rgba(194,198,215,0.3)', fontWeight: '600' },

  actionBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', gap: 12, padding: 20,
    paddingBottom: 36,
    backgroundColor: 'rgba(19,19,20,0.95)',
    borderTopWidth: 1, borderTopColor: 'rgba(66,70,84,0.2)',
  },
  declineBtn: {
    flex: 1, backgroundColor: C.surfaceHigh,
    paddingVertical: 18, borderRadius: 18, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.15)',
  },
  declineBtnText: { color: C.onSurfaceVariant, fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  acceptBtn: {
    flex: 2, backgroundColor: C.primaryContainer,
    paddingVertical: 18, borderRadius: 18, alignItems: 'center', elevation: 8,
  },
  acceptBtnText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  acceptBtnSub: { color: 'rgba(255,254,255,0.8)', fontSize: 10, fontWeight: '700', marginTop: 2 },
});
