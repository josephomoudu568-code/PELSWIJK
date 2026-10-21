import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare, Phone, MapPin, ArrowRight, Minimize2, Sparkles, RefreshCw } from 'lucide-react';
import { COMPANY_INFO, INITIAL_SERVICES } from '../data/companyData';

interface FloatingAssistantProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  quickAction?: {
    type: 'quote' | 'whatsapp' | 'call' | 'location';
    label: string;
    payload?: string;
  };
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({ onOpenQuoteModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const initialGreeting = "Hello! Welcome to PELSWIJK GENERAL CONTRACTORS. How can we help with your HVAC or contracting project?";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const quickPrompts = [
    { label: 'Request a Quote', text: 'I would like to request a quote for an HVAC project.' },
    { label: 'AC Installation', text: 'What air conditioning installation services do you offer?' },
    { label: 'AC Repair / Troubleshooting', text: 'My air conditioning unit is not cooling properly.' },
    { label: 'Office Location & Hours', text: 'Where is your Georgetown office located and what are your hours?' },
    { label: 'Chat on WhatsApp', text: 'Can I speak with a representative on WhatsApp?' }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: history
        })
      });

      const data = await res.json();
      const replyText = data.reply || "Thank you for reaching out. Please contact our Georgetown office at +592 671 2370 or message us on WhatsApp for assistance.";

      let quickAction: ChatMessage['quickAction'] = undefined;
      const lower = textToSend.toLowerCase();
      if (lower.includes('quote') || lower.includes('cost') || lower.includes('estimate') || lower.includes('install')) {
        quickAction = {
          type: 'quote',
          label: 'Open Quote Request Form',
          payload: 'Air Conditioning Installation'
        };
      } else if (lower.includes('whatsapp') || lower.includes('chat') || lower.includes('message')) {
        quickAction = {
          type: 'whatsapp',
          label: 'Continue on WhatsApp'
        };
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('address')) {
        quickAction = {
          type: 'location',
          label: 'Open Google Maps'
        };
      }

      const assistantMsg: ChatMessage = {
        id: `assist-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `assist-fallback-${Date.now()}`,
        sender: 'assistant',
        text: "PELSWIJK GENERAL CONTRACTORS is located at 48 Sherriff Street, Georgetown, Guyana. You can call or message us directly at +592 671 2370.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction: {
          type: 'whatsapp',
          label: 'Message on WhatsApp'
        }
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: NonNullable<ChatMessage['quickAction']>) => {
    if (action.type === 'quote') {
      onOpenQuoteModal(action.payload);
      setIsOpen(false);
    } else if (action.type === 'whatsapp') {
      window.open(COMPANY_INFO.getServiceWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    } else if (action.type === 'call') {
      window.location.href = `tel:${COMPANY_INFO.rawPhone}`;
    } else if (action.type === 'location') {
      window.open(COMPANY_INFO.mapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 h-[520px] max-h-[80vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  PELSWIJK Assistant
                </h3>
                <span className="text-[11px] text-sky-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  HVAC & Contracting Support
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setMessages([
                    {
                      id: `msg-reset-${Date.now()}`,
                      sender: 'assistant',
                      text: initialGreeting,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }
                  ]);
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Restart chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-500 text-white rounded-tr-xs'
                      : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-xs shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Button */}
                  {msg.quickAction && (
                    <button
                      type="button"
                      onClick={() => handleActionClick(msg.quickAction!)}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      <span>{msg.quickAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 max-w-[70%]">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                <span>PELSWIJK Assistant is replying...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-slate-950 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qp.text)}
                className="text-[11px] whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-700 transition-colors shrink-0 cursor-pointer"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about HVAC services, quotes, repairs..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="p-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-bold rounded-full shadow-2xl transition-all duration-200 cursor-pointer"
        aria-label="Toggle Virtual Assistant"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">
          PELSWIJK Assistant
        </span>

        {/* Pulse indicator for unread welcome */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-slate-900"></span>
          </span>
        )}
      </button>

    </div>
  );
};
