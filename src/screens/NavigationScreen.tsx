import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
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

// Route waypoints for the SVG-style path using Views
const ROUTE_POINTS = [
  { x: width * 0.5, y: height * 0.65 },  // current position (bottom)
  { x: width * 0.5, y: height * 0.5 },   // go north
  { x: width * 0.62, y: height * 0.5 },  // turn east
  { x: width * 0.62, y: height * 0.4 },  // go north
  { x: width * 0.48, y: height * 0.4 },  // turn west
  { x: width * 0.48, y: height * 0.3 },  // destination
];

export function NavigationScreen() {
  const navigation = useNavigation<any>();
  const [arrived, setArrived] = useState(false);

  const handleArrived = () => {
    navigation.navigate('WaitForRider');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* DARK MAP BACKGROUND */}
      <View style={styles.mapBg}>
        {/* Grid roads */}
        <View style={[styles.roadH, { top: '25%' }]} />
        <View style={[styles.roadH, { top: '40%' }]} />
        <View style={[styles.roadH, { top: '55%', opacity: 0.05 }]} />
        <View style={[styles.roadH, { top: '70%', opacity: 0.04 }]} />
        <View style={[styles.roadV, { left: '22%', opacity: 0.07 }]} />
        <View style={[styles.roadV, { left: '48%' }]} />
        <View style={[styles.roadV, { left: '62%' }]} />
        <View style={[styles.roadV, { left: '80%', opacity: 0.04 }]} />

        {/* Route path (vertical segments) */}
        <View style={styles.routeSegV1} />
        <View style={styles.routeSegH1} />
        <View style={styles.routeSegV2} />
        <View style={styles.routeSegH2} />
        <View style={styles.routeSegV3} />

        {/* Car dot */}
        <View style={styles.carMarker}>
          <View style={styles.carMarkerInner}>
            <Text style={{ fontSize: 18 }}>🚗</Text>
          </View>
        </View>

        {/* Destination pin */}
        <View style={styles.destPin}>
          <Text style={{ fontSize: 22 }}>📍</Text>
        </View>

        {/* City glow */}
        <View style={styles.cityGlow} />
      </View>

      {/* TURN INSTRUCTION CARD (top) */}
      <SafeAreaView style={styles.topOverlay}>
        <View style={styles.instructionCard}>
          <View style={styles.turnIcon}>
            <Text style={styles.turnArrow}>↱</Text>
          </View>
          <View style={styles.instructionText}>
            <Text style={styles.turnAction}>Turn Right</Text>
            <Text style={styles.turnStreet}>onto Market St · 400 ft</Text>
          </View>
          <View style={styles.distancePill}>
            <Text style={styles.distancePillText}>400 ft</Text>
          </View>
        </View>

        {/* Next maneuver */}
        <View style={styles.nextCard}>
          <Text style={styles.nextLabel}>Then</Text>
          <Text style={styles.nextText}>↑ Continue on Lake Shore Dr for 1.2 mi</Text>
        </View>
      </SafeAreaView>

      {/* RIGHT FABs */}
      <View style={styles.rightFabs}>
        <Pressable style={styles.fab}>
          <Text style={{ fontSize: 20 }}>📍</Text>
        </Pressable>
        <Pressable style={styles.fab}>
          <Text style={{ fontSize: 20 }}>🗺️</Text>
        </Pressable>
      </View>

      {/* BOTTOM RIDER CARD */}
      <View style={styles.bottomCard}>
        {/* Rider info */}
        <View style={styles.riderRow}>
          <View style={styles.riderAvatar}>
            <Text style={styles.riderAvatarText}>M</Text>
          </View>
          <View style={styles.riderInfo}>
            <Text style={styles.riderName}>Marcus Thompson</Text>
            <View style={styles.riderMeta}>
              <Text style={styles.riderMetaText}>★ 4.9</Text>
              <View style={styles.metaDot} />
              <Text style={styles.riderMetaText}>4 min ETA</Text>
            </View>
          </View>
          <View style={styles.riderActions}>
            <Pressable style={styles.actionBtn}>
              <Text style={{ fontSize: 18 }}>💬</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Text style={{ fontSize: 18 }}>ℹ️</Text>
            </Pressable>
          </View>
        </View>

        {/* Trip summary */}
        <View style={styles.tripSummaryRow}>
          <View style={styles.tripSumItem}>
            <Text style={styles.tripSumValue}>3.2</Text>
            <Text style={styles.tripSumLabel}>miles</Text>
          </View>
          <View style={styles.tripSumDivider} />
          <View style={styles.tripSumItem}>
            <Text style={styles.tripSumValue}>14</Text>
            <Text style={styles.tripSumLabel}>mins</Text>
          </View>
          <View style={styles.tripSumDivider} />
          <View style={styles.tripSumItem}>
            <Text style={[styles.tripSumValue, { color: C.emerald }]}>$18.50</Text>
            <Text style={styles.tripSumLabel}>earned</Text>
          </View>
        </View>

        {/* ARRIVED button */}
        <Pressable style={styles.arrivedBtn} onPress={handleArrived}>
          <Text style={styles.arrivedBtnText}>ARRIVED AT PICKUP</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  mapBg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#080b10' },
  roadH: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: C.primary, opacity: 0.09 },
  roadV: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: C.primary, opacity: 0.09 },
  cityGlow: {
    position: 'absolute', left: '20%', top: '20%',
    width: width * 0.6, height: width * 0.6, borderRadius: width * 0.3,
    backgroundColor: 'rgba(39,110,241,0.1)',
  },

  // Route segments (vertical: from 65% to 50%, then east, then north to 40%, then west, then north to 30%)
  routeSegV1: {
    position: 'absolute',
    left: width * 0.5 - 2, top: height * 0.40, bottom: height * 0.35,
    width: 4, backgroundColor: C.primaryContainer, borderRadius: 2, opacity: 0.9,
  },
  routeSegH1: {
    position: 'absolute',
    left: width * 0.5, top: height * 0.50 - 2, width: width * 0.12,
    height: 4, backgroundColor: C.primaryContainer, borderRadius: 2, opacity: 0.9,
  },
  routeSegV2: {
    position: 'absolute',
    left: width * 0.62 - 2, top: height * 0.38, height: height * 0.12,
    width: 4, backgroundColor: C.primaryContainer, borderRadius: 2, opacity: 0.8,
  },
  routeSegH2: {
    position: 'absolute',
    left: width * 0.48, top: height * 0.38 - 2, width: width * 0.14,
    height: 4, backgroundColor: C.primaryContainer, borderRadius: 2, opacity: 0.8,
  },
  routeSegV3: {
    position: 'absolute',
    left: width * 0.48 - 2, top: height * 0.28, height: height * 0.1,
    width: 4, backgroundColor: C.primaryContainer, borderRadius: 2, opacity: 0.7,
  },

  carMarker: {
    position: 'absolute',
    left: width * 0.5 - 20, top: height * 0.55,
  },
  carMarkerInner: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    elevation: 12, borderWidth: 3, borderColor: 'rgba(177,197,255,0.5)',
  },
  destPin: {
    position: 'absolute',
    left: width * 0.48 - 12, top: height * 0.26,
  },

  // TOP OVERLAY
  topOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
    paddingTop: 8, paddingHorizontal: 16, gap: 8,
  },
  instructionCard: {
    backgroundColor: C.primaryContainer,
    borderRadius: 20, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    elevation: 16,
  },
  turnIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  turnArrow: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 28 },
  instructionText: { flex: 1 },
  turnAction: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 20, letterSpacing: -0.5 },
  turnStreet: { color: 'rgba(255,254,255,0.8)', fontSize: 12, fontWeight: '500', marginTop: 2 },
  distancePill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
  },
  distancePillText: { color: C.onPrimaryContainer, fontWeight: '800', fontSize: 12 },

  nextCard: {
    backgroundColor: 'rgba(42,42,43,0.94)',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.1)',
  },
  nextLabel: { color: 'rgba(194,198,215,0.5)', fontSize: 10, fontWeight: '700' },
  nextText: { color: C.onSurface, fontSize: 12, fontWeight: '600', flex: 1 },

  // RIGHT FABs
  rightFabs: {
    position: 'absolute', right: 16, top: '45%', gap: 10, zIndex: 30,
  },
  fab: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: 'rgba(42,42,43,0.94)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(140,144,160,0.15)', elevation: 8,
  },

  // BOTTOM CARD
  bottomCard: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(27,27,28,0.97)',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 36,
    borderTopWidth: 1, borderTopColor: 'rgba(66,70,84,0.25)',
    elevation: 20,
  },
  riderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  riderAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: C.primaryContainer,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(177,197,255,0.3)',
  },
  riderAvatarText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 20 },
  riderInfo: { flex: 1 },
  riderName: { color: C.onSurface, fontWeight: '800', fontSize: 17, letterSpacing: -0.3 },
  riderMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  riderMetaText: { color: C.onSurfaceVariant, fontSize: 12, fontWeight: '500' },
  metaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: C.outline },
  riderActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: C.surfaceHigh,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(66,70,84,0.3)',
  },

  tripSummaryRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.surfaceHigh, borderRadius: 14, padding: 14, marginBottom: 16,
  },
  tripSumItem: { flex: 1, alignItems: 'center' },
  tripSumValue: { color: C.onSurface, fontWeight: '900', fontSize: 22, letterSpacing: -0.5 },
  tripSumLabel: {
    color: 'rgba(194,198,215,0.5)', fontSize: 9, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.2, marginTop: 2,
  },
  tripSumDivider: { width: 1, height: 36, backgroundColor: 'rgba(66,70,84,0.4)' },

  arrivedBtn: {
    backgroundColor: C.primaryContainer,
    paddingVertical: 18, borderRadius: 18, alignItems: 'center', elevation: 8,
  },
  arrivedBtnText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 15, letterSpacing: 1.5 },
});
