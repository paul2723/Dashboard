// src/components/ConditionsSection.jsx
import React from 'react';
import ConditionCard from './ConditionCard';
import Card from './Card';
import '../App.css'; // Importa los estilos

const ConditionsSection = ({ conditions }) => {
  return (
    <Card title="Condiciones Favorables">
      {conditions.length > 0 ? (
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