import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import OracleChat from '@/components/OracleChat';
import VillainDatabase from '@/components/VillainDatabase';
import CaseFiles from '@/components/CaseFiles';
import GothamMap from '@/components/GothamMap';
import SystemStatus from '@/components/SystemStatus';
import { Button } from '@/components/ui/button';
import { Database, FileText, Map, MessageSquare, LayoutDashboard, Activity } from 'lucide-react';

const BatComputer = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showOracle, setShowOracle] = useState(false);

  const views = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'villains', label: 'VILLAINS', icon: Database },
    { id: 'cases', label: 'CASE FILES', icon: FileText },
    { id: 'map', label: 'GOTHAM MAP', icon: Map },
    { id: 'status', label: 'SYSTEM', icon: Activity },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'villains':
        return <VillainDatabase />;
      case 'cases':
        return <CaseFiles />;
      case 'map':
        return <GothamMap />;
      case 'status':
        return <SystemStatus />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-[1920px] mx-auto">
        <Header />
        
        {/* Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 mb-6">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <Button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                variant={activeView === view.id ? 'default' : 'outline'}
                className={`relative overflow-hidden group ${
                  activeView === view.id
                    ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
                    : 'bg-card/50 text-foreground border-primary/30 hover:border-primary hover:bg-primary/10'
                } transition-all duration-300`}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span className="font-bold tracking-wider">{view.label}</span>
                {activeView === view.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-glow/20 to-transparent animate-pulse" />
                )}
              </Button>
            );
          })}
          
          <Button
            onClick={() => setShowOracle(!showOracle)}
            variant="outline"
            className={`ml-auto relative overflow-hidden ${
              showOracle
                ? 'bg-accent text-accent-foreground shadow-[0_0_20px_hsl(var(--accent)/0.5)]'
                : 'bg-card/50 text-foreground border-accent/30 hover:border-accent hover:bg-accent/10'
            } transition-all duration-300`}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="font-bold tracking-wider">ORACLE</span>
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={showOracle ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {renderView()}
          </div>
          
          {showOracle && (
            <div className="lg:col-span-1">
              <OracleChat onClose={() => setShowOracle(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatComputer;