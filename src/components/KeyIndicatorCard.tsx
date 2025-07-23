// src/components/KeyIndicatorCard.tsx
 import React from 'react';
 import type { KeyIndicator } from '../types/DashboardTypes';

 interface KeyIndicatorCardProps {
   indicator: KeyIndicator;
 }

 const KeyIndicatorCard: React.FC<KeyIndicatorCardProps> = ({ indicator }) => {
   if (!indicator) {
     console.error("KeyIndicatorCard: ¡Error! La prop 'indicator' es undefined o null.");
     return null;
   }

   const cardBackgroundStyle = {
     background: indicator.gradient || '#6c757d',
   };

   return (
     <div className="key-indicator-card" style={cardBackgroundStyle}>
       <div className="indicator-header">
         <h4 className="indicator-label">{indicator.label}</h4>
       </div>
       <div className="indicator-content-body">
         <div className="indicator-value-container">
           <div className="indicator-value-main">
             {indicator.value}
           </div>
           {indicator.unit && <span className="indicator-unit">{indicator.unit === '°C' ? 'Celsius' : indicator.unit}</span>}
         </div>
       </div>
     </div>
   );
 };

 export default KeyIndicatorCard;