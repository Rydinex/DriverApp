import React from 'react';
import FeatureReadyScreen from '../components/FeatureReadyScreen';

export default function RequestRideScreen({ navigation }: any) {
  return (
    <FeatureReadyScreen
      title="Incoming Ride Request"
      description="Review rider pickup details, payout estimate, and accept or decline quickly."
      navigation={navigation}
      actions={[
        { label: 'Open Incoming Requests', route: 'IncomingRequests' },
        { label: 'Go To Main Tabs', route: 'MainTabs' },
      ]}
    />
  );
}
