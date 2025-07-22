// src/components/AlertsSection.jsx
import React from 'react';
import AlertCard from './AlertCard';
import Card from './Card';
import '../App.css'; // Importa los estilos

const AlertsSection = ({ alerts }) => {
  return (
    <Card title="Alertas Meteorológicas">
      {alerts.length > 0 ? (
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