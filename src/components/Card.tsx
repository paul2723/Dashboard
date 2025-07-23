// src/components/Card.tsx
import React from 'react';
import type { ReactNode } from 'react'; // Si necesitas el tipo ReactNode

interface CardProps {
  title?: string;
  children: React.ReactNode; // Forma correcta de tipar children
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;