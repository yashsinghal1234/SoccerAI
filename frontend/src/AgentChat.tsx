import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
}

export const AgentChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'agent', text: 'Hello! I am your AI Soccer Tactician. Ask me about rules, formations, players, or match history!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('soccerai_token');
      const res = await fetch('http://localhost:3001/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      
      const agentMsg: Message = { id: (Date.now() + 1).toString(), sender: 'agent', text: data.reply || 'Sorry, I encountered an error.' };
      setMessages(prev => [...prev, agentMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'agent', text: 'Network error communicating with the agent.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '600px', padding: '20px', borderRadius: '16px' }}>
      <h2 style={{ color: '#00ff88', marginTop: 0 }}>Agent Q&A</h2>
      
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'user' ? '#00ff88' : 'rgba(255,255,255,0.1)',
            color: msg.sender === 'user' ? '#121214' : '#fff',
            padding: '12px 16px',
            borderRadius: '12px',
            maxWidth: '80%',
            fontWeight: msg.sender === 'user' ? 'bold' : 'normal',
            lineHeight: '1.5'
          }}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#00ff88', fontStyle: 'italic' }}>
            Agent is thinking...
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask a soccer question..." 
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', color: '#fff' }}
        />
        <button onClick={handleSend} disabled={loading} style={{ padding: '0 20px', borderRadius: '8px', background: '#00ff88', border: 'none', color: '#121214', fontWeight: 'bold', cursor: 'pointer' }}>
          Send
        </button>
      </div>
    </div>
  );
};
