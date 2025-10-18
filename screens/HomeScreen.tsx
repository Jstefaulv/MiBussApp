import ParaderoDetector from '@/components/DetectorParadero';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A0100', dark: '#5c2118' }}
      headerImage={<Image source={require('@/assets/images/partial_logo_bus.png')} style={styles.logo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenido!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.paraderoContainer}>
        <ParaderoDetector />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 8 
    },
  stepContainer: {
     gap: 8, 
     marginBottom: 8 
    },
  logo: {
     height: 178, 
     width: 290, 
     bottom: 0,
     left: 0, 
     position: 'absolute' 
    },
    paraderoContainer: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    margin: 16,
  },

  paraderoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
