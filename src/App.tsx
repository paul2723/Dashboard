// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import LocationSelector from './components/LocationSelector';
import ConditionsSection from './components/ConditionsSection';
import KeyIndicatorsSection from './components/KeyIndicatorsSection'; 
import TemporalAnalysisSection from './components/TemporalAnalysisSection';

import { useDataFetcher } from './functions/DataFetcher';

import type {
  OpenMeteoResponse,
  Condition,
  KeyIndicator,
  CurrentData,
  HourlyData,
  Location, 
  LocationName
} from './types/DashboardTypes'; // 

import { generateConditions } from './functions/ConditionGenerator';
import { generateKeyIndicators } from './functions/KeyIndicatorGenerator';

import './index.css';
import './App.css';

function App() {
  // Y asegúrate de que el tipo en predefinedLocations sea 'Location'
  const predefinedLocations: { [key in LocationName]: Location } = { // <--- Y AQUÍ
    "Guayaquil, Ecuador": { latitude: -2.1962, longitude: -79.8862, timezone: "America/Guayaquil" },
    "Bogotá, Colombia": { latitude: 4.7110, longitude: -74.0721, timezone: "America/Bogota" },
    "Buenos Aires, Argentina": { latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires" },
    "Lima, Perú": { latitude: -12.0464, longitude: -77.0428, timezone: "America/Lima" },
    "Santiago, Chile": { latitude: -33.4489, longitude: -70.6891, timezone: "America/Santiago" },
  };

  const [currentLocationName, setCurrentLocationName] = useState<LocationName>("Guayaquil, Ecuador");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { latitude, longitude, timezone } = predefinedLocations[currentLocationName];

  const { data: weatherData, loading, error } = useDataFetcher({ latitude, longitude, timezone, refreshTrigger });

  const [conditions, setConditions] = useState<Condition[]>([]);
  const [keyIndicators, setKeyIndicators] = useState<KeyIndicator[]>([]);

  useEffect(() => {
    if (weatherData && weatherData.current && weatherData.daily && weatherData.hourly) {
      setConditions(generateConditions(weatherData.current, weatherData.hourly));
      setKeyIndicators(generateKeyIndicators(weatherData.current, weatherData.daily));
    } else {
      setConditions([]);
      setKeyIndicators([]);
    }
  }, [weatherData]);

  const handleLocationChange = (newLocationName: LocationName) => {
    if (Object.keys(predefinedLocations).includes(newLocationName)) {
      setCurrentLocationName(newLocationName as LocationName);
    } else {
      console.warn("Ubicación no encontrada en la lista predefinida:", newLocationName);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const lastUpdate = weatherData?.current?.time || new Date().toISOString();
  const sunrise = weatherData?.daily?.sunrise?.[0];
  const sunset = weatherData?.daily?.sunset?.[0];

  if (loading && !weatherData) {
    return <div className="loading-screen">Cargando datos del clima...</div>;
  }

  if (error) {
    return <div className="error-screen">Error al cargar los datos: {error}. Por favor, inténtalo de nuevo más tarde.</div>;
  }

  return (
    <div className="dashboard-container">
      <Header
        lastUpdate={lastUpdate}
        sunrise={sunrise}
        sunset={sunset}
        isConnecting={loading}
        hasError={!!error}
        onRefresh={handleRefresh}
      />
      <div className="dashboard-content">
        <InfoBar
          lastUpdate={lastUpdate}
          isLive={true}
          sunrise={sunrise}
          sunset={sunset}
        />
        <div className="dashboard-grid">
          <div className="main-content">
            <ConditionsSection conditions={conditions} />

            <KeyIndicatorsSection indicators={keyIndicators} />

            <TemporalAnalysisSection
                hourlyData={weatherData?.hourly}
                currentWeatherData={weatherData?.current}
            />
          </div>
          <aside className="sidebar">
            <LocationSelector
              currentLocationName={currentLocationName}
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