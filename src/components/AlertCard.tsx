// src/components/AlertCard.tsx
import React from 'react';
import Icon from './Icon'; // O la ruta correcta a tu Icon
import type { Alert } from '../types/DashboardTypes'; // <-- ¡CAMBIO CLAVE!

interface AlertCardProps {
  alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const levelClass = `level-${alert.level.toLowerCase()}`;
  return (
    <div className={`alert-card ${levelClass}`}>
      <div className="alert-icon">
        <Icon name={alert.icon} />
      </div>
      <div className="alert-content">
        <h4>{alert.type}</h4>
        <p>{alert.description}</p>
        <span className="alert-location">{alert.location}</span>
      </div>
      <div className="alert-meta">
        <span className={`alert-level ${levelClass}`}>{alert.level}</span>
        <span className="alert-time">{alert.time}</span>
      </div>
    </div>
  );
};

export default AlertCard;