// src/components/Card.tsx
import React from 'react';
import type { ReactNode } from 'react';
import '../App.css';

// Interfaz para las props de Card
interface CardProps {
  title?: string; // El título es opcional
  children: ReactNode; // 'children' puede ser cualquier cosa renderizable por React
  className?: string; // La clase CSS es opcional
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;