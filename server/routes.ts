import type { Express } from "express";
import { createServer, type Server } from "http";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import path from "path";
import fs from "fs";
// @ts-ignore
import input from "input";
import { savedSession } from "./session";
import { fileURLToPath } from 'url';


// 🚀 Render & Local Compatibility Fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes({ app, httpServer }: { app: Express, httpServer: Server }) {
  const apiId = 34558337; 
  const apiHash = "f7654966f5280ce988af1551a7149960";
  const stringSession = new StringSession(savedSession || "");
  
  const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

  (async () => {
    try {
      console.log("--- WELFARE OSINT MASTER ENGINE ONLINE ---");
      await client.start({
        phoneNumber: async () => await input.text("Enter Number (+91...): "),
        phoneCode: async () => await input.text("Enter OTP: "),
        onError: (err) => console.log("Engine Error:", err),
      });

      // ✅ SUCCESS: Session save karne ka logic
      const currentSession = client.session.save() as unknown as string;
      if (currentSession !== savedSession) {
        const sessionFilePath = path.join(__dirname, "session.ts");
        const sessionContent = `export const savedSession = "${currentSession}";`;
        fs.writeFileSync(sessionFilePath, sessionContent);
        console.log("✅ SUCCESS: session.ts update ho gayi! Ab bas GitHub push karo.");
      }
    } catch (e) { console.log("Connection Failed:", e); }
  })();

  app.post("/api/search", async (req, res) => {
    const { phone } = req.body;
    try {
      const warningHeader = "⚠️ [WELFARE OSINT - ENCRYPTED INVESTIGATION]\n" +
                            "Status: Authorized | Privacy: Partial Identity Mode\n" +
                            "-------------------------------------------\n\n";

      await client.sendMessage("@Sankixdleak_bot", { message: phone });
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
          
          // 🧠 SMART PRECISION MASKING (Jaisa aapne manga)
          if (l.includes("telephone") || l.includes("document")) {
            const parts = line.split(":");
            const val = parts[1]?.trim() || "";
            return `${parts[0]}: ${val.slice(0, 4)}***${val.slice(-3)}`;
          } 
          
          if (l.includes("full name") || l.includes("father")) {
            const parts = line.split(":");
            const name = parts[1]?.trim() || "";
            return `${parts[0]}: ${name.slice(0, 4)}****${name.slice(-2)}`;
          }

          if (l.includes("adres")) {
            return line.substring(0, Math.floor(line.length * 0.6)) + "****";
          }

          return line;
        });

      res.json({ 
        unit: "Welfare Intelligence Team",
        sound: "success_beep",
        report: processedLines.length > 0 
          ? warningHeader + processedLines.join('\n\n') 
          : warningHeader + "⚠️ INFORMATION NOT FOUND." 
      });
    } catch (e) { res.status(500).json({ error: "Timeout", sound: "error_buzz" }); }
  });

  return httpServer;
}