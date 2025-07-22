// src/components/ConditionCard.jsx
import React from 'react';
import Icon from './Icon';
import '../App.css'; // Importa los estilos

const ConditionCard = ({ condition }) => {
  // Puedes expandir esto para tener iconos dinámicos según el tipo de condición
  const getConditionIcon = (type) => {
    switch (type) {
      case 'Temperatura Ideal': return '🌡️'; // Emoji temporal
      case 'Viento Moderado': return '🌬️'; // Emoji temporal
      default: return '✅'; // Emoji por defecto
    }
  };

  return (
    <li className="condition-card">
      <span className="condition-icon">{getConditionIcon(condition.type)}</span>
      <div className="condition-details">
        <h4>{condition.type}</h4>
        <p>{condition.description}</p>
      </div>
      <span className="condition-value">{condition.value}</span>
    </li>
  );
};

export default ConditionCard;