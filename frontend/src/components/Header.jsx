import { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative">
      <div className="bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 relative overflow-hidden">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Shield className="h-12 w-12 text-primary" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }} />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-wider text-primary glitch">
                BAT COMPUTER
              </h1>
              <p className="text-sm text-muted-foreground font-mono tracking-widest">
                ARKHAM MAINFRAME // ACCESS GRANTED
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary font-mono tabular-nums">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 px-2 py-1 bg-success/20 border border-success/50 rounded">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success font-bold">SECURE</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/20 border border-primary/50 rounded">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary font-bold">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated underline */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      </div>
    </header>
  );
};

export default Header;