import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherData {
  time: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  visibility: number;
  uvIndex: number;
  condition: string;
}

const mockWeatherData: WeatherData[] = [
  {
    time: "06:00",
    temperature: 18,
    humidity: 75,
    pressure: 1015,
    windSpeed: 12,
    windDirection: "NE",
    precipitation: 0,
    visibility: 10,
    uvIndex: 2,
    condition: "Parcialmente nublado"
  },
  {
    time: "09:00",
    temperature: 22,
    humidity: 65,
    pressure: 1018,
    windSpeed: 15,
    windDirection: "E",
    precipitation: 0,
    visibility: 15,
    uvIndex: 6,
    condition: "Soleado"
  },
  {
    time: "12:00",
    temperature: 26,
    humidity: 55,
    pressure: 1020,
    windSpeed: 18,
    windDirection: "SE",
    precipitation: 0,
    visibility: 20,
    uvIndex: 9,
    condition: "Despejado"
  },
  {
    time: "15:00",
    temperature: 28,
    humidity: 50,
    pressure: 1019,
    windSpeed: 20,
    windDirection: "S",
    precipitation: 0,
    visibility: 18,
    uvIndex: 8,
    condition: "Soleado"
  },
  {
    time: "18:00",
    temperature: 24,
    humidity: 60,
    pressure: 1016,
    windSpeed: 16,
    windDirection: "SW",
    precipitation: 0.2,
    visibility: 12,
    uvIndex: 4,
    condition: "Parcialmente nublado"
  },
  {
    time: "21:00",
    temperature: 20,
    humidity: 70,
    pressure: 1014,
    windSpeed: 10,
    windDirection: "W",
    precipitation: 1.5,
    visibility: 8,
    uvIndex: 0,
    condition: "Lluvia ligera"
  }
];

const getConditionBadge = (condition: string) => {
  const config = {
    "Despejado": { variant: "default" as const, className: "bg-success/10 text-success hover:bg-success/20" },
    "Soleado": { variant: "default" as const, className: "bg-warning/10 text-warning-foreground hover:bg-warning/20" },
    "Parcialmente nublado": { variant: "secondary" as const, className: "bg-muted text-muted-foreground" },
    "Nublado": { variant: "secondary" as const, className: "bg-muted text-muted-foreground" },
    "Lluvia ligera": { variant: "outline" as const, className: "bg-primary/10 text-primary border-primary/20" },
    "Lluvia": { variant: "outline" as const, className: "bg-primary/20 text-primary border-primary/30" }
  };
  
  return config[condition as keyof typeof config] || { variant: "outline" as const, className: "" };
};

const getUVIndexColor = (index: number) => {
  if (index <= 2) return "text-success";
  if (index <= 5) return "text-warning";
  if (index <= 7) return "text-warning";
  if (index <= 10) return "text-destructive";
  return "text-destructive";
};

export function WeatherTable() {
  return (
    <Card className="bg-gradient-card border-muted shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Condiciones Detalladas
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-background/50">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm" className="bg-background/50">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Información meteorológica detallada por horas
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-muted overflow-hidden bg-background/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-16">Hora</TableHead>
                <TableHead>Temp.</TableHead>
                <TableHead>Humedad</TableHead>
                <TableHead>Presión</TableHead>
                <TableHead>Viento</TableHead>
                <TableHead>Precipitación</TableHead>
                <TableHead>Visibilidad</TableHead>
                <TableHead>UV</TableHead>
                <TableHead>Condición</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWeatherData.map((row, index) => (
                <TableRow 
                  key={row.time} 
                  className={cn(
                    "hover:bg-muted/20 transition-colors",
                    index % 2 === 0 && "bg-background/30"
                  )}
                >
                  <TableCell className="font-medium">{row.time}</TableCell>
                  <TableCell>
                    <span className="font-medium">{row.temperature}°C</span>
                  </TableCell>
                  <TableCell>{row.humidity}%</TableCell>
                  <TableCell>{row.pressure} hPa</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{row.windSpeed} km/h</span>
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {row.windDirection}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-medium",
                      row.precipitation > 0 ? "text-primary" : "text-muted-foreground"
                    )}>
                      {row.precipitation} mm
                    </span>
                  </TableCell>
                  <TableCell>{row.visibility} km</TableCell>
                  <TableCell>
                    <span className={cn("font-medium", getUVIndexColor(row.uvIndex))}>
                      {row.uvIndex}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getConditionBadge(row.condition).variant}
                      className={cn("text-xs", getConditionBadge(row.condition).className)}
                    >
                      {row.condition}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-muted text-sm text-muted-foreground">
          <div>Mostrando 6 de 24 registros del día</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span>Excelente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span>Moderado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span>Alto</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}