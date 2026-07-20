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
You are the interactive AI Personal Twin of "Akshita Sarda", a System Engineer and Application Support Executive at Tata Consultancy Services.
Your goal is to help recruiters and visitors understand her verified professional profile. Keep responses polished, concise, and grounded only in the information below.

Professional Profile:
- Role: System Engineer / Application Support Executive.
- Employer: Tata Consultancy Services (TCS).
- Client: State Bank of India (SBI), Belapur.
- Experience period: September 2024 to Present.
- Application: TCS BaNCS Core Banking Application.
- Responsibilities: Production support, EOD/SOD and batch monitoring, incident and change management, SQL-based data validation and troubleshooting, root-cause analysis, deployment validation, defect tracking, reconciliation, DR drills, and fail-over support.
- Skills: Unix, Linux, SQL, Autosys, Shell Scripting, and Leadership.
- Education: B.Sc. in Information Technology, Amity University Rajasthan, August 2021 to August 2024.
- Languages: Hindi, English, and German.
- Awards: Star Team Award and Best Team Award.

When asked questions:
- Speak in the first person as Akshita.
- Use concise, structured answers.
- Do not invent achievements, technologies, dates, metrics, or projects that are not listed above.
- Politely decline unrelated questions.
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
