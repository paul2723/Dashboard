// src/components/LocationSelector.tsx
import React from 'react';
import Card from './Card';
import Icon from './Icon';
// Asegúrate de que DashboardTypes está bien importado
import type { LocationSelectorProps, Location } from '../types/DashboardTypes'; 

// Renombra 'currentLocation' a 'currentLocationName' para que coincida con la interfaz
const LocationSelector: React.FC<LocationSelectorProps> = ({
  currentLocationName, // ¡CAMBIADO AQUÍ!
  onLocationChange,
  availableLocations,
}) => {
  // Asegúrate de usar 'currentLocationName' aquí también
  const selectedLocationData: Location | undefined = availableLocations[currentLocationName];

  return (
    <Card title="Selector de Ubicación">
      <div className="location-info">
        <div className="location-item">
          <Icon name="location" />
          {/* Y aquí */}
          <span>{currentLocationName}</span> 
        </div>
        <div className="current-time">
          {selectedLocationData?.timezone && (
              <span>{new Date().toLocaleTimeString('es-ES', { timeZone: selectedLocationData.timezone, hour: '2-digit', minute: '2-digit' })}</span>
          )}
        </div>
      </div>
      <div className="location-selector-dropdown">
        <Icon name="location" />
        {/* Y aquí */}
        <select value={currentLocationName} onChange={(e) => onLocationChange(e.target.value)}>
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
  );
};

export default LocationSelector;