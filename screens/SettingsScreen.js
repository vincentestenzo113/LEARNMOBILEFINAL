import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import { ChangePasswordScreen } from './ChangePasswordScreen'; // Import the ChangePasswordScreen component

const SettingsScreen = () => {
  const navigation = useNavigation(); // Navigation hook

  const handleNotificationToggle = () => {
    // Handle notification toggle
  };

  const handleDarkModeToggle = () => {
    // Handle dark mode toggle
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingItem}>
        <Text>Notifications</Text>
        <Switch onValueChange={handleNotificationToggle} />
      </View>
      <View style={styles.settingItem}>
        <Text>Dark Mode</Text>
        <Switch onValueChange={handleDarkModeToggle} />
      </View>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ChangePassword')}>
        <Text>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Cyan color
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SettingsScreen;
