import { AlertTriangle } from "lucide-react";

interface DisasterZone {
  id: string;
  name: string;
  severity: "critical" | "high" | "moderate";
  lat: number;
  lng: number;
  affected: number;
}

interface DisasterMapProps {
  zones: DisasterZone[];
  onZoneClick?: (zone: DisasterZone) => void;
}

const DisasterMap = ({ zones, onZoneClick }: DisasterMapProps) => {
  const getSeverityColor = (severity: DisasterZone["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-emergency";
      case "high":
        return "bg-warning";
      case "moderate":
        return "bg-primary";
    }
  };

  const getSeverityRing = (severity: DisasterZone["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-emergency/30";
      case "high":
        return "bg-warning/30";
      case "moderate":
        return "bg-primary/30";
    }
  };

  return (
    <div className="relative bg-card rounded-xl shadow-card overflow-hidden border border-border">
      {/* Map header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-emergency" />
          <h2 className="font-semibold text-card-foreground">Disaster Zones</h2>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emergency" />
            <span className="text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Moderate</span>
          </div>
        </div>
      </div>

      {/* Stylized map area */}
      <div className="relative h-[400px] bg-gradient-to-br from-primary/5 via-background to-primary/10">
        {/* Grid lines for map effect */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Disaster zone markers */}
        {zones.map((zone, index) => {
          // Position zones across the map
          const positions = [
            { top: "20%", left: "25%" },
            { top: "40%", left: "60%" },
            { top: "65%", left: "35%" },
            { top: "30%", left: "75%" },
            { top: "55%", left: "15%" },
          ];
          const pos = positions[index % positions.length];

          return (
            <div
              key={zone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: pos.top, left: pos.left }}
              onClick={() => onZoneClick?.(zone)}
            >
              {/* Pulse ring for critical zones */}
              {zone.severity === "critical" && (
                <div className={`absolute inset-0 rounded-full ${getSeverityRing(zone.severity)} animate-pulse-ring`} />
              )}
              
              {/* Marker */}
              <div className={`relative z-10 w-8 h-8 rounded-full ${getSeverityColor(zone.severity)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <AlertTriangle className="h-4 w-4 text-emergency-foreground" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-card text-card-foreground px-3 py-2 rounded-lg shadow-elevated text-sm whitespace-nowrap border border-border">
                  <p className="font-semibold">{zone.name}</p>
                  <p className="text-muted-foreground text-xs">{zone.affected.toLocaleString()} affected</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map overlay text */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
          <p className="text-xs text-muted-foreground">Live disaster monitoring</p>
          <p className="text-sm font-medium text-card-foreground">{zones.length} active zones</p>
        </div>
      </div>
    </div>
  );
};

export default DisasterMap;
