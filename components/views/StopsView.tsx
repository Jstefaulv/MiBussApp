import { detectorParaderoStyles as styles } from '@/styles/detectorParaderoStyles';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

interface BusData {
  numero: string;
  patente: string;
  llega: string;
  distancia: number | null;
}

interface ParaderoViewProps {
  stopId: string;
  microsData: BusData[];
}

export default function ParaderoView({ stopId, microsData }: ParaderoViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.paraderoBox}>
        <Text style={styles.paraderoText}>Paradero: {stopId}</Text>
      </View>

      <Text style={styles.tituloProximasMicros}>Próximas micros</Text>

      {microsData.length === 0 ? (
        <Text style={styles.sinMicros}>No hay buses próximos en este momento.</Text>
      ) : (
        <FlatList
          data={microsData}
          keyExtractor={(_, idx) => idx.toString()}
          contentContainerStyle={styles.listaMicrosContainer}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.filaMicro}>
                <View style={styles.microCol}>
                  <Text style={styles.microNum}>{item.numero}</Text>
                  <Text style={styles.busEmoji}>🚌</Text>
                </View>
                <View style={styles.infoCol}>
                  <Text style={styles.llegaTiempo}>Llega: {item.llega}</Text>
                  <Text style={styles.patente}>
                    {item.patente}{' '}
                    <Text style={styles.microDist}>
                      {item.distancia ? `(${item.distancia} m)` : '(? m)'}
                    </Text>
                  </Text>
                </View>
              </View>
              {index < microsData.length - 1 && <View style={styles.separadorFila} />}
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
