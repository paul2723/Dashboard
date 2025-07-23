// src/components/InfoBar.tsx
import React from 'react';
import Icon from './Icon';
import '../App.css';

// Interfaz para las props de InfoBar
interface InfoBarProps {
  lastUpdate: string;
  isLive: boolean;
  sunrise: string | undefined; // Puede ser undefined si no hay datos
  sunset: string | undefined; // Puede ser undefined si no hay datos
}

const InfoBar: React.FC<InfoBarProps> = ({ lastUpdate, isLive, sunrise, sunset }) => {
  return (
    <div className="info-bar">
      <div className="info-item">
        <Icon name="info" size={18} className="icon" />
        <span>Última actualización: {lastUpdate ? new Date(lastUpdate).toLocaleString('es-ES') : 'N/A'}</span>
      </div>
      <div className="info-item">
        {isLive && <span className="live-indicator"></span>}
        <span>Datos en vivo</span>
      </div>
      <div className="info-item">
        <Icon name="sunrise" size={18} className="icon" />
        <span>Salida del sol: {sunrise ? new Date(sunrise).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
      </div>
      <div className="info-item">
        <Icon name="sunset" size={18} className="icon" />
        <span>Puesta del sol: {sunset ? new Date(sunset).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
      </div>
    </div>
  );
};

export default InfoBar;