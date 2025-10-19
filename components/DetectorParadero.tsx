import StopsView from '@/components/views/StopsView';
import useLocation from '@/hooks/useLocation';
import { obtenerInfoParadero } from '@/services/paraderoService';
import { detectorParaderoStyles as styles } from '@/styles/detectorParaderoStyles';
import { obtenerStopIdMasCercano } from '@/utils/geolocation';
import { procesarDatosAPI } from '@/utils/processDataApi';
import stopsData from '@/utils/stops.json';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';

export default function DetectorParadero() {
  const { location, errorMsg: locationError } = useLocation();
  const [stopId, setStopId] = useState<string | null>(null);
  const [microsData, setMicrosData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!location) return; 

    (async () => {
      try {
        
        const nearestStopId = obtenerStopIdMasCercano(
          location.latitude,
          location.longitude,
          stopsData
        );

        if (!nearestStopId) {
          throw new Error('No se pudo determinar el ID del paradero cercano.');
        }

        setStopId(nearestStopId);

        
        const apiData = await obtenerInfoParadero(nearestStopId);
        const buses = procesarDatosAPI(apiData);
        setMicrosData(buses);
      } catch {
        setErrorMsg('No se pudo obtener información en este momento');
      } finally {
        setLoading(false);
      }
    })();
  }, [location]);

 
  if (locationError) {
    return <Text style={[styles.centered, { color: 'red' }]}>{locationError}</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0b910fff" style={styles.centered} />;
  }

  if (errorMsg) {
    return <Text style={[styles.centered, { color: 'red' }]}>{errorMsg}</Text>;
  }

  if (!stopId) {
    return <Text style={styles.centered}>No se pudo detectar el paradero cercano.</Text>;
  }

  return <StopsView stopId={stopId} microsData={microsData} />;
}
