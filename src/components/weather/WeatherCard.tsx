import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  className?: string;
  variant?: 'temperature' | 'humidity' | 'pressure' | 'wind' | 'default';
}

const getTemperatureColor = (temp: number) => {
  if (temp >= 30) return 'bg-temperature-hot';
  if (temp >= 20) return 'bg-temperature-warm';
  if (temp >= 10) return 'bg-temperature-mild';
  if (temp >= 0) return 'bg-temperature-cool';
  return 'bg-temperature-cold';
};

const getVariantStyles = (variant: string, value: string | number) => {
  switch (variant) {
    case 'temperature':
      const temp = typeof value === 'string' ? parseFloat(value) : value;
      return {
        card: 'bg-gradient-sky border-primary/20',
        icon: getTemperatureColor(temp),
        badge: 'bg-primary/10 text-primary hover:bg-primary/20'
      };
    case 'humidity':
      return {
        card: 'bg-gradient-ocean border-primary/20',
        icon: 'bg-primary',
        badge: 'bg-primary/10 text-primary hover:bg-primary/20'
      };
    case 'pressure':
      return {
        card: 'bg-gradient-card border-muted',
        icon: 'bg-accent',
        badge: 'bg-accent/10 text-accent-foreground hover:bg-accent/20'
      };
    case 'wind':
      return {
        card: 'bg-gradient-sunset border-warning/20',
        icon: 'bg-warning',
        badge: 'bg-warning/10 text-warning-foreground hover:bg-warning/20'
      };
    default:
      return {
        card: 'bg-gradient-card border-muted',
        icon: 'bg-primary',
        badge: 'bg-primary/10 text-primary hover:bg-primary/20'
      };
  }
};

export function WeatherCard({ 
  title, 
  value, 
  unit, 
  icon, 
  trend, 
  trendValue, 
  className,
  variant = 'default'
}: WeatherCardProps) {
  const styles = getVariantStyles(variant, value);
  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-glow hover:scale-105",
      "border-2 backdrop-blur-sm",
      styles.card,
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">
          {title}
        </CardTitle>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center",
          "shadow-md transition-all duration-300",
          styles.icon
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-1">
          <div className="text-2xl font-bold text-foreground">
            {value}
          </div>
          {unit && (
            <div className="text-sm text-muted-foreground">
              {unit}
            </div>
          )}
        </div>
        {trend && trendValue && (
          <div className="flex items-center mt-2">
            <Badge variant="secondary" className={styles.badge}>
              <span className={cn(
                "mr-1",
                trend === 'up' && "text-success",
                trend === 'down' && "text-destructive",
                trend === 'stable' && "text-muted-foreground"
              )}>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
              </span>
              {trendValue}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}