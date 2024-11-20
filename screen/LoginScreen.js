import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg'; // Import SVG for the wave
import { auth } from '../firebase'; // Import the auth instance from firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase's signInWithEmailAndPassword function

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      // Attempt to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the Home screen if successful
      navigation.navigate('Home');
    } catch (error) {
      // Handle specific errors
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is invalid.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password.');
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Wave Animation */}
      <Svg height="40%" width="100%" viewBox="0 0 1440 320" style={styles.wave}>
        <Path
          fill="#fbedf2"
          d="M0,288L48,266.7C96,245,192,203,288,186.7C384,171,480,181,576,192C672,203,768,213,864,213.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128V320H0Z"
        />
      </Svg>

      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Sign into your Account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account? 
        <Text 
          onPress={() => navigation.navigate('Register')} 
          style={styles.link}
        >
          Register Now
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  wave: {
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#73004d',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#73004d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerText: {
    color: '#777',
  },
  link: {
    color: '#73004d',
  },
});

export default LoginScreen;
