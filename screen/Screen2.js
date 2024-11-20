import React from 'react';
import { View, Image, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';

const Screen2 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./books.jpg')} // Set the books image as the background
      style={styles.container}
      imageStyle={{ opacity: 0.1 }} // Apply 10% opacity to the background image
    >
      <Image
        source={require('./logo.jpg')}  // Use the uploaded second book logo
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')} // Navigate to Register screen
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#73004d', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Screen2;