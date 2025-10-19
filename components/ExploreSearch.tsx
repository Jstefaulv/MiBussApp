import ExploreView from '@/components/views/ExploreView';
import { obtenerInfoParadero } from '@/services/paraderoService';
import {
    filtrarMicrosPorId,
    procesarDatosAPI,
} from '@/utils/processDataApi';
import React, { useState } from 'react';

export default function ExploreSearch() {
  const [paraderoID, setParaderoID] = useState('');
  const [microID, setMicroID] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [error, setError] = useState('');

  async function consultar() {
    setError('');
    setResultados([]);

    if (!paraderoID.trim()) {
      setError('Debe ingresar un ID de paradero.');
      return;
    }

    try {
      const apiData = await obtenerInfoParadero(paraderoID.trim());
      console.log('Datos API recibidos:', apiData);

      
      const services = apiData.services ?? apiData.data?.services;

      if (!services || services.length === 0) {
        setError('No hay servicios disponibles para este paradero.');
        return;
      }

      let buses: any[] = [];
      if (microID.trim() === '') {
        buses = procesarDatosAPI({ ...apiData, services });
      } else {
        buses = filtrarMicrosPorId({ ...apiData, services }, microID.trim());
      }

      if (buses.length === 0) {
        setError('No hay micros disponibles para esta búsqueda.');
        return;
      }

      setResultados(buses);
    } catch (e) {
      setError('Error al obtener datos del paradero.');
      console.error(e);
    }
  }

  return (
    <ExploreView
      paraderoID={paraderoID}
      setParaderoID={setParaderoID}
      microID={microID}
      setMicroID={setMicroID}
      resultados={resultados}
      error={error}
      consultar={consultar}
    />
  );
}
