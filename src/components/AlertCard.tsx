// src/components/AlertCard.tsx
import React from 'react';
import Icon from './Icon';
import '../App.css';
import type { Alert } from '../App'; // Importar la interfaz Alert

// Interfaz para las props de AlertCard
interface AlertCardProps {
  alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  // Mapear el nivel de la alerta a una clase CSS para el color
  const levelClass = `level-${alert.level.toLowerCase()}`;

  return (
    <li className={`alert-card ${levelClass}`}>
      <Icon name="alert" size={24} className="alert-icon" />
      <div className="alert-details">
        <h4>{alert.type} - {alert.location}</h4>
        <p>{alert.description}</p>
      </div>
      <div className="alert-meta">
        <span className={`alert-level ${levelClass}`}>{alert.level}</span>
        {alert.time && <span className="alert-time">{alert.time}</span>}
      </div>
    </li>
  );
};

export default AlertCard;