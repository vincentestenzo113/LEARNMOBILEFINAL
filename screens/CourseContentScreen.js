import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigate } from 'react-router-dom';

const CourseContentScreen = () => {
  // Sample course data
  const courses = [
    { id: '1', title: 'Programming Basics' },
    { id: '2', title: 'Database Basics' },
    { id: '3', title: 'API Basics' },
    // Add more courses as needed
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
  };

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
      <Text>{item.title}</Text>
      <Button
        title="Select Course"
        onPress={() => handleSelectCourse(item.id)}
      />
    </View>
  );

  return (
    <View>
      <Text>Course Content</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {selectedCourse && (
        <Button
          title={`Enroll in ${courses.find((c) => c.id === selectedCourse).title}`}
          onPress={() => {
            // Implement course enrollment logic here
            console.log(`Enrolling in course ${selectedCourse}`);
          }}
        />
      )}
    </View>
  );
};

export default CourseContentScreen;
