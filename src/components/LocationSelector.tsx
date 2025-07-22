// src/components/LocationSelector.jsx
import React from 'react';
import Icon from './Icon';
import Card from './Card'; // Reutilizamos el componente Card
import '../App.css'; // Importa los estilos

const LocationSelector = ({ currentLocation }) => {
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