// src/components/AlertCard.jsx
import React from 'react';
import Icon from './Icon';
import '../App.css'; // Importa los estilos

const AlertCard = ({ alert }) => {
  // Mapear el nivel de la alerta a una clase CSS para el color
  const levelClass = `level-${alert.level.toLowerCase()}`;

  return (
    <li className={`alert-card ${levelClass}`}>
      <Icon name="alert" size={24} className="alert-icon" />
      <div className="alert-details">
        <h4>{alert.type} - {alert.location}</h4>
        <p>{alert.description}</p>
      </div>
      <span className={`alert-level ${levelClass}`}>{alert.level}</span>
    </li>
  );
};

export default AlertCard;