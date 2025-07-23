// src/components/ConditionCard.tsx
import React from 'react';
import Icon from './Icon';
import type { Condition } from '../types/DashboardTypes'; // <-- ¡CORRECCIÓN AQUÍ!

interface ConditionCardProps {
  condition: Condition;
}

const ConditionCard: React.FC<ConditionCardProps> = ({ condition }) => {
  return (
    <div className="condition-card">
      <div className="condition-icon">
        <Icon name={condition.icon || 'info'} />
      </div>
      <div className="condition-content">
        <h4 className="condition-type">{condition.type}</h4>
        <p className="condition-description">{condition.description}</p>
      </div>
      <span className="condition-value">{condition.value}</span>
    </div>
  );
};

export default ConditionCard;