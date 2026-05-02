import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
  outlineVariant: '#424654',
  error: '#ffb4ab',
};

const INITIAL_SECONDS = 2 * 60 + 48;
const WAIT_CHARGE_SECONDS = 5 * 60;
const CANCEL_REASONS = [
  'Rider did not show up',
  'Unsafe pickup location',
  'Unable to contact rider',
  'Vehicle issue / emergency',
  'Other',
] as const;

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function WaitForRiderScreen() {
  const navigation = useNavigation<any>();
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_SECONDS);
  const [chargePhaseSeconds, setChargePhaseSeconds] = useState(0);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedCancelReason, setSelectedCancelReason] = useState<string | null>(null);
  const [riderInCar, setRiderInCar] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        setChargePhaseSeconds(c => c + 1);
        return 0;
      });
    }, 1000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 900, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    return () => clearInterval(timer);
  }, [pulse]);

  const progress = useMemo(() => {
    const elapsed = INITIAL_SECONDS - secondsRemaining;
    const ratio = Math.max(0, Math.min(1, elapsed / INITIAL_SECONDS));
    return `${Math.round(ratio * 100)}%`;
  }, [secondsRemaining]);

  const chargeActive = secondsRemaining === 0;
  const elapsedSeconds = INITIAL_SECONDS - secondsRemaining;

  const riderPhase = useMemo(() => {
    if (elapsedSeconds < 25) {
      return 'Waiting for rider';
    }
    if (elapsedSeconds < 55) {
      return 'Rider is approaching now';
    }
    return 'Rider arrived. Rider in car. Start ride.';
  }, [elapsedSeconds]);

  const canStartRide = riderInCar || elapsedSeconds >= 55;

  const mapRegion = useMemo(
    () => ({
      latitude: 41.8818,
      longitude: -87.6232,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
    []
  );

  const handleStartRide = () => {
    navigation.navigate('TripInProgress');
  };

  const openCancelModal = () => {
    setCancelModalVisible(true);
  };

  const handleConfirmCancel = () => {
    if (!selectedCancelReason) {
      return;
    }
    setCancelModalVisible(false);
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <MapView provider={PROVIDER_GOOGLE} style={styles.mapBg} initialRegion={mapRegion}>
        <Marker coordinate={{ latitude: 41.8818, longitude: -87.6232 }} title="Driver" description="Waiting at pickup" />
        <Marker coordinate={{ latitude: 41.8826, longitude: -87.6224 }} title="Rider" description="Approaching pickup" pinColor="#276ef1" />
      </MapView>

      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Text style={styles.iconText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Trip Status</Text>
          <Pressable style={styles.iconBtn}>
            <Text style={styles.iconText}>?</Text>
          </Pressable>
        </View>

        <View style={styles.mapCenterTagWrap}>
          <Animated.View style={[styles.riderDot, { transform: [{ scale: pulse }] }]}>
            <Text style={styles.riderEmoji}>🧍</Text>
          </Animated.View>
          <View style={styles.arrivedTag}>
            <Text style={styles.arrivedTagText}>ARRIVED AT PICKUP</Text>
          </View>
          <View style={styles.phaseTag}>
            <Text style={styles.phaseTagText}>{riderPhase}</Text>
          </View>
        </View>

        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>{chargeActive ? 'Charging Wait Time' : 'Current Grace Period'}</Text>
          <Text style={styles.timerValue}>{chargeActive ? formatTimer(chargePhaseSeconds) : formatTimer(secondsRemaining)}</Text>

          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: progress }]} />
          </View>

          <Text style={styles.waitingText}>
            Waiting for <Text style={styles.waitingStrong}>Jonathan D.</Text> at the main entrance.
          </Text>

          {!chargeActive ? (
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Grace Period Active</Text>
              <Text style={styles.infoText}>Charging wait time is hidden until the countdown reaches 00:00.</Text>
            </View>
          ) : (
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Charging Wait Time</Text>
              <Text style={styles.infoText}>Wait-time billing is active now. Black/SUV: 10m, Standard: 5m.</Text>
            </View>
          )}

          {chargePhaseSeconds >= WAIT_CHARGE_SECONDS ? (
            <View style={styles.warnCard}>
              <Text style={styles.warnTitle}>Cancelation Fee Eligible</Text>
              <Text style={styles.warnText}>No-show cancelation fee can now be applied if rider does not enter the car.</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.bottomDock}>
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Call Rider</Text>
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.cancelBtn]} onPress={openCancelModal}>
              <Text style={[styles.actionBtnText, styles.cancelBtnText]}>Cancel Trip</Text>
            </Pressable>
          </View>

          <View style={styles.bottomControlBar}>
            <Pressable
              style={[styles.riderInCarBtn, riderInCar ? styles.riderInCarBtnActive : null]}
              onPress={() => setRiderInCar(true)}
            >
              <Text style={[styles.riderInCarBtnText, riderInCar ? styles.riderInCarBtnTextActive : null]}>
                {riderInCar ? 'RIDER IN CAR: CONFIRMED' : 'RIDER IN CAR'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.startRideBtn, !canStartRide ? styles.startRideBtnDisabled : null]}
              disabled={!canStartRide}
              onPress={handleStartRide}
            >
              <Text style={styles.startRideBtnText}>{canStartRide ? 'START RIDE' : 'WAITING FOR RIDER...'}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <Modal visible={cancelModalVisible} transparent animationType="fade" onRequestClose={() => setCancelModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select cancel reason</Text>
            <Text style={styles.modalSubtitle}>Choose a reason before canceling this trip.</Text>

            <View style={styles.reasonList}>
              {CANCEL_REASONS.map(reason => {
                const active = selectedCancelReason === reason;

                return (
                  <Pressable
                    key={reason}
                    style={[styles.reasonItem, active ? styles.reasonItemActive : null]}
                    onPress={() => setSelectedCancelReason(reason)}
                  >
                    <Text style={[styles.reasonText, active ? styles.reasonTextActive : null]}>{reason}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.modalActions}>
              <Pressable style={styles.modalSecondaryBtn} onPress={() => setCancelModalVisible(false)}>
                <Text style={styles.modalSecondaryText}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.modalDangerBtn, !selectedCancelReason ? styles.modalDangerBtnDisabled : null]}
                onPress={handleConfirmCancel}
                disabled={!selectedCancelReason}
              >
                <Text style={styles.modalDangerText}>Confirm Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  mapBg: { ...StyleSheet.absoluteFillObject },
  overlay: { flex: 1, paddingHorizontal: 18 },

  header: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(53,52,54,0.65)',
  },
  iconText: { color: C.primary, fontWeight: '800', fontSize: 18 },
  headerTitle: { color: C.primary, fontSize: 18, fontWeight: '800' },

  mapCenterTagWrap: {
    alignItems: 'center',
    marginTop: 60,
  },
  riderDot: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.primaryContainer,
    borderWidth: 3,
    borderColor: C.primary,
  },
  riderEmoji: { fontSize: 22 },
  arrivedTag: {
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: C.surfaceHighest,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  arrivedTagText: {
    color: C.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  phaseTag: {
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(19,19,20,0.82)',
    borderWidth: 1,
    borderColor: C.outlineVariant,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  phaseTagText: {
    color: C.onSurface,
    fontSize: 11,
    fontWeight: '700',
  },

  timerCard: {
    marginTop: 18,
    borderRadius: 28,
    padding: 18,
    backgroundColor: 'rgba(53,52,54,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  timerLabel: {
    color: C.tertiary,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '800',
  },
  timerValue: {
    marginTop: 6,
    color: C.onSurface,
    textAlign: 'center',
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: -1,
  },
  progressBg: {
    marginTop: 10,
    height: 6,
    borderRadius: 4,
    backgroundColor: C.surfaceHighest,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: C.primaryContainer,
  },
  waitingText: {
    marginTop: 16,
    color: C.onSurfaceVariant,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  waitingStrong: { color: C.onSurface, fontWeight: '800' },

  infoCard: {
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: C.surfaceLow,
    padding: 12,
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  infoTitle: { color: C.onSurface, fontWeight: '800', fontSize: 13 },
  infoText: { marginTop: 4, color: C.onSurfaceVariant, fontSize: 12, lineHeight: 17 },

  warnCard: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255,180,171,0.08)',
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,180,171,0.2)',
  },
  warnTitle: { color: C.error, fontWeight: '800', fontSize: 13 },
  warnText: { marginTop: 4, color: C.onSurfaceVariant, fontSize: 12, lineHeight: 17 },

  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(53,52,54,0.72)',
    borderWidth: 1,
    borderColor: C.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: { color: C.onSurface, fontWeight: '800', fontSize: 14 },
  cancelBtn: { borderColor: 'rgba(255,180,171,0.4)' },
  cancelBtnText: { color: C.error },
  startRideBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: C.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  startRideBtnDisabled: {
    backgroundColor: '#33405f',
  },
  startRideBtnText: {
    color: C.onPrimaryContainer,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  bottomControlBar: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  bottomDock: {
    marginTop: 'auto',
    marginBottom: 12,
    padding: 10,
    borderRadius: 18,
    backgroundColor: 'rgba(19,19,20,0.85)',
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  riderInCarBtn: {
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.surfaceHigh,
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  riderInCarBtnActive: {
    backgroundColor: 'rgba(52,211,153,0.2)',
    borderColor: 'rgba(52,211,153,0.6)',
  },
  riderInCarBtnText: {
    color: C.onSurfaceVariant,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  riderInCarBtnTextActive: {
    color: '#34d399',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 18,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    padding: 16,
  },
  modalTitle: {
    color: C.onSurface,
    fontSize: 18,
    fontWeight: '800',
  },
  modalSubtitle: {
    marginTop: 6,
    color: C.onSurfaceVariant,
    fontSize: 12,
  },
  reasonList: {
    marginTop: 12,
    gap: 8,
  },
  reasonItem: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    backgroundColor: C.surfaceHigh,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  reasonItemActive: {
    borderColor: C.primary,
    backgroundColor: 'rgba(39,110,241,0.2)',
  },
  reasonText: {
    color: C.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
  reasonTextActive: {
    color: C.primary,
  },
  modalActions: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  modalSecondaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSecondaryText: {
    color: C.onSurfaceVariant,
    fontWeight: '700',
  },
  modalDangerBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#7f1d1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDangerBtnDisabled: {
    backgroundColor: '#4a2525',
  },
  modalDangerText: {
    color: '#ffe5e2',
    fontWeight: '800',
  },
});
