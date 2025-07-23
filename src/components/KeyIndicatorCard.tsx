// src/components/KeyIndicatorCard.tsx
import React from 'react';
import Icon from './Icon';
import type { KeyIndicator } from '../types/DashboardTypes'; // <-- ¡CORRECCIÓN AQUÍ!

interface KeyIndicatorCardProps {
  indicator: KeyIndicator;
}

const KeyIndicatorCard: React.FC<KeyIndicatorCardProps> = ({ indicator }) => {
  return (
    <div className="key-indicator-card" style={{ background: indicator.gradient || indicator.bgColor }}>
      <div className="indicator-header">
        <h4 className="indicator-label">{indicator.label}</h4>
        <Icon name={indicator.icon} className="indicator-icon" />
      </div>
      <div className="indicator-value">
        {indicator.value} <span className="indicator-unit">{indicator.unit}</span>
      </div>
    </div>
  );
};

export default KeyIndicatorCard;