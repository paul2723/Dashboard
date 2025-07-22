// src/components/HourlyForecastTable.tsx
import React from 'react';
import type { HourlyData } from '../App'; // Importa la interfaz HourlyData desde App.tsx
import '../App.css'; // Asegúrate de que los estilos estén importados
import Icon from './Icon'; // Para los iconos en la tabla

interface HourlyForecastTableProps {
  hourlyData: HourlyData;
}

const HourlyForecastTable: React.FC<HourlyForecastTableProps> = ({ hourlyData }) => {
  // Tomamos los primeros 7-8 puntos para una tabla concisa, ajusta según necesidad
  const numHoursToShow = 8;
  const slicedDataTime = hourlyData.time.slice(0, numHoursToShow);
  const slicedDataTemp = hourlyData.temperature_2m.slice(0, numHoursToShow);
  const slicedDataHumidity = hourlyData.relative_humidity_2m.slice(0, numHoursToShow);
  const slicedDataPressure = hourlyData.pressure_msl.slice(0, numHoursToShow);
  const slicedDataWind = hourlyData.wind_speed_10m.slice(0, numHoursToShow);
  const slicedDataWeatherCode = hourlyData.weather_code.slice(0, numHoursToShow);

  // Función para mapear weather_code a un estado legible y un ícono
  // Basado en los códigos WMO: https://www.nodc.noaa.gov/archive/arc0021/data/0.1/web/html/web_files/html/wmo-code/Dilley-Codes.html
  const getWeatherDescriptionAndIcon = (code: number) => {
    switch (code) {
      case 0: return { description: 'Despejado', icon: '☀️' };
      case 1: return { description: 'Mayormente despejado', icon: '☀️' };
      case 2: return { description: 'Parcialmente nublado', icon: '🌤️' };
      case 3: return { description: 'Nublado', icon: '☁️' };
      case 45: return { description: 'Niebla', icon: '🌫️' };
      case 48: return { description: 'Niebla helada', icon: '🌫️❄️' };
      case 51: return { description: 'Llovizna ligera', icon: '🌦️' };
      case 53: return { description: 'Llovizna moderada', icon: '🌧️' };
      case 55: return { description: 'Llovizna densa', icon: '🌧️' };
      case 56: return { description: 'Llovizna helada ligera', icon: '🌨️' };
      case 57: return { description: 'Llovizna helada densa', icon: '🌨️' };
      case 61: return { description: 'Lluvia ligera', icon: '🌧️' };
      case 63: return { description: 'Lluvia moderada', icon: '🌧️' };
      case 65: return { description: 'Lluvia intensa', icon: ' torrential_rain' }; // Considerar un ícono más fuerte
      case 66: return { description: 'Lluvia helada ligera', icon: '🧊🌧️' };
      case 67: return { description: 'Lluvia helada intensa', icon: '🧊🌧️' };
      case 71: return { description: 'Caída de nieve ligera', icon: '🌨️' };
      case 73: return { description: 'Caída de nieve moderada', icon: '❄️' };
      case 75: return { description: 'Caída de nieve intensa', icon: '❄️❄️' };
      case 77: return { description: 'Granizo', icon: '🧊' };
      case 80: return { description: 'Chubascos ligeros', icon: '🌦️' };
      case 81: return { description: 'Chubascos moderados', icon: '🌧️' };
      case 82: return { description: 'Chubascos violentos', icon: '⛈️' };
      case 85: return { description: 'Chubascos de nieve ligeros', icon: '🌨️' };
      case 86: return { description: 'Chubascos de nieve intensos', icon: '❄️' };
      case 95: return { description: 'Tormenta', icon: '⚡' }; // Pequeña tormenta con rayos
      case 96: return { description: 'Tormenta con granizo ligero', icon: '⛈️' }; // Tormenta con rayos y lluvia/granizo
      case 99: return { description: 'Tormenta con granizo fuerte', icon: '🌩️' }; // Tormenta con rayos y lluvia/granizo
      default: return { description: 'Desconocido', icon: '❓' };
    }
  };

  return (
    <div className="hourly-forecast-table-container">
      <h3>Pronóstico por Hora</h3>
      <div className="hourly-table-wrapper"> {/* Agregamos un wrapper para el scroll */}
        <table>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Temp.</th>
              <th>Humedad</th>
              <th>Presión</th>
              <th>Viento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {slicedDataTime.map((timeStr, index) => {
              const date = new Date(timeStr);
              const hour = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
              const weather = getWeatherDescriptionAndIcon(slicedDataWeatherCode[index]);

              return (
                <tr key={timeStr}>
                  <td>{hour}</td>
                  <td>{slicedDataTemp[index]?.toFixed(0)}°C</td>
                  <td>{slicedDataHumidity[index]?.toFixed(0)}%</td>
                  <td>{slicedDataPressure[index]?.toFixed(0)} hPa</td>
                  <td>{slicedDataWind[index]?.toFixed(0)} km/h</td>
                  <td>
                    <span role="img" aria-label={weather.description} title={weather.description}>
                      {weather.icon}
                    </span>
                    {/* Puedes añadir la descripción en texto si quieres:
                    <span className="weather-description">{weather.description}</span> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HourlyForecastTable;