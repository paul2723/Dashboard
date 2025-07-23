// src/components/TemporalAnalysisSection.tsx
import React from 'react';
import Card from './Card';
import Icon from './Icon';
// UNA SOLA LÍNEA DE IMPORTACIÓN para los tipos
import type { HourlyData, CurrentData } from '../types/DashboardTypes';

interface TemporalAnalysisSectionProps {
  hourlyData: HourlyData | undefined;
  currentWeatherData: CurrentData | undefined;
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
    if (weatherCode >= 56 && weatherCode <= 57) return 'Llovizna helada'; // Añadido
    if (weatherCode >= 61 && weatherCode <= 65) return 'Lluvia';
    if (weatherCode >= 66 && weatherCode <= 67) return 'Lluvia helada';
    if (weatherCode >= 71 && weatherCode <= 75) return 'Nieve';
    if (weatherCode === 77) return 'Granizo'; // Añadido
    if (weatherCode >= 80 && weatherCode <= 82) return 'Chubascos';
    if (weatherCode >= 85 && weatherCode <= 86) return 'Chubascos de nieve';
    if (weatherCode >= 95 && weatherCode <= 99) return 'Tormenta';
    return 'Desconocido';
  };

  const getWindDirection = (degree: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45);
    return directions[index % 8];
  };

  const temperaturesForChart = hourlyData?.temperature_2m?.slice(0, 24) || [];
  const chartTimes = hourlyData?.time?.slice(0, 24).map(getHour) || [];

  const maxTemp = temperaturesForChart.length > 0 ? Math.max(...temperaturesForChart) : 0;
  const minTemp = temperaturesForChart.length > 0 ? Math.min(...temperaturesForChart) : 0;
  const tempRange = maxTemp - minTemp;

  const chartPoints = temperaturesForChart.map((temp, index) => {
    const scaledTemp = tempRange > 0 ? ((temp - minTemp) / tempRange) * 100 : 50;
    return {
      x: (index / (temperaturesForChart.length - 1)) * 100,
      y: 100 - scaledTemp
    };
  });

  return (
    <div className="temporal-analysis-section">
      <Card title="Análisis Temporal">
        <div className="chart-header">
          <h3><Icon name="up-arrow" /> Temperatura (24h)</h3>
          <p>Evolución de la temperatura durante el día</p>
          <button className="chart-button"><Icon name="today" /> Hoy</button>
        </div>
        <div className="temperature-chart-container">
          {temperaturesForChart.length > 0 ? (
            <div className="temperature-chart">
              <div className="chart-grid">
                <div className="y-axis">
                  {[maxTemp, maxTemp - tempRange * 0.25, maxTemp - tempRange * 0.5, minTemp + tempRange * 0.25, minTemp].map((temp, i) => (
                    <span key={i} style={{ bottom: `${(i / 4) * 100}%` }}>{Math.round(temp)}</span>
                  ))}
                </div>
                <div className="grid-lines">
                    {[0, 25, 50, 75, 100].map(val => (
                        <div key={val} className="grid-line" style={{ bottom: `${val}%` }}></div>
                    ))}
                </div>
                <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                        fill="url(#chartGradient)"
                        stroke="#6a82fb"
                        strokeWidth="1"
                        points={chartPoints.map(p => `${p.x},${p.y}`).join(' ')}
                    />
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#6a82fb", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#c7e0ff", stopOpacity:0.3}} />
                      </linearGradient>
                    </defs>
                    {chartPoints.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#6a82fb" />
                    ))}
                </svg>
              </div>
              <div className="x-axis">
                {chartTimes.map((time, i) => (
                  <span key={i} className="x-axis-label">
                    {time.split(':')[0]}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="no-data-message">No hay datos horarios disponibles para el gráfico.</p>
          )}
        </div>
      </Card>

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
                      {/* ACCESO CORRECTO A LA DIRECCIÓN DEL VIENTO HORARIA */}
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