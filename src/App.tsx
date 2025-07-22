// src/App.tsx
import React from 'react';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import LocationSelector from './components/LocationSelector';
import AlertsSection from './components/AlertsSection';
import ConditionsSection from './components/ConditionsSection';

// Importa los estilos
import './index.css';
import './App.css';

// --- Definiciones de Tipos (Interfaces) ---
// Estas interfaces describen la forma de los datos que tus componentes esperan como props.
// Las exportamos para que otros componentes puedan importarlas.

export interface Alert {
  id: number;
  type: string;
  location: string;
  level: 'Media' | 'Baja' | 'Alta'; // Asegúrate de que los niveles coincidan con tus datos
  description: string;
  time?: string; // Opcional, si quieres mostrar la hora de la alerta como en tu diseño
}

export interface Condition {
  id: number;
  type: string;
  value: string;
  description: string;
}

// Interfaz para las props del componente InfoBar
interface InfoBarProps {
  lastUpdate: string;
  isLive: boolean;
  sunrise: string;
  sunset: string;
}

// Interfaz para las props del componente AlertsSection
interface AlertsSectionProps {
  alerts: Alert[];
}

// Interfaz para las props del componente ConditionsSection
interface ConditionsSectionProps {
  conditions: Condition[];
}

// Interfaz para las props del componente LocationSelector
interface LocationSelectorProps {
  currentLocation: string;
}

// --- Componente App.tsx ---
function App() {
  // Datos ficticios para el ejemplo.
  // Ajusta estos valores para que coincidan con los de tu diseño o los datos reales que tengas.
  const currentLocation: string = "Guayaquil, Ecuador";
  const lastUpdate: string = "20:57:07 - 22/07/2025";
  const isLive: boolean = true;
  const sunrise: string = "06:23 AM";
  const sunset: string = "06:36 PM";

  const alerts: Alert[] = [
    { id: 1, type: 'Calor Extremo', location: 'Centro Histórico', level: 'Media', description: 'Se esperan temperaturas superiores a 35°C durante las próximas 3 horas.', time: '14:30' },
    { id: 2, type: 'Humedad Alta', location: 'Toda la ciudad', level: 'Baja', description: 'Sensación térmica elevada debido a la humedad. Ideal para actividades al aire libre.', time: '15:00' },
  ];

  const conditions: Condition[] = [
    { id: 1, type: 'Temperatura Agradable', value: '28°C', description: 'Ideal para actividades al aire libre.' },
    { id: 2, type: 'Viento Ligero', value: '10 km/h', description: 'Ayuda a la sensación térmica.' },
  ];

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <InfoBar
          lastUpdate={lastUpdate}
          isLive={isLive}
          sunrise={sunrise}
          sunset={sunset}
        />
        <div className="dashboard-grid">
          <div className="main-content">
            <AlertsSection alerts={alerts} />
            <ConditionsSection conditions={conditions} />
          </div>
          <aside className="sidebar">
            <LocationSelector currentLocation={currentLocation} />
            {/* Aquí irían otros widgets o secciones futuras como "Indicadores Clave" */}
            {/* Para los "Indicadores Clave" (Temperatura, Humedad, Presión, Viento), puedes crear un componente KeyIndicatorsSection.tsx */}
            {/* Y dentro de él, usar un KeyIndicatorCard.tsx para cada uno, pasándoles los datos y un gradiente de color */}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;