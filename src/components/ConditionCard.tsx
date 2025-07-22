// src/components/ConditionCard.tsx
import React from 'react';
import Icon from './Icon';
import '../App.css';
import type { Condition } from '../App';

// Interfaz para las props de ConditionCard
interface ConditionCardProps {
  condition: Condition;
}

const ConditionCard: React.FC<ConditionCardProps> = ({ condition }) => {
  // Puedes expandir esto para tener iconos dinámicos según el tipo de condición
  const getConditionIcon = (type: string) => { // Tipado para 'type'
    switch (type) {
      case 'Temperatura Agradable': return '🌡️'; // Emoji temporal
      case 'Viento Ligero': return '🌬️'; // Emoji temporal
      // Aquí podrías añadir más iconos o usar Icon para iconos SVG
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