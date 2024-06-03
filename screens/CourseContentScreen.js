import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useCourses } from '../screens/CourseContext';

const CourseContentScreen = () => {
  const { enrollInCourse } = useCourses();

  const courses = [
    { id: '1', title: 'Javascript Basics', description: 'Learn the fundamentals of Javascript.', longDescription: 'This course will cover the basics of Javascript, including syntax, variables, loops, functions, and more. You will learn how to create dynamic web pages and enhance user interactions. ', image: require('../assets/javascript.png') },
    { id: '2', title: 'HTML', description: 'Understand the basics of HTML.', longDescription: 'HTML, or HyperText Markup Language, is the standard language used to create and design web pages. It forms the backbone of web content, providing the basic structure and layout for websites. ', image: require('../assets/course1.png') },
    { id: '3', title: 'API Basics', description: 'Learn about APIs and how to interact with them.', longDescription: 'This course introduces you to APIs (Application Programming Interfaces) and how to use them to interact with different software systems. You will learn how to make API calls, handle responses, and integrate third-party services into your applications.', image: require('../assets/API.png') },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [numColumns, setNumColumns] = useState(2);

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleEnrollCourse = () => {
    const course = courses.find((c) => c.id === selectedCourse);
    enrollInCourse(course);
    setSelectedCourse(null);
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
        key={`${numColumns}`}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
      <Modal visible={selectedCourse !== null} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{courses.find((c) => c.id === selectedCourse)?.title}</Text>
            <ScrollView style={styles.scrollView}>
              <Text>{courses.find((c) => c.id === selectedCourse)?.longDescription}</Text>
            </ScrollView>
            <View style={styles.modalButtons}>
              <Button title="Enroll to this Course" onPress={handleEnrollCourse} />
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
    width: '80%',
    height: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    marginVertical: 10,
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
