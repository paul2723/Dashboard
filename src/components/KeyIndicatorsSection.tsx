// src/components/KeyIndicatorsSection.tsx
import React from 'react';
import Card from './Card'; // Asegúrate de que tu componente Card.tsx esté en la misma carpeta o la ruta correcta
import KeyIndicatorCard from './KeyIndicatorCard'; // Importa el componente de tarjeta individual
import type { KeyIndicator } from '../App'; // Importa la interfaz KeyIndicator desde App.tsx

interface KeyIndicatorsSectionProps {
  indicators: KeyIndicator[];
}

const KeyIndicatorsSection: React.FC<KeyIndicatorsSectionProps> = ({ indicators }) => {
  return (
    <Card title="Indicadores Clave" className="key-indicators-section">
      <div className="indicators-grid">
        {indicators.map(indicator => (
          <KeyIndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </Card>
  );
};

export default KeyIndicatorsSection;