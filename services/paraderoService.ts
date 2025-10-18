export async function obtenerInfoParadero(nearestStopId: string) {
  try {
    const resp = await fetch(`https://api.xor.cl/red/bus-stop/${nearestStopId}`);
    if (!resp.ok) throw new Error('Error en la API de paradero');
    const data = await resp.json();
    return data;
  } catch (error) {
    throw error;
  }
}