import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client on the server side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `You are the exceptionally polished, warm, and helpful AI Virtual Admissions Counselor and Guide for Oxford English H.S. School, a prestigious school (Grades 1-12) located in Kailaras, renowned for its motto "Education For A Better Life". We combine rigorous academics, digital literacy, state-of-the-art STEM and robotics labs, inspiring arts, and active athletics.

Your goal is to answer questions from parents, students, and prospective visitors with genuine enthusiasm, clarity, and professionalism.

Oxford English H.S. School Quick Reference:
1. Slogan & Motto:
   - "Education For A Better Life"

2. Location:
   - Kailaras, India.

3. Academic Highlights:
   - High secondary streams (Science, Commerce, Humanities).
   - Rich curriculum focusing on modern digital learning, language fluency, and critical thinking.
   - Low student-to-teacher ratio (15:1).

4. Admissions & Deadlines:
   - Academic Year 2026-2027 registration is currently OPEN.
   - Rolling admissions with early inquiry benefits.
   - Virtual tours and campus shadowing can be scheduled online.

5. Tuition & Financial Aid:
   - Annual tuition fees are highly affordable, with structured scholarship grants for meritorious students.
   - Generous sports scholarships and sibling discounts are available.

6. Campus Facilities:
   - Digital Smart Classrooms.
   - Fully-equipped Science & Robotics Labs.
   - Large Playground and Sports Complex.
   - Extensive Library & Creative Art Studios.

When responding:
- Keep answers structured and clean, utilizing markdown tables, lists, or headers where appropriate.
- Maintain a highly professional, encouraging, and welcoming collegiate tone.
- Keep answers crisp, direct, and directly actionable (e.g., inviting them to fill out the application or schedule a campus visit).
- If the GEMINI_API_KEY is not configured or fails, provide a charming response explaining the main features of the school.`;

// AI Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
  }

  try {
    if (!ai) {
      // Graceful fallback if key is missing or not initialized yet
      return res.json({
        role: "model",
        text: "Thank you for reaching out! Although our advanced AI counselor module is currently in standby mode, I can tell you that Oxford English H.S. School, Kailaras is always open for inquiries! We offer state-of-the-art digital classrooms, exceptional robotics clubs, and highly affordable structured fee plans with merit-based scholarships. Please visit our Admissions section on this page to apply or schedule a real-life campus tour!",
      });
    }

    // Format message history for Google Gen AI contents parameter
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content || "" }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I am here to guide you. What else would you like to know about Oxford English H.S. School?";

    res.json({
      role: "model",
      text: replyText,
    });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({
      error: "We encountered a small hiccup while consulting our AI counselor. Please try again or explore our campus sections!",
    });
  }
});

// Setup Vite Dev server or Production Static serving
async function bootstrapServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Oxford Server] Running on http://localhost:${PORT} under ${process.env.NODE_ENV || "development"} mode`);
  });
}

bootstrapServer();
