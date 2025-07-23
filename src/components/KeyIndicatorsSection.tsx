// src/components/KeyIndicatorsSection.tsx
import React from 'react';
import Card from './Card';
import KeyIndicatorCard from './KeyIndicatorCard';
import type { KeyIndicator } from '../types/DashboardTypes'; // <-- ¡CORRECCIÓN AQUÍ!

interface KeyIndicatorsSectionProps {
  indicators: KeyIndicator[];
}

const KeyIndicatorsSection: React.FC<KeyIndicatorsSectionProps> = ({ indicators }) => {
  return (
    <Card title="Indicadores Clave" className="key-indicators-card-grid">
      <div className="indicators-grid">
        {indicators.map((indicator) => (
          <KeyIndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </Card>
  );
};

export default KeyIndicatorsSection;