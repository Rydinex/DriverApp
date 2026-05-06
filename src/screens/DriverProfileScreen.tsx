import React from 'react';
import FeatureReadyScreen from '../components/FeatureReadyScreen';

export default function DriverProfileScreen({ navigation }: any) {
  return (
    <FeatureReadyScreen
      title="Driver Profile"
      description="Manage your driver profile, verification status, and professional settings."
      navigation={navigation}
      actions={[
        { label: 'Open Pro Hub', route: 'ProfessionalDriversHub' },
        { label: 'Go To Main Tabs', route: 'MainTabs' },
      ]}
    />
  );
}
