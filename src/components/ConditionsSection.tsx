// src/components/ConditionsSection.tsx
import React from 'react';
import Card from './Card';
import ConditionCard from './ConditionCard';
import type { Condition } from '../types/DashboardTypes'; // <-- ¡CORRECCIÓN AQUÍ!

interface ConditionsSectionProps {
  conditions: Condition[];
}

const ConditionsSection: React.FC<ConditionsSectionProps> = ({ conditions }) => {
  return (
    <Card title="Condiciones Favorables">
      {conditions.length > 0 ? (
        <ul className="conditions-list">
          {conditions.map((condition) => (
            <li key={condition.id}>
              <ConditionCard condition={condition} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay condiciones favorables destacadas en este momento.</p>
      )}
    </Card>
  );
};

export default ConditionsSection;