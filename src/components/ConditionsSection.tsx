// src/components/ConditionsSection.tsx
import React from 'react';
import Card from './Card';
import ConditionCard from './ConditionCard';
import type { Condition } from '../types/DashboardTypes'; // Importación corregida

interface ConditionsSectionProps {
  conditions: Condition[];
}

const ConditionsSection: React.FC<ConditionsSectionProps> = ({ conditions }) => {
  return (
    <Card title="Condiciones Ambientales">
      {conditions.length > 0 ? (
        <ul className="conditions-list">
          {conditions.map((condition) => (
            <ConditionCard key={condition.id} condition={condition} />
          ))}
        </ul>
      ) : (
        <p className="no-data-message">No hay condiciones ambientales especiales.</p>
      )}
    </Card>
  );
};

export default ConditionsSection;