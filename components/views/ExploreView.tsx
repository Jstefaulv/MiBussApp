import { exploreScreenStyles as styles } from '@/styles/exploreScreenStyles';
import React from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ExploreViewProps {
  paraderoID: string;
  setParaderoID: (text: string) => void;
  microID: string;
  setMicroID: (text: string) => void;
  resultados: any[];
  error: string;
  consultar: () => void;
}

export default function ExploreView({
  paraderoID,
  setParaderoID,
  microID,
  setMicroID,
  resultados,
  error,
  consultar,
}: ExploreViewProps) {
  return (
    <View style={styles.screen}>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Text style={styles.headerText}>Explora Micros por Paradero</Text>
      </View>

      <SafeAreaView style={styles.listaContainer}>
        <TextInput
          placeholder="ID del paradero"
          value={paraderoID}
          onChangeText={setParaderoID}
          style={styles.input}
          autoCapitalize="characters"
        />
        <TextInput
          placeholder="ID de la micro (opcional)"
          value={microID}
          onChangeText={setMicroID}
          style={styles.input}
          autoCapitalize="characters"
        />
        <Button title="Consultar" onPress={consultar} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <FlatList
          data={resultados}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.filaMicro}>
              <View style={styles.microCol}>
                <Text style={styles.microNum}>{item.numero}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.patente}>{item.patente}</Text>
                <Text style={styles.llegaTiempo}>Llega: {item.llega}</Text>
                <Text style={styles.microDist}>Distancia: {item.distancia} m</Text>
              </View>
              {index < resultados.length - 1 && <View style={styles.separadorFila} />}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={<Text>No hay micros para mostrar.</Text>}
        />
      </SafeAreaView>
    </View>
  );
}
