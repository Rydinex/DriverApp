import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Map Background Simulation */}
      <View style={styles.mapBackground}>
        {/* Surge Heatmap Simulation */}
        <View style={styles.surgeGradient} />
      </View>

      {/* Floating UI Elements */}
      <View style={styles.overlay}>
        {/* Top Status & Earnings Row */}
        <View style={styles.topRow}>
          {/* Status Bar */}
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, isOnline ? styles.onlineDot : styles.offlineDot]} />
            <Text style={styles.statusText}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
            <View style={styles.toggleTrack}>
              <View style={[styles.toggleThumb, isOnline && styles.toggleThumbActive]} />
            </View>
          </View>

          {/* Earnings Card */}
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>DAILY EARNINGS</Text>
            <View style={styles.earningsValueRow}>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.earningsAmount}>142.50</Text>
            </View>
            <View style={styles.trendBadge}>
              <Text style={styles.trendIcon}>↗</Text>
              <Text style={styles.trendText}>+12% vs yesterday</Text>
            </View>
          </View>
        </View>

        {/* Central Surge Indicator */}
        <View style={styles.surgeIndicatorContainer}>
          <View style={styles.surgeCard}>
            <Text style={styles.surgeIcon}>⚡</Text>
            <View>
              <Text style={styles.surgeTitle}>High Demand Area</Text>
              <Text style={styles.surgeSubtitle}>1.8x Surge in Financial District</Text>
            </View>
          </View>
        </View>

        {/* Bottom Interaction Area */}
        <View style={styles.bottomArea}>
          {/* Main GO Button */}
          <Pressable 
            style={[styles.goButtonOuter, isOnline && styles.goButtonOuterActive]}
            onPress={() => setIsOnline(!isOnline)}
          >
            <View style={[styles.goButtonInner, isOnline && styles.goButtonInnerActive]}>
              <Text style={styles.goText}>{isOnline ? 'STOP' : 'GO'}</Text>
              <Text style={styles.goSubtext}>{isOnline ? 'Go Offline' : 'Online'}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0f',
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0e0e0f',
  },
  surgeGradient: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(39, 110, 241, 0.15)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 42, 43, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(140, 144, 160, 0.1)',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  offlineDot: {
    backgroundColor: '#8c90a0',
  },
  onlineDot: {
    backgroundColor: '#276ef1',
  },
  statusText: {
    color: '#e5e2e3',
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  toggleTrack: {
    width: 40,
    height: 24,
    backgroundColor: '#353436',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#c2c6d7',
  },
  toggleThumbActive: {
    backgroundColor: '#276ef1',
    transform: [{ translateX: 16 }],
  },
  earningsCard: {
    backgroundColor: 'rgba(42, 42, 43, 0.9)',
    padding: 16,
    borderRadius: 24,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(140, 144, 160, 0.1)',
    minWidth: 140,
  },
  earningsLabel: {
    color: 'rgba(194, 198, 215, 0.6)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  earningsValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currencySymbol: {
    color: '#e5e2e3',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 24,
  },
  earningsAmount: {
    color: '#e5e2e3',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 24,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(177, 197, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    gap: 6,
  },
  trendIcon: {
    color: '#b1c5ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  trendText: {
    color: '#b1c5ff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  surgeIndicatorContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  surgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(177, 197, 255, 0.2)',
    borderColor: 'rgba(177, 197, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 12,
    alignSelf: 'flex-start',
  },
  surgeIcon: {
    fontSize: 20,
    color: '#b1c5ff',
  },
  surgeTitle: {
    color: '#b1c5ff',
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  surgeSubtitle: {
    color: '#c2c6d7',
    fontSize: 12,
  },
  bottomArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  goButtonOuter: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: 'rgba(39, 110, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButtonOuterActive: {
    backgroundColor: 'rgba(147, 0, 10, 0.15)',
  },
  goButtonInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#276ef1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 254, 255, 0.1)',
    elevation: 10,
  },
  goButtonInnerActive: {
    backgroundColor: '#93000a',
  },
  goText: {
    color: '#fffeff',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 32,
    letterSpacing: -1,
  },
  goSubtext: {
    color: 'rgba(255, 254, 255, 0.8)',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 4,
  },
});
