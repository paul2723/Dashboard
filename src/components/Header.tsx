// src/components/Header.tsx
import React from 'react';
import Icon from './Icon';
import '../App.css';

// Define la interfaz de props para el componente Header
interface HeaderProps {
  lastUpdate: string; // Ya lo estabas pasando
  sunrise: string | undefined; // Ahora puede ser string o undefined
  sunset: string | undefined;   // Ahora puede ser string o undefined
  isConnecting: boolean;        // Ya lo estabas pasando
  hasError: boolean;            // Ya lo estabas pasando
  onRefresh: () => void;        // Ya lo estabas pasando
}

const Header: React.FC<HeaderProps> = ({ lastUpdate, sunrise, sunset, isConnecting, hasError, onRefresh }) => {
  // Función para formatear la hora (asumiendo que viene en formato ISO)
  const formatTime = (isoString: string | undefined) => {
    if (!isoString) return 'N/A'; // Si es undefined, muestra 'N/A'
    try {
      // Intenta convertir a formato de hora local, sin segundos
      return new Date(isoString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      console.error("Error formatting time:", e);
      return 'N/A'; // En caso de un error de formato
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard Climático</h1>
        <p>Análisis meteorológico en tiempo real</p>
      </div>
      <div className="header-right">
        {/* Indicador de estado de conexión */}
        <div className="header-status">
          <span className={`status-dot ${isConnecting ? 'connecting' : (hasError ? 'error' : 'live')}`}></span>
          <span>{isConnecting ? 'Conectando...' : (hasError ? 'Error' : 'En línea')}</span>
        </div>
        
        {/* Información de actualización y amanecer/atardecer */}
        <div className="header-info-group">
            <div className="header-info-item">
                <Icon name="info" size={16} color="#666" />
                <span>Últ. actualiz.: {formatTime(lastUpdate)}</span>
            </div>
            <div className="header-info-item">
                <Icon name="sunrise" size={16} color="#f7b731" />
                <span>Salida: {formatTime(sunrise)}</span>
            </div>
            <div className="header-info-item">
                <Icon name="sunset" size={16} color="#d46a6a" />
                <span>Puesta: {formatTime(sunset)}</span>
            </div>
        </div>

        {/* Botones de acción */}
        <button className="header-icon-button" aria-label="Actualizar datos" onClick={onRefresh} disabled={isConnecting}>
          <Icon name="refresh" size={20} />
        </button>
        <button className="header-icon-button" aria-label="Configuración">
          <Icon name="settings" size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;