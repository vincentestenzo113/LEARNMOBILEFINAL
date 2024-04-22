import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CourseContentScreen = () => {
  // Sample course data
  const courses = [
    { id: '1', title: 'Javascript Basics', description: 'Learn the fundamentals of Javascript.', image: require('../assets/javascript.png') },
    { id: '2', title: 'Database Basics', description: 'Understand the basics of databases and SQL.', image: require('../assets/database.png') },
    { id: '3', title: 'API Basics', description: 'Learn about APIs and how to interact with them.', image: require('../assets/API.png') },
    // Add more courses as needed
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [numColumns, setNumColumns] = useState(2); // Number of columns for FlatList

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.courseItem} onPress={() => handleSelectCourse(item.id)}>
      <View>
        <Image source={item.image} style={styles.courseImage} />
        <Text style={styles.courseTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Want to Learn more of IT ?</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        key={`${numColumns}`} // Force re-render when numColumns changes
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
      <Modal visible={selectedCourse !== null} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{courses.find((c) => c.id === selectedCourse)?.title}</Text>
            <Text>{courses.find((c) => c.id === selectedCourse)?.description}</Text>
            <View style={styles.modalButtons}>
              <Button title="Enroll to this Course" onPress={() => console.log(`Enrolling in course ${selectedCourse}`)} />
              <View style={styles.buttonSpacer} />
              <Button title="Close" onPress={() => setSelectedCourse(null)} />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title={`Switch to ${numColumns === 1 ? 'Grid View' : 'List View'}`}
        onPress={() => setNumColumns(numColumns === 1 ? 2 : 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  courseImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  courseTitle: {
    textAlign: 'center',
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonSpacer: {
    width: 10,
  },
});

export default CourseContentScreen;
