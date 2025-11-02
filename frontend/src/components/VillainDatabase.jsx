import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, AlertTriangle, Skull, User } from 'lucide-react';

const VillainDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const villains = [
    {
      id: 1,
      name: 'The Joker',
      alias: 'Clown Prince of Crime',
      threat: 'EXTREME',
      status: 'AT LARGE',
      lastSeen: 'Amusement Mile',
      crimes: ['Mass Murder', 'Terrorism', 'Chemical Warfare'],
      description: 'Psychopathic criminal mastermind. Obsessed with Batman. Highly unpredictable and extremely dangerous.',
    },
    {
      id: 2,
      name: 'The Riddler',
      alias: 'Edward Nigma',
      threat: 'HIGH',
      status: 'ACTIVE',
      lastSeen: 'Financial District',
      crimes: ['Extortion', 'Murder', 'Terrorism'],
      description: 'Genius-level intellect. Compulsion to leave puzzles and riddles at crime scenes.',
    },
    {
      id: 3,
      name: 'Two-Face',
      alias: 'Harvey Dent',
      threat: 'HIGH',
      status: 'ESCAPED',
      lastSeen: 'Old Gotham',
      crimes: ['Armed Robbery', 'Murder', 'Organized Crime'],
      description: 'Former District Attorney. Split personality disorder. All decisions made by coin flip.',
    },
    {
      id: 4,
      name: 'Penguin',
      alias: 'Oswald Cobblepot',
      threat: 'MEDIUM',
      status: 'MONITORED',
      lastSeen: 'Iceberg Lounge',
      crimes: ['Racketeering', 'Arms Dealing', 'Murder'],
      description: 'Crime lord controlling much of Gotham\'s underworld. Operates from the Iceberg Lounge.',
    },
    {
      id: 5,
      name: 'Scarecrow',
      alias: 'Jonathan Crane',
      threat: 'EXTREME',
      status: 'ACTIVE',
      lastSeen: 'Arkham Asylum',
      crimes: ['Chemical Terrorism', 'Mass Poisoning', 'Murder'],
      description: 'Master of fear. Uses custom fear toxin to terrorize victims. Former psychiatrist.',
    },
    {
      id: 6,
      name: 'Poison Ivy',
      alias: 'Pamela Isley',
      threat: 'HIGH',
      status: 'ACTIVE',
      lastSeen: 'Robinson Park',
      crimes: ['Eco-terrorism', 'Murder', 'Mind Control'],
      description: 'Plant-human hybrid with control over plant life. Immune to toxins. Environmental extremist.',
    },
    {
      id: 7,
      name: 'Mr. Freeze',
      alias: 'Victor Fries',
      threat: 'HIGH',
      status: 'AT LARGE',
      lastSeen: 'GothCorp Labs',
      crimes: ['Theft', 'Assault', 'Terrorism'],
      description: 'Cryogenics expert. Must remain in sub-zero temperatures. Searching for cure for wife Nora.',
    },
    {
      id: 8,
      name: 'Bane',
      alias: 'Unknown',
      threat: 'EXTREME',
      status: 'ACTIVE',
      lastSeen: 'Blackgate Prison',
      crimes: ['Murder', 'Terrorism', 'Drug Trafficking'],
      description: 'Enhanced strength via Venom serum. Tactical genius. One of few to break Batman physically.',
    },
    {
      id: 9,
      name: 'Harley Quinn',
      alias: 'Harleen Quinzel',
      threat: 'HIGH',
      status: 'ESCAPED',
      lastSeen: 'Crime Alley',
      crimes: ['Murder', 'Assault', 'Terrorism'],
      description: 'Former psychiatrist. Obsessed with Joker. Highly skilled in combat. Unpredictable.',
    },
    {
      id: 10,
      name: 'Catwoman',
      alias: 'Selina Kyle',
      threat: 'LOW',
      status: 'MONITORED',
      lastSeen: 'Gotham Museum',
      crimes: ['Theft', 'Burglary'],
      description: 'Master thief. Expert acrobat and martial artist. Complicated relationship with Batman.',
    },
  ];

  const getThreatColor = (threat) => {
    switch (threat) {
      case 'EXTREME':
        return 'bg-destructive text-destructive-foreground';
      case 'HIGH':
        return 'bg-warning text-warning-foreground';
      case 'MEDIUM':
        return 'bg-primary/50 text-primary-foreground';
      case 'LOW':
        return 'bg-success/50 text-success-foreground';
      default:
        return 'bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AT LARGE':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'ESCAPED':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'ACTIVE':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'MONITORED':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'CONTAINED':
        return 'bg-success/20 text-success border-success/50';
      default:
        return 'bg-muted';
    }
  };

  const filteredVillains = villains.filter((villain) =>
    villain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    villain.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Skull className="h-6 w-6" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} />
            <span className="font-black tracking-wider">VILLAIN DATABASE</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground font-mono mt-2">ARKHAM ROGUES GALLERY // CLASSIFIED</p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search villains..."
              className="pl-10 bg-background border-primary/50 focus:border-primary font-mono"
            />
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-24rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredVillains.map((villain) => (
            <Card
              key={villain.id}
              className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                      {villain.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-mono mt-1">{villain.alias}</p>
                  </div>
                  <Badge className={`${getThreatColor(villain.threat)} font-bold px-3 py-1`}>
                    {villain.threat}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getStatusColor(villain.status)} font-bold text-xs px-2 py-1 border`}>
                    {villain.status}
                  </Badge>
                  <Badge className="bg-muted/50 text-muted-foreground font-mono text-xs px-2 py-1">
                    {villain.lastSeen}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-foreground leading-relaxed">{villain.description}</p>
                <div>
                  <p className="text-xs text-muted-foreground font-bold mb-2">KNOWN CRIMES:</p>
                  <div className="flex flex-wrap gap-1">
                    {villain.crimes.map((crime, index) => (
                      <Badge key={index} className="bg-destructive/20 text-destructive text-xs px-2 py-0.5 border border-destructive/50">
                        {crime}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default VillainDatabase;