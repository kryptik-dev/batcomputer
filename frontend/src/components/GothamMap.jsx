import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, MapPin, AlertTriangle, Eye, Navigation } from 'lucide-react';

const GothamMap = () => {
  const locations = [
    { id: 1, name: 'Arkham Asylum', x: 20, y: 30, status: 'ALERT', threat: 'HIGH', type: 'facility' },
    { id: 2, name: 'Amusement Mile', x: 35, y: 20, status: 'ACTIVE', threat: 'EXTREME', type: 'district' },
    { id: 3, name: 'Iceberg Lounge', x: 50, y: 45, status: 'MONITORED', threat: 'MEDIUM', type: 'business' },
    { id: 4, name: 'Gotham Harbor', x: 70, y: 35, status: 'ALERT', threat: 'MEDIUM', type: 'industrial' },
    { id: 5, name: 'Robinson Park', x: 45, y: 60, status: 'ALERT', threat: 'HIGH', type: 'park' },
    { id: 6, name: 'GCPD HQ', x: 55, y: 50, status: 'SECURE', threat: 'LOW', type: 'facility' },
    { id: 7, name: 'Wayne Tower', x: 60, y: 55, status: 'SECURE', threat: 'LOW', type: 'business' },
    { id: 8, name: 'Crime Alley', x: 40, y: 70, status: 'ACTIVE', threat: 'HIGH', type: 'district' },
    { id: 9, name: 'Blackgate Prison', x: 85, y: 25, status: 'ALERT', threat: 'HIGH', type: 'facility' },
    { id: 10, name: 'Old Gotham', x: 30, y: 55, status: 'ACTIVE', threat: 'MEDIUM', type: 'district' },
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ALERT':
        return 'bg-destructive';
      case 'ACTIVE':
        return 'bg-warning';
      case 'MONITORED':
        return 'bg-primary';
      case 'SECURE':
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  const getThreatColor = (threat) => {
    switch (threat) {
      case 'EXTREME':
        return 'text-destructive';
      case 'HIGH':
        return 'text-warning';
      case 'MEDIUM':
        return 'text-primary';
      case 'LOW':
        return 'text-success';
      default:
        return 'text-muted';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Map className="h-6 w-6" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} />
            <span className="font-black tracking-wider">GOTHAM CITY MAP</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground font-mono mt-2">REAL-TIME SURVEILLANCE NETWORK</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-2 border-primary/30 relative overflow-hidden">
          <CardContent className="p-6">
            <div className="relative w-full aspect-video bg-background/80 rounded-lg border-2 border-primary/50 overflow-hidden">
              {/* Grid Background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Gotham City Outline */}
              <div className="absolute inset-4 border border-primary/30 rounded-lg">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-primary font-bold font-mono px-2 py-1 bg-background/80 rounded-b">
                  NORTH
                </div>
              </div>

              {/* Location Markers */}
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  {/* Pulse Animation */}
                  <div className={`absolute inset-0 ${getStatusColor(location.status)} rounded-full animate-ping opacity-75`} />
                  
                  {/* Marker */}
                  <div className={`relative w-4 h-4 ${getStatusColor(location.status)} rounded-full border-2 border-background shadow-lg`}
                    style={{ boxShadow: `0 0 20px currentColor` }}
                  >
                    <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-background" />
                  </div>

                  {/* Label */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <div className="bg-background/95 border border-primary/50 px-2 py-1 rounded text-xs font-bold text-foreground">
                      {location.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-background/90 border border-primary/50 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-xs font-bold text-muted-foreground mb-2">STATUS:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-destructive rounded-full" />
                    <span className="text-foreground">ALERT</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-warning rounded-full" />
                    <span className="text-foreground">ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <span className="text-foreground">MONITORED</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-success rounded-full" />
                    <span className="text-foreground">SECURE</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-primary">LOCATION DETAILS</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLocation ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-foreground mb-2">{selectedLocation.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={`${getStatusColor(selectedLocation.status)} text-xs px-2 py-1 font-bold`}>
                      {selectedLocation.status}
                    </Badge>
                    <Badge className="bg-muted text-muted-foreground text-xs px-2 py-1 font-mono">
                      {selectedLocation.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-bold">THREAT LEVEL:</span>
                    <span className={`text-sm font-black ${getThreatColor(selectedLocation.threat)}`}>
                      {selectedLocation.threat}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-bold">COORDINATES:</span>
                    <span className="text-xs font-mono text-primary">
                      {selectedLocation.x.toFixed(1)}, {selectedLocation.y.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-bold">AVAILABLE ACTIONS:</p>
                  <button className="w-full px-3 py-2 bg-primary/20 border border-primary/50 rounded text-xs font-bold text-primary hover:bg-primary/30 transition-colors flex items-center justify-center gap-2">
                    <Eye className="h-3 w-3" />
                    VIEW SURVEILLANCE
                  </button>
                  <button className="w-full px-3 py-2 bg-primary/20 border border-primary/50 rounded text-xs font-bold text-primary hover:bg-primary/30 transition-colors flex items-center justify-center gap-2">
                    <Navigation className="h-3 w-3" />
                    DISPATCH UNITS
                  </button>
                  <button className="w-full px-3 py-2 bg-primary/20 border border-primary/50 rounded text-xs font-bold text-primary hover:bg-primary/30 transition-colors flex items-center justify-center gap-2">
                    <AlertTriangle className="h-3 w-3" />
                    SET ALERT
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">Select a location on the map</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GothamMap;