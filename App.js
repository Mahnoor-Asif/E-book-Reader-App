import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import Screen1 from './screen/Screen1';
import Screen2 from './screen/Screen2';
import HomeScreen from './screen/HomeScreen';
import GenresScreen from './screen/GenresScreen';
import FavScreen from './screen/Fav';
import ViewAll from './screen/Viewall';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Screen1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Genres" component={GenresScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Fav" component={FavScreen} />
        <Stack.Screen name="ViewAll" component={ViewAll} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
