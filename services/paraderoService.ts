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


/*

// src/services/paraderoService.ts

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
}

*/ 