// src/types/DashboardTypes.tsx

// Definición de tipos para la respuesta de Open-Meteo API
export interface CurrentWeather {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
    precipitation: number;
}

export interface HourlyData {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    pressure_msl: number[];
    wind_speed_10m: number[];
    weather_code: number[];
    rain: number[];
    evapotranspiration: number[];
    precipitation_probability: number[];
    apparent_temperature: number[];
}

export interface DailyData {
    time: string[];
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
}

// Interfaz principal para la respuesta de la API de Open-Meteo
export interface OpenMeteoResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units?: Record<string, string>;
    current?: CurrentWeather;
    hourly_units?: Record<string, string>;
    hourly?: HourlyData;
    daily_units?: Record<string, string>;
    daily?: DailyData;
}

// Interfaces para tus componentes (AlertsSection, ConditionsSection, KeyIndicatorsSection)
export interface Alert {
    id: number;
    type: string;
    location: string;
    level: 'Media' | 'Baja' | 'Alta';
    description: string;
    time?: string;
    icon?: string;
}

export interface Condition {
    id: number;
    type: string;
    value: string;
    description: string;
    icon?: string;
}

export interface KeyIndicator {
    id: string;
    label: string;
    value: string;
    unit: string;
    change?: string;
    icon: string;
    bgColor?: string;
    gradient?: string;
}

// Interfaz para las props del componente LocationSelector
export interface LocationSelectorProps {
    currentLocation: string;
    onLocationChange: (locationName: string) => void;
    availableLocations: { [key: string]: { latitude: number; longitude: number; timezone: string } };
}