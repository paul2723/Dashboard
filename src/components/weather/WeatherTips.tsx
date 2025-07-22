import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Umbrella, 
  Shirt, 
  Car, 
  Home, 
  Activity,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tip {
  id: string;
  category: 'clothing' | 'transport' | 'health' | 'home' | 'outdoor';
  icon: React.ReactNode;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
}

const mockTips: Tip[] = [
  {
    id: "1",
    category: "clothing",
    icon: <Shirt className="h-4 w-4" />,
    title: "Ropa ligera recomendada",
    description: "Con 26°C, es ideal usar ropa de algodón y colores claros para mantenerte fresco.",
    priority: "medium",
    actionable: true
  },
  {
    id: "2", 
    category: "outdoor",
    icon: <Umbrella className="h-4 w-4" />,
    title: "Posible lluvia vespertina",
    description: "70% de probabilidad de lluvia después de las 18:00. Lleva paraguas si sales.",
    priority: "high",
    actionable: true
  },
  {
    id: "3",
    category: "health",
    icon: <Activity className="h-4 w-4" />,
    title: "Nivel UV alto",
    description: "Índice UV de 8. Usa protector solar y evita exposición directa entre 12-16h.",
    priority: "high",
    actionable: true
  },
  {
    id: "4",
    category: "transport",
    icon: <Car className="h-4 w-4" />,
    title: "Buena visibilidad",
    description: "Visibilidad excelente (20km). Condiciones óptimas para conducir.",
    priority: "low",
    actionable: false
  },
  {
    id: "5",
    category: "home",
    icon: <Home className="h-4 w-4" />,
    title: "Ventilación recomendada",
    description: "Humedad del 55%. Buen momento para ventilar la casa y renovar el aire.",
    priority: "medium",
    actionable: true
  }
];

const categoryConfig = {
  clothing: { 
    label: "Vestimenta", 
    color: "bg-accent/10 text-accent-foreground border-accent/20" 
  },
  transport: { 
    label: "Transporte", 
    color: "bg-primary/10 text-primary border-primary/20" 
  },
  health: { 
    label: "Salud", 
    color: "bg-success/10 text-success border-success/20" 
  },
  home: { 
    label: "Hogar", 
    color: "bg-warning/10 text-warning-foreground border-warning/20" 
  },
  outdoor: { 
    label: "Exterior", 
    color: "bg-muted/20 text-muted-foreground border-muted" 
  }
};

const priorityConfig = {
  low: { color: "bg-muted text-muted-foreground", label: "Info" },
  medium: { color: "bg-warning/20 text-warning-foreground", label: "Atención" },
  high: { color: "bg-destructive/20 text-destructive-foreground", label: "Importante" }
};

export function WeatherTips() {
  return (
    <Card className="bg-gradient-card border-muted shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Consejos y Recomendaciones
          </CardTitle>
          <Button variant="outline" size="sm" className="bg-background/50">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Recomendaciones personalizadas basadas en las condiciones actuales
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTips.map((tip, index) => (
          <div
            key={tip.id}
            className={cn(
              "p-4 rounded-lg border transition-all duration-300 hover:shadow-md animate-fade-in",
              "bg-background/50 backdrop-blur-sm border-muted"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                categoryConfig[tip.category].color
              )}>
                {tip.icon}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{tip.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", categoryConfig[tip.category].color)}
                    >
                      {categoryConfig[tip.category].label}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={cn("text-xs", priorityConfig[tip.priority].color)}
                    >
                      {priorityConfig[tip.priority].label}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.description}
                </p>
                
                {tip.actionable && (
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary-foreground hover:bg-primary/10"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Más información
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex items-center justify-center pt-4 border-t border-muted">
          <Button variant="outline" className="bg-background/50">
            Ver todos los consejos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}