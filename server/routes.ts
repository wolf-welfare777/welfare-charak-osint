import type { Express } from "express";
import { createServer, type Server } from "http";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
// @ts-ignore
import input from "input";
import { savedSession } from "./session";

// 🚀 Welfare Engine: Master Competition Build
export async function registerRoutes({ app, httpServer }: { app: Express, httpServer: Server }) {
  const apiId = 32269534; 
  const apiHash = "97705f5951b522a122a438c5f400984b";
  const stringSession = new StringSession(savedSession || "");
  
  const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

  (async () => {
    try {
      console.log("--- WELFARE OSINT MASTER ENGINE ONLINE ---");
      await client.start({
        phoneNumber: async () => await input.text("Enter Number: "),
        phoneCode: async () => await input.text("Enter OTP: "),
        onError: (err) => console.log("Engine Error:", err),
      });
     // console.log("SESSION_STRING:", client.session.save());
    } catch (e) { console.log("Connection Failed:", e); }
  })();

  app.post("/api/search", async (req, res) => {
    const { phone } = req.body;
    try {
      const warningHeader = "⚠️ [WELFARE OSINT - ENCRYPTED INVESTIGATION]\n" +
                            "Status: Authorized | Privacy: Partial Identity Mode\n" +
                            "-------------------------------------------\n\n";

      await client.sendMessage("@Sankixdleak_bot", { message: phone });
      
      // Delay for "Scanning" sound duration in frontend
      await new Promise(r => setTimeout(r, 8000)); 
      
      let msgs = await client.getMessages("@Sankixdleak_bot", { limit: 1 });
      let rawData = msgs[0]?.message || "";

      const lines = rawData.split('\n');
      
      const processedLines = lines
        .filter(line => {
          const l = line.toLowerCase();
          return (l.includes("telephone") || l.includes("adres") || 
                  l.includes("full name") || l.includes("father") || 
                  l.includes("region") || l.includes("document")) 
                  && !l.includes("hiteckgroop");
        })
        .map(line => {
          const l = line.toLowerCase();
          
          // 🧠 SMART PRECISION MASKING (70% Visible, 30% Hidden)
          if (l.includes("telephone") || l.includes("document")) {
            const parts = line.split(":");
            const val = parts[1]?.trim() || "";
            // Example: 987***321 (Dikhne mein professional)
            return `${parts[0]}: ${val.slice(0, 4)}***${val.slice(-3)}`;
          } 
          
          if (l.includes("full name") || l.includes("father")) {
            const parts = line.split(":");
            const name = parts[1]?.trim() || "";
            // Example: Vinod****ma
            return `${parts[0]}: ${name.slice(0, 4)}****${name.slice(-2)}`;
          }

          if (l.includes("adres")) {
            // Adha address dikhega, adha masked
            return line.substring(0, Math.floor(line.length * 0.6)) + "****";
          }

          return line;
        });

      res.json({ 
        unit: "Welfare Intelligence Team",
        sound: "success_beep", // Frontend ko signal
        report: processedLines.length > 0 
          ? warningHeader + processedLines.join('\n\n') 
          : warningHeader + "⚠️ INFORMATION NOT FOUND." 
      });
    } catch (e) { res.status(500).json({ error: "Timeout", sound: "error_buzz" }); }
  });

  return httpServer;
}