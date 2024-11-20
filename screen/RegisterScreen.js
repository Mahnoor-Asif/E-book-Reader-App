import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg'; // Import SVG for the wave
import { auth } from '../firebase'; // Import Firebase authentication instance
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase createUserWithEmailAndPassword function

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      // After successful sign-up, navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is invalid.');
      } else if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email is already in use.');
      } else {
        Alert.alert('Error', 'Sign up failed. Please try again.');
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

      <Text style={styles.title}>Create an Account</Text>

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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account? 
        <Text 
          onPress={() => navigation.navigate('Login')} 
          style={styles.link}
        >
          Login Now
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
})
export default RegisterScreen;