import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { getIslamicAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const Consultation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AI' | 'HUMAN'>('AI');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Assalamualaikum! I am your AI Ustadz Assistant. How can I help you today with Islamic knowledge?',
      timestamp: new Date(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    if (activeTab === 'AI') {
      const responseText = await getIslamicAdvice(input);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } else {
        // Mock human delay
        setTimeout(() => {
            const ustadzMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'ustadz',
                text: "Wa'alaikumussalam. I have received your question. Let me check the references first.",
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, ustadzMsg]);
            setIsLoading(false);
        }, 2000);
        return; // Don't turn off loading here for AI logic
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex flex-col max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab('AI')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center space-x-2 ${
            activeTab === 'AI' ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Sparkles size={18} />
          <span>AI Assistant</span>
        </button>
        <button
          onClick={() => setActiveTab('HUMAN')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center space-x-2 ${
            activeTab === 'HUMAN' ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <User size={18} />
          <span>Ustadz Live</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isUser ? 'bg-slate-300' : (msg.sender === 'bot' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white')
                }`}>
                  {isUser ? <User size={16} /> : (msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />)}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-white text-slate-800 rounded-br-none border border-slate-200'
                    : 'bg-emerald-600 text-white rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Loader2 size={16} className="animate-spin" />
                    </div>
                    <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl rounded-bl-none text-sm opacity-70">
                        Thinking...
                    </div>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-2 bg-slate-100 rounded-xl px-4 py-2 border border-transparent focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent focus:outline-none text-sm py-2"
            placeholder={activeTab === 'AI' ? "Ask about prayer, hadith, or daily life..." : "Type your question for Ustadz..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
            {activeTab === 'AI' ? "AI advice is generated by Gemini. Please consult a local scholar for complex fatwas." : "Ustadz usually replies within 2 hours."}
        </p>
      </div>
    </div>
  );
};

export default Consultation;
