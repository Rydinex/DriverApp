import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';

export function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSobxiSm1Noes1wUBKas0mscmOlg1q2jF9eTBZOk_R3cgrTgP1y6MHpOFbkS_ONA-xSrVRhhOJBWuNNZoLDeohXRVBGKci6eaXC6deNP50I5FfyJyqrbreHyoPQae-X1JoSad7KU4JZ8UcBHqelU-TINvvYThaAzhGnnySd4QVpiHBoPhpKbbNNXsJPcUg-MJd3BkaBUDTyoiOH-jig7Lq4PfUfC3BeJAbpnIr1LHGDVbI4UsyWVyidORyQ1RtwkEW9Rtw0ZLYUSA' }} 
              style={styles.avatarImage} 
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.driverName}>Anthony D.</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingScore}>4.98</Text>
            </View>
          </View>
        </View>

        {/* Action Menu */}
        <View style={styles.menuGroup}>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuIcon}>workspace_premium</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Pro Dashboard</Text>
              <Text style={styles.menuSubtitle}>Tier status & rewards</Text>
            </View>
            <Text style={styles.menuChevron}>chevron_right</Text>
          </Pressable>
          
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuIcon}>local_shipping</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Vehicle & Fleet</Text>
              <Text style={styles.menuSubtitle}>Manage active vehicles</Text>
            </View>
            <Text style={styles.menuChevron}>chevron_right</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Text style={styles.menuIcon}>receipt_long</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Tax Center</Text>
              <Text style={styles.menuSubtitle}>Documents & summaries</Text>
            </View>
            <Text style={styles.menuChevron}>chevron_right</Text>
          </Pressable>
          
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuIcon}>settings</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>App Settings</Text>
              <Text style={styles.menuSubtitle}>Navigation, sound & preferences</Text>
            </View>
            <Text style={styles.menuChevron}>chevron_right</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0f',
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#353436',
    borderWidth: 2,
    borderColor: '#424654',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  driverName: {
    color: '#e5e2e3',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 28,
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 110, 241, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
    gap: 4,
  },
  ratingStar: {
    color: '#276ef1',
    fontSize: 14,
  },
  ratingScore: {
    color: '#276ef1',
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  menuGroup: {
    backgroundColor: '#131314',
    borderRadius: 24,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(140, 144, 160, 0.1)',
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
  },
  menuIcon: {
    fontFamily: 'Material Icons', // Assuming Material Icons is linked, otherwise fallback to text for now
    color: '#8c90a0',
    fontSize: 24,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    color: '#e5e2e3',
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  menuSubtitle: {
    color: '#8c90a0',
    fontSize: 12,
  },
  menuChevron: {
    color: '#424654',
    fontSize: 24,
    fontFamily: 'Material Icons',
  },
  logoutButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 180, 171, 0.1)',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ffb4ab',
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },
});
