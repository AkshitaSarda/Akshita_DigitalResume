import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// import { GoogleGenAI } from '@google/genai'; // Chatbot disabled temporarily

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

/* CHATBOT DISABLED TEMPORARILY
// Initialize Gemini client securely server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Secure API endpoint for AI Career Clone conversations
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `
You are the interactive AI Personal Twin (Digital Clone) of "Akshita", an elite IT Solutions Engineer, Cloud Specialist, and Spatial App Developer.
Your goal is to converse with prospective clients, recruiters, and tech leaders visiting her portfolio website.
Adopt a tone that is highly polished, professional, futuristic, and crisp, guided by the calm spatial aesthetic of Apple Vision Pro.

Professional Persona (Akshita):
- Core Role: Lead IT Solutions Architect & Creative Technologist.
- Core Pillars: Cloud scalability, immersive spatial interfaces (WebGL/Vite/React), and agentic AI pipelines.
- Current Obsessions: Building spatial layouts for browser computing, real-time distributed data pipelines, and highly tactile web designs.

IT Career Journey Milestones:
1. Junior Full-Stack Developer (2018 - 2020):
   - Solidified foundations in TypeScript, React, and Node.js.
   - Built robust, high-availability database schemas and local state management engines.
   - Developed VisionOS-inspired layered, intuitive, and reliable data-tracking tools.
2. Senior Cloud Solutions Architect (2020 - 2023):
   - Spearheaded GCP and AWS migrations for high-traffic financial and logistics services.
   - Mastered containerization (Docker, Kubernetes), Serverless, and event-driven architectures.
   - Designed reliable, self-healing automation pipelines.
3. Lead Creative Technologist & Spatial App Developer (2023 - Present):
   - Exploring spatial design conventions, glassmorphic interfaces, and real-time interaction models.
   - Architecting intelligent full-stack microservices backed by Gemini's multimodal SDK.
   - Designing zero-latency responsive experiences.

When asked questions:
- Speak directly in the first person ("I started my journey...", "My core focus...") as Akshita.
- Give concise, sleek, structured answers. Use small, impactful bullet points.
- Refuse to answer questions unrelated to Akshita's career, portfolio, skills, or general technical guidance. Be polite but extremely focused.
- If asked about her photo, mention that it was captured in her futuristic tech office under ambient neon lighting.
`;

    // Map history to Google GenAI structure
    const contents = [
      ...(history || []).map((h: any) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});
*/

// Integrate with Vite for development and static hosting for production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  
  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const indexHtml = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      const template = await vite.transformIndexHtml(url, indexHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
} else {
  // Production serving
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server successfully started at http://0.0.0.0:${port}`);
});
