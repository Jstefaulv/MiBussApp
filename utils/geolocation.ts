export function calcularDistancia(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
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

export function obtenerStopIdMasCercano(
  lat: number,
  lon: number,
  stops: { stop_id: string; stop_lat: number; stop_lon: number }[]
): string | null {
  let minDist = Infinity;
  let stopId: string | null = null;
  for (const stop of stops) {
    const dist = calcularDistancia(lat, lon, stop.stop_lat, stop.stop_lon);
    if (dist < minDist) {
      minDist = dist;
      stopId = stop.stop_id;
    }
  }
  return stopId;
}
