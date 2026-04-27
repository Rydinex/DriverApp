import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export function ActivityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity & Earnings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Trips</Text>
          <Text style={styles.cardValue}>12 Completed</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Summary</Text>
          <Text style={styles.cardValue}>$840.50</Text>
        </View>
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>Detailed trip history and earnings graphs will appear here.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0f',
  },
  header: {
    padding: 24,
    paddingTop: 32,
    backgroundColor: '#131314',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(140, 144, 160, 0.1)',
  },
  headerTitle: {
    color: '#b1c5ff',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 28,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#1f1f20',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(140, 144, 160, 0.1)',
  },
  cardTitle: {
    color: '#c2c6d7',
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    color: '#e5e2e3',
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
  },
  placeholderBox: {
    marginTop: 24,
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#424654',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#8c90a0',
    textAlign: 'center',
    lineHeight: 20,
  },
});
