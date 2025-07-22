// src/components/AlertsSection.tsx
import React from 'react';
import AlertCard from './AlertCard';
import Card from './Card';
import '../App.css';
import type { Alert } from '../App';

// Interfaz para las props de AlertsSection
interface AlertsSectionProps {
  alerts: Alert[];
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
  return (
    <Card title="Alertas Meteorológicas">
      {alerts && alerts.length > 0 ? (
        <ul className="alerts-list">
          {alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </ul>
      ) : (
        <p>No hay alertas meteorológicas activas en este momento.</p>
      )}
    </Card>
  );
};

export default AlertsSection;