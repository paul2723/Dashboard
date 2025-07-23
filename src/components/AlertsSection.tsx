// src/components/AlertsSection.tsx
import React from 'react';
import AlertCard from './AlertCard';
import Card from './Card';
import type { Alert } from '../types/DashboardTypes'; // <-- ¡CAMBIO CLAVE!

interface AlertsSectionProps {
  alerts: Alert[];
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
  return (
    <Card title="Alertas Meteorológicas">
      {alerts.length > 0 ? (
        <ul className="alerts-list">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </ul>
      ) : (
        <p className="no-alerts-message">No hay alertas meteorológicas activas en este momento.</p>
      )}
    </Card>
  );
};

export default AlertsSection;