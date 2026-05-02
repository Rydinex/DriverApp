import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PROFESSIONAL_PRD_ITEMS, ProfessionalPrdItem } from '../data/professionalPrdCatalog';

function categoryColor(category: ProfessionalPrdItem['category']) {
  switch (category) {
    case 'Airport':
      return '#8ec5ff';
    case 'Queue':
      return '#ffb694';
    case 'Payout':
      return '#34d399';
    case 'Safety':
      return '#ffb4ab';
    case 'Operations':
      return '#b1c5ff';
    case 'Experience':
      return '#d9b8ff';
    default:
      return '#c2c6d7';
  }
}

export function ProfessionalDriversHubScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>RYDINEX BLACK</Text>
        <Text style={styles.title}>Professional Driver PRD Library</Text>
        <Text style={styles.subtitle}>All requested PRD designs are wired here as native app destinations.</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{PROFESSIONAL_PRD_ITEMS.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>PNG + HTML</Text>
            <Text style={styles.statValue}>{PROFESSIONAL_PRD_ITEMS.filter(item => item.hasScreen && item.hasCode).length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>HTML Only</Text>
            <Text style={styles.statValue}>{PROFESSIONAL_PRD_ITEMS.filter(item => !item.hasScreen && item.hasCode).length}</Text>
          </View>
        </View>

        {PROFESSIONAL_PRD_ITEMS.map(item => {
          const isComplete = item.hasScreen && item.hasCode;

          return (
            <Pressable
              key={item.slug}
              style={styles.card}
              onPress={() => navigation.navigate('ProfessionalDriverPrd', { slug: item.slug })}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.categoryPill, { backgroundColor: categoryColor(item.category) }]}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View style={[styles.statusPill, { borderColor: isComplete ? '#34d399' : '#ffb694' }]}>
                  <Text style={[styles.statusText, { color: isComplete ? '#34d399' : '#ffb694' }]}>
                    {isComplete ? 'PNG + HTML' : item.hasCode ? 'HTML only' : 'Missing files'}
                  </Text>
                </View>
              </View>

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

              <View style={styles.highlightsRow}>
                {item.highlights.map((highlight, index) => (
                  <View key={`${item.slug}-highlight-${index}-${highlight}`} style={styles.highlightChip}>
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.openText}>Open screen</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131314',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 60,
  },
  kicker: {
    color: '#8c90a0',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
  },
  title: {
    marginTop: 6,
    color: '#e5e2e3',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 10,
    color: '#c2c6d7',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    backgroundColor: '#1f1f20',
    borderWidth: 1,
    borderColor: '#2f2f31',
  },
  statLabel: {
    color: '#8c90a0',
    fontSize: 11,
    textAlign: 'center',
  },
  statValue: {
    marginTop: 4,
    color: '#e5e2e3',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    marginBottom: 12,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#1b1b1c',
    borderWidth: 1,
    borderColor: '#2d2f39',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    color: '#0e0e0f',
    fontSize: 11,
    fontWeight: '700',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    marginTop: 10,
    color: '#e5e2e3',
    fontSize: 18,
    fontWeight: '700',
  },
  cardSubtitle: {
    marginTop: 4,
    color: '#c2c6d7',
    fontSize: 13,
  },
  highlightsRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  highlightChip: {
    borderRadius: 999,
    backgroundColor: '#26282d',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  highlightText: {
    color: '#b8bfd3',
    fontSize: 11,
    fontWeight: '600',
  },
  openText: {
    marginTop: 12,
    color: '#b1c5ff',
    fontSize: 13,
    fontWeight: '700',
  },
});
