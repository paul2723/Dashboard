// src/functions/AlertGenerator.ts
import type { Alert, CurrentData, DailyData, HourlyData } from '../types/DashboardTypes';

export const generateAlerts = (
  current: CurrentData,
  daily: DailyData,
  hourly: HourlyData
): Alert[] => {
  const alerts: Alert[] = [];
  const now = new Date();
  const currentTime = now.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const currentLocation = "Guayaquil"; // Puedes hacer esto dinámico si tienes la info de Location

  // Ejemplo de reglas de alerta (ajusta según tus necesidades)
  if (current.temperature_2m > 30) {
    alerts.push({
      id: `alert-temp-high-${Date.now()}-1`, // ID único
      type: 'Temperatura Extrema',
      message: `¡Alerta! Temperatura actual alta: ${current.temperature_2m}°C.`,
      level: 'Alta',
      time: currentTime,
      location: currentLocation,
    });
  }

  if (current.temperature_2m < 10) {
    alerts.push({
      id: `alert-temp-low-${Date.now()}-2`, // ID único
      type: 'Temperatura Fría',
      message: `¡Alerta! Temperatura actual baja: ${current.temperature_2m}°C.`,
      level: 'Media',
      time: currentTime,
      location: currentLocation,
    });
  }

  // Alerta de lluvia
  if (current.precipitation > 0.5) {
    alerts.push({
      id: `alert-precip-${Date.now()}-3`, // ID único
      type: 'Lluvia Significativa',
      message: `Se está registrando una precipitación de ${current.precipitation} mm.`,
      level: 'Media',
      time: currentTime,
      location: currentLocation,
    });
  }

  // Pronóstico de lluvia en las próximas horas
  const nextHoursRain = hourly.rain?.slice(0, 6) || []; // Próximas 6 horas
  const hasSignificantRainForecast = nextHoursRain.some(rain => rain > 0.5);
  if (hasSignificantRainForecast) {
    alerts.push({
      id: `alert-forecast-rain-${Date.now()}-4`, // ID único
      type: 'Pronóstico de Lluvia',
      message: 'Se esperan lluvias en las próximas horas.',
      level: 'Baja',
      time: currentTime,
      location: currentLocation,
    });
  }

  // Viento fuerte
  if (current.wind_speed_10m > 30) { // Umbral de viento fuerte
    alerts.push({
      id: `alert-wind-${Date.now()}-5`, // ID único
      type: 'Viento Fuerte',
      message: `Vientos de ${current.wind_speed_10m} km/h. Precaución con objetos sueltos.`,
      level: 'Media',
      time: currentTime,
      location: currentLocation,
    });
  }

  // Puedes añadir más lógicas para alertas basadas en weather_code, etc.
  // Por ejemplo, para tormentas, niebla, etc.

  return alerts;
};