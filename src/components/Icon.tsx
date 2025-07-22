// src/components/Icon.tsx
import React from 'react';

// Interfaz para las props de Icon
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 20, color = '#333', className = '' }) => {
  // NOTA: Este componente sigue siendo un placeholder.
  // Cuando uses una librería como 'react-icons' (npm install react-icons),
  // importarías iconos específicos y los renderizarías aquí.
  // Ejemplo: import { FiRefreshCw, FiSettings } from 'react-icons/fi';
  // return <FiRefreshCw size={size} color={color} className={className} />;

  const getIconContent = (iconName: string) => {
    switch (iconName) {
      case 'cloud-sun': return '☀️';
      case 'alert': return '⚠️';
      case 'info': return 'ℹ️';
      case 'location': return '📍';
      case 'refresh': return '🔄';
      case 'settings': return '⚙️';
      case 'sunrise': return '🌅';
      case 'sunset': return '🌇';
      // Puedes añadir más casos según los iconos que necesites para tu dashboard
      case 'humidity': return '💧';
      case 'temperature': return '🌡️';
      case 'pressure': return '⏱️';
      case 'wind': return '💨';
      default: return ''; // Si el nombre del icono no coincide, no renderiza nada
    }
  };

  return (
    <span className={`icon ${className}`} style={{ fontSize: size, color: color, display: 'inline-block', verticalAlign: 'middle' }}>
      {getIconContent(name)}
    </span>
  );
};

export default Icon;