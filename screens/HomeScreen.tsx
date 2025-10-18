import ParaderoDetector from '@/components/DetectorParadero';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { homeScreenStyles as styles } from '@/styles/homeScreenStyles';
import { Image } from 'expo-image';
import React from 'react';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A0100', dark: '#5c2118' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial_logo_bus.png')}
          style={styles.logo} 
        />
      }
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
