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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const C = {
  bg: '#131314',
  surface: '#1f1f20',
  surfaceHigh: '#2a2a2b',
  surfaceHighest: '#353436',
  surfaceVariant: '#353436',
  onSurface: '#e5e2e3',
  onSurfaceVariant: '#c2c6d7',
  primary: '#b1c5ff',
  primaryContainer: '#276ef1',
  onPrimaryContainer: '#fffeff',
  tertiary: '#ffb694',
  outline: '#8c90a0',
  outlineVariant: '#424654',
  error: '#ffb4ab',
  errorContainer: '#93000a',
  emerald: '#34d399',
};

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // Initialize isOnline from route params if provided (e.g., returning from trip)
  const initialOnlineState = route.params?.startOnline ?? false;
  const [isOnline, setIsOnline] = useState(initialOnlineState);
  const [timeOnline, setTimeOnline] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseAnim = useRef(new Animated.Value(0.4)).current;
  const carDriftX = useRef(new Animated.Value(0)).current;
  const carDriftY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (isOnline) {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(carDriftX, { toValue: 14, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
            Animated.timing(carDriftY, { toValue: -8, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          ]),
          Animated.parallel([
            Animated.timing(carDriftX, { toValue: 0, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
            Animated.timing(carDriftY, { toValue: 8, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          ]),
        ])
      ).start();
    } else {
      carDriftX.setValue(0);
      carDriftY.setValue(0);
    }
  }, [isOnline]);

  useEffect(() => {
    if (isOnline) {
      timerRef.current = setInterval(() => setTimeOnline(t => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeOnline(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOnline]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* MAP BACKGROUND */}
      <View style={styles.mapBg}>
        <View style={[styles.roadH, { top: '33%' }]} />
        <View style={[styles.roadH, { top: '55%', opacity: 0.06 }]} />
        <View style={[styles.roadH, { top: '72%', opacity: 0.04 }]} />
        <View style={[styles.roadV, { left: '20%' }]} />
        <View style={[styles.roadV, { left: '50%' }]} />
        <View style={[styles.roadV, { left: '78%', opacity: 0.06 }]} />
        {isOnline && (
          <View style={styles.cityGlow} />
        )}
        {!isOnline && (
          <View style={styles.surgeBlob} />
        )}
      </View>

      {/* HEADER */}
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>D</Text>
            </View>
            <View>
              <Text style={styles.appTitle}>Rydinex</Text>
              {isOnline && (
                <View style={styles.onlinePill}>
                  <Animated.View style={[styles.onlineDot, { opacity: pulseAnim }]} />
                  <Text style={styles.onlinePillText}>Online</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.headerRight}>
            {isOnline && (
              <View style={styles.timerChip}>
                <Text style={styles.timerLabel}>Online  </Text>
                <Text style={styles.timerValue}>{formatTime(timeOnline)}</Text>
              </View>
            )}
            <View style={styles.notifBtn}>
              <Text>🔔</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* ── OFFLINE STATE ── */}
      {!isOnline && (
        <>
          {/* Status + Earnings row */}
          <View style={styles.topRow}>
            <Pressable style={styles.statusCard} onPress={() => setIsOnline(true)}>
              <View style={styles.offlineDot} />
              <Text style={styles.statusText}>OFFLINE</Text>
              <View style={styles.toggle}>
                <View style={styles.toggleKnob} />
              </View>
            </Pressable>
            <View style={styles.earningsCard}>
              <Text style={styles.earningsLabel}>DAILY EARNINGS</Text>
              <View style={styles.earningsRow}>
                <Text style={styles.earningsDollar}>$</Text>
                <Text style={styles.earningsAmt}>142.50</Text>
              </View>
              <View style={styles.trendBadge}>
                <Text style={styles.trendText}>↗ +12% vs yesterday</Text>
              </View>
            </View>
          </View>

          {/* Surge chip */}
          <View style={styles.surgeChipWrap}>
            <View style={styles.surgeChip}>
              <Text style={styles.surgeChipIcon}>⚡</Text>
              <View>
                <Text style={styles.surgeChipTitle}>High Demand Area</Text>
                <Text style={styles.surgeChipSub}>1.8x Surge · Financial District</Text>
              </View>
            </View>
          </View>

          {/* Quick actions + GO button */}
          <View style={styles.bottomArea}>
            <View style={styles.quickRow}>
              <Pressable style={styles.quickBtn}><Text style={styles.quickIcon}>🛡️</Text></Pressable>
              <Pressable style={styles.quickBtn}><Text style={styles.quickIcon}>🧭</Text></Pressable>
            </View>
            <Pressable style={styles.goRing} onPress={() => setIsOnline(true)}>
              <View style={styles.goBtn}>
                <Text style={styles.goText}>GO</Text>
                <Text style={styles.goSub}>ONLINE</Text>
              </View>
            </Pressable>
          </View>
        </>
      )}

      {/* ── ONLINE STATE ── */}
      {isOnline && (
        <>
          {/* Finding trips card */}
          <View style={styles.findingCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.findingTitle}>Finding Trips...</Text>
              <Text style={styles.findingSub}>Searching in your area · Chicago, IL</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressLabel}>Trip incoming…</Text>
            </View>
            <View style={styles.spinnerCircle}>
              <Text style={{ fontSize: 18 }}>📍</Text>
            </View>
          </View>

          {/* Live stats (right column) */}
          <View style={styles.statsCol}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Nearby Riders</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Est. Wait</Text>
              <Text style={[styles.statValue, { color: C.emerald }]}>&lt;1 min</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Surge</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ color: C.tertiary }}>⚡</Text>
                <Text style={[styles.statValue, { color: C.tertiary }]}>1.8×</Text>
              </View>
            </View>
          </View>

          {/* Animated car dot */}
          <Animated.View
            style={[
              styles.carDot,
              { transform: [{ translateX: carDriftX }, { translateY: carDriftY }] },
            ]}
          >
            <View style={styles.carDotInner}>
              <Text style={{ fontSize: 20 }}>🚗</Text>
            </View>
          </Animated.View>

          {/* Bottom: earnings + Go Offline */}
          <View style={styles.onlineBottomCard}>
            <View>
              <Text style={styles.earningsLabel}>TODAY'S EARNINGS</Text>
              <View style={styles.earningsRow}>
                <Text style={styles.earningsDollar}>$</Text>
                <Text style={styles.earningsAmt}>142.50</Text>
              </View>
              <Text style={styles.trendText}>↗ +12% vs yesterday</Text>
            </View>
            <Pressable style={styles.goOfflineBtn} onPress={() => setIsOnline(false)}>
              <View style={styles.goOfflineIcon}>
                <Text style={{ fontSize: 18 }}>⏻</Text>
              </View>
              <Text style={styles.goOfflineLabel}>Go{'\n'}Offline</Text>
            </Pressable>
          </View>

          {/* Demo buttons row */}
          <View style={styles.actionButtonsRow}>
            <Pressable
              style={[styles.actionBtn, { flex: 1, marginRight: 10 }]}
              onPress={() => navigation.navigate('ProfessionalDriverPrd', { slug: 'rydinex_driver_set_destination' })}
            >
              <Text style={styles.actionBtnText}>🧭 SET DESTINATION</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, { flex: 1 }]}
              onPress={() => navigation.navigate('IncomingRequest')}
            >
              <Text style={styles.actionBtnText}>▶ SIMULATE</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // MAP
  mapBg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0a0d12' },
  roadH: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: C.primary, opacity: 0.1 },
  roadV: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: C.primary, opacity: 0.1 },
  cityGlow: {
    position: 'absolute', left: '20%', top: '30%',
    width: width * 0.6, height: width * 0.6, borderRadius: width * 0.3,
    backgroundColor: 'rgba(39,110,241,0.12)',
  },
  surgeBlob: {
    position: 'absolute', left: '10%', top: '25%',
    width: width * 0.8, height: width * 0.8, borderRadius: width * 0.4,
    backgroundColor: 'rgba(198,81,0,0.18)',
  },

  // HEADER
  headerSafe: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: 'rgba(19,19,20,0.75)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.surfaceHighest,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(66,70,84,0.4)',
  },
  avatarText: { color: C.primary, fontWeight: '800', fontSize: 16 },
  appTitle: { color: C.primary, fontWeight: '800', fontSize: 16, letterSpacing: -0.5 },
  onlinePill: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: C.emerald,
  },
  onlinePillText: {
    color: C.emerald, fontSize: 10, fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: 1.2,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  timerChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(42,42,43,0.85)',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(66,70,84,0.3)',
  },
  timerLabel: { color: 'rgba(194,198,215,0.6)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 },
  timerValue: { color: C.onSurface, fontWeight: '800', fontSize: 12 },
  notifBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(42,42,43,0.7)',
    justifyContent: 'center', alignItems: 'center',
  },

  // OFFLINE UI
  topRow: {
    position: 'absolute', top: 82, left: 16, right: 16,
    flexDirection: 'row', gap: 12, alignItems: 'flex-start',
  },
  statusCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(42,42,43,0.94)',
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.12)', elevation: 8,
  },
  offlineDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: C.outline },
  statusText: { color: C.onSurface, fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },
  toggle: {
    width: 38, height: 22, borderRadius: 11,
    backgroundColor: C.surfaceVariant, justifyContent: 'center', paddingHorizontal: 3,
  },
  toggleKnob: { width: 16, height: 16, borderRadius: 8, backgroundColor: C.onSurfaceVariant },
  earningsCard: {
    flex: 1, backgroundColor: 'rgba(42,42,43,0.94)',
    paddingHorizontal: 16, paddingVertical: 14, borderRadius: 20, alignItems: 'flex-end',
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.12)', elevation: 8,
  },
  earningsLabel: {
    color: 'rgba(194,198,215,0.6)', fontSize: 9, fontWeight: '700',
    letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 4,
  },
  earningsRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  earningsDollar: { color: C.onSurface, fontWeight: '800', fontSize: 20 },
  earningsAmt: { color: C.onSurface, fontWeight: '800', fontSize: 24 },
  trendBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(177,197,255,0.1)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginTop: 6,
  },
  trendText: { color: C.primary, fontSize: 10, fontWeight: '700' },

  surgeChipWrap: { position: 'absolute', top: 168, left: 16 },
  surgeChip: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(198,81,0,0.28)',
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,182,148,0.25)',
  },
  surgeChipIcon: { fontSize: 18, color: C.tertiary },
  surgeChipTitle: { color: C.tertiary, fontWeight: '800', fontSize: 13 },
  surgeChipSub: { color: C.onSurfaceVariant, fontSize: 11 },

  bottomArea: {
    position: 'absolute', bottom: 96, left: 0, right: 0,
    alignItems: 'center', gap: 24,
  },
  quickRow: { flexDirection: 'row', gap: 16 },
  quickBtn: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: 'rgba(53,52,54,0.92)', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(66,70,84,0.25)', elevation: 6,
  },
  quickIcon: { fontSize: 22 },
  goRing: {
    width: 136, height: 136, borderRadius: 68,
    backgroundColor: 'rgba(39,110,241,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  goBtn: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: C.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 4, borderColor: 'rgba(255,254,255,0.12)',
    elevation: 20,
  },
  goText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 32, letterSpacing: -1 },
  goSub: {
    color: 'rgba(255,254,255,0.8)', fontSize: 9, fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: 2, marginTop: 4,
  },

  // ONLINE UI
  findingCard: {
    position: 'absolute', top: 82, left: 16, right: 16,
    backgroundColor: 'rgba(42,42,43,0.94)',
    borderRadius: 20, padding: 20,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.1)', elevation: 10,
  },
  findingTitle: { color: C.onSurface, fontWeight: '800', fontSize: 16, letterSpacing: -0.3 },
  findingSub: { color: C.onSurfaceVariant, fontSize: 11, marginTop: 2 },
  progressBar: {
    height: 3, backgroundColor: C.surfaceVariant, borderRadius: 2,
    overflow: 'hidden', marginTop: 10,
  },
  progressFill: { height: '100%', width: '60%', backgroundColor: C.primary, borderRadius: 2 },
  progressLabel: {
    color: 'rgba(194,198,215,0.5)', fontSize: 9, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.2, marginTop: 5, textAlign: 'right',
  },
  spinnerCircle: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(177,197,255,0.12)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(177,197,255,0.3)',
  },

  statsCol: { position: 'absolute', right: 16, top: '42%', gap: 8 },
  statCard: {
    backgroundColor: 'rgba(42,42,43,0.92)',
    paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.1)', minWidth: 100, elevation: 6,
  },
  statLabel: {
    color: 'rgba(194,198,215,0.5)', fontSize: 9, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1,
  },
  statValue: { color: C.onSurface, fontWeight: '800', fontSize: 18, marginTop: 2 },

  carDot: {
    position: 'absolute', left: '50%', top: '50%', marginLeft: -20, marginTop: -20,
  },
  carDotInner: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    elevation: 12, borderWidth: 2, borderColor: 'rgba(177,197,255,0.3)',
  },

  onlineBottomCard: {
    position: 'absolute', bottom: 96, left: 16, right: 16,
    backgroundColor: 'rgba(42,42,43,0.94)',
    borderRadius: 20, padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.1)', elevation: 10,
  },
  goOfflineBtn: {
    alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(53,52,54,0.85)',
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(66,70,84,0.25)',
  },
  goOfflineIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: C.surfaceHighest,
    justifyContent: 'center', alignItems: 'center',
  },
  goOfflineLabel: {
    color: C.onSurfaceVariant, fontSize: 9, fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: 1.2, textAlign: 'center',
  },

  actionButtonsRow: {
    position: 'absolute', bottom: 36, left: 16, right: 16,
    flexDirection: 'row', gap: 10, alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: 'rgba(39,110,241,0.15)',
    borderWidth: 1, borderColor: 'rgba(177,197,255,0.3)',
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  actionBtnText: {
    color: C.primary, fontWeight: '700', fontSize: 12, letterSpacing: 0.5,
  },

  // Legacy demo styles (kept for reference)
  demoRow: {
    position: 'absolute', bottom: 36, left: 16, right: 16, alignItems: 'center',
  },
  demoBtn: {
    backgroundColor: 'rgba(39,110,241,0.15)',
    borderWidth: 1, borderColor: 'rgba(177,197,255,0.3)',
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12,
  },
  demoBtnText: { color: C.primary, fontWeight: '700', fontSize: 12, letterSpacing: 0.5 },
});
