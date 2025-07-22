// src/components/LocationSelector.tsx
import React from 'react';
import Card from './Card';
import Icon from './Icon';
import type { FC } from 'react';
import '../App.css'; // Asegúrate de que los estilos estén importados

// Interfaz para las props del componente LocationSelector (actualizada)
interface LocationSelectorProps {
  currentLocation: string; // El nombre de la ubicación actual
  onLocationChange: (locationName: string) => void; // Función para notificar el cambio de ubicación
  // Objeto que contiene todas las ubicaciones disponibles con sus detalles
  availableLocations: { [key: string]: { latitude: number; longitude: number; timezone: string } };
}

const LocationSelector: FC<LocationSelectorProps> = ({ currentLocation, onLocationChange, availableLocations }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLocationChange(event.target.value);
  };

  // Obtener detalles de la ubicación actual para mostrar coordenadas y zona horaria
  const currentDetails = availableLocations[currentLocation];
  const displayLat = currentDetails?.latitude?.toFixed(4) || 'N/A';
  const displayLon = currentDetails?.longitude?.toFixed(4) || 'N/A';
  const displayTimezone = currentDetails?.timezone || 'N/A';

  return (
    <Card title="Selector de Ubicación" className="location-selector-card">
      <div className="location-info-display">
        <Icon name="location" size={20} color="#3498db" />
        <span className="current-location-text">{currentLocation}</span>
      </div>

      <div className="location-dropdown-container">
        <select
          className="location-select"
          value={currentLocation}
          onChange={handleSelectChange}
        >
          {/* Mapear las claves de availableLocations a opciones del select */}
          {Object.keys(availableLocations).map(locationName => (
            <option key={locationName} value={locationName}>
              {locationName}
            </option>
          ))}
        </select>
      </div>

      <div className="coordinates-info">
        <p><strong>Coordenadas:</strong> {displayLat}, {displayLon}</p>
        <p><strong>Zona Horaria:</strong> {displayTimezone}</p>
      </div>
    </Card>
  );
};

export default LocationSelector;