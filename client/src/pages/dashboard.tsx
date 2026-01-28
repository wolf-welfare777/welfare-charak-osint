import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Globe, Wifi, Activity, Map as MapIcon, Lock, 
  Cpu, ScanLine, Crosshair, Radio, Share2, MessageSquare, 
  QrCode, X, Send, FileText, Download, Key, Zap, Search, User, CreditCard
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// --- HUD CARD COMPONENT (ORIGINAL DESIGN) ---
const HudCard = ({ children, className = "", title = "" }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={`relative bg-card/60 backdrop-blur-md border border-primary/30 p-1 group overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/60" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/60" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/60" />
    {title && (
      <div className="flex items-center justify-between mb-2 px-3 py-1.5 bg-primary/20 border-b border-primary/40">
        <h3 className="font-hud text-[10px] md:text-xs tracking-[0.3em] text-primary uppercase font-bold flex items-center gap-2">
          <Activity className="w-3 h-3" /> {title}
        </h3>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
          <div className="w-4 h-1 bg-primary/20" />
        </div>
      </div>
    )}
    <div className="p-2 h-full relative z-10">
      {children}
    </div>
  </div>
);

// --- C4AR4K-X NUMBER OSINT TERMINAL ---
const NumberOsintTerminal = () => {
  const [logs, setLogs] = useState<string[]>(["[C4AR4K-X]: NEURAL INTERFACE ONLINE.", "[C4AR4K-X]: WAITING FOR TARGET..."]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const handleTrace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    const target = input.trim();
    setInput("");
    
    setLogs(prev => [...prev, `> c4ar4kx-trace --target ${target}`]);
    
    const hackLogs = [
      "Accessing C4AR4K-X Satellite Network...",
      "Querying Local Database Nodes...",
      "Neural Node Injection Successful...",
      "Bypassing Security Layers..."
    ];

    for (const log of hackLogs) {
      await new Promise(r => setTimeout(r, 600));
      setLogs(prev => [...prev, `[SYSTEM]: ${log}`]);
    }
    
    // MASKING LOGIC: Ashutosh Dubey -> Ash**sh Du*y
    setLogs(prev => [...prev, 
      "[SUCCESS]: TARGET DATA FETCHED",
      "NAME: Ash***sh Du**y",
      "DOB: **/**/200*",
      "STATE: Mad*** Pra****",
      "[!]: DATA ENCRYPTED. UNLOCK FOR FULL VIEW."
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border border-primary/20 p-2 font-mono text-[10px]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-hide">
        {logs.map((log, i) => (
          <div key={i} className={log.startsWith('>') ? 'text-accent' : 'text-primary'}>
            <span>{log}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleTrace} className="flex gap-2 border-t border-primary/20 pt-2">
        <span className="text-primary">$</span>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER NUMBER (C4AR4K-X MODE)..."
          className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-primary/20 caret-primary"
        />
        <button type="submit" className="text-accent hover:text-primary transition-colors font-bold flex items-center gap-1">
          <Zap className="w-3 h-3" /> TRACE
        </button>
      </form>
    </div>
  );
};

const AllianceMember = ({ name, imgUrl, role, link }: { name: string, imgUrl: string, role: string, link: string }) => (
  <a 
    href={link} target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-3 p-2 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all group mb-1 no-underline"
  >
    <img src={imgUrl} alt={name} className="w-10 h-10 object-cover rounded-full filter grayscale group-hover:grayscale-0" />
    <div className="flex flex-col">
      <span className="font-orbitron text-[10px] text-primary">{name}</span>
      <span className="text-[8px] text-primary/50 uppercase">{role}</span>
    </div>
  </a>
);

// --- MAIN DASHBOARD EXPORT ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("threat-map");
  const [time, setTime] = useState(new Date());
  const [showPortal, setShowPortal] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // VOICE ACTIVATION FUNCTION
 const activateC4ar4kx = () => {
  // Spelling 'Oh Sint' karne se wo usey 'OSINT' ki tarah professional bolega
  const utterance = new SpeechSynthesisUtterance("Charak X. Oh-Sint system. activated");
  
  utterance.pitch = 0.35; // Isse awaz ekdum deep aur "Dark Portal" jaisi aayegi
  utterance.rate = 0.75;  // Thoda gap dekar bolne se impact badhta hai
  utterance.volume = 1;
  
  window.speechSynthesis.speak(utterance);
  setShowPortal(true);
};

  return (
    <div className="min-h-screen bg-black text-primary font-mono p-2 md:p-4 flex flex-col gap-4 overflow-hidden relative">
      
      {/* --- C4AR4K-X MAIN MODAL --- */}
      <AnimatePresence>
        {showPortal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-4 flex items-center justify-center"
          >
            <HudCard title="C4AR4K-X ADVANCED OSINT INTERFACE" className="w-full max-w-5xl h-[85vh] flex flex-col relative border-2 border-primary/50">
              <Button 
                onClick={() => setShowPortal(false)}
                className="absolute top-2 right-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white p-1 h-8 w-8 rounded-none border border-red-500/50"
              >
                <X />
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 flex-1 overflow-hidden">
                {/* Navigation Buttons */}
                <div className="col-span-1 flex flex-col gap-2 overflow-y-auto pr-2 border-r border-primary/20">
                  <Button className="justify-start gap-2 bg-primary/20 text-[9px] border-primary/40"><Search className="w-4 h-4"/> NUMBER OSINT</Button>
                  <Button disabled className="justify-start gap-2 opacity-30 text-[9px]"><CreditCard className="w-4 h-4"/> UPI OSINT</Button>
                  <Button disabled className="justify-start gap-2 opacity-30 text-[9px]"><Send className="w-4 h-4"/> EMAIL OSINT</Button>
                  <Button disabled className="justify-start gap-2 opacity-30 text-[9px]"><User className="w-4 h-4"/> USERNAME OSINT</Button>
                  <Button disabled className="justify-start gap-2 opacity-30 text-[9px]"><Globe className="w-4 h-4"/> IP & DOMAIN</Button>
                  <Button disabled className="justify-start gap-2 opacity-30 text-[9px]"><Shield className="w-4 h-4"/> COMPANY OSINT</Button>
                </div>

                {/* Central Terminal Area */}
                <div className="col-span-2 flex flex-col gap-2 h-full">
                   <div className="bg-primary/5 border border-primary/20 p-2 h-full flex flex-col overflow-hidden">
                      <div className="text-[9px] text-accent mb-1 animate-pulse tracking-widest"> RUNNING MODULE: C4AR4K-X_ALPHA_V1</div>
                      <NumberOsintTerminal />
                   </div>
                </div>

                {/* Paywall & Status Area */}
                <div className="col-span-1 flex flex-col gap-4">
                  <div className="border border-yellow-500/40 bg-yellow-500/5 p-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1"><Lock className="w-3 h-3 text-yellow-500"/></div>
                    <h4 className="text-[10px] font-bold text-yellow-500 mb-1">DATA ENCRYPTION</h4>
                    <p className="text-[8px] opacity-70 mb-4">Neural key required for unmasked data access.</p>
                    <Button onClick={() => setShowQR(true)} className="w-full bg-yellow-500 text-black font-bold h-10 text-[10px] hover:bg-yellow-400 box-glow">UNLOCK FULL DATA</Button>
                  </div>
                  
                  <div className="mt-auto border border-primary/20 p-2 bg-primary/5">
                    <div className="text-[8px] opacity-50 uppercase mb-1">Neural Logs</div>
                    <div className="text-[7px] text-primary/80 uppercase">C4-Node: Secured</div>
                    <div className="text-[7px] text-primary/80 uppercase">Satellite: Connected</div>
                    <div className="text-[7px] text-primary/80 uppercase">Admin: Verified</div>
                  </div>
                </div>
              </div>
            </HudCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PAYMENT QR MODAL --- */}
<AnimatePresence>
  {showQR && (
    <motion.div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4">
       <HudCard title="SECURE PAYMENT GATEWAY" className="max-w-md w-full border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.3)]">
          <div className="p-6 flex flex-col items-center gap-6">
             <div className="bg-black p-2 border-2 border-primary/40 shadow-[0_0_25px_rgba(0,255,0,0.3)]">
                {/* w-80 karne se QR bada dikhega */}
                <img 
                  src="https://i.ibb.co/gLyvLX6F/Account-QRCode-Bank-Of-Baroda-9546-DARK-THEME.png" 
                  className="w-80 h-auto object-contain" 
                  alt="QR Code" 
                />
             </div>
             <div className="text-center">
               <div className="text-lg font-bold text-yellow-500 tracking-widest animate-pulse">PRICE: ₹99 / KEY</div>
               <div className="text-[9px] opacity-70 mt-2 uppercase tracking-tighter">Scan QR & Send Screenshot to Admin</div>
             </div>
             <Button onClick={() => setShowQR(false)} className="w-full bg-red-600/20 h-10 border border-red-500/50 text-[10px]">CLOSE</Button>
          </div>
       </HudCard>
    </motion.div>
  )}
</AnimatePresence>

      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} 
      />

      <header className="relative z-10 flex flex-col md:flex-row items-center justify-between border-b-2 border-primary/30 bg-black/80 backdrop-blur-md p-4">
        <div className="flex items-center gap-4">
          <img src="https://i.ibb.co/dwqsKQJb/IMG-20260127-WA0026.jpg" className="w-16 h-16 rounded-full border-2 border-primary/50 shadow-[0_0_20px_rgba(0,255,0,0.3)]" alt="Logo" />
          <div>
            <h1 className="text-3xl font-orbitron font-black text-glow">WELFARE OSINT</h1>
            <div className="text-[10px] tracking-[0.4em] opacity-70">BRAIN-SYNC_STATUS::CONNECTED</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold tracking-widest">{time.toLocaleTimeString()}</div>
          <div className="text-[10px] text-accent tracking-[0.2em]">{time.toDateString().toUpperCase()}</div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 relative z-10 overflow-hidden">
        <aside className="lg:col-span-3 flex flex-col gap-4">
          <HudCard title="ALLIANCE NETWORK" className="flex-1">
            <AllianceMember name="FIA GOVERNMENT" role="Intelligence" imgUrl="https://i.ibb.co/q3KnL66F/IMG-20260126-144754-437.jpg" link="https://t.me/FIAgoverment" />
            <AllianceMember name="HEXAFORCE" role="Task Force" imgUrl="https://i.ibb.co/Cs3tHpKm/IMG-20260126-145005-208.jpg" link="https://x.com/team_hexaforce" />
            <AllianceMember name="NWH SECURITY" role="Defense" imgUrl="https://i.ibb.co/gLWtRf99/NWH-Security-wert1w.jpg" link="https://x.com/team_nwh" />
            <AllianceMember name="7PROXIS | NH" role="Proxies" imgUrl="https://i.ibb.co/hJbJG4nj/IMG-20260126-152024-175.jpg" link="https://x.com/The__NH" />
          </HudCard>
          <HudCard title="NEURAL PROTOCOLS">
            <div className="grid grid-cols-2 gap-2">
              <Button className="bg-primary/10 text-primary border border-primary/30 text-[9px] h-8 hover:bg-primary hover:text-black transition-colors">SYNC</Button>
              <Button className="bg-primary/10 text-primary border border-primary/30 text-[9px] h-8 hover:bg-primary hover:text-black transition-colors">PURGE</Button>
              <Button className="bg-primary/10 text-primary border border-primary/30 text-[9px] h-8 col-span-2 hover:bg-primary hover:text-black transition-colors flex gap-2">
                <Zap className="w-3 h-3" /> NEURAL OVERLOAD
              </Button>
            </div>
          </HudCard>
        </aside>

        <section className="lg:col-span-6 flex flex-col gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-black/80 border border-primary/30 p-1 mb-2 gap-1 h-auto rounded-none overflow-x-auto flex-nowrap scrollbar-hide">
              {[{ id: 'threat-map', label: 'CYBER', icon: Shield }, { id: 'flight-radar', label: 'AIRSPACE', icon: MapIcon }, { id: 'marine-traffic', label: 'SEA-TRAFFIC', icon: Wifi }, { id: 'zoom-earth', label: 'NEURALINK', icon: Globe }].map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-primary data-[state=active]:text-black text-primary font-orbitron rounded-none border border-transparent data-[state=active]:border-primary/50 px-3 py-2 uppercase tracking-tighter text-[10px] min-w-[100px]">
                  <tab.icon className="w-3 h-3 mr-1" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <HudCard className="flex-1 p-0 overflow-hidden min-h-[400px] border-2 border-primary/40 box-glow relative">
              <TabsContent value="threat-map" className="h-full w-full m-0 p-0 relative"><iframe src="https://cybermap.kaspersky.com/en/widget/dynamic/dark" className="w-full h-full border-none filter contrast-125" /></TabsContent>
              <TabsContent value="flight-radar" className="h-full w-full m-0 p-0 relative"><iframe src="https://www.flightradar24.com/simple_index.php?lat=22.7&lon=75.8&z=6" className="w-full h-full border-none filter invert hue-rotate-180 brightness-75 contrast-125 grayscale-[30%]" /></TabsContent>
              <TabsContent value="marine-traffic" className="h-full w-full m-0 p-0 relative"><iframe src="https://www.marinetraffic.com/en/ais/embed/zoom:5/centery:20/centerx:70/maptype:1/shownames:false/mmsi:0/shipid:0/fleet:/fleet_id:/vtypes:/show_trace:false/reported_days:1/show_port:false/show_all_ships:true/border:0/display_control:true/playback:false/geometry:false" className="w-full h-full border-none filter invert brightness-90 contrast-110" /></TabsContent>
              <TabsContent value="zoom-earth" className="h-full w-full m-0 p-0 relative overflow-hidden"><iframe src="https://zoom.earth/#view=22.7,75.8,5z/map=live" className="w-full h-full border-none filter grayscale-[20%] contrast-150" /></TabsContent>
            </HudCard>
          </Tabs>
          <HudCard title="NEURAL INTERFACE TERMINAL" className="h-64"><NumberOsintTerminal /></HudCard>
        </section>

        <aside className="lg:col-span-3 flex flex-col gap-4">
          <HudCard title="NEURAL FEED" className="flex-1">
             <div className="space-y-2 text-[10px]">
               {[1,2,3,4,5,6,7].map(i => (
                 <div key={i} className="border-l-2 border-primary/30 pl-2 py-1 bg-primary/5 hover:bg-primary/10 transition-colors relative group">
                   <div className="text-accent font-bold flex items-center gap-1"><Zap className="w-2 h-2" /> SYNAPSE_0x{Math.random().toString(16).substr(2,4).toUpperCase()}</div>
                   <div className="opacity-70 text-[9px]">BRAIN-WAVE_SYNC_ACTIVE</div>
                   <div className="absolute right-2 top-1 text-[8px] text-primary/40 group-hover:text-primary transition-colors uppercase">Active</div>
                 </div>
               ))}
             </div>
          </HudCard>
          
          {/* --- C4AR4K-X ACTIVATION BUTTON --- */}
          <HudCard title="SYSTEM UPGRADE">
            <Button 
              onClick={activateC4ar4kx}
              className="w-full bg-primary text-black font-orbitron font-bold box-glow h-12 hover:scale-[1.05] transition-transform animate-pulse text-[11px]"
            >
              C4AR4K-X OSINT
            </Button>
          </HudCard>
        </aside>
      </main>

      <footer className="h-8 bg-black/80 border-t border-primary/30 flex items-center overflow-hidden">
        <div className="whitespace-nowrap animate-marquee text-[10px] opacity-60 px-4">
          SYSTEM_NEWS_FEED :: C4AR4K-X_SYSTEM_LIVE :: ALLIANCE_CHANNELS_SYNCED :: BRAIN-SYNC_OPERATIONAL :: MARITIME_FIREWALL_BYPASSED :: DATABASE_ENCRYPTED ::
        </div>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .box-glow { box-shadow: 0 0 15px rgba(0, 255, 0, 0.4); }
        .text-glow { text-shadow: 0 0 10px rgba(0, 255, 0, 0.6); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
