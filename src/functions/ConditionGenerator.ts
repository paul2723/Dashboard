// src/functions/ConditionGenerator.ts
import type { Condition, CurrentData, HourlyData } from '../types/DashboardTypes';

export const generateConditions = (
  current: CurrentData,
  hourly: HourlyData
): Condition[] => {
  const conditions: Condition[] = [];
  const now = new Date();
  const currentTime = now.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const currentLocation = "Guayaquil"; // Puedes hacer esto dinámico

  // Ejemplo de reglas de condiciones
  if (current.temperature_2m >= 20 && current.temperature_2m <= 28 && current.precipitation === 0) {
    conditions.push({
      id: `cond-pleasant-temp-${Date.now()}-1`,
      type: 'Temperatura Agradable',
      description: `Disfruta de una temperatura ideal de ${current.temperature_2m}°C.`,
      level: 'Baja', // 'Baja' para condiciones favorables
      time: currentTime,
      location: currentLocation,
    });
  }

  if (current.relative_humidity_2m && current.relative_humidity_2m < 60) {
    conditions.push({
      id: `cond-low-humidity-${Date.now()}-2`,
      type: 'Humedad Baja',
      description: `Niveles de humedad confortables (${current.relative_humidity_2m}%).`,
      level: 'Baja',
      time: currentTime,
      location: currentLocation,
    });
  }

  if (current.wind_speed_10m < 10) {
    conditions.push({
      id: `cond-light-wind-${Date.now()}-3`,
      type: 'Vientos Ligeros',
      description: `Vientos suaves de ${current.wind_speed_10m} km/h.`,
      level: 'Baja',
      time: currentTime,
      location: currentLocation,
    });
  }

  // Condición de buena visibilidad (ejemplo, no basada en un dato real de visibilidad de Open-Meteo directamente)
  // Podrías inferirlo de la ausencia de niebla o precipitaciones intensas.
  const isClearOrPartlyCloudy = current.is_day && (current.precipitation === 0);
  if (isClearOrPartlyCloudy) {
    conditions.push({
      id: `cond-good-visibility-${Date.now()}-4`,
      type: 'Buena Visibilidad',
      description: 'Cielo despejado o parcialmente nublado, buena visibilidad.',
      level: 'Baja',
      time: currentTime,
      location: currentLocation,
    });
  }

  // Puedes añadir más lógicas para condiciones específicas
  // Por ejemplo, "Ideal para actividades al aire libre" si varias condiciones son óptimas.

  return conditions;
};