import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const C = {
  bg: '#131314',
  surfaceLow: '#1b1b1c',
  surfaceHigh: '#2a2a2b',
  onSurface: '#e5e2e3',
  onSurfaceVariant: '#c2c6d7',
  primary: '#b1c5ff',
  primaryContainer: '#276ef1',
  onPrimaryContainer: '#fffeff',
};

export function DestinationReachedScreen() {
  const navigation = useNavigation<any>();

  const handleReturnToDashboard = () => {
    // Reset navigation stack and return to HomeTab in online state
    navigation.reset({
      index: 0,
      routes: [{ 
        name: 'MainTabs', 
        params: { 
          screen: 'HomeTab',
          params: { startOnline: true }
        } 
      }],
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <View style={styles.centerWrap}>
        <View style={styles.iconHalo}>
          <Text style={styles.icon}>✓</Text>
        </View>

        <Text style={styles.title}>Destination Reached</Text>
        <Text style={styles.subtitle}>Your destination filter at O'Hare International Airport is now complete.</Text>

        <View style={styles.grid}>
          <View style={styles.card}><Text style={styles.cardLabel}>Filter Duration</Text><Text style={styles.cardValue}>42m 15s</Text></View>
          <View style={styles.card}><Text style={styles.cardLabel}>Total Distance</Text><Text style={styles.cardValue}>18.4 mi</Text></View>
          <View style={[styles.card, styles.fullCard]}><Text style={styles.cardLabel}>Earnings During Filter</Text><Text style={styles.cardValue}>$34.50</Text></View>
        </View>

        <Pressable style={styles.primaryBtn} onPress={handleReturnToDashboard}>
          <Text style={styles.primaryBtnText}>RETURN TO DASHBOARD</Text>
        </Pressable>

        <Pressable style={styles.linkBtn} onPress={() => navigation.navigate('ProfessionalDriverPrd', { slug: 'rydinex_driver_set_destination' })}>
          <Text style={styles.linkBtnText}>SET NEW DESTINATION</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  centerWrap: { flex: 1, padding: 22, alignItems: 'center', justifyContent: 'center' },
  iconHalo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: C.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#276ef1',
    shadowOpacity: 0.6,
    shadowRadius: 24,
  },
  icon: { color: C.onPrimaryContainer, fontSize: 52, fontWeight: '900' },
  title: { marginTop: 24, color: C.onSurface, fontSize: 40, fontWeight: '900', textAlign: 'center' },
  subtitle: { marginTop: 8, color: C.onSurfaceVariant, fontSize: 14, textAlign: 'center', lineHeight: 20 },

  grid: { marginTop: 18, width: '100%', gap: 10 },
  card: {
    borderRadius: 14,
    backgroundColor: C.surfaceLow,
    borderWidth: 1,
    borderColor: '#353946',
    padding: 14,
  },
  fullCard: { backgroundColor: C.surfaceHigh },
  cardLabel: { color: C.onSurfaceVariant, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
  cardValue: { marginTop: 4, color: C.onSurface, fontSize: 24, fontWeight: '800' },

  primaryBtn: {
    marginTop: 16,
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.primaryContainer,
  },
  primaryBtnText: { color: C.onPrimaryContainer, fontWeight: '900', fontSize: 13, letterSpacing: 1 },
  linkBtn: { marginTop: 12, paddingVertical: 10, paddingHorizontal: 14 },
  linkBtnText: { color: C.primary, fontWeight: '800', fontSize: 12, letterSpacing: 1 },
});
