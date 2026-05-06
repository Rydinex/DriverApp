import React from 'react';
import FeatureReadyScreen from '../components/FeatureReadyScreen';

export default function TripTrackingScreen({ navigation }: any) {
  return (
    <FeatureReadyScreen
      title="Trip Tracking"
      description="Track route progress, rider ETA milestones, and status transitions in one place."
      navigation={navigation}
      actions={[
        { label: 'Open Navigation', route: 'NavigationScreen' },
        { label: 'Open Trip In Progress', route: 'TripInProgress' },
      ]}
    />
  );
}
