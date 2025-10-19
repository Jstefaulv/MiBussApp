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

export function filtrarMicrosPorId(apiData: any, microId: string) {
  if (!apiData || !apiData.services) return [];

  const microIdNormalize = microId.trim().toLowerCase();

  console.log('Buscando micro:', microIdNormalize);
  console.log('Servicios disponibles:', apiData.services.map((s:any) => s.id));

  const servicio = apiData.services.find(
    (service: any) =>
      (service.id && service.id.toLowerCase() === microIdNormalize) ||
      (service.code && service.code.toLowerCase() === microIdNormalize)
  );

  console.log('Servicio encontrado:', servicio);

  if (!servicio || !servicio.buses) return [];

  return servicio.buses.map((bus: any) => ({
    numero: servicio.id ?? servicio.code,
    patente: bus.id ?? bus.plate,
    llega:
      bus.min_arrival_time !== undefined
        ? `0-${bus.min_arrival_time} min`
        : 'N/A',
    distancia: bus.meters_distance ?? bus.distance,
  }));
}