import React, { useState } from 'react';
import { useRealm } from '../context/RealmContext';
import { Target, Droplets, Beef, Flame, Bot, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export default function Planner() {
  const { goals, updateGoals, userProfile } = useRealm();
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [formGoals, setFormGoals] = useState({
    water: goals.water,
    protein: goals.protein,
    calories: goals.calories,
  });

  // Chatbot State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'ai', text: "Hello! My name is YumBot. How can I help you plan your macros?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormGoals({
      ...formGoals,
      [e.target.name]: Number(e.target.value) || 0
    });
  };

  const handleSave = () => {
    updateGoals(formGoals);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      // Access the Vite environment variable
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setChatHistory(prev => [...prev, { role: 'ai', text: "Error: No API key found. Please make sure VITE_GEMINI_API_KEY is set in your .env file." }]);
        setIsChatLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: `You are YumBot, a motivating nutrition assistant.
              Your goal is to give users information about nutrition and macros in food.
              Keep your responses short and simple.
              The only macros needed for this app are Daily water goals, protein goals, and daily calories goals.

              You are talking to:
              Name: ${userProfile.name || 'User'}
              Age: ${userProfile.age || 'Unknown'}
              Height: ${userProfile.height_ft ? `${userProfile.height_ft}ft ${userProfile.height_in}in` : 'Unknown'}
              Weight: ${userProfile.weight ? `${userProfile.weight} lbs` : 'Unknown'}
              Fitness Goal: ${userProfile.goal}

              Tailor your advice to their specific stats and goal!`
      });

      const result = await model.generateContent(userMsg);
      const response = await result.response;
      const text = response.text();

      setChatHistory(prev => [...prev, { role: 'ai', text }]);
    } catch (error: any) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'ai', text: `API Error: ${error?.message || 'Something went wrong.'}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

      {/* LEFT COLUMN: Goals Form */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target className="text-accent" />
            Custom Macro Goals
          </h2>
        </div>

        <p className="text-muted" style={{ marginBottom: '2rem' }}>
          Configure your daily targets here. Your progress on the Dashboard and your success in the Digital Realm are directly tied to these values.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
          {/* Water Goal Input */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--secondary)' }}>
              <Droplets size={18} /> Daily Water Goal (oz)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                name="water"
                value={formGoals.water}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem'
                }}
              />
            </div>
          </div>

          {/* Protein Goal Input */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>
              <Beef size={18} /> Daily Protein Goal (g)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                name="protein"
                value={formGoals.protein}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem'
                }}
              />
            </div>
          </div>

          {/* Calories Goal Input */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent)' }}>
              <Flame size={18} /> Daily Calories Target (kcal)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                name="calories"
                value={formGoals.calories}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <button
            className="btn"
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              backgroundColor: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'var(--accent)',
              color: isSaved ? 'var(--primary)' : 'white',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {isSaved ? 'Goals Saved Successfully!' : 'Save Custom Goals'}
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Gemini Chatbot */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.02)', maxHeight: '600px' }}>
        <h3 style={{ color: 'var(--accent)', fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot /> AI Assistant
        </h3>

        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
          {chatHistory.map((msg, idx) => (
            <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{
                backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: msg.role === 'user' ? '#0f172a' : 'var(--text-main)',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                borderBottomRightRadius: msg.role === 'user' ? '0' : 'var(--radius-md)',
                borderBottomLeftRadius: msg.role === 'ai' ? '0' : 'var(--radius-md)',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div style={{ alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
              Thinking...
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about your macros..."
            disabled={isChatLoading}
            style={{
              flex: 1,
              padding: '0.8rem',
              backgroundColor: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isChatLoading || !chatInput.trim()}
            style={{
              padding: '0.8rem 1.2rem',
              backgroundColor: isChatLoading || !chatInput.trim() ? 'rgba(255,255,255,0.05)' : 'var(--accent)',
              color: isChatLoading || !chatInput.trim() ? 'var(--text-muted)' : 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: isChatLoading || !chatInput.trim() ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>

    </div>
  );
}
