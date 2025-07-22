// src/components/TemporalAnalysisSection.tsx
import React from 'react';
import Card from './Card'; // Asegúrate de que tu componente Card.tsx esté en la misma carpeta o la ruta correcta
import HourlyForecastTable from './HourlyForecastTable'; // Importa la tabla de pronóstico horario
import type { HourlyData } from '../App'; // Importa la interfaz HourlyData desde App.tsx

interface TemporalAnalysisSectionProps {
  hourlyData: HourlyData | undefined; // Puede ser undefined si los datos aún no están cargados
}

const TemporalAnalysisSection: React.FC<TemporalAnalysisSectionProps> = ({ hourlyData }) => {
  return (
    <Card title="Análisis Temporal" className="temporal-analysis-section">
      {/* Placeholder para el gráfico de análisis temporal */}
      <h4 className="chart-placeholder-title">Temperatura (24h)</h4>
      <p className="chart-subtitle">Evolución de la temperatura durante el día</p>
      <div className="chart-area-placeholder">
        {/* Aquí es donde iría tu componente de gráfico real (por ejemplo, con Chart.js o Recharts) */}
        <p style={{textAlign: 'center', padding: '50px', color: '#666'}}>
            [Aquí se renderizará el gráfico de temperatura a lo largo del tiempo, como en el diseño]
        </p>
      </div>

      {/* Muestra la tabla de pronóstico horario solo si hay datos */}
      {hourlyData && <HourlyForecastTable hourlyData={hourlyData} />}
    </Card>
  );
};

export default TemporalAnalysisSection;