import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity

  useEffect(() => {
    // Animation for fading in the logo and text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // duration for fade-in
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('Screen2');
    }, 2000); // Time to stay on the splash screen before navigating

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('./logo.jpg')} // Ensure logo.jpg exists in the correct path
          style={styles.logo}
        />
        <Text style={styles.text}>A place to learn</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbedf2', // Background color
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,  // Increased size for better visibility
    height: 250,
    borderRadius: 10, // Rounded corners for a modern look
    marginBottom: 20,
    transform: [{ scale: 1.1 }],  // Slight scaling to make the logo pop
  },
  text: {
    color: '#73004d',  // Dark purple text color
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.5,  // Adding some spacing between letters for effect
    textAlign: 'center',
    paddingHorizontal: 30, // Padding for better spacing
  },
});

export default Screen1;
