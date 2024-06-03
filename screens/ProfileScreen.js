import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, FlatList, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import { ProgressBar } from 'react-native-paper';
import axios from 'axios';
import { useCourses } from '../screens/CourseContext';

const ProfileScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // New state for selected course
  const navigation = useNavigation(); // Navigation hook
  const { enrolledCourses, unenrollFromCourse } = useCourses();
  
  // Fetch User Data with Token Retrieval
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('token');
        console.log('Retrieved token:', userId); // Debug log
        if (!userId) {
          throw new Error('No user token found');
        }
        console.log('Fetching data for user ID:', userId);
        const response = await axios.get(`https://learnit-1-aggl.onrender.com/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    };
    fetchUserData();
  }, []);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = async () => {
    try {
      // Clear user token or any relevant authentication data from AsyncStorage
      await AsyncStorage.removeItem("token");

      // Navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleAddCourse = () => {
    navigation.navigate('CourseContent'); // Navigate to CourseContentScreen
  };

  const handleViewContent = (course) => {
    setSelectedCourse(course); // Set selected course
  };

  const handleUnenroll = (courseId) => {
    unenrollFromCourse(courseId);
  };

  const renderCourseItem = ({ item }) => (
    <View key={item.id} style={styles.courseItem}>
      <Image source={item.image} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{item.title}</Text>
      <ProgressBar progress={item.progress} color={'blue'} style={styles.progressBar} />
      <Text style={styles.courseDescription}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="LearnIT !" onPress={() => handleViewContent(item)} />
        <View style={styles.buttonSpacer} />
        <Button title="Unenroll" onPress={() => handleUnenroll(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sidebarIcon} onPress={toggleSidebar}>
        <MaterialIcons name={sidebarVisible ? 'menu-open' : 'menu'} size={24} color="black" />
      </TouchableOpacity>
      {sidebarVisible ? (
        <View style={styles.sidebar}>
          <Image source={require('../assets/icon.png')} style={styles.profileImage} />
          <Text style={styles.profileTitle}>{userData ? userData.name : 'Vincent Estenzo'}</Text>
          <TouchableOpacity style={styles.sidebarButton} onPress={handleSettings}>
            <MaterialIcons name="settings" size={24} color="black" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.userInfoContainer}>    
            <Text>User ID: {userData ? userData.id : '2021302071'}</Text>
          </View>
        </View>
      ) : null}
      <View style={styles.content}>
        <Text style={styles.title}>My Courses</Text>
        <FlatList
          data={enrolledCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
          <Text style={styles.addButtonLabel}>Add Another Course</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={selectedCourse !== null} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCourse?.title}</Text>
            <ScrollView>
              <Text>{selectedCourse?.longDescription}</Text>
            </ScrollView>
            <View style={styles.modalButtons}>
              <Button title="Close" onPress={() => setSelectedCourse(null)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarIcon: {
    padding: 10,
  },
  sidebar: {
    width: 200,
    backgroundColor: '#90E4C1', // Cyan color
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40, // Make it round
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
  },
  courseItem: {
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  courseDescription: {
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    marginBottom: 10,
  },
  courseImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonSpacer: {
    width: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
  },
  userInfoContainer: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
    height: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;