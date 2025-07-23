// src/components/LocationSelector.tsx
import React from 'react';
import Card from './Card';
import Icon from './Icon';
import type { LocationSelectorProps } from '../types/DashboardTypes'; // <-- ¡CORRECCIÓN AQUÍ!

const LocationSelector: React.FC<LocationSelectorProps> = ({
  currentLocation,
  onLocationChange,
  availableLocations,
}) => {
  const selectedLocationData = availableLocations[currentLocation];

  return (
    <Card title="Selector de Ubicación">
      <div className="location-info">
        <div className="location-item">
          <Icon name="location" />
          <span>{currentLocation}</span>
        </div>
        <div className="current-time">
          {selectedLocationData?.timezone && (
              <span>{new Date().toLocaleTimeString('es-ES', { timeZone: selectedLocationData.timezone, hour: '2-digit', minute: '2-digit' })}</span>
          )}
        </div>
      </div>
      <div className="location-selector-dropdown">
        <Icon name="location" />
        <select value={currentLocation} onChange={(e) => onLocationChange(e.target.value)}>
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