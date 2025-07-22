import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherAlertProps {
  type: 'warning' | 'info' | 'error' | 'success';
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
  location?: string;
  time?: string;
}

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    className: "border-warning/50 bg-warning/5",
    iconColor: "text-warning",
    badgeClass: "bg-warning/10 text-warning-foreground hover:bg-warning/20"
  },
  info: {
    icon: Info,
    className: "border-primary/50 bg-primary/5",
    iconColor: "text-primary",
    badgeClass: "bg-primary/10 text-primary hover:bg-primary/20"
  },
  error: {
    icon: AlertCircle,
    className: "border-destructive/50 bg-destructive/5",
    iconColor: "text-destructive",
    badgeClass: "bg-destructive/10 text-destructive-foreground hover:bg-destructive/20"
  },
  success: {
    icon: CheckCircle,
    className: "border-success/50 bg-success/5",
    iconColor: "text-success",
    badgeClass: "bg-success/10 text-success-foreground hover:bg-success/20"
  }
};

const severityConfig = {
  low: { label: "Baja", color: "bg-muted text-muted-foreground" },
  medium: { label: "Media", color: "bg-warning/20 text-warning-foreground" },
  high: { label: "Alta", color: "bg-destructive/20 text-destructive-foreground" }
};

export function WeatherAlert({ 
  type, 
  title, 
  description, 
  severity, 
  location, 
  time 
}: WeatherAlertProps) {
  const config = alertConfig[type];
  const Icon = config.icon;
  
  return (
    <Alert className={cn(
      "transition-all duration-300 hover:shadow-md animate-fade-in",
      config.className
    )}>
      <Icon className={cn("h-4 w-4", config.iconColor)} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <AlertTitle className="text-sm font-medium">{title}</AlertTitle>
          <div className="flex items-center gap-2">
            {severity && (
              <Badge 
                variant="secondary" 
                className={cn("text-xs", severityConfig[severity].color)}
              >
                {severityConfig[severity].label}
              </Badge>
            )}
            {time && (
              <span className="text-xs text-muted-foreground">{time}</span>
            )}
          </div>
        </div>
        <AlertDescription className="text-sm text-muted-foreground">
          {description}
        </AlertDescription>
        {location && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              📍 {location}
            </Badge>
          </div>
        )}
      </div>
    </Alert>
  );
}