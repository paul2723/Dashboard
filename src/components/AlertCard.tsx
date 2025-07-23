// src/components/AlertCard.tsx
import React from 'react';
import Icon from './Icon';
import type { Alert } from '../types/DashboardTypes'; // Importación corregida

interface AlertCardProps {
  alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const levelClass = `level-${alert.level.toLowerCase()}`;
  return (
    <li className={`alert-card ${levelClass}`}>
      <div className="alert-header">
        <span className="alert-type">{alert.type}</span>
        <span className={`alert-level ${levelClass}`}>{alert.level}</span>
        <span className="alert-time">{alert.time}</span>
      </div>
      <p className="alert-message">{alert.message}</p>
      <div className="alert-location">
        <Icon name="location-pin" /> {alert.location}
      </div>
    </li>
  );
};

export default AlertCard;