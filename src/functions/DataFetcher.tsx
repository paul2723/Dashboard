// src/functions/DataFetcher.tsx
import React, { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes'; // Importa desde el archivo de tipos

// Interfaz para las props que recibe el custom hook (latitud, longitud, zona horaria)
interface DataFetcherHookProps {
  latitude: number;
  longitude: number;
  timezone: string;
}

/**
 * Custom Hook para obtener datos climáticos de Open-Meteo.
 * Encapsula la lógica de fetching, estados de carga y error.
 * @param latitude Latitud de la ubicación.
 * @param longitude Longitud de la ubicación.
 * @param timezone Zona horaria de la ubicación.
 * @returns Un objeto con los datos obtenidos (data), el estado de carga (loading) y el mensaje de error (error).
 */
export const useDataFetcher = ({ latitude, longitude, timezone }: DataFetcherHookProps) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Inicia en true para cargar al montar
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Definir la URL de la API de Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,weather_code,rain,evapotranspiration,precipitation_probability,apparent_temperature&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,weather_code&timezone=${timezone}&temperature_unit=celsius&wind_speed_unit=kmh`;

    // Definir la función asíncrona que realizará la petición
    const fetchData = async () => {
      setLoading(true); // Siempre reiniciar la carga cuando se inicia un fetch
      setError(null);   // Limpiar cualquier error previo
      try {
        const response = await fetch(url);

        // Validar si la respuesta no es exitosa, lanzar un error
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Si la respuesta es exitosa, convertir a JSON y almacenar en el estado 'data'
        const result: OpenMeteoResponse = await response.json();
        setData(result);
      } catch (err) {
        // En caso de error, almacenar el mensaje de error en el estado 'error'
        setError("No se pudieron cargar los datos del clima. Inténtalo de nuevo más tarde.");
        console.error("Error fetching data:", err);
      } finally {
        // Cambiar el estado 'loading' a false una vez que la petición se haya completado
        setLoading(false);
      }
    };

    // Llamar a la función fetchData dentro del hook useEffect
    fetchData();
  }, [latitude, longitude, timezone]); // El efecto se re-ejecuta si estos valores cambian

  // El custom hook retorna un objeto con los objetos data, loading y error como propiedades.
  return { data, loading, error };
};