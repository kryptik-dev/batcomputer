import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const CaseFiles = () => {
  const cases = [
    {
      id: 'CASE-2024-001',
      title: 'Arkham Asylum Breakout',
      status: 'ACTIVE',
      priority: 'CRITICAL',
      opened: '2024-01-15',
      suspects: ['Joker', 'Harley Quinn', 'Scarecrow'],
      description: 'Mass breakout at Arkham Asylum. 15 inmates escaped including high-priority targets. Security systems were compromised from the inside.',
      evidence: ['Security footage', 'Guard testimonies', 'Explosive residue', 'Electronic signatures'],
      updates: [
        { time: '23:45', note: 'Joker sighting confirmed at Amusement Mile' },
        { time: '23:30', note: 'Harley Quinn spotted in Crime Alley' },
        { time: '23:00', note: 'Scarecrow fear toxin detected in city water supply' },
      ],
    },
    {
      id: 'CASE-2024-002',
      title: 'Riddler\'s Digital Siege',
      status: 'ACTIVE',
      priority: 'HIGH',
      opened: '2024-01-14',
      suspects: ['Riddler'],
      description: 'Riddler has taken control of Gotham\'s digital infrastructure. Puzzles placed throughout the city with deadly consequences for wrong answers.',
      evidence: ['Digital forensics', 'Puzzle locations', 'Victim statements', 'Code analysis'],
      updates: [
        { time: '22:30', note: 'Third puzzle solved, bomb defused at City Hall' },
        { time: '21:15', note: 'Pattern detected in puzzle placement' },
        { time: '20:00', note: 'Oracle analyzing encrypted messages' },
      ],
    },
    {
      id: 'CASE-2024-003',
      title: 'Penguin Weapons Trafficking',
      status: 'INVESTIGATING',
      priority: 'MEDIUM',
      opened: '2024-01-10',
      suspects: ['Penguin', 'Unknown Associates'],
      description: 'Large shipment of military-grade weapons traced to Iceberg Lounge. Penguin expanding criminal empire with new tech.',
      evidence: ['Shipping manifests', 'Financial records', 'Surveillance photos', 'Informant reports'],
      updates: [
        { time: '18:00', note: 'Warehouse raid completed, weapons seized' },
        { time: '12:00', note: 'Tracking shipment to Gotham Harbor' },
      ],
    },
    {
      id: 'CASE-2024-004',
      title: 'Mr. Freeze Heist',
      status: 'SOLVED',
      priority: 'HIGH',
      opened: '2024-01-08',
      suspects: ['Mr. Freeze'],
      description: 'GothCorp Labs broken into. Cryogenic equipment stolen. Freeze searching for cure for wife Nora.',
      evidence: ['Lab security footage', 'Cryo-signature analysis', 'Witness statements'],
      updates: [
        { time: '16:00', note: 'Freeze apprehended, equipment recovered' },
        { time: '14:30', note: 'Located Freeze hideout in abandoned warehouse' },
      ],
    },
    {
      id: 'CASE-2024-005',
      title: 'Poison Ivy Environmental Attack',
      status: 'MONITORING',
      priority: 'MEDIUM',
      opened: '2024-01-05',
      suspects: ['Poison Ivy'],
      description: 'Aggressive plant growth in Robinson Park. Ivy establishing new base. Civilians under mind control.',
      evidence: ['Plant samples', 'Toxicology reports', 'Aerial surveillance'],
      updates: [
        { time: '10:00', note: 'Antidote distributed to affected civilians' },
        { time: '08:00', note: 'Quarantine zone established' },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <AlertCircle className="h-4 w-4" />;
      case 'INVESTIGATING':
        return <Clock className="h-4 w-4" />;
      case 'SOLVED':
        return <CheckCircle className="h-4 w-4" />;
      case 'MONITORING':
        return <Clock className="h-4 w-4" />;
      case 'CLOSED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'INVESTIGATING':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'SOLVED':
        return 'bg-success/20 text-success border-success/50';
      case 'MONITORING':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'CLOSED':
        return 'bg-muted-foreground/20 text-muted-foreground border-muted-foreground/50';
      default:
        return 'bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL':
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

  const activeCases = cases.filter((c) => c.status === 'ACTIVE' || c.status === 'INVESTIGATING');
  const closedCases = cases.filter((c) => c.status === 'SOLVED' || c.status === 'CLOSED');

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <FileText className="h-6 w-6" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }} />
            <span className="font-black tracking-wider">CASE FILES</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground font-mono mt-2">ACTIVE INVESTIGATIONS // CLASSIFIED</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card/50 border-2 border-primary/30">
          <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            ACTIVE ({activeCases.length})
          </TabsTrigger>
          <TabsTrigger value="closed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            CLOSED ({closedCases.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <ScrollArea className="h-[calc(100vh-28rem)]">
            <div className="space-y-4">
              {activeCases.map((caseFile) => (
                <Card
                  key={caseFile.id}
                  className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-muted/50 text-muted-foreground font-mono text-xs px-2 py-1">
                            {caseFile.id}
                          </Badge>
                          <Badge className={`${getPriorityColor(caseFile.priority)} font-bold text-xs px-2 py-1`}>
                            {caseFile.priority}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                          {caseFile.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground font-mono mt-2">Opened: {caseFile.opened}</p>
                      </div>
                      <Badge className={`${getStatusColor(caseFile.status)} font-bold text-xs px-3 py-1 border flex items-center gap-1`}>
                        {getStatusIcon(caseFile.status)}
                        {caseFile.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground leading-relaxed">{caseFile.description}</p>

                    <div>
                      <p className="text-xs text-muted-foreground font-bold mb-2">SUSPECTS:</p>
                      <div className="flex flex-wrap gap-1">
                        {caseFile.suspects.map((suspect, index) => (
                          <Badge key={index} className="bg-destructive/20 text-destructive text-xs px-2 py-1 border border-destructive/50">
                            {suspect}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground font-bold mb-2">EVIDENCE:</p>
                      <div className="flex flex-wrap gap-1">
                        {caseFile.evidence.map((item, index) => (
                          <Badge key={index} className="bg-primary/20 text-primary text-xs px-2 py-1 border border-primary/50">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                      <p className="text-xs text-muted-foreground font-bold mb-2">RECENT UPDATES:</p>
                      <div className="space-y-2">
                        {caseFile.updates.map((update, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs">
                            <span className="text-primary font-bold font-mono flex-shrink-0">{update.time}</span>
                            <span className="text-foreground">{update.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="closed" className="mt-6">
          <ScrollArea className="h-[calc(100vh-28rem)]">
            <div className="space-y-4">
              {closedCases.map((caseFile) => (
                <Card
                  key={caseFile.id}
                  className="bg-card/50 backdrop-blur-sm border-2 border-success/30 hover:border-success/60 transition-all duration-300 opacity-75"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-muted/50 text-muted-foreground font-mono text-xs px-2 py-1">
                            {caseFile.id}
                          </Badge>
                          <Badge className={`${getPriorityColor(caseFile.priority)} font-bold text-xs px-2 py-1`}>
                            {caseFile.priority}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-black text-foreground">
                          {caseFile.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground font-mono mt-2">Opened: {caseFile.opened}</p>
                      </div>
                      <Badge className={`${getStatusColor(caseFile.status)} font-bold text-xs px-3 py-1 border flex items-center gap-1`}>
                        {getStatusIcon(caseFile.status)}
                        {caseFile.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground leading-relaxed">{caseFile.description}</p>

                    <div className="bg-background/50 rounded-lg p-3 border border-success/20">
                      <p className="text-xs text-muted-foreground font-bold mb-2">RESOLUTION:</p>
                      <div className="space-y-2">
                        {caseFile.updates.map((update, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs">
                            <span className="text-success font-bold font-mono flex-shrink-0">{update.time}</span>
                            <span className="text-foreground">{update.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseFiles;