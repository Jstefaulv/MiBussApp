export async function obtenerInfoParadero(paraderoID: string) {
  try {
    const resp = await fetch(`https://api.xor.cl/red/bus-stop/${paraderoID}`);
    if (!resp.ok) throw new Error('Error en la API');
    const data = await resp.json();
    return data;
  } catch (error) {
    throw error;
  }
}
