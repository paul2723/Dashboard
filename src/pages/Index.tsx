import { useState } from "react";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { WeatherAlert } from "@/components/weather/WeatherAlert";
import { LocationSelector } from "@/components/weather/LocationSelector";
import { WeatherChart } from "@/components/weather/WeatherChart";
import { WeatherTable } from "@/components/weather/WeatherTable";
import { WeatherTips } from "@/components/weather/WeatherTips";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Wind,
  Sun,
  Moon,
  Cloud,
  RefreshCw,
  Settings,
  TrendingUp
} from "lucide-react";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    id: "madrid",
    name: "Madrid",
    country: "España", 
    timezone: "Europe/Madrid",
    coordinates: { lat: 40.4168, lng: -3.7038 }
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleLocationChange = (location: any) => {
    setSelectedLocation(location);
    setLastUpdate(new Date());
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-muted shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-sky">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Dashboard Climático
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Análisis meteorológico en tiempo real
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
                En línea
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="bg-background/50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm" className="bg-background/50">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                Datos en vivo
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-warning" />
              <span>Salida: 07:23</span>
              <Moon className="h-4 w-4 text-muted-foreground ml-4" />
              <span>Puesta: 21:45</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Alertas Meteorológicas</h2>
          <div className="grid gap-4">
            <WeatherAlert
              type="warning"
              title="Alerta de Calor"
              description="Se esperan temperaturas superiores a 35°C durante las próximas 3 horas. Se recomienda mantenerse hidratado y evitar la exposición prolongada al sol."
              severity="medium"
              location="Madrid Centro"
              time="14:30"
            />
            <WeatherAlert
              type="info"
              title="Condiciones Favorables"
              description="Excelente calidad del aire y visibilidad. Ideal para actividades al aire libre."
              severity="low"
              location="Toda la región"
              time="15:00"
            />
          </div>
        </section>

        {/* Location Selector and Key Indicators */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Location Selector */}
          <div className="lg:col-span-1">
            <LocationSelector 
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
            />
          </div>

          {/* Key Indicators */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-4">Indicadores Clave</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <WeatherCard
                title="Temperatura"
                value={26}
                unit="°C"
                icon={<Thermometer className="h-4 w-4 text-white" />}
                trend="up"
                trendValue="+2°C desde ayer"
                variant="temperature"
              />
              <WeatherCard
                title="Humedad"
                value={65}
                unit="%"
                icon={<Droplets className="h-4 w-4 text-white" />}
                trend="down"
                trendValue="-5% desde ayer"
                variant="humidity"
              />
              <WeatherCard
                title="Presión"
                value={1018}
                unit="hPa"
                icon={<Gauge className="h-4 w-4 text-white" />}
                trend="stable"
                trendValue="Sin cambios"
                variant="pressure"
              />
              <WeatherCard
                title="Viento"
                value={15}
                unit="km/h"
                icon={<Wind className="h-4 w-4 text-white" />}
                trend="up"
                trendValue="NE"
                variant="wind"
              />
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Análisis Temporal</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <WeatherChart type="temperature" />
            <WeatherChart type="humidity" />
          </div>
        </section>

        {/* Detailed Information */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Weather Table */}
          <div className="lg:col-span-2">
            <WeatherTable />
          </div>

          {/* Tips and Additional Information */}
          <div className="lg:col-span-1">
            <WeatherTips />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
