import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Cpu, HardDrive, Wifi, Shield, Zap, Database, Server } from 'lucide-react';

const SystemStatus = () => {
  const systems = [
    { name: 'Batcave Mainframe', status: 'ONLINE', health: 98, icon: Server, color: 'text-success' },
    { name: 'Surveillance Network', status: 'ONLINE', health: 95, icon: Wifi, color: 'text-success' },
    { name: 'Oracle AI System', status: 'ONLINE', health: 100, icon: Cpu, color: 'text-success' },
    { name: 'Crime Database', status: 'ONLINE', health: 92, icon: Database, color: 'text-success' },
    { name: 'Security Protocols', status: 'ACTIVE', health: 97, icon: Shield, color: 'text-success' },
    { name: 'Power Grid', status: 'STABLE', health: 89, icon: Zap, color: 'text-warning' },
  ];

  const resources = [
    { name: 'CPU Usage', value: 45, max: 100, color: 'bg-primary' },
    { name: 'Memory Usage', value: 67, max: 100, color: 'bg-accent' },
    { name: 'Storage', value: 34, max: 100, color: 'bg-success' },
    { name: 'Network Bandwidth', value: 78, max: 100, color: 'bg-warning' },
  ];

  const connections = [
    { name: 'Wayne Tower', status: 'SECURE', latency: '12ms' },
    { name: 'GCPD Network', status: 'SECURE', latency: '8ms' },
    { name: 'Arkham Systems', status: 'MONITORING', latency: '24ms' },
    { name: 'Watchtower Satellite', status: 'SECURE', latency: '156ms' },
    { name: 'League Mainframe', status: 'SECURE', latency: '45ms' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ONLINE':
        return 'bg-success/20 text-success border-success/50';
      case 'ACTIVE':
        return 'bg-success/20 text-success border-success/50';
      case 'STABLE':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'MONITORING':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'SECURE':
        return 'bg-success/20 text-success border-success/50';
      default:
        return 'bg-muted';
    }
  };

  const getHealthColor = (health) => {
    if (health >= 95) return 'text-success';
    if (health >= 80) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-6 w-6" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} />
            <span className="font-black tracking-wider">SYSTEM STATUS</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground font-mono mt-2">BATCOMPUTER DIAGNOSTICS</p>
        </CardHeader>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((system, index) => {
          const Icon = system.icon;
          return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/20 rounded border border-primary/30">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{system.name}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(system.status)} text-xs px-2 py-1 border font-bold`}>
                    {system.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-bold">HEALTH:</span>
                    <span className={`text-sm font-black ${getHealthColor(system.health)}`}>{system.health}%</span>
                  </div>
                  <Progress value={system.health} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resource Usage */}
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-sm font-bold text-primary">RESOURCE USAGE</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{resource.name}</span>
                <span className="text-sm font-mono text-primary">{resource.value}%</span>
              </div>
              <Progress value={resource.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Network Connections */}
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-sm font-bold text-primary">NETWORK CONNECTIONS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {connections.map((connection, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background/50 border border-primary/20 rounded hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-foreground">{connection.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">{connection.latency}</span>
                  <Badge className={`${getStatusColor(connection.status)} text-xs px-2 py-1 border font-bold`}>
                    {connection.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatus;