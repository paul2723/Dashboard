// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import LocationSelector from './components/LocationSelector';
import AlertsSection from './components/AlertsSection';
import ConditionsSection from './components/ConditionsSection';
import KeyIndicatorsSection from './components/KeyIndicatorsSection';
import TemporalAnalysisSection from './components/TemporalAnalysisSection';

import { useDataFetcher } from './functions/DataFetcher';

// Importa todas las interfaces desde el archivo de tipos centralizado
import type {
  OpenMeteoResponse,
  Alert,
  Condition,
  KeyIndicator,
  LocationSelectorProps,
  CurrentData,
  HourlyData
} from './types/DashboardTypes';

import './index.css';
import './App.css';

function App() {
  const predefinedLocations = {
    "Guayaquil, Ecuador": { latitude: -2.1962, longitude: -79.8862, timezone: "America/Guayaquil" },
    "Bogotá, Colombia": { latitude: 4.7110, longitude: -74.0721, timezone: "America/Bogota" },
    "Buenos Aires, Argentina": { latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires" },
    "Lima, Perú": { latitude: -12.0464, longitude: -77.0428, timezone: "America/Lima" },
    "Santiago, Chile": { latitude: -33.4489, longitude: -70.6693, timezone: "America/Santiago" },
    "Ciudad de México, México": { latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City" },
    "Madrid, España": { latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid" },
    "Mi Ubicación Actual": { latitude: -1.25, longitude: -78.25, timezone: "America/Guayaquil" } // Añadida tu nueva ubicación
  };

  // Definir el tipo para las claves de predefinedLocations
  type LocationName = keyof typeof predefinedLocations; // <-- ¡CAMBIO CLAVE AQUÍ!

  const [currentLocationName, setCurrentLocationName] = useState<LocationName>("Mi Ubicación Actual"); // <-- Usar el nuevo nombre por defecto
  
  const { latitude, longitude, timezone } = predefinedLocations[currentLocationName];

  const { data: weatherData, loading, error } = useDataFetcher({ latitude, longitude, timezone });

  const lastUpdate = weatherData?.current?.time
    ? new Date(weatherData.current.time).toLocaleString('es-ES', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        day: '2-digit', month: '2-digit', year: 'numeric',
      })
    : "Cargando...";

  const sunrise = weatherData?.daily?.sunrise?.[0]
    ? new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    : "N/A";

  const sunset = weatherData?.daily?.sunset?.[0]
    ? new Date(weatherData.daily.sunset[0]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    : "N/A";

  const alerts: Alert[] = [
    { id: 1, type: 'Alerta de Calor', location: currentLocationName, level: 'Media', description: 'Se esperan temperaturas superiores a 35°C durante las próximas 3 horas. Se recomienda mantenerse hidratado y evitar la exposición prolongada al sol.', time: '14:30', icon: 'alert' },
    { id: 2, type: 'Lluvia Vespertina', location: currentLocationName, level: 'Baja', description: '70% de probabilidad de lluvia después de las 18:00. Lleva paraguas si sales.', time: '15:00', icon: 'rain' },
  ];

  const conditions: Condition[] = [
    { id: 1, type: 'Temperatura Actual', value: `${weatherData?.current?.temperature_2m?.toFixed(0) || 'N/A'}°C`, description: 'Temperatura actual del aire.', icon: 'temperature' },
    { id: 2, type: 'Viento Actual', value: `${weatherData?.current?.wind_speed_10m?.toFixed(0) || 'N/A'} km/h`, description: 'Velocidad actual del viento.', icon: 'wind' },
  ];

  const currentTemperature = weatherData?.current?.temperature_2m !== undefined
    ? `${weatherData.current.temperature_2m.toFixed(0)}`
    : "N/A";

  const currentHumidity = weatherData?.hourly?.relative_humidity_2m?.[0] !== undefined
    ? `${weatherData.hourly.relative_humidity_2m[0].toFixed(0)}`
    : "N/A";

  const currentPressure = weatherData?.hourly?.pressure_msl?.[0] !== undefined
    ? `${weatherData.hourly.pressure_msl[0].toFixed(0)}`
    : "N/A";

  const currentWindSpeed = weatherData?.current?.wind_speed_10m !== undefined
    ? `${weatherData.current.wind_speed_10m.toFixed(0)}`
    : "N/A";

  const keyIndicators: KeyIndicator[] = [
    {
      id: 'temp', label: 'Temperatura', value: currentTemperature, unit: '°C',
      change: weatherData?.daily?.temperature_2m_max?.[0] ? `Máx: ${weatherData.daily.temperature_2m_max[0].toFixed(0)}°C` : 'N/A',
      icon: 'temperature', gradient: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)'
    },
    {
      id: 'humidity', label: 'Humedad', value: currentHumidity, unit: '%',
      change: weatherData?.hourly?.precipitation_probability?.[0] ? `Prob. Lluvia: ${weatherData.hourly.precipitation_probability[0]}%` : 'N/A',
      icon: 'humidity', gradient: 'linear-gradient(135deg, #1abc9c 0%, #2ecc71 100%)'
    },
    {
      id: 'pressure', label: 'Presión', value: currentPressure, unit: 'hPa', change: 'Sin cambios', // Si la API no da cambio de presión, se mantiene así
      icon: 'pressure', gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
    },
    {
      id: 'wind', label: 'Viento', value: currentWindSpeed, unit: 'km/h',
      change: weatherData?.daily?.wind_speed_10m_max?.[0] ? `Máx: ${weatherData.daily.wind_speed_10m_max[0].toFixed(0)} km/h` : 'N/A', // Usar el nuevo campo
      icon: 'wind', gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
    },
  ];

  const handleLocationChange = (newLocationName: string) => {
    // Asegurarse de que newLocationName es una clave válida antes de establecerla
    if (Object.keys(predefinedLocations).includes(newLocationName)) {
      setCurrentLocationName(newLocationName as LocationName);
    } else {
      console.warn("Ubicación no encontrada en la lista predefinida:", newLocationName);
    }
  };

  if (loading) {
    return <div className="loading-screen">Cargando datos del clima...</div>;
  }

  if (error) {
    return <div className="error-screen">Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <InfoBar
          lastUpdate={lastUpdate}
          isLive={true}
          sunrise={sunrise}
          sunset={sunset}
        />
        <div className="dashboard-grid">
          <div className="main-content">
            <AlertsSection alerts={alerts} />
            <ConditionsSection conditions={conditions} />
            <KeyIndicatorsSection indicators={keyIndicators} />
            <TemporalAnalysisSection
                hourlyData={weatherData?.hourly}
                currentWeatherData={weatherData?.current}
            />
          </div>
          <aside className="sidebar">
            <LocationSelector
              currentLocation={currentLocationName}
              onLocationChange={handleLocationChange}
              availableLocations={predefinedLocations}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;