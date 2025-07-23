// src/functions/DataFetcher.ts
import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes'; // Importa el tipo

interface FetchParams {
  latitude: number;
  longitude: number;
  timezone: string;
}

export const useDataFetcher = ({ latitude, longitude, timezone }: FetchParams) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Asegúrate de que los parámetros de la URL sean correctos para tu API de Open-Meteo
        // current=true trae los datos actuales
        // hourly incluye temperatura, humedad, presión, viento, código de clima, lluvia, etc.
        // daily incluye temperaturas máximas/mínimas, amanecer/anochecer, código de clima, velocidad máxima del viento
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current=true&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,weather_code,rain,precipitation_probability,apparent_temperature,evapotranspiration&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weather_code,wind_speed_10m_max`;
        
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const jsonData: OpenMeteoResponse = await response.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Un error desconocido ocurrió.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude, timezone]); // Dependencias del useEffect

  return { data, loading, error };
};