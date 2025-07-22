// src/components/ConditionsSection.tsx
import React from 'react';
import ConditionCard from './ConditionCard';
import Card from './Card';
import '../App.css';
import type { Condition } from '../App'; // Importar la interfaz Condition

// Interfaz para las props de ConditionsSection
interface ConditionsSectionProps {
  conditions: Condition[];
}

const ConditionsSection: React.FC<ConditionsSectionProps> = ({ conditions }) => {
  return (
    <Card title="Condiciones Favorables">
      {conditions && conditions.length > 0 ? (
        <ul className="conditions-list">
          {conditions.map(condition => (
            <ConditionCard key={condition.id} condition={condition} />
          ))}
        </ul>
      ) : (
        <p>No hay condiciones favorables destacadas en este momento.</p>
      )}
    </Card>
  );
};

export default ConditionsSection;