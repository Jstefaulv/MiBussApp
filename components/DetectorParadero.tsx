import { detectorParaderoStyles as styles } from '@/styles/detectorParaderoStyles';
import stopsData from '@/utils/stops.json';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function obtenerStopIdMasCercano(lat: number, lon: number, stops: { stop_id: string; stop_lat: number; stop_lon: number }[]) {
  let minDist = Infinity;
  let stopId: string | null = null;

  for (const stop of stops) {
    const dist = calcularDistancia(lat, lon, stop.stop_lat, stop.stop_lon);
    if (dist < minDist) {
      minDist = dist;
      stopId = stop.stop_id;
    }
  }
  return stopId!;
}

function procesarDatosAPI(apiData: any) {
  if (!apiData || !apiData.services) return [];
  const salida: any[] = [];
  for (const service of apiData.services) {
    if (service.buses && service.buses.length > 0) {
      for (const bus of service.buses) {
        salida.push({
          numero: service.id ?? service.code,
          patente: bus.id ?? bus.plate,
          llega:
            bus.min_arrival_time !== undefined
              ? `0-${bus.min_arrival_time} min`
              : 'N/A',
          distancia: bus.meters_distance ?? bus.distance,
        });
      }
    }
  }
  return salida;
}

export default function ParaderoDetector() {
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
        const nearestStopId = obtenerStopIdMasCercano(
          coords.latitude,
          coords.longitude,
          stopsData
        );
        setStopId(nearestStopId);

        const response = await fetch(`https://api.xor.cl/red/bus-stop/${nearestStopId}`);
        if (!response.ok) throw new Error('Error en la API de paradero');
        const apiData = await response.json();
        const buses = procesarDatosAPI(apiData);
        setMicrosData(buses);
      } catch (e) {
        setErrorMsg('No se pudo obtener información en este momento');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" color="#0b910fff" style={styles.centered} />;
  if (errorMsg)
    return (
      <Text style={[styles.centered, { color: 'red' }]}>{errorMsg}</Text>
    );
  if (!stopId)
    return (
      <Text style={styles.centered}>
        No se pudo detectar el paradero cercano.
      </Text>
    );

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
              {index < microsData.length - 1 && (
                <View style={styles.separadorFila} />
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
