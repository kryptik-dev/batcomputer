import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, X, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const OracleChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'oracle',
      content: 'Oracle mainframe online. How can I assist you tonight, Batman?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const oracleResponses = {
    joker: 'Joker was last spotted at Amusement Mile. Facial recognition suggests he\'s planning something at the old funhouse. Proceed with extreme caution.',
    riddler: 'The Riddler has left 3 new puzzles across Gotham. I\'ve analyzed the patterns - they all point to locations in the Financial District.',
    'two-face': 'Two-Face escaped GCPD custody 45 minutes ago. Tracking his movements via traffic cameras. Last known position: Old Gotham.',
    penguin: 'Penguin\'s operations are centered in the Iceberg Lounge. Intel suggests a major weapons shipment arriving at Gotham Harbor tonight.',
    scarecrow: 'Scarecrow\'s fear toxin was detected in the water supply. I\'ve already notified GCPD to shut down affected areas. Analyzing for antidote.',
    bane: 'Bane has been spotted near Blackgate Prison. His venom supply route has been traced to a warehouse in the Industrial District.',
    'poison ivy': 'Poison Ivy\'s pheromones detected in Robinson Park. Plant growth anomalies suggest she\'s establishing a new base of operations.',
    'mr. freeze': 'Mr. Freeze attacked GothCorp Labs 2 hours ago. He stole cryogenic equipment. Nora\'s condition may be deteriorating.',
    catwoman: 'Catwoman was seen at the Gotham Museum. No theft reported yet, but the Egyptian exhibit seems to be her target.',
    'harley quinn': 'Harley Quinn broke out of Arkham with Joker. She\'s armed and extremely dangerous. Last seen heading toward Crime Alley.',
    arkham: 'Arkham Asylum security systems are currently compromised. Multiple inmates have escaped. I\'m working on restoring the containment protocols.',
    gotham: 'Gotham City status: 47 active surveillance points, 3 high-priority threats, crime rate up 12% this week. GCPD is stretched thin.',
    batman: 'Your bio-metrics are stable. Suit integrity at 98%. You\'ve been active for 6 hours. I recommend a brief rest, but I know you won\'t listen.',
    alfred: 'Alfred is monitoring from Wayne Manor. He\'s concerned about your recent injury. Shall I connect you?',
    robin: 'Robin is currently on patrol in the Narrows. His tracker shows all vitals are normal. He\'s checking in every 15 minutes.',
    batmobile: 'The Batmobile is fully operational. All systems check out. ETA to your location: 3 minutes if needed.',
    gcpd: 'GCPD communications are secure. Commissioner Gordon has requested your assistance with the Arkham breakout.',
    'wayne enterprises': 'Wayne Enterprises systems are secure. Lucius Fox has been notified of tonight\'s activities. R&D has 2 new gadgets ready for testing.',
    help: 'I can provide information on: Gotham status, villain locations, case files, system diagnostics, GCPD updates, and tactical analysis. Just ask.',
    status: 'All systems operational. Batcave secure. Satellite uplink stable. Crime monitoring active. Arkham surveillance online.',
  };

  const getOracleResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(oracleResponses)) {
      if (input.includes(key)) {
        return response;
      }
    }
    
    const greetings = ['hello', 'hi', 'hey', 'greetings'];
    if (greetings.some(greeting => input.includes(greeting))) {
      return 'Hello, Batman. Oracle systems are at your disposal. What do you need?';
    }
    
    const thanks = ['thank', 'thanks'];
    if (thanks.some(word => input.includes(word))) {
      return 'Always here to help. Stay safe out there.';
    }
    
    return 'I\'m analyzing your query. Could you be more specific? Try asking about villains, Gotham status, or current threats.';
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getOracleResponse(input);
      const oracleMessage = {
        role: 'oracle',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, oracleMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col bg-card/80 backdrop-blur-sm border-2 border-accent/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
      
      <CardHeader className="border-b border-accent/30 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-accent">
            <div className="relative">
              <Bot className="h-6 w-6" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--accent)))' }} />
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            <span className="font-black tracking-wider">ORACLE AI</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-accent hover:bg-accent/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground font-mono mt-2">SECURE CHANNEL // ENCRYPTED</p>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary/20 border border-primary/50 text-foreground'
                      : 'bg-accent/10 border border-accent/30 text-foreground'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{message.content}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <div className="p-4 border-t border-accent/30 flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your query..."
            className="flex-1 bg-background border-accent/50 focus:border-accent text-foreground font-mono"
          />
          <Button
            onClick={handleSend}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            style={{ boxShadow: '0 0 20px hsl(var(--accent) / 0.3)' }}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OracleChat;