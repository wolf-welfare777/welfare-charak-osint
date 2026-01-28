import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "@/pages/dashboard";

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [isStarted, setIsStarted] = useState(false);
  const [text, setText] = useState<string[]>([]);
  const [phase, setPhase] = useState<'shatter' | 'terminal'>('shatter');
  
  const speak = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = 0.8;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const startSequence = () => {
    setIsStarted(true);
    const audio = new Audio("https://files.catbox.moe/cxa0ml.mp3");
    audio.play().catch(() => {});

    // Phase 1: Music & Shatter (Increased to 18 seconds to sync with music)
    setTimeout(() => {
      setPhase('terminal');
      
      const voiceSteps = [
        { msg: "Initializing Cyber-Threat Map. Data packets inspection active.", delay: 1000 },
        { msg: "Alliance Network synchronized. Secure channels established.", delay: 5000 },
        { msg: "Neuralink satellite link established. Brain-sync operational.", delay: 9000 },
        { msg: "All systems online. Welcome back, Commander.", delay: 13000 }
      ];

      voiceSteps.forEach(step => {
        setTimeout(() => speak(step.msg), step.delay);
      });

      setTimeout(onComplete, 16000);
    }, 18000);

    const logs = [
      "ESTABLISHING NEURAL LINK...",
      "SYNCING CYBER-THREAT NODES...",
      "ENCRYPTING ALLIANCE CHANNELS...",
      "SATELLITE UPLINK STABLE...",
      "BRAIN-SYNC PROTOCOL ACTIVE...",
      "SYSTEM OPERATIONAL."
    ];

    logs.forEach((log, i) => {
      setTimeout(() => {
        setText(prev => [...prev, `[WELFARE-AI]: ${log}`]);
      }, i * 2000 + 18000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center font-mono text-primary p-10 overflow-hidden">
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-12"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
               {/* Multiple HUD Layers for Depth */}
               <motion.div
                 animate={{ 
                   boxShadow: ["0 0 20px rgba(0,255,0,0.2)", "0 0 60px rgba(0,255,0,0.5)", "0 0 20px rgba(0,255,0,0.2)"],
                   scale: [1, 1.02, 1]
                 }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="w-full h-full rounded-full border-2 border-primary/30 p-4 bg-black/50 backdrop-blur-xl relative z-10 overflow-hidden"
               >
                 <img 
                   src="https://i.ibb.co/dwqsKQJb/IMG-20260127-WA0026.jpg" 
                   className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]"
                   alt="Welfare Logo"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent animate-pulse" />
                 {/* Scanning Line */}
                 <motion.div 
                   animate={{ top: ["-10%", "110%"] }}
                   transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                   className="absolute left-0 w-full h-1 bg-primary/50 blur-[2px] z-20"
                 />
               </motion.div>
               
               {/* Orbital Rings with rotation */}
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }} 
                 className="absolute inset-[-10px] border border-primary/20 rounded-full border-dashed" 
               />
               <motion.div 
                 animate={{ rotate: -360 }} 
                 transition={{ repeat: Infinity, duration: 15, ease: "linear" }} 
                 className="absolute inset-[-30px] border border-primary/10 rounded-full border-dashed" 
               />
               
               {/* Glow effect */}
               <div className="absolute inset-[-50px] bg-primary/5 rounded-full blur-[40px] animate-pulse" />
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, letterSpacing: "0.6em" }}
              whileTap={{ scale: 0.95 }}
              onClick={startSequence}
              className="group relative px-12 py-6 bg-black border-2 border-primary/50 text-primary font-orbitron text-2xl tracking-[0.4em] overflow-hidden transition-all duration-500 hover:border-primary hover:text-glow"
            >
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:left-[100%] transition-all duration-1000" />
              <div className="absolute bottom-0 right-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:right-[100%] transition-all duration-1000" />
              INITIALIZE CORE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {isStarted && phase === 'shatter' && (
        <motion.div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.5, 2.5],
              opacity: [1, 0.8, 0],
              filter: ["blur(0px)", "blur(10px)", "blur(20px)"]
            }}
            transition={{ duration: 18, ease: "easeInOut" }}
            className="relative w-96 h-96"
          >
            <img 
              src="https://i.ibb.co/dwqsKQJb/IMG-20260127-WA0026.jpg" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(0,255,0,1)]"
              alt="Logo"
            />
            {/* Energy Waves */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 4, opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: i * 1.3 }}
                className="absolute inset-0 border-2 border-primary rounded-full"
              />
            ))}
          </motion.div>
          
          {/* Digital Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [(Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1500],
                  y: [(Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1500],
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2, 
                  repeat: Infinity,
                  delay: Math.random() * 18
                }}
                className="absolute w-1 h-1 bg-primary"
                style={{ left: "50%", top: "50%" }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {isStarted && phase === 'terminal' && (
        <div className="w-full max-w-4xl space-y-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <span className="text-primary font-orbitron tracking-[1em] text-sm animate-pulse">SYSTEM_ONLINE</span>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          <AnimatePresence>
            {text.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                className="text-xl md:text-2xl flex gap-6 text-glow font-mono italic"
              >
                <span className="text-accent/60">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                <span className="text-primary">{t}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="h-10 w-5 bg-primary inline-block ml-6 shadow-[0_0_30px_rgba(0,255,0,1)]"
          />
        </div>
      )}
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!booted ? (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 1.1, filter: "brightness(3) blur(30px)" }}
            transition={{ duration: 2 }}
          >
            <BootSequence onComplete={() => setBooted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
