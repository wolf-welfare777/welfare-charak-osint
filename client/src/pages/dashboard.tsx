import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Activity, Map as MapIcon, Zap, Hash, CreditCard, User, Terminal as TerminalIcon 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

/* --- 1. ASLI WORKING TERMINAL COMPONENT (SANKI BOT SYNC) --- */
const CyberTerminal = ({ activeTab }: { activeTab: string }) => {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM]: NEURAL LINK READY...",
    "[C4AR4K-X]: STANDBY FOR TARGET..."
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll when logs change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const pushLogs = (newLines: string | string[]) => {
    setLogs(prev => prev.concat(Array.isArray(newLines) ? newLines : [newLines]));
  };

  const handleTrace = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = input.trim();
    if (!target || loading) return;

    // Append initialization lines (preserve history)
    pushLogs([
      `[C4AR4K-X]: INITIALIZING NEURAL BYPASS FOR ${target}...`,
      "[SYSTEM]: DECRYPTING DATA NODES..."
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: target }),
      });

      if (!res.ok) {
        // Try to read error body, fallback to statusText
        let errText = res.statusText || `HTTP ${res.status}`;
        try {
          const errJson = await res.json();
          if (errJson?.message) errText = errJson.message;
        } catch { /* ignore json parse */ }
        pushLogs(`⚠️ [ERROR]: ${errText}`);
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        pushLogs("⚠️ [ERROR]: FAILED_TO_PARSE_RESPONSE");
        return;
      }

      // Format and append result
      const report = typeof data.report === "string" ? data.report : JSON.stringify(data.report, null, 2);
      pushLogs(["[SUCCESS]: TARGET_DATA_DECRYPTED", "-----------------------", report]);
    } catch (err) {
      pushLogs(["⚠️ [FATAL]: CONNECTION INTERRUPTED", `${String(err)}`]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/60 font-mono">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-primary/20"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {logs.map((log, i) => (
          <div
            key={i}
            className="text-[17px] md:text-[19px] leading-relaxed text-[#00ff41] whitespace-pre-wrap border-l-2 border-primary/20 pl-4"
            style={{ textShadow: "0 0 10px rgba(0, 255, 65, 0.4)" }}
            aria-label={`log-${i}`}
          >
            {log}
          </div>
        ))}
      </div>

      <form onSubmit={handleTrace} className="p-2 border-t border-primary/20 flex bg-black/80" aria-busy={loading}>
        <span className="text-primary text-3xl px-4 font-black self-center">❯</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`ENTER ${activeTab.toUpperCase()}...`}
          className="flex-1 bg-transparent border-none outline-none text-primary text-2xl font-bold h-16 uppercase tracking-widest placeholder:opacity-10"
          aria-label={`Enter ${activeTab}`}
          disabled={loading}
        />
        <button
          type="submit"
          className="text-yellow-400 p-4 hover:scale-110 transition-transform"
          aria-label="Execute trace"
          disabled={loading}
          title={loading ? "Tracing..." : "Execute"}
        >
          <Zap className="w-10 h-10" />
        </button>
      </form>
    </div>
  );
};

/* --- 2. HUD CARD COMPONENT (FIXED) --- */
const HudCard = ({ children, className = "", title = "" }: { children: React.ReactNode; className?: string; title?: string }) => (
  <div className={`relative bg-black/40 border border-primary/20 p-1 overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/60" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/60" />
    {title && (
      <div className="mb-2 px-3 py-1 bg-primary/10 border-b border-primary/30 text-[10px] font-bold tracking-[0.3em] text-primary uppercase flex items-center gap-2">
        <Activity className="w-3 h-3" /> {title}
      </div>
    )}
    <div className="p-2 h-full relative z-10">{children}</div>
  </div>
);

/* --- 3. ALLIANCE MEMBER (CHANNEL LEAKS) --- */
const AllianceMember = ({ name, imgUrl, role, link }: { name: string; imgUrl: string; role: string; link: string }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-2 border border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all mb-1 no-underline"
  >
    <img
      src={imgUrl}
      alt={name}
      className="w-10 h-10 object-cover rounded-full filter grayscale hover:grayscale-0 border border-primary/20"
      loading="lazy"
    />
    <div className="flex flex-col">
      <span className="text-[10px] text-primary font-bold">{name}</span>
      <span className="text-[8px] text-primary/50 uppercase">{role}</span>
    </div>
  </a>
);

/* --- MAIN DASHBOARD --- */
export default function Dashboard() {
  const [showPortal, setShowPortal] = useState(false);
  const [modalTab, setModalTab] = useState("number");
  const [activeTab, setActiveTab] = useState("threat-map");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-primary font-mono p-2 md:p-4 flex flex-col gap-4 overflow-hidden relative">
      <AnimatePresence>
        {showPortal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl h-[85vh] bg-[#050505] border-2 border-primary/40 flex flex-col shadow-[0_0_50px_rgba(0,255,0,0.2)]">
              <div className="h-10 border-b border-primary/30 flex items-center justify-between px-4 bg-primary/10">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase flex items-center gap-2"><TerminalIcon className="w-4 h-4" /> C4AR4K-X NEURAL INTERFACE</span>
                <button onClick={() => setShowPortal(false)} className="text-red-500 font-bold hover:bg-red-500/20 px-2">[X] TERMINATE</button>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-20 md:w-60 border-r border-primary/20 bg-black/50 flex flex-col p-2 gap-2">
                  {[
                    { id: "number", icon: Hash, label: "NUMBER OSINT" },
                    { id: "upi", icon: CreditCard, label: "UPI OSINT" },
                    { id: "user", icon: User, label: "USER OSINT" }
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => setModalTab(btn.id)}
                      className={`flex flex-col md:flex-row items-center gap-3 p-4 text-[9px] font-bold border transition-all ${modalTab === btn.id ? 'bg-primary text-black' : 'border-primary/10 text-primary/60 hover:border-primary/40'}`}
                      aria-pressed={modalTab === btn.id}
                    >
                      <btn.icon className="w-5 h-5" /> <span className="hidden md:block uppercase tracking-widest">{btn.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex-1 overflow-hidden"><CyberTerminal activeTab={modalTab} /></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex justify-between items-center border-b-2 border-primary/30 bg-black/80 p-4 relative z-10">
        <div className="flex items-center gap-4">
          <img src="https://i.ibb.co/dwqsKQJb/IMG-20260127-WA0026.jpg" className="w-16 h-16 rounded-full border-2 border-primary/50 shadow-[0_0_20px_rgba(0,255,0,0.3)]" alt="Logo" />
          <h1 className="text-3xl font-black tracking-tighter text-glow uppercase">Welfare OSINT</h1>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold tracking-widest">{time.toLocaleTimeString()}</div>
          <div className="text-[10px] text-accent uppercase">{time.toDateString()}</div>
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
          <HudCard title="SYSTEM PROTOCOLS">
            <Button onClick={() => setShowPortal(true)} className="w-full bg-primary text-black font-bold h-10 box-glow animate-pulse text-[10px] uppercase">C4AR4K-X INTERFACE</Button>
          </HudCard>
        </aside>

        <section className="lg:col-span-6 flex flex-col gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-black/80 border border-primary/30 p-1 mb-2 gap-1 rounded-none flex-nowrap overflow-x-auto">
              <TabsTrigger value="threat-map" className="data-[state=active]:bg-primary data-[state=active]:text-black text-primary px-4 py-2 text-[10px] uppercase font-bold"><Shield className="w-3 h-3 mr-2" /> CYBER MAP</TabsTrigger>
              <TabsTrigger value="flight-radar" className="data-[state=active]:bg-primary data-[state=active]:text-black text-primary px-4 py-2 text-[10px] uppercase font-bold"><MapIcon className="w-3 h-3 mr-2" /> AIRSPACE</TabsTrigger>
            </TabsList>
            <HudCard className="flex-1 min-h-[450px] p-0 border-2 border-primary/40 box-glow relative">
              <TabsContent value="threat-map" className="h-full w-full m-0 p-0"><iframe src="https://cybermap.kaspersky.com/en/widget/dynamic/dark" className="w-full h-full border-none filter contrast-125" title="Cyber Threat Map" /></TabsContent>
              <TabsContent value="flight-radar" className="h-full w-full m-0 p-0"><iframe src="https://www.flightradar24.com/simple_index.php?lat=22.7&lon=75.8&z=6" className="w-full h-full border-none filter invert" title="Flight Radar" /></TabsContent>
            </HudCard>
          </Tabs>
        </section>

        <aside className="lg:col-span-3">
          <HudCard title="NEURAL FEED" className="h-full">
            <div className="space-y-3 text-[10px]">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="border-l-2 border-primary/30 pl-2 py-1 bg-primary/5">
                  <div className="text-accent font-bold tracking-tighter uppercase">SYNAPSE_NODE_0x{i}F</div>
                  <div className="opacity-70 text-[9px]">ENCRYPTED_LINK_STABLE</div>
                </div>
              ))}
            </div>
          </HudCard>
        </aside>
      </main>

      <footer className="h-8 bg-black/80 border-t border-primary/30 flex items-center overflow-hidden relative z-10">
        <div className="animate-marquee whitespace-nowrap text-[10px] opacity-60 px-4 uppercase tracking-[0.4em]">
          System_News_Feed :: C4AR4K-X_System_Live :: Welfare_Osint_V2 :: Alliance_Channels_Synced :: Cyber_Threat_Level: LOW ::
        </div>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .box-glow { box-shadow: 0 0 20px rgba(0, 255, 65, 0.4); }
        .text-glow { text-shadow: 0 0 10px rgba(0, 255, 65, 0.6); color: #00ff41; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #00ff41; border-radius: 10px; }
      `}</style>
    </div>
  );
}