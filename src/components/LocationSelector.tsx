// src/components/LocationSelector.tsx
import React from 'react';
import Icon from './Icon';
import Card from './Card';
import '../App.css';

// Interfaz para las props de LocationSelector
interface LocationSelectorProps {
  currentLocation: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ currentLocation }) => {
  return (
    <Card className="location-selector">
      <h3>Selector de Ubicación</h3>
      <p>{currentLocation}</p>
      <button className="location-selector-button">
        <Icon name="location" size={18} className="icon" />
        Cambiar Ubicación
      </button>
    </Card>
  );
};

export default LocationSelector;