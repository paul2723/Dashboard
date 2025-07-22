import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  name: string;
  country: string;
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const locations: Location[] = [
  {
    id: "madrid",
    name: "Madrid",
    country: "España",
    timezone: "Europe/Madrid",
    coordinates: { lat: 40.4168, lng: -3.7038 }
  },
  {
    id: "barcelona",
    name: "Barcelona", 
    country: "España",
    timezone: "Europe/Madrid",
    coordinates: { lat: 41.3851, lng: 2.1734 }
  },
  {
    id: "london",
    name: "Londres",
    country: "Reino Unido",
    timezone: "Europe/London",
    coordinates: { lat: 51.5074, lng: -0.1278 }
  },
  {
    id: "paris",
    name: "París",
    country: "Francia",
    timezone: "Europe/Paris",
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: "newyork",
    name: "Nueva York",
    country: "Estados Unidos",
    timezone: "America/New_York",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "tokyo",
    name: "Tokio",
    country: "Japón",
    timezone: "Asia/Tokyo",
    coordinates: { lat: 35.6762, lng: 139.6503 }
  }
];

interface LocationSelectorProps {
  onLocationChange: (location: Location) => void;
  selectedLocation?: Location;
}

export function LocationSelector({ onLocationChange, selectedLocation }: LocationSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Location>(
    selectedLocation || locations[0]
  );

  const handleSelect = (location: Location) => {
    setSelected(location);
    onLocationChange(location);
    setOpen(false);
  };

  const getCurrentTime = (timezone: string) => {
    return new Date().toLocaleTimeString('es-ES', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gradient-card border-muted shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Selector de Ubicación
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              📍 {selected.name}, {selected.country}
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {getCurrentTime(selected.timezone)}
            </Badge>
          </div>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {selected.name}, {selected.country}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-background/95 backdrop-blur-sm border-muted">
            <Command>
              <CommandInput placeholder="Buscar ubicación..." />
              <CommandList>
                <CommandEmpty>No se encontraron ubicaciones.</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location.id}
                      value={`${location.name} ${location.country}`}
                      onSelect={() => handleSelect(location)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selected.id === location.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {location.country} • {location.timezone}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getCurrentTime(location.timezone)}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">Coordenadas:</span><br />
            {selected.coordinates.lat.toFixed(4)}, {selected.coordinates.lng.toFixed(4)}
          </div>
          <div>
            <span className="font-medium">Zona Horaria:</span><br />
            {selected.timezone}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}