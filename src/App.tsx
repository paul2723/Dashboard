// src/App.tsx
// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import LocationSelector from './components/LocationSelector';
import AlertsSection from './components/AlertsSection';
import ConditionsSection from './components/ConditionsSection';
import KeyIndicatorsSection from './components/KeyIndicatorsSection'; // Importa el nuevo componente
import TemporalAnalysisSection from './components/TemporalAnalysisSection'; // Importa el nuevo componente

// Importa los estilos
import './index.css';
import './App.css';

// --- Definiciones de Tipos (Interfaces) ---
// Extendemos las interfaces para incluir los datos que esperamos de Open-Meteo

export interface Alert {
  id: number;
  type: string;
  location: string;
  level: 'Media' | 'Baja' | 'Alta'; // Asegúrate de que los niveles coincidan con tus datos
  description: string;
  time?: string; // Opcional, si quieres mostrar la hora de la alerta como en tu diseño
  icon?: string; // Para el icono de la alerta
}

export interface Condition {
  id: number;
  type: string;
  value: string;
  description: string;
  icon?: string; // Para el icono de la condición
}

// Interfaz para los datos actuales del clima de Open-Meteo
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
  precipitation: number; // Añadido para que coincida con la respuesta de la API que me mostraste
}

// Interfaz para los datos horarios de Open-Meteo
export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  pressure_msl: number[];
  wind_speed_10m: number[];
  weather_code: number[];
  rain: number[]; // Asegúrate de que el nombre del campo sea 'rain' si eso te devuelve la API
  evapotranspiration: number[];
  precipitation_probability: number[];
  apparent_temperature: number[];
}

// Interfaz para los datos diarios de Open-Meteo
export interface DailyData {
  time: string[];
  sunrise: string[]; // Asegúrate de pedir esto en la URL de la API
  sunset: string[]; // Asegúrate de pedir esto en la URL de la API
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[]; // Añadido para que coincida con la respuesta de la API que me mostraste
}

// Interfaz para la respuesta completa de la API de Open-Meteo
export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: Record<string, string>; // Añadido
  current?: CurrentWeather;
  hourly_units?: Record<string, string>; // Añadido
  hourly?: HourlyData;
  daily_units?: Record<string, string>; // Añadido
  daily?: DailyData;
}

// Interfaz para los indicadores clave (utilizado por KeyIndicatorsSection y KeyIndicatorCard)
export interface KeyIndicator {
  id: string;
  label: string;
  value: string;
  unit: string;
  change?: string; // Ej. "+2°C desde ayer"
  icon: string; // Nombre del icono
  bgColor?: string; // Color de fondo si es un gradiente o color sólido
  gradient?: string; // Gradiente CSS
}

// Interfaz para las props del componente LocationSelector (modificada para onLocationChange)
interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (locationName: string) => void; // Función para cambiar la ubicación
  // Prop para pasar las ubicaciones disponibles al selector
  availableLocations: { [key: string]: { latitude: number; longitude: number; timezone: string } };
}


// --- Componente App.tsx ---
function App() {
  // --- Datos de Ubicaciones Predefinidas ---
  // Ahora, las coordenadas y zonas horarias son dinámicas según la selección.
  interface LocationDetails {
    latitude: number;
    longitude: number;
    timezone: string;
  }

  const predefinedLocations: { [key: string]: LocationDetails } = {
    "Guayaquil, Ecuador": { latitude: -2.1962, longitude: -79.8862, timezone: "America/Guayaquil" },
    "Bogotá, Colombia": { latitude: 4.7110, longitude: -74.0721, timezone: "America/Bogota" },
    "Buenos Aires, Argentina": { latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires" },
    "Lima, Perú": { latitude: -12.0464, longitude: -77.0428, timezone: "America/Lima" },
    "Santiago, Chile": { latitude: -33.4489, longitude: -70.6693, timezone: "America/Santiago" },
    "Ciudad de México, México": { latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City" },
    "Madrid, España": { latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid" } // Mantener Madrid por referencia del diseño
  };


  // --- Estados de la Aplicación ---
  const [currentLocationName, setCurrentLocationName] = useState<string>("Guayaquil, Ecuador");
  const { latitude, longitude, timezone } = predefinedLocations[currentLocationName]; // Deriva de currentLocationName

  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Función para Obtener Datos del Clima de la API ---
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      // URL de la API de Open-Meteo. Asegúrate de pedir hourly y daily para tener todos los datos.
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,weather_code,rain,evapotranspiration,precipitation_probability,apparent_temperature&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,weather_code&timezone=${timezone}&temperature_unit=celsius&wind_speed_unit=kmh`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: WeatherApiResponse = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("No se pudieron cargar los datos del clima. Inténtalo de nuevo más tarde.");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Efecto para Cargar Datos al Montar o Cambiar Ubicación ---
  useEffect(() => {
    fetchWeatherData();
  }, [latitude, longitude, timezone]); // Se re-ejecuta si la lat/lon/timezone cambian

  // --- Datos Derivados del Estado `weatherData` ---
  // Estos datos se actualizan automáticamente cuando weatherData cambia
  const lastUpdate = weatherData?.current_weather?.time
    ? new Date(weatherData.current_weather.time).toLocaleString('es-ES', {
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

  // --- Datos para Alertas y Condiciones (pueden ser dinámicos basados en weatherData en el futuro) ---
  // Por ahora, mantenemos estos datos ficticios ya que Open-Meteo no proporciona "alertas" o "condiciones" específicas
  // sino más bien códigos de tiempo y valores numéricos.
  const alerts: Alert[] = [
    { id: 1, type: 'Alerta de Calor', location: currentLocationName, level: 'Media', description: 'Se esperan temperaturas superiores a 35°C durante las próximas 3 horas. Se recomienda mantenerse hidratado y evitar la exposición prolongada al sol.', time: '14:30', icon: 'alert' },
    { id: 2, type: 'Lluvia Vespertina', location: currentLocationName, level: 'Baja', description: '70% de probabilidad de lluvia después de las 18:00. Lleva paraguas si sales.', time: '15:00', icon: 'rain' },
  ];

  const conditions: Condition[] = [
    { id: 1, type: 'Temperatura Agradable', value: `${weatherData?.current_weather?.temperature?.toFixed(0) || 'N/A'}°C`, description: 'Ideal para actividades al aire libre.', icon: 'temperature' },
    { id: 2, type: 'Viento Ligero', value: `${weatherData?.current_weather?.windspeed?.toFixed(0) || 'N/A'} km/h`, description: 'Ayuda a la sensación térmica.', icon: 'wind' },
  ];

  // --- Datos para Indicadores Clave (Ahora dinámicos desde la API) ---
  const currentTemperature = weatherData?.current_weather?.temperature !== undefined
    ? `${weatherData.current_weather.temperature.toFixed(0)}` // Sin °C aquí, la unidad va en el indicador
    : "N/A";

  const currentHumidity = weatherData?.hourly?.relative_humidity_2m?.[0] !== undefined
    ? `${weatherData.hourly.relative_humidity_2m[0].toFixed(0)}`
    : "N/A";

  const currentPressure = weatherData?.hourly?.pressure_msl?.[0] !== undefined
    ? `${weatherData.hourly.pressure_msl[0].toFixed(0)}`
    : "N/A";

  const currentWindSpeed = weatherData?.current_weather?.windspeed !== undefined
    ? `${weatherData.current_weather.windspeed.toFixed(0)}`
    : "N/A";

  // NOTA: Para los cambios (e.g., "+2°C desde ayer"), necesitarías datos históricos
  // o una segunda llamada a la API con `past_days`. Por ahora, los dejamos fijos o N/A.
  const keyIndicators: KeyIndicator[] = [
    {
      id: 'temp', label: 'Temperatura', value: currentTemperature, unit: '°C', change: weatherData?.daily?.temperature_2m_max?.[0] ? `Máx: ${weatherData.daily.temperature_2m_max[0].toFixed(0)}°C` : 'N/A', icon: 'temperature',
      gradient: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)' // Gradiente azul/rosa
    },
    {
      id: 'humidity', label: 'Humedad', value: currentHumidity, unit: '%', change: weatherData?.hourly?.precipitation_probability?.[0] ? `Prob. Lluvia: ${weatherData.hourly.precipitation_probability[0]}%` : 'N/A', icon: 'humidity',
      gradient: 'linear-gradient(135deg, #1abc9c 0%, #2ecc71 100%)' // Gradiente verde/turquesa
    },
    {
      id: 'pressure', label: 'Presión', value: currentPressure, unit: 'hPa', change: 'Sin cambios', icon: 'pressure',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' // Gradiente naranja
    },
    {
      id: 'wind', label: 'Viento', value: currentWindSpeed, unit: 'km/h', change: weatherData?.current_weather?.winddirection ? `Dir: ${weatherData.current_weather.winddirection}°` : 'N/A', icon: 'wind',
      gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)' // Gradiente azul
    },
  ];

  // --- Manejador de Cambio de Ubicación ---
  const handleLocationChange = (newLocationName: string) => {
    if (predefinedLocations[newLocationName]) {
      setCurrentLocationName(newLocationName);
      // Los valores de latitude, longitude y timezone se actualizarán automáticamente
      // por el Hook de estado y el useEffect se disparará.
    } else {
      console.warn("Ubicación no encontrada en la lista predefinida:", newLocationName);
    }
  };

  // --- Renderizado Condicional (Carga y Error) ---
  if (loading) {
    return <div className="loading-screen">Cargando datos del clima...</div>;
  }

  if (error) {
    return <div className="error-screen">Error: {error}</div>;
  }

  // --- Estructura del Dashboard ---
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <InfoBar
          lastUpdate={lastUpdate}
          isLive={true} // Asumimos que los datos son en vivo
          sunrise={sunrise}
          sunset={sunset}
        />
        <div className="dashboard-grid">
          <div className="main-content">
            <AlertsSection alerts={alerts} />
            <ConditionsSection conditions={conditions} />
            {/* Nuevas secciones de Indicadores Clave y Análisis Temporal */}
            <KeyIndicatorsSection indicators={keyIndicators} />
            <TemporalAnalysisSection hourlyData={weatherData?.hourly} /> {/* Pasa los datos horarios */}
          </div>
          <aside className="sidebar">
            <LocationSelector
              currentLocation={currentLocationName} // Pasa el nombre actual
              onLocationChange={handleLocationChange}
              availableLocations={predefinedLocations} // Pasa las ubicaciones disponibles
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;