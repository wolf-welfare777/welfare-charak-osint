import type { Express } from "express";
import { createServer, type Server } from "http";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
// @ts-ignore
import input from "input";
import fs from "fs";
import path from "path";
import { savedSession } from "./session";

// 🚀 Welfare OSInt: Master Competition Build (Auto-File Mode)
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

      // 💾 AUTOMATIC FILE GENERATOR: OTP ke baad ye khud session file update karega
      const currentSession = client.session.save() as unknown as string;
      if (currentSession !== savedSession) {
        const sessionFilePath = path.join(__dirname, "session.ts");
        const content = `export const savedSession = "${currentSession}";`;
        fs.writeFileSync(sessionFilePath, content);
        console.log("✅ SUCCESS: session.ts update ho gayi! Ab bas GitHub push karo.");
      }
    } catch (e) { console.log("Connection Failed:", e); }
  })();

  // 🔍 Search API - Aapka Original Competition Logic
  app.post("/api/search", async (req, res) => {
    const { phone } = req.body;
    try {
      const warningHeader = "⚠️ [WELFARE OSINT - INVESTIGATIVE DASHBOARD]\n" +
                            "Status: Authorized Search | Mode: Partial Privacy\n" +
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
          const splitIndex = Math.floor(line.length / 2);
          const visiblePart = line.substring(0, splitIndex);
          const maskedPart = "*".repeat(line.length - splitIndex);
          return visiblePart + maskedPart;
        });

      res.json({ 
        unit: "Welfare Intelligence Team",
        sound: "success_beep",
        report: processedLines.length > 0 
          ? warningHeader + processedLines.join('\n\n') 
          : warningHeader + "⚠️ Information Not Found in Databases." 
      });
    } catch (e) { res.status(500).json({ error: "Timeout", sound: "error_buzz" }); }
  });

  return httpServer;
}