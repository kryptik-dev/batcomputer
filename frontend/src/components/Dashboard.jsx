import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Activity, Eye, Zap, TrendingUp, TrendingDown, Users, MapPin } from 'lucide-react';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, priority: 'HIGH', location: 'Arkham Asylum', threat: 'Security Breach Detected', time: '2 min ago', status: 'active' },
    { id: 2, priority: 'MEDIUM', location: 'Gotham Harbor', threat: 'Suspicious Activity', time: '15 min ago', status: 'monitoring' },
    { id: 3, priority: 'LOW', location: 'Wayne Tower', threat: 'System Anomaly', time: '1 hour ago', status: 'resolved' },
  ]);

  const stats = [
    { label: 'Active Threats', value: '3', change: '+2', icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Monitored Locations', value: '47', change: '+5', icon: MapPin, color: 'text-primary' },
    { label: 'System Integrity', value: '98%', change: '+0.5%', icon: Activity, color: 'text-success' },
    { label: 'Active Surveillance', value: '124', change: '+12', icon: Eye, color: 'text-accent' },
  ];

  const recentActivity = [
    { time: '23:45', event: 'Joker sighting reported in Amusement Mile', status: 'investigating' },
    { time: '23:30', event: 'Riddler puzzle detected on city network', status: 'analyzing' },
    { time: '23:15', event: 'Two-Face escaped custody at GCPD', status: 'tracking' },
    { time: '23:00', event: 'Scarecrow toxin trace found in water supply', status: 'neutralized' },
    { time: '22:45', event: 'Penguin warehouse raid completed', status: 'completed' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-destructive text-destructive-foreground';
      case 'MEDIUM':
        return 'bg-warning text-warning-foreground';
      case 'LOW':
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'monitoring':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'resolved':
        return 'bg-success/20 text-success border-success/50';
      case 'investigating':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'analyzing':
        return 'bg-accent/20 text-accent border-accent/50';
      case 'tracking':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'neutralized':
        return 'bg-success/20 text-success border-success/50';
      case 'completed':
        return 'bg-muted-foreground/20 text-muted-foreground border-muted-foreground/50';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold tracking-wider mb-2">{stat.label.toUpperCase()}</p>
                    <p className="text-3xl font-black text-foreground">{stat.value}</p>
                    <p className={`text-xs font-bold mt-1 ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {stat.change} from last hour
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-card border-2 border-primary/30 ${stat.color}`}>
                    <Icon className="h-6 w-6" style={{ filter: `drop-shadow(0 0 8px currentColor)` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-destructive/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-destructive to-transparent animate-pulse" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-6 w-6 animate-pulse" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--destructive)))' }} />
            <span className="font-black tracking-wider">ACTIVE THREATS</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getPriorityColor(alert.priority)} font-bold text-xs px-2 py-1`}>
                    {alert.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-mono">{alert.time}</span>
                </div>
                <p className="font-bold text-foreground group-hover:text-primary transition-colors">{alert.threat}</p>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  <MapPin className="inline h-3 w-3 mr-1" />
                  {alert.location}
                </p>
              </div>
              <Badge className={`${getStatusColor(alert.status)} font-bold text-xs px-3 py-1 border uppercase`}>
                {alert.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-6 w-6" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} />
            <span className="font-black tracking-wider">RECENT ACTIVITY</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 bg-background/30 border-l-4 border-primary/50 hover:border-primary hover:bg-background/50 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="text-sm font-bold text-primary font-mono bg-primary/20 px-2 py-1 rounded">
                    {activity.time}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.event}</p>
                </div>
                <Badge className={`${getStatusColor(activity.status)} font-bold text-xs px-2 py-1 border uppercase flex-shrink-0`}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;