// src/functions/KeyIndicatorGenerator.ts
import type { CurrentData, DailyData, KeyIndicator } from '../types/DashboardTypes';

export const generateKeyIndicators = (
    current: CurrentData | undefined,
    daily: DailyData | undefined
): KeyIndicator[] => {
    const indicators: KeyIndicator[] = [];

    // Función de ayuda para obtener valores numéricos de forma segura
    const getSafeNumericValue = (obj: any, prop: string): number | undefined => {
        // Asegura que el objeto no es null/undefined y que la propiedad es un número
        return (obj && typeof obj[prop] === 'number') ? obj[prop] : undefined;
    };

    // 1. Temperatura Actual
    const tempActual = getSafeNumericValue(current, 'temperature_2m');
    if (tempActual !== undefined) {
        indicators.push({
            id: 'temp-actual',
            label: 'Temperatura Actual',
            value: `${tempActual.toFixed(0)}`, // Redondea a entero
            unit: '°C',
            change: current?.is_day === 1 ? 'Día' : 'Noche', // Ejemplo de 'change'
            icon: 'temperature', // Asegúrate de que este icono existe en Icon.tsx
            gradient: 'linear-gradient(135deg, #ff7043, #ff4d4d)', // Naranja a Rojo
        });
    }

    // 2. Humedad Relativa
    // Nota: Open-Meteo a menudo tiene humedad en 'hourly'.
    // Si 'current.relative_humidity_2m' es undefined, puedes intentar buscar en hourly[0]
    const humidity = getSafeNumericValue(current, 'relative_humidity_2m');
    if (humidity !== undefined) {
        indicators.push({
            id: 'humidity',
            label: 'Humedad Relativa',
            value: `${humidity.toFixed(0)}`, // Redondea a entero
            unit: '%',
            change: 'Normal', // Ejemplo
            icon: 'humidity', // Asegúrate de que este icono existe en Icon.tsx
            gradient: 'linear-gradient(135deg, #29b6f6, #0288d1)', // Azul claro a Azul oscuro
        });
    }

    // 3. Presión Atmosférica
    // Nota: Similar a la humedad, revisa si 'current.pressure_msl' está disponible.
    const pressure = getSafeNumericValue(current, 'pressure_msl');
    if (pressure !== undefined) {
        indicators.push({
            id: 'pressure',
            label: 'Presión Atmosférica',
            value: `${pressure.toFixed(0)}`, // Redondea a entero
            unit: 'hPa',
            change: 'Estable', // Ejemplo
            icon: 'pressure', // Asegúrate de que este icono existe en Icon.tsx
            gradient: 'linear-gradient(135deg, #ab47bc, #8e24aa)', // Morado a Rosa oscuro
        });
    }

    // 4. Velocidad del Viento
    const windSpeed = getSafeNumericValue(current, 'wind_speed_10m');
    if (windSpeed !== undefined) {
        indicators.push({
            id: 'wind-speed',
            label: 'Velocidad del Viento',
            value: `${windSpeed.toFixed(0)}`, // Redondea a entero
            unit: 'km/h',
            change: 'Moderado', // Ejemplo
            icon: 'wind', // Asegúrate de que este icono existe en Icon.tsx
            gradient: 'linear-gradient(135deg, #66bb6a, #388e3c)', // Verde a Verde oscuro
        });
    }

    // Puedes añadir más indicadores aquí si lo deseas (ej. Temp. Máx/Mín del día)
    const dailyTempMax = daily?.temperature_2m_max?.[0];
    if (dailyTempMax !== undefined) {
        indicators.push({
            id: 'temp-max-daily',
            label: 'Temp. Máx. Hoy',
            value: `${dailyTempMax.toFixed(0)}`,
            unit: '°C',
            change: '',
            icon: 'temperature',
            gradient: 'linear-gradient(135deg, #fbc02d, #f9a825)', // Amarillo
        });
    }

    const dailyTempMin = daily?.temperature_2m_min?.[0];
    if (dailyTempMin !== undefined) {
        indicators.push({
            id: 'temp-min-daily',
            label: 'Temp. Mín. Hoy',
            value: `${dailyTempMin.toFixed(0)}`,
            unit: '°C',
            change: '',
            icon: 'temperature',
            gradient: 'linear-gradient(135deg, #81d4fa, #4fc3f7)', // Azul claro
        });
    }

    return indicators;
};