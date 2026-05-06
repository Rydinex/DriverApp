import React from 'react';
import FeatureReadyScreen from '../components/FeatureReadyScreen';

export default function SafetyHubScreen({ navigation }: any) {
  return (
    <FeatureReadyScreen
      title="Safety Hub"
      description="Access emergency tools, safety workflows, and incident reporting while driving."
      navigation={navigation}
      actions={[
        { label: 'Open Trip In Progress', route: 'TripInProgress' },
        { label: 'Return To Main Tabs', route: 'MainTabs' },
      ]}
    />
  );
}
