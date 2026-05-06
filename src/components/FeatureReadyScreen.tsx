import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type FeatureAction = {
  label: string;
  route: string;
};

type FeatureReadyScreenProps = {
  title: string;
  description: string;
  actions?: FeatureAction[];
  navigation?: {
    navigate?: (route: string, params?: Record<string, unknown>) => void;
    goBack?: () => void;
  };
};

export default function FeatureReadyScreen({ title, description, actions = [], navigation }: FeatureReadyScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>Rydinex Driver</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Actions</Text>
        {actions.map(action => (
          <Pressable
            key={action.label}
            style={styles.action}
            onPress={() => navigation?.navigate?.(action.route)}
          >
            <Text style={styles.actionText}>{action.label}</Text>
          </Pressable>
        ))}
        <Pressable style={[styles.action, styles.secondary]} onPress={() => navigation?.goBack?.()}>
          <Text style={styles.secondaryText}>Go Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#131314',
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#1f1f20',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a2a2b',
    padding: 16,
  },
  badge: {
    color: '#9aa7c7',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  title: {
    color: '#e5e2e3',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#c2c6d7',
    lineHeight: 20,
  },
  sectionTitle: {
    color: '#e5e2e3',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  action: {
    backgroundColor: '#276ef1',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  secondary: {
    backgroundColor: '#2a2a2b',
    borderWidth: 1,
    borderColor: '#424654',
    marginBottom: 0,
  },
  secondaryText: {
    color: '#e5e2e3',
    fontWeight: '600',
  },
});
