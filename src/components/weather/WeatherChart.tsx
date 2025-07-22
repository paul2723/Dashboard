import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, Calendar } from "lucide-react";

const mockData = [
  { time: '00:00', temperature: 15, humidity: 65, pressure: 1013 },
  { time: '03:00', temperature: 12, humidity: 70, pressure: 1015 },
  { time: '06:00', temperature: 10, humidity: 75, pressure: 1018 },
  { time: '09:00', temperature: 18, humidity: 60, pressure: 1020 },
  { time: '12:00', temperature: 24, humidity: 45, pressure: 1022 },
  { time: '15:00', temperature: 28, humidity: 40, pressure: 1019 },
  { time: '18:00', temperature: 25, humidity: 50, pressure: 1016 },
  { time: '21:00', temperature: 20, humidity: 55, pressure: 1014 },
];

interface WeatherChartProps {
  type?: 'temperature' | 'humidity' | 'pressure';
}

export function WeatherChart({ type = 'temperature' }: WeatherChartProps) {
  const chartConfig = {
    temperature: {
      title: "Temperatura (24h)",
      dataKey: "temperature",
      unit: "°C",
      color: "#0ea5e9",
      gradientColor: "#0ea5e9",
      description: "Evolución de la temperatura durante el día"
    },
    humidity: {
      title: "Humedad (24h)",
      dataKey: "humidity", 
      unit: "%",
      color: "#06b6d4",
      gradientColor: "#06b6d4",
      description: "Niveles de humedad relativa"
    },
    pressure: {
      title: "Presión Atmosférica (24h)",
      dataKey: "pressure",
      unit: "hPa",
      color: "#f59e0b",
      gradientColor: "#f59e0b",
      description: "Variación de la presión barométrica"
    }
  };

  const config = chartConfig[type];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-muted rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            {config.title.split('(')[0]}: 
            <span className="font-semibold text-primary ml-1">
              {payload[0].value}{config.unit}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const maxValue = Math.max(...mockData.map(d => d[config.dataKey as keyof typeof d] as number));
  const minValue = Math.min(...mockData.map(d => d[config.dataKey as keyof typeof d] as number));
  const avgValue = ((maxValue + minValue) / 2).toFixed(1);

  return (
    <Card className="bg-gradient-card border-muted shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {config.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Calendar className="h-3 w-3 mr-1" />
              Hoy
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={config.color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={config.color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--muted-foreground))" 
                strokeOpacity={0.3}
              />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={config.dataKey}
                stroke={config.color}
                strokeWidth={3}
                fill={`url(#gradient-${type})`}
                dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: config.color, strokeWidth: 2, fill: "#ffffff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-muted">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Máximo</div>
            <div className="text-lg font-semibold text-foreground">
              {maxValue}{config.unit}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Promedio</div>
            <div className="text-lg font-semibold text-foreground">
              {avgValue}{config.unit}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Mínimo</div>
            <div className="text-lg font-semibold text-foreground">
              {minValue}{config.unit}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}