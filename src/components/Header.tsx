// src/components/Header.tsx
import React from 'react';
import Icon from './Icon'; // Asegúrate de que Icon esté importado

interface HeaderProps {
  lastUpdate: string; // Ya viene formateada como string desde App.tsx
  sunrise: string;    // Ya viene formateada como string o 'N/A'
  sunset: string;     // Ya viene formateada como string o 'N/A'
  isConnecting: boolean;
  hasError: boolean;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ lastUpdate, sunrise, sunset, isConnecting, hasError, onRefresh }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="app-title">Dashboard Climático</h1>
      </div>
      <div className="header-right">
        <div className={`status-indicator ${isConnecting ? 'connecting' : (hasError ? 'error' : 'online')}`}>
          <span className="status-dot"></span>
          <span>{isConnecting ? 'Conectando...' : (hasError ? 'Error' : 'En línea')}</span>
        </div>
        <div className="last-update-info">
          <Icon name="info" />
          {/* Aquí mostramos directamente la cadena lastUpdate, ya formateada */}
          <span>Últ. actualiz: {lastUpdate}</span>
        </div>
        <div className="sun-times">
          <div className="sun-time-item">
            <Icon name="sunrise" />
            <span>Salida: {sunrise}</span>
          </div>
          <div className="sun-time-item">
            <Icon name="sunset" />
            <span>Puesta: {sunset}</span>
          </div>
        </div>
        <button onClick={onRefresh} className="refresh-button" disabled={isConnecting}>
          <Icon name="refresh" />
        </button>
        <button className="settings-button">
          <Icon name="settings" />
        </button>
      </div>
    </header>
  );
};

export default Header;