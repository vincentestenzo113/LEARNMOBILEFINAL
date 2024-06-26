import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [studentID, setStudentID] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://learnit-1-aggl.onrender.com/SignupScreen', {
        studentID,
        email,
        firstName,
        lastName,
        password,
      });
      if (response.status === 200) {
        navigation.navigate('Login');
      } else {
        throw new Error('Error signing up');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/amonglogo.png')} style={styles.logo} />
      <Text style={styles.description}>Join LEARNIT - Your learning journey starts here</Text>
      <Text style={styles.title}>LEARNIT</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password (6-20 characters, at least one digit, one lowercase, one uppercase)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Verify Password"
        secureTextEntry
        value={verifyPassword}
        onChangeText={setVerifyPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentID}
        onChangeText={setStudentID}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Signup" onPress={handleSignup} />
        </View>
        <View style={styles.button}>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Cyan color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#90E4C1',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  button: {
    width: '45%',
  },
});

export default SignupScreen;
