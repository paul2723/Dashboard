// src/types/DashboardTypes.tsx

export interface CurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  is_day: number;
  wind_speed_10m: number;
  precipitation: number;
  wind_direction?: number; // Asegúrate de que esto siga siendo opcional
}
export interface Alert {
  id: number;
  type: string;
  location: string;
  level: 'Baja' | 'Media' | 'Alta';
  description: string;
  time: string;
  icon: string;
}

export interface Condition {
  id: number;
  type: string;
  value: string;
  description: string;
  icon: string;
}

export interface KeyIndicator {
  id: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  icon: string;
  gradient: string;
  bgColor?: string; // Propiedad opcional para fondo de tarjeta si la usas
}

export interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (locationName: string) => void;
  availableLocations: { [key: string]: { latitude: number; longitude: number; timezone: string } };
}
export interface CurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  is_day: number;
  wind_speed_10m: number;
  precipitation: number;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  rain: number[];
  weather_code: number[];
  evapotranspiration: number[];
  precipitation_probability: number[];
  apparent_temperature: number[];
  relative_humidity_2m?: number[]; // Hacemos opcional, si la API no lo trae
  pressure_msl?: number[];       // Hacemos opcional, si la API no lo trae
  wind_speed_10m?: number[];     // Hacemos opcional, si la API no lo trae en hourly
  wind_direction_10m?: number[]; // Necesario para la dirección del viento por hora
}

export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise?: string[];
  sunset?: string[];
  wind_speed_10m_max?: number[];
  wind_direction_10m_dominant?: number[]; // Si necesitas dirección dominante diaria
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
  current: CurrentData;
  hourly_units: any;
  hourly: HourlyData;
  daily_units: any;
  daily: DailyData;
}