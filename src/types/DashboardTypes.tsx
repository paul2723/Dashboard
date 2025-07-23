// src/types/DashboardTypes.tsx

export interface Alert {
  id: string; // Añadido para claves únicas en listas
  type: string;
  message: string;
  level: string;
  time: string;
  location: string;
}

export interface Condition {
  id: string; // Añadido para claves únicas en listas
  type: string;
  description: string;
  level: string;
  time: string;
  location: string;
}

export interface KeyIndicator {
  id: string;
  label: string; // <-- Asegúrate de que existe
  value: string;
  unit: string;
  change?: string; // Hacemos opcional si no siempre lo usas
  icon: string; // Nombre del icono para tu componente Icon.tsx
  gradient: string; // Para el fondo de gradiente
  bgColor?: string; // Opcional, si usas un color sólido en vez de gradiente
  textColor?: string; // Opcional: para controlar el color del texto si el fondo es variable
}

export interface CurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  is_day: number;
  wind_speed_10m: number;
  precipitation: number;
  relative_humidity_2m: number;
  pressure_msl: number;
  wind_direction_10m: number;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  rain: number[];
  weather_code: number[];
  evapotranspiration: number[];
  precipitation_probability: number[];
  apparent_temperature: number[];
  relative_humidity_2m?: number[];
  pressure_msl?: number[];
  wind_speed_10m?: number[];
  wind_direction_10m?: number[];
}
export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise?: string[];
  sunset?: string[];
  wind_speed_10m_max?: number[];
  wind_direction_10m_dominant?: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: any;
  current: CurrentData; // Corregido a 'current'
  hourly_units: any;
  hourly: HourlyData;
  daily_units: any;
  daily: DailyData;
}

export interface Location {
  latitude: number;
  longitude: number;
  timezone: string;
}

// ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ NUEVA LÍNEA AÑADIDA AQUÍ ABAJO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export type LocationName = "Guayaquil, Ecuador" | "Bogotá, Colombia" | "Buenos Aires, Argentina" | "Lima, Perú" | "Santiago, Chile"; 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


export interface LocationSelectorProps {
  currentLocationName: string; 
  onLocationChange: (locationName: string) => void;
  availableLocations: { [key: string]: Location };
}