import React, { useRef, useEffect } from 'react';
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
  outline: '#8c90a0',
  outlineVariant: '#424654',
  error: '#ffb4ab',
  emerald: '#34d399',
};

export function MovingRiderScreen() {
  const navigation = useNavigation<any>();

  const pulseOuter = useRef(new Animated.Value(1)).current;
  const pulseInner = useRef(new Animated.Value(0.4)).current;
  const progressAnim = useRef(new Animated.Value(0.72)).current;

  useEffect(() => {
    // Rider dot pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseOuter, { toValue: 1.3, duration: 900, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
        Animated.timing(pulseOuter, { toValue: 1, duration: 900, useNativeDriver: true, easing: Easing.in(Easing.ease) }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseInner, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseInner, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleCancel = () => navigation.goBack();
  const handleArrived = () => navigation.navigate('NavigationScreen');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* MAP BG */}
      <View style={styles.mapBg}>
        <View style={[styles.roadH, { top: '35%' }]} />
        <View style={[styles.roadH, { top: '52%', opacity: 0.06 }]} />
        <View style={[styles.roadH, { top: '68%', opacity: 0.04 }]} />
        <View style={[styles.roadV, { left: '28%', opacity: 0.07 }]} />
        <View style={[styles.roadV, { left: '55%' }]} />
        <View style={[styles.roadV, { left: '75%', opacity: 0.05 }]} />
        <View style={styles.glow} />
      </View>

      {/* Gradient overlay */}
      <View style={styles.gradientOverlay} />

      {/* HEADER */}
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>RYDINEX</Text>
          <View style={styles.onlinePill}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlinePillText}>Online</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* MAP DOTS */}
      {/* Car dot (driver position) */}
      <View style={styles.carDot}>
        <View style={styles.carDotInner}>
          <Text style={{ fontSize: 18 }}>🚗</Text>
        </View>
      </View>

      {/* Rider dot (animated pulse) */}
      <View style={styles.riderDotWrap}>
        <Animated.View style={[styles.riderPulseOuter, { transform: [{ scale: pulseOuter }] }]} />
        <Animated.View style={[styles.riderDotInner, { opacity: pulseInner }]}>
          <Text style={{ fontSize: 14 }}>🧍</Text>
        </Animated.View>
      </View>

      {/* Approaching card (floating) */}
      <View style={styles.approachingCard}>
        <View style={styles.approachingLeft}>
          <View style={styles.approachingIcon}>
            <Text style={{ fontSize: 20 }}>🚶</Text>
          </View>
          <View>
            <Text style={styles.approachingTitle}>Rider is approaching</Text>
            <Text style={styles.approachingEta}>1 min away</Text>
          </View>
        </View>
        <View style={styles.etaChip}>
          <Text style={styles.etaChipText}>1 min</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressBg}>
          <Animated.View style={[styles.progressFill, { width: '72%' }]} />
        </View>
      </View>

      {/* BOTTOM SHEET */}
      <View style={styles.bottomSheet}>
        {/* Handle */}
        <View style={styles.sheetHandle} />

        {/* Rider info */}
        <View style={styles.riderRow}>
          <View style={styles.riderAvatar}>
            <Text style={styles.riderAvatarText}>A</Text>
          </View>
          <View style={styles.riderInfo}>
            <Text style={styles.riderName}>Alex Johnson</Text>
            <View style={styles.riderBadgeRow}>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.ratingText}>4.95</Text>
              </View>
            </View>
          </View>
          <View style={styles.riderContactBtns}>
            <Pressable style={styles.contactBtn}>
              <Text style={{ fontSize: 18 }}>💬</Text>
            </Pressable>
            <Pressable style={styles.contactBtn}>
              <Text style={{ fontSize: 18 }}>📞</Text>
            </Pressable>
          </View>
        </View>

        {/* Pickup location */}
        <View style={styles.pickupRow}>
          <View style={styles.pickupDot} />
          <View>
            <Text style={styles.pickupLabel}>PICKUP LOCATION</Text>
            <Text style={styles.pickupAddr}>123 Main St, Chicago, IL</Text>
          </View>
        </View>

        {/* Action grid */}
        <View style={styles.actionGrid}>
          <Pressable style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelBtnIcon}>✕</Text>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.arrivedBtn} onPress={handleArrived}>
            <Text style={styles.arrivedBtnIcon}>✓</Text>
            <Text style={styles.arrivedBtnText}>Arrived</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  mapBg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#07090d' },
  roadH: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: C.primary, opacity: 0.09 },
  roadV: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: C.primary, opacity: 0.09 },
  glow: {
    position: 'absolute', left: '15%', top: '25%',
    width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35,
    backgroundColor: 'rgba(39,110,241,0.14)',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19,19,20,0.55)',
  },

  // HEADER
  headerSafe: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: 'rgba(19,19,20,0.7)',
  },
  appTitle: {
    color: C.primary, fontWeight: '900', fontSize: 18, letterSpacing: 3,
  },
  onlinePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(52,211,153,0.15)',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(52,211,153,0.3)',
  },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.emerald },
  onlinePillText: { color: C.emerald, fontSize: 11, fontWeight: '800', letterSpacing: 1 },

  // MAP ELEMENTS
  carDot: {
    position: 'absolute', left: '55%', top: '50%', marginTop: -20,
  },
  carDotInner: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    elevation: 10, borderWidth: 2, borderColor: 'rgba(177,197,255,0.4)',
  },
  riderDotWrap: {
    position: 'absolute', left: '35%', top: '45%', marginTop: -20,
    justifyContent: 'center', alignItems: 'center',
  },
  riderPulseOuter: {
    position: 'absolute', width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(177,197,255,0.2)',
    borderWidth: 2, borderColor: 'rgba(177,197,255,0.4)',
  },
  riderDotInner: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    elevation: 8,
  },

  // APPROACHING CARD
  approachingCard: {
    position: 'absolute', top: 90, left: 16, right: 16,
    backgroundColor: 'rgba(42,42,43,0.94)',
    borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.12)', elevation: 12,
  },
  approachingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  approachingIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(177,197,255,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  approachingTitle: { color: C.onSurface, fontWeight: '800', fontSize: 15, letterSpacing: -0.3 },
  approachingEta: { color: C.onSurfaceVariant, fontSize: 11, marginTop: 2 },
  etaChip: {
    backgroundColor: C.primaryContainer, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10,
  },
  etaChipText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 14 },

  // PROGRESS
  progressWrap: { position: 'absolute', top: 162, left: 16, right: 16 },
  progressBg: {
    height: 4, backgroundColor: 'rgba(42,42,43,0.8)', borderRadius: 2,
    overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(66,70,84,0.2)',
  },
  progressFill: {
    height: '100%', backgroundColor: C.primary, borderRadius: 2,
  },

  // BOTTOM SHEET
  bottomSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(27,27,28,0.97)',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 36,
    borderTopWidth: 1, borderTopColor: 'rgba(66,70,84,0.25)',
    elevation: 24,
  },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: 'rgba(66,70,84,0.5)',
    alignSelf: 'center', marginBottom: 20,
  },

  riderRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  riderAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: C.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(177,197,255,0.3)',
  },
  riderAvatarText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 22 },
  riderInfo: { flex: 1 },
  riderName: { color: C.onSurface, fontWeight: '800', fontSize: 17, letterSpacing: -0.3 },
  riderBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  premiumBadge: {
    backgroundColor: 'rgba(177,197,255,0.15)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
    borderWidth: 1, borderColor: 'rgba(177,197,255,0.3)',
  },
  premiumText: { color: C.primary, fontWeight: '800', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  starIcon: { color: '#FFD700', fontSize: 12 },
  ratingText: { color: C.onSurface, fontWeight: '700', fontSize: 12 },
  riderContactBtns: { flexDirection: 'row', gap: 8 },
  contactBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: C.surfaceHigh, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(66,70,84,0.3)',
  },

  pickupRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.surfaceHigh, borderRadius: 12, padding: 12, marginBottom: 16,
  },
  pickupDot: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: C.primaryContainer, borderWidth: 2, borderColor: C.primary,
  },
  pickupLabel: {
    color: 'rgba(194,198,215,0.4)', fontSize: 8, fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: 1.5,
  },
  pickupAddr: { color: C.onSurface, fontWeight: '600', fontSize: 13 },

  actionGrid: { flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1, backgroundColor: C.surfaceHighest,
    paddingVertical: 16, borderRadius: 16,
    alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.15)',
  },
  cancelBtnIcon: { color: C.error, fontWeight: '900', fontSize: 20 },
  cancelBtnText: { color: C.onSurfaceVariant, fontWeight: '800', fontSize: 12, letterSpacing: 1 },
  arrivedBtn: {
    flex: 2, backgroundColor: C.primaryContainer,
    paddingVertical: 16, borderRadius: 16,
    alignItems: 'center', gap: 4, elevation: 8,
  },
  arrivedBtnIcon: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 20 },
  arrivedBtnText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 14, letterSpacing: 1 },
});
