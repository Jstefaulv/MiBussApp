import stopsData from '@/utils/stops.json';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 0,
    backgroundColor: '#181818',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paraderoBox: {
    backgroundColor: '#0b910fff',
    borderRadius: 9,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 16,
  },
  paraderoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  tituloProximasMicros: {
    color: '#800e0eff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 14,
    marginTop: 2,
  },
  listaMicrosContainer: {
    paddingBottom: 24,
  },
  filaMicro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 9,
    justifyContent: 'space-between',
  },
  microCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  microNum: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#fff',
    minWidth: 55,
    textAlign: 'right',
  },
  busEmoji: {
    fontSize: 22,
    marginLeft: 9,
    marginRight: 3,
    marginTop: 1,
  },
  infoCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    minWidth: 100,
    gap: 2,
  },
  llegaTiempo: {
    color: '#bbb',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  patente: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  microDist: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
  separadorFila: {
    height: 1,
    backgroundColor: '#252526',
    marginVertical: 5,
    borderRadius: 10,
    opacity: 0.40,
  },
  sinMicros: {
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
