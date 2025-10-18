export function procesarDatosAPI(apiData: any) {
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