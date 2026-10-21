import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory quote store for lead management & admin dashboard
interface QuoteRecord {
  id: string;
  referenceNumber: string;
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  serviceType: string;
  projectScope: 'Residential' | 'Commercial' | 'Both';
  propertyLocation: string;
  projectDescription: string;
  preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'Email';
  preferredDate?: string;
  photoName?: string;
  status: 'New' | 'In Review' | 'Quoted' | 'Scheduled' | 'Completed';
  createdAt: string;
}

let storedQuotes: QuoteRecord[] = [
  {
    id: 'quote-sample-1',
    referenceNumber: 'PEL-2026-4819',
    fullName: 'David Singh',
    companyName: 'Demerara Commercial Suites',
    phone: '+592 623 4567',
    email: 'dsingh@demeraracommercial.gy',
    serviceType: 'Commercial HVAC Solutions',
    projectScope: 'Commercial',
    propertyLocation: 'Sherriff St, Georgetown',
    projectDescription: 'Inspection and maintenance quote for 4 ceiling cassette units and 2 rooftop split condensers.',
    preferredContactMethod: 'WhatsApp',
    preferredDate: '2026-11-02',
    status: 'In Review',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'quote-sample-2',
    referenceNumber: 'PEL-2026-7291',
    fullName: 'Alicia Persaud',
    companyName: '',
    phone: '+592 688 1209',
    email: 'alicia.p@gmail.com',
    serviceType: 'Air Conditioning Installation',
    projectScope: 'Residential',
    propertyLocation: 'Queenstown, Georgetown',
    projectDescription: 'Looking to install two 12,000 BTU inverter split units in two master bedrooms on the upper level.',
    preferredContactMethod: 'Phone Call',
    preferredDate: '2026-11-05',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

// Initialize GoogleGenAI if key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI with provided key:', err);
  }
}

const SYSTEM_INSTRUCTION = `You are the professional Virtual Assistant for PELSWIJK GENERAL CONTRACTORS, an HVAC contractor and general contracting business located at 48 Sherriff Street, Georgetown, Guyana.
Business phone: +592 671 2370.
Google Maps Plus Code: RV67+X5 Georgetown, Guyana.

Your Role:
1. Greet visitors warmly and professionally.
2. Explain verified HVAC and contracting capabilities:
   - Air Conditioning Installation (residential & commercial split and inverter systems)
   - HVAC Maintenance (preventative servicing, coil cleaning, refrigerant checks)
   - Air Conditioning Repair (system troubleshooting, leak checks, electrical diagnostics)
   - Commercial HVAC Solutions (offices, retail, commercial buildings, server rooms)
   - Ventilation Systems (spiral ductwork, air circulation, commercial exhaust)
   - General Contracting (equipment plinths, facility improvements, structural mountings)
3. Direct visitors to request a quote or contact via WhatsApp (+592 671 2370).
4. STRICT ANTI-HALLUCINATION GUARDRAILS:
   - Do NOT invent prices, hourly rates, or fixed costs. Prices depend on site assessment and equipment scope.
   - Do NOT fabricate years in business, formal certificates, warranties, or partner logos that are not confirmed.
   - If asked for quote / cost, politely collect their requirements (residential vs commercial, property location in Georgetown/Guyana, service needed) and encourage them to click "Request a Quote" or message WhatsApp.
   - Keep responses concise, clear, and professional.`;

// API: AI Customer Assistant endpoint
app.post('/api/assistant', async (req: Request, res: Response) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // If Gemini API is available and valid key is set, generate response
  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyValid = apiKey && apiKey.length > 10 && apiKey !== 'MY_GEMINI_API_KEY';

  if (aiClient && isKeyValid) {
    try {
      const formattedHistory = conversationHistory.map((item: { sender: string; text: string }) => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));

      const contents = [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI request timeout')), 3500)
      );

      const response = (await Promise.race([
        aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.6
          }
        }),
        timeoutPromise
      ])) as any;

      const reply = response.text || "Hello! How can we help with your HVAC or general contracting requirements today?";
      return res.json({ reply, source: 'gemini' });
    } catch (err: any) {
      console.warn('Gemini API call timed out or failed, falling back to rule-based assistant:', err.message);
    }
  }

  // Graceful rule-based fallback if no API key or in case of transient error
  const lower = message.toLowerCase();
  let reply = "Hello! Welcome to PELSWIJK GENERAL CONTRACTORS. We provide professional air conditioning installation, maintenance, repair, and general contracting in Georgetown, Guyana. How can we assist your project today?";

  if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('estimate') || lower.includes('fee')) {
    reply = "Project costs depend on your property scope, equipment sizing (BTU/tonnage), and whether it is a new installation or repair. You can submit our online 'Request a Quote' form with your details, or contact us directly on WhatsApp at +592 671 2370 for an assessment!";
  } else if (lower.includes('location') || lower.includes('where') || lower.includes('address') || lower.includes('office') || lower.includes('georgetown')) {
    reply = "Our office is located at 48 Sherriff Street, Georgetown, Guyana (Plus Code: RV67+X5). We serve both residential and commercial clients across Georgetown and nearby regions.";
  } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('call') || lower.includes('whatsapp') || lower.includes('number')) {
    reply = "You can reach PELSWIJK GENERAL CONTRACTORS directly by calling or messaging on WhatsApp at +592 671 2370. You can also use the quote form on this page to submit your details.";
  } else if (lower.includes('repair') || lower.includes('fix') || lower.includes('leak') || lower.includes('not cooling') || lower.includes('breakdown')) {
    reply = "We offer professional air conditioning repair and troubleshooting for systems experiencing cooling loss, leaks, strange sounds, or electrical faults. Please provide your property location or contact our team at +592 671 2370 to arrange an inspection.";
  } else if (lower.includes('maintenance') || lower.includes('service') || lower.includes('clean')) {
    reply = "Our HVAC maintenance covers evaporator and condenser coil cleaning, refrigerant pressure checks, filter inspection, and electrical audits to ensure optimal cooling in Guyana's climate.";
  } else if (lower.includes('commercial') || lower.includes('office') || lower.includes('building') || lower.includes('chiller')) {
    reply = "We provide commercial HVAC solutions for offices, shops, commercial spaces, and server rooms throughout Georgetown. We can arrange a site visit to assess your cooling and ventilation layout.";
  }

  return res.json({ reply, source: 'fallback' });
});

// API: Quotes submission & management
app.post('/api/quotes', (req: Request, res: Response) => {
  const {
    fullName,
    companyName = '',
    phone,
    email,
    serviceType,
    projectScope = 'Residential',
    propertyLocation,
    projectDescription,
    preferredContactMethod = 'WhatsApp',
    preferredDate = '',
    photoName = ''
  } = req.body;

  if (!fullName || !phone || !email || !serviceType || !propertyLocation || !projectDescription) {
    return res.status(400).json({
      error: 'Please complete all required fields (Full Name, Phone, Email, Service Type, Property Location, Description).'
    });
  }

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const referenceNumber = `PEL-2026-${randomDigits}`;
  const newQuote: QuoteRecord = {
    id: `quote-${Date.now()}-${randomDigits}`,
    referenceNumber,
    fullName: fullName.trim(),
    companyName: companyName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    serviceType,
    projectScope,
    propertyLocation: propertyLocation.trim(),
    projectDescription: projectDescription.trim(),
    preferredContactMethod,
    preferredDate,
    photoName,
    status: 'New',
    createdAt: new Date().toISOString()
  };

  storedQuotes.unshift(newQuote);

  return res.status(201).json({
    success: true,
    message: 'Quote request submitted successfully. Our team will review your project details.',
    referenceNumber,
    quote: newQuote
  });
});

app.get('/api/quotes', (_req: Request, res: Response) => {
  return res.json({ quotes: storedQuotes });
});

app.patch('/api/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const quote = storedQuotes.find(q => q.id === id);

  if (!quote) {
    return res.status(404).json({ error: 'Quote record not found' });
  }

  if (status) {
    quote.status = status;
  }

  return res.json({ success: true, quote });
});

app.delete('/api/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLen = storedQuotes.length;
  storedQuotes = storedQuotes.filter(q => q.id !== id);

  if (storedQuotes.length === initialLen) {
    return res.status(404).json({ error: 'Quote record not found' });
  }

  return res.json({ success: true });
});

// Start server with Vite middleware in development or static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
