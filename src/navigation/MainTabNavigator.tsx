import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ActivityScreen } from '../screens/ActivityScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Simple mock for material symbol icon if vector-icons is not installed
const TabIcon = ({ name, color, focused }: { name: string, color: string, focused: boolean }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ 
      color: color, 
      fontSize: 24, 
      fontWeight: focused ? 'bold' : 'normal' 
    }}>
      {name}
    </Text>
  </View>
);

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#131314',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          height: 80,
          paddingBottom: 24,
          paddingTop: 12,
        },
        tabBarActiveTintColor: '#b1c5ff',
        tabBarInactiveTintColor: 'rgba(194, 198, 215, 0.5)',
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(39, 110, 241, 0.1)' : 'transparent',
              paddingHorizontal: 16,
              paddingVertical: 4,
              borderRadius: 12,
            }}>
              <TabIcon name="⌂" color={color} focused={focused} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="ActivityTab" 
        component={ActivityScreen} 
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="≡" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={AccountScreen} 
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="👤" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
