import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Drawer from '../proyecto-3-m/src/components/Drawer';
import Buscador from '../proyecto-3-m/src/components/Buscador';
import Footer from '../proyecto-3-m/src/components/Footer';
import Home from './src/components/Home';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <View style={styles.header}>
      <NavigationContainer>
        <Drawer/>
      </NavigationContainer>
      <Buscador/>
     <Home/>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
