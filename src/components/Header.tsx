
import React from 'react';
import Icon from './Icon';
import '../App.css'; // Importa los estilos

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard Climático</h1>
        <p>Análisis meteorológico en tiempo real</p>
      </div>
      <div className="header-right">
        <div className="header-status">
          <span className="status-dot"></span>
          <span>En línea</span>
        </div>
        <button className="header-icon-button" aria-label="Actualizar datos">
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