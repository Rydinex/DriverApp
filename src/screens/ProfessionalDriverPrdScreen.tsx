import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PROFESSIONAL_PRD_BY_SLUG } from '../data/professionalPrdCatalog';
import { getPrdBlueprint } from '../data/professionalPrdBlueprints';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type RootStackParamList = {
  ProfessionalDriverPrd: { slug: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProfessionalDriverPrd'>;

const SCREEN_THEMES = {
  Airport: { top: '#193248', accent: '#8ec5ff' },
  Queue: { top: '#3c2b1c', accent: '#ffb694' },
  Payout: { top: '#18392f', accent: '#34d399' },
  Safety: { top: '#452424', accent: '#ffb4ab' },
  Operations: { top: '#1f2a4a', accent: '#b1c5ff' },
  Experience: { top: '#3a2f4a', accent: '#d9b8ff' },
} as const;

export function ProfessionalDriverPrdScreen({ navigation, route }: Props) {
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const item = PROFESSIONAL_PRD_BY_SLUG[route.params.slug];

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>PRD not found</Text>
          <Text style={styles.errorText}>The selected PRD key was not found in the professional catalog.</Text>
          <Pressable style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const theme = SCREEN_THEMES[item.category];
  const blueprint = getPrdBlueprint(item.category, item.slug);

  const defaultRegion = React.useMemo(
    () => ({
      latitude: 41.9786,
      longitude: -87.9048,
      latitudeDelta: 0.16,
      longitudeDelta: 0.16,
    }),
    []
  );

  const markerPoints = React.useMemo(
    () => [
      { id: 'a', label: 'Primary Zone', latitude: 41.9851, longitude: -87.9042 },
      { id: 'b', label: 'Overflow', latitude: 41.9698, longitude: -87.9183 },
      { id: 'c', label: 'Pickup', latitude: 41.9771, longitude: -87.8935 },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: theme.top }]}> 
          <Text style={styles.heroKicker}>PROFESSIONAL DRIVER</Text>
          <Text style={styles.heroTitle}>{item.title}</Text>
          <Text style={styles.heroSubtitle}>{item.subtitle}</Text>

          <View style={styles.metaRow}>
            <View style={[styles.metaPill, { borderColor: theme.accent }]}> 
              <Text style={[styles.metaText, { color: theme.accent }]}>{item.category}</Text>
            </View>
            <View style={[styles.metaPill, { borderColor: item.hasScreen ? '#34d399' : '#ffb694' }]}> 
              <Text style={[styles.metaText, { color: item.hasScreen ? '#34d399' : '#ffb694' }]}>
                {item.hasScreen ? 'PNG available' : 'PNG missing'}
              </Text>
            </View>
            <View style={[styles.metaPill, { borderColor: item.hasCode ? '#34d399' : '#ffb694' }]}> 
              <Text style={[styles.metaText, { color: item.hasCode ? '#34d399' : '#ffb694' }]}>
                {item.hasCode ? 'HTML available' : 'HTML missing'}
              </Text>
            </View>
          </View>
        </View>

        {blueprint.showMap ? (
          <View style={styles.mapWrap}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={defaultRegion}
              mapType="standard"
            >
              {markerPoints.map(point => (
                <Marker
                  key={point.id}
                  coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                  title={point.label}
                  description={item.title}
                />
              ))}
            </MapView>
            <View style={styles.mapLegend}>
              <Text style={styles.mapLegendTitle}>Live Map Layer</Text>
              <Text style={styles.mapLegendText}>Google map is now active for this PRD variation.</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Interactive Sections</Text>
          {blueprint.sections.map((highlight, index) => (
            <View key={`${item.slug}-section-${index}-${highlight.title}`} style={styles.rowItem}>
              <View style={[styles.dot, { backgroundColor: theme.accent }]} />
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle}>{highlight.title}</Text>
                <Text style={styles.rowText}>{highlight.value}</Text>
                <Text style={styles.rowNote}>{highlight.note}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Action Buttons</Text>
          <View style={styles.actionsWrap}>
            {blueprint.actions.map((actionLabel, index) => (
              <Pressable
                key={`${item.slug}-action-${index}-${actionLabel}`}
                style={[styles.actionBtn, selectedAction === actionLabel ? styles.actionBtnActive : null]}
                onPress={() => setSelectedAction(actionLabel)}
              >
                <Text style={[styles.actionBtnText, selectedAction === actionLabel ? styles.actionBtnTextActive : null]}>{actionLabel}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.selectionText}>
            {selectedAction ? `Selected: ${selectedAction}` : 'Tap any action to simulate the workflow for this PRD.'}
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Native Build Mapping</Text>
          <Text style={styles.detailText}>This screen is wired as native React Native UI and grouped under Professional Drivers.</Text>
          <Text style={styles.detailText}>Slug: {item.slug}</Text>
          <Text style={styles.detailText}>Every variation now includes action buttons and section cards as interactive app elements.</Text>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>Back to Library</Text>
          </Pressable>
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate('MainTabs' as never)}>
            <Text style={styles.primaryBtnText}>Go Home</Text>
          </Pressable>
        </View>
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
    padding: 16,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    color: '#e5e2e3',
    fontSize: 24,
    fontWeight: '800',
  },
  errorText: {
    marginTop: 8,
    color: '#c2c6d7',
    textAlign: 'center',
  },
  hero: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#353948',
  },
  heroKicker: {
    color: '#c2c6d7',
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: '700',
  },
  heroTitle: {
    marginTop: 8,
    color: '#fffeff',
    fontSize: 28,
    fontWeight: '800',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#dfe5ff',
    fontSize: 14,
    lineHeight: 20,
  },
  metaRow: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '700',
  },
  block: {
    marginTop: 14,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#1b1b1c',
    borderWidth: 1,
    borderColor: '#2b2f39',
  },
  blockTitle: {
    color: '#e5e2e3',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rowBody: {
    flex: 1,
  },
  rowTitle: {
    color: '#e5e2e3',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 6,
  },
  rowText: {
    color: '#c2c6d7',
    fontSize: 13,
    fontWeight: '700',
  },
  rowNote: {
    color: '#9ea3b7',
    fontSize: 12,
    marginTop: 2,
  },
  detailText: {
    color: '#c2c6d7',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 6,
  },
  buttonRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#424654',
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#c2c6d7',
    fontWeight: '700',
  },
  primaryBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#276ef1',
  },
  primaryBtnText: {
    color: '#fffeff',
    fontWeight: '700',
  },
  mapWrap: {
    marginTop: 14,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2d3140',
    backgroundColor: '#1b1b1c',
  },
  map: {
    width: '100%',
    height: 210,
  },
  mapLegend: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#2d3140',
  },
  mapLegendTitle: {
    color: '#e5e2e3',
    fontSize: 12,
    fontWeight: '700',
  },
  mapLegendText: {
    marginTop: 3,
    color: '#9ea3b7',
    fontSize: 11,
  },
  actionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionBtn: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3a3f4f',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#222327',
  },
  actionBtnActive: {
    backgroundColor: '#276ef1',
    borderColor: '#276ef1',
  },
  actionBtnText: {
    color: '#cbd2e7',
    fontSize: 12,
    fontWeight: '700',
  },
  actionBtnTextActive: {
    color: '#fffeff',
  },
  selectionText: {
    marginTop: 10,
    color: '#9ea3b7',
    fontSize: 12,
  },
});
