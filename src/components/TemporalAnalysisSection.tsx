// src/components/TemporalAnalysisSection.tsx
import React from 'react';
import Card from './Card';
import Icon from './Icon';
import type { HourlyData, CurrentData } from '../types/DashboardTypes'; // Importación corregida

interface TemporalAnalysisSectionProps {
  hourlyData: HourlyData | undefined;
  currentWeatherData: CurrentData | undefined; // Usa CurrentData, no CurrentWeather
}

const TemporalAnalysisSection: React.FC<TemporalAnalysisSectionProps> = ({ hourlyData, currentWeatherData }) => {
  const getHour = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getWeatherCondition = (weatherCode: number): string => {
    if (weatherCode >= 0 && weatherCode <= 3) return 'Soleado';
    if (weatherCode >= 45 && weatherCode <= 48) return 'Parcialmente nublado';
    if (weatherCode >= 51 && weatherCode <= 55) return 'Llovizna';
    if (weatherCode >= 56 && weatherCode <= 57) return 'Llovizna helada';
    if (weatherCode >= 61 && weatherCode <= 65) return 'Lluvia';
    if (weatherCode >= 66 && weatherCode <= 67) return 'Lluvia helada';
    if (weatherCode >= 71 && weatherCode <= 75) return 'Nieve';
    if (weatherCode === 77) return 'Granizo';
    if (weatherCode >= 80 && weatherCode <= 82) return 'Chubascos';
    if (weatherCode >= 85 && weatherCode <= 86) return 'Nieve intensa';
    if (weatherCode === 95) return 'Tormenta';
    if (weatherCode >= 96 && weatherCode <= 99) return 'Tormenta con granizo';
    return 'Desconocido';
  };

  const getWindDirection = (degree: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div className="temporal-analysis-section">
      <Card title="Pronóstico Horario">
        <div className="hourly-forecast-table-container">
          {hourlyData && hourlyData.time?.length > 0 ? (
            <table className="hourly-forecast-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Temp. (°C)</th>
                  <th>Humedad (%)</th>
                  <th>Presión (hPa)</th>
                  <th>Viento (km/h)</th>
                  <th>Lluvia (mm)</th>
                  <th>Prob. Prec. (%)</th>
                  <th>Sensación T. (°C)</th>
                  <th>Condición</th>
                </tr>
              </thead>
              <tbody>
                {hourlyData.time.map((time, index) => (
                  <tr key={index}>
                    <td>{getHour(time)}</td>
                    <td>{hourlyData.temperature_2m?.[index]?.toFixed(0) || 'N/A'}</td>
                    <td>{hourlyData.relative_humidity_2m?.[index]?.toFixed(0) || 'N/A'}</td>
                    <td>{hourlyData.pressure_msl?.[index]?.toFixed(0) || 'N/A'}</td>
                    <td>
                      {hourlyData.wind_speed_10m?.[index]?.toFixed(0) || 'N/A'}{' '}
                      {/* CORREGIDO: Usa la dirección del viento por hora si está disponible */}
                      {hourlyData.wind_direction_10m?.[index] !== undefined
                        ? getWindDirection(hourlyData.wind_direction_10m[index])
                        : ''}
                    </td>
                    <td>{hourlyData.rain?.[index]?.toFixed(1) || 'N/A'}</td>
                    <td>{hourlyData.precipitation_probability?.[index]?.toFixed(0) || 'N/A'}</td>
                    <td>{hourlyData.apparent_temperature?.[index]?.toFixed(0) || 'N/A'}</td>
                    <td>
                      <span className="weather-condition-badge">
                        {hourlyData.weather_code?.[index] !== undefined ? getWeatherCondition(hourlyData.weather_code[index]) : 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No hay datos de pronóstico horario disponibles.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TemporalAnalysisSection;