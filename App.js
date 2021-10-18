import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Drawer from '../proyecto-3-m/src/components/Drawer';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <View style={styles.header}>
      <NavigationContainer>
        <Drawer/>
      </NavigationContainer>
      <Buscador/>

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
