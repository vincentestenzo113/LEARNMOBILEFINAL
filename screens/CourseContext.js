import React, { createContext, useContext, useState } from 'react';

// Create a context
const CourseContext = createContext();

// Create a provider component
export const CourseProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([
    { 
      id: '1', 
      title: 'HTML', 
      progress: 0.6, 
      description: 'Learn the basics of HTML', 
      content: 'Course content for Course 1. This could be a long text describing the course content in detail.',
      image: require('../assets/course1.png')
    },
    { 
      id: '2', 
      title: 'CSS', 
      progress: 0.3, 
      description: 'Learn the basics of CSS', 
      content: 'Course content for Course 2. This could be a long text describing the course content in detail.',
      image: require('../assets/course2.png')
    },
    // Add more courses as needed
  ]);

  const enrollInCourse = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
  };

  const unenrollFromCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.id !== courseId));
  };

  return (
    <CourseContext.Provider value={{ enrolledCourses, enrollInCourse, unenrollFromCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

// Create a custom hook to use the CourseContext
export const useCourses = () => useContext(CourseContext);
