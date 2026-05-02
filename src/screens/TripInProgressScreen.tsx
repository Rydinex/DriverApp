import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const C = {
  bg: '#131314',
  surfaceLow: '#1b1b1c',
  surfaceHigh: '#2a2a2b',
  surfaceHighest: '#353436',
  onSurface: '#e5e2e3',
  onSurfaceVariant: '#c2c6d7',
  primary: '#b1c5ff',
  primaryContainer: '#276ef1',
  onPrimaryContainer: '#fffeff',
  emerald: '#34d399',
};

export function TripInProgressScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <View style={styles.mapBg}>
        <View style={[styles.roadH, { top: '28%' }]} />
        <View style={[styles.roadH, { top: '46%' }]} />
        <View style={[styles.roadH, { top: '66%', opacity: 0.05 }]} />
        <View style={[styles.roadV, { left: '24%' }]} />
        <View style={[styles.roadV, { left: '52%' }]} />
        <View style={[styles.roadV, { left: '78%', opacity: 0.04 }]} />

        <View style={styles.routeV1} />
        <View style={styles.routeH1} />
        <View style={styles.routeV2} />
        <View style={styles.routeH2} />

        <View style={styles.carPin}><Text style={styles.pinEmoji}>🚗</Text></View>
        <View style={styles.destinationPin}><Text style={styles.pinEmoji}>📍</Text></View>
      </View>

      <SafeAreaView style={styles.topOverlay}>
        <View style={styles.instructionCard}>
          <View style={styles.turnIcon}><Text style={styles.turnArrow}>↱</Text></View>
          <View style={styles.instructionTextWrap}>
            <Text style={styles.nextTurnLabel}>Next Turn · 400 ft</Text>
            <Text style={styles.instructionTitle}>Turn Right onto Market St</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.bottomSheet}>
        <View style={styles.riderRow}>
          <View style={styles.avatar}><Text style={styles.avatarText}>M</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.riderName}>Marcus Thompson</Text>
            <Text style={styles.riderMeta}>In car · En route to destination</Text>
          </View>
          <Text style={styles.eta}>12 min</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}><Text style={styles.summaryValue}>5.6</Text><Text style={styles.summaryLabel}>miles left</Text></View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}><Text style={styles.summaryValue}>12</Text><Text style={styles.summaryLabel}>mins</Text></View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}><Text style={[styles.summaryValue, { color: C.emerald }]}>$24.70</Text><Text style={styles.summaryLabel}>trip est</Text></View>
        </View>

        <Pressable style={styles.arrivedBtn} onPress={() => navigation.navigate('DestinationReached')}>
          <Text style={styles.arrivedBtnText}>ARRIVED AT DESTINATION</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  mapBg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0d1117' },
  roadH: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: C.primary, opacity: 0.08 },
  roadV: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: C.primary, opacity: 0.08 },

  routeV1: { position: 'absolute', left: width * 0.42 - 2, top: height * 0.62, height: height * 0.16, width: 4, borderRadius: 2, backgroundColor: C.primaryContainer },
  routeH1: { position: 'absolute', left: width * 0.42, top: height * 0.62 - 2, width: width * 0.18, height: 4, borderRadius: 2, backgroundColor: C.primaryContainer },
  routeV2: { position: 'absolute', left: width * 0.60 - 2, top: height * 0.40, height: height * 0.22, width: 4, borderRadius: 2, backgroundColor: C.primaryContainer },
  routeH2: { position: 'absolute', left: width * 0.60, top: height * 0.40 - 2, width: width * 0.15, height: 4, borderRadius: 2, backgroundColor: C.primaryContainer },

  carPin: { position: 'absolute', left: width * 0.42 - 18, top: height * 0.72, width: 36, height: 36, borderRadius: 18, backgroundColor: C.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  destinationPin: { position: 'absolute', left: width * 0.74 - 18, top: height * 0.38, width: 36, height: 36, borderRadius: 18, backgroundColor: C.surfaceHighest, alignItems: 'center', justifyContent: 'center' },
  pinEmoji: { fontSize: 16 },

  topOverlay: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 10 },
  instructionCard: {
    backgroundColor: C.primaryContainer,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  turnIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  turnArrow: { color: C.onPrimaryContainer, fontSize: 24, fontWeight: '900' },
  instructionTextWrap: { flex: 1 },
  nextTurnLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '700' },
  instructionTitle: { color: C.onPrimaryContainer, fontSize: 22, fontWeight: '900', marginTop: 2 },

  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'rgba(27,27,28,0.97)',
    borderTopWidth: 1,
    borderTopColor: '#333845',
    padding: 18,
    paddingBottom: 30,
  },
  riderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 20 },
  riderName: { color: C.onSurface, fontSize: 17, fontWeight: '800' },
  riderMeta: { color: C.onSurfaceVariant, fontSize: 12, marginTop: 2 },
  eta: { color: C.primary, fontWeight: '900', fontSize: 16 },

  summaryRow: { flexDirection: 'row', backgroundColor: C.surfaceHigh, borderRadius: 14, padding: 12, marginBottom: 14 },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { color: C.onSurface, fontWeight: '900', fontSize: 20 },
  summaryLabel: { color: C.onSurfaceVariant, fontSize: 10, textTransform: 'uppercase', marginTop: 2, letterSpacing: 0.8 },
  summaryDivider: { width: 1, backgroundColor: '#424654' },

  arrivedBtn: { height: 56, borderRadius: 16, backgroundColor: C.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  arrivedBtnText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 14, letterSpacing: 1.1 },
});
