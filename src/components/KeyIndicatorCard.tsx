// src/components/KeyIndicatorCard.tsx
import React from 'react';
import Icon from './Icon'; // Asegúrate de que tu componente Icon.tsx esté en la misma carpeta o la ruta correcta
import type { KeyIndicator } from '../App'; // Importa la interfaz KeyIndicator desde App.tsx
import '../App.css'; // Asegúrate de que los estilos estén importados para las clases CSS de este componente

interface KeyIndicatorCardProps {
  indicator: KeyIndicator;
}

const KeyIndicatorCard: React.FC<KeyIndicatorCardProps> = ({ indicator }) => {
  // Define el estilo de fondo de la tarjeta usando el gradiente o color de fondo
  const cardStyle = indicator.gradient
    ? { backgroundImage: indicator.gradient }
    : { backgroundColor: indicator.bgColor || '#ffffff' }; // Fallback a blanco si no hay nada

  return (
    <div className="key-indicator-card" style={cardStyle}>
      <div className="indicator-header">
        <span className="indicator-label">{indicator.label}</span>
        {/* El icono se mostrará en blanco sobre el gradiente */}
        <Icon name={indicator.icon} size={28} color="#fff" />
      </div>
      <div className="indicator-value">
        {indicator.value}
        {indicator.unit && <span className="indicator-unit">{indicator.unit}</span>} {/* Muestra la unidad si existe */}
      </div>
      {/* Muestra el cambio solo si está definido */}
      {indicator.change && <div className="indicator-change">{indicator.change}</div>}
    </div>
  );
};

export default KeyIndicatorCard;