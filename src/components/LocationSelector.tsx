// src/components/LocationSelector.tsx
import React from 'react';
import Card from './Card';
import Icon from './Icon';
import Chart from './Chart'; // Importar el componente Chart (anteriormente TemperatureHumidityChart)
import type { LocationSelectorProps, Location, LocationName, HourlyData } from '../types/DashboardTypes'; // Asegúrate de importar HourlyData

// Extiende las props para incluir hourlyData
interface LocationSelectorExtendedProps extends LocationSelectorProps {
  hourlyData: HourlyData | undefined;
}

const LocationSelector: React.FC<LocationSelectorExtendedProps> = ({
  currentLocationName,
  onLocationChange,
  availableLocations,
  hourlyData, // Recibir hourlyData como prop
}) => {
  const selectedLocationData: Location | undefined = availableLocations[currentLocationName];

  return (
    <> {/* Usamos un fragmento para envolver múltiples elementos */}
      <Card title="Selector de Ubicación">
        <div className="location-info">
          <div className="location-item">
            <Icon name="location" />
            <span>{currentLocationName}</span>
          </div>
        </div>
        <div className="location-selector-dropdown">
          <Icon name="location" />
          <select value={currentLocationName} onChange={(e) => onLocationChange(e.target.value as LocationName)}>
            {Object.keys(availableLocations).map((locationName) => (
              <option key={locationName} value={locationName}>
                {locationName}
              </option>
            ))}
          </select>
        </div>
        {selectedLocationData && (
          <div className="coordinates-info">
            <p>Coordenadas: {selectedLocationData.latitude}, {selectedLocationData.longitude}</p>
            <p>Zona Horaria: {selectedLocationData.timezone}</p>
          </div>
        )}
      </Card>

      {/* Nuevo gráfico en la barra lateral */}
      <Chart hourlyData={hourlyData} /> {/* Usar el componente Chart */}
    </>
  );
};

export default LocationSelector;

