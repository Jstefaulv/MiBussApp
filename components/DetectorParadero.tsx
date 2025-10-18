import { obtenerInfoParadero } from '@/services/paraderoService';
import { detectorParaderoStyles as styles } from '@/styles/detectorParaderoStyles';
import { obtenerStopIdMasCercano } from '@/utils/geolocation';
import { procesarDatosAPI } from '@/utils/processDataApi';
import stopsData from '@/utils/stops.json';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';



export default function DetectorParadero() {
  const [stopId, setStopId] = useState<string | null>(null);
  const [microsData, setMicrosData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso para acceder a la ubicación denegado');
          setLoading(false);
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
        const nearestStopId = obtenerStopIdMasCercano(coords.latitude, coords.longitude, stopsData);
        setStopId(nearestStopId);

        if (!nearestStopId) {
             throw new Error('No se pudo determinar el ID del paradero cercano.');
        }

        const apiData = await obtenerInfoParadero(nearestStopId);
        const buses = procesarDatosAPI(apiData);
        setMicrosData(buses);
      } catch (e) {
        setErrorMsg('No se pudo obtener información en este momento');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0b910fff" style={styles.centered} />;
  if (errorMsg) return <Text style={[styles.centered, { color: 'red' }]}>{errorMsg}</Text>;
  if (!stopId) return <Text style={styles.centered}>No se pudo detectar el paradero cercano.</Text>;

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
          contentContainerStyle={styles.listaMicrosContainer}
          keyExtractor={(_, idx) => idx.toString()}
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
                      ({item.distancia ? item.distancia + ' m' : '? m'})
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
