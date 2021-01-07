import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Button, } from 'react-native-elements'

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Ionicons } from '@expo/vector-icons';


export default function LogScreen({ navigation }) {
  return (

    <ImageBackground source={require('../assets/LogScreen.png')} style={styles.container}>
      <Button
        style ={{ marginTop: 10, width: '70%' }}
        title="Sign up on Ride On" 
        type='solid'
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => navigation.navigate('SignUp')}
      />
      <Button 
        style ={{ marginTop: 20, width: '70%' }}
        title="I Already have an account"
        type='solid'
        buttonStyle={{ backgroundColor: '#D3D3D3' }}
        onPress={() => navigation.navigate('SignIn')}
      />
    </ImageBackground>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



