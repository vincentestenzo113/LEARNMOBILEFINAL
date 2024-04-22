import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  
  const handleSignup = () => {
    navigation.navigate('SignupScreen'); // Navigate to SignupScreen
  };


  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://learnit-bde1.onrender.com/LoginScreen', { email, password });
      if (response.data.message === "Login Successfully") {
        console.log(response.data.userId);
        navigation.navigate('ProfileScreen');
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Login" onPress={handleSubmit} />
        </View>
        <View style={styles.button}>
          <Button title="Signup" onPress={handleSignup} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
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

export default LoginScreen;