import React, { useState } from 'react';
import './LiveMatchDetail.css';

interface MatchEvent {
  minute: number;
  type: 'goal' | 'card' | 'sub' | 'insight';
  team: string;
  description: string;
  player?: string;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'PRE_MATCH' | 'LIVE' | 'FINISHED';
  minute?: number;
  league: string;
  events: MatchEvent[];
  aiInsight?: string;
  possession?: { home: number; away: number };
}

interface LiveMatchDetailProps {
  match: Match;
  onBack: () => void;
}

export const LiveMatchDetail: React.FC<LiveMatchDetailProps> = ({ match, onBack }) => {
  const [insight, setInsight] = useState<string | null>(match.aiInsight || null);
  const [loadingAI, setLoadingAI] = useState(false);

  const fetchLiveInsight = async () => {
    setLoadingAI(true);
    try {
      const token = localStorage.getItem('soccerai_token');
      const res = await fetch('http://localhost:3001/api/ai/live-insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ matchData: match })
      });
      const data = await res.json();
      if (res.ok) {
        setInsight(data.insight);
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingAI(false);
  };

  return (
    <div className="live-detail-container">
      <button className="back-btn" onClick={onBack}>
        &larr; Back to Matches
      </button>

      {/* Scoreboard */}
      <div className="scoreboard-section">
        <div className="score-top">
          <span className="home-lbl">HOME</span>
          <span className="timer">⏱ {match.minute || '00'}:00</span>
          <span className="away-lbl">AWAY</span>
        </div>
        <div className="score-main">
          <div className="team-name home">{match.homeTeam}</div>
          <div className="score-numbers">
            <span className="score">{match.homeScore}</span>
            <span className="score">{match.awayScore}</span>
          </div>
          <div className="team-name away">{match.awayTeam}</div>
        </div>
      </div>

      {/* Stats Toolbar */}
      <div className="stats-toolbar">
        <div className="stat-item">
          <div className="icon">⚽</div>
          <div className="lbl">GOALS</div>
        </div>
        <div className="stat-item">
          <div className="icon yellow-card"></div>
          <div className="lbl">YELLOW</div>
        </div>
        <div className="stat-item">
          <div className="icon red-card"></div>
          <div className="lbl">RED</div>
        </div>
        <div className="stat-item">
          <div className="icon">🏳️</div>
          <div className="lbl">CORNER</div>
        </div>
        <div className="stat-item">
          <div className="icon">⚕️</div>
          <div className="lbl">PENALTY</div>
        </div>
        <div className="stat-item">
          <div className="icon">🔄</div>
          <div className="lbl">SUBS</div>
        </div>
      </div>

      {/* Advanced Live Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#ccc' }}>Momentum Shift</h4>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '4px', borderBottom: '1px solid #444' }}>
            {[30, 45, 60, 20, -10, -40, -25, 10, 50, 70, 40, -15, -30].map((val, i) => (
              <div key={i} style={{ 
                flex: 1, 
                background: val > 0 ? '#00ff88' : '#ff4444', 
                height: `${Math.abs(val)}%`, 
                opacity: 0.8,
                borderRadius: '2px 2px 0 0'
              }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px', color: '#888' }}>
            <span>Home Dominance</span>
            <span>Away Dominance</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#ccc' }}>Shot Analysis</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>14</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Total Shots</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ff88' }}>6</div>
              <div style={{ fontSize: '12px', color: '#888' }}>On Target</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4444' }}>8</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Off Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Button & Display */}
      <div className="ai-insight-section" style={{ margin: '20px 0', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, color: '#00ff88', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🧠</span> Agentic Live Insight
          </h3>
          <button 
            onClick={fetchLiveInsight} 
            disabled={loadingAI}
            style={{ padding: '8px 16px', background: '#00ff88', color: '#121214', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {loadingAI ? 'Analyzing...' : 'Generate New Insight'}
          </button>
        </div>
        {insight && <p style={{ margin: 0, color: '#ccc', lineHeight: '1.5' }}>{insight}</p>}
      </div>

      {/* 3D Pitch Section */}
      <div className="detail-pitch-wrapper">
        <div className="detail-pitch-3d">
          <div className="detail-pitch-surface">
            <div className="detail-pitch-lines"></div>
            
            {/* SVG Overlay for Pass Lines */}
            <svg className="pass-lines-svg">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#fff" />
                </marker>
              </defs>
              <line x1="20%" y1="30%" x2="35%" y2="40%" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="20%" y1="70%" x2="35%" y2="60%" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
              
              <line x1="60%" y1="70%" x2="80%" y2="40%" stroke="#111" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
            </svg>

            {/* Players - Home Team (White silhouettes) */}
            <div className="detail-player home" style={{ left: '20%', top: '30%' }}>
              <div className="player-badge">3</div>
              <div className="player-silhouette white"></div>
            </div>
            <div className="detail-player home" style={{ left: '20%', top: '70%' }}>
              <div className="player-badge">2</div>
              <div className="player-silhouette white"></div>
            </div>
            <div className="detail-player home" style={{ left: '35%', top: '40%' }}>
              <div className="player-badge">1</div>
              <div className="player-silhouette white"></div>
            </div>

            {/* Players - Away Team (Black silhouettes) */}
            <div className="detail-player away" style={{ left: '60%', top: '70%' }}>
              <div className="player-badge black">1</div>
              <div className="player-silhouette black"></div>
            </div>
            <div className="detail-player away" style={{ left: '80%', top: '40%' }}>
              <div className="player-badge black">2</div>
              <div className="player-silhouette black"></div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <div className="timeline-axis">
          {[45, 50, 55, 60, 65].map(min => (
            <div key={min} className="timeline-tick" style={{ left: `${((min - 45) / 20) * 100}%` }}>
              <span className="tick-label">{min}</span>
              <div className="tick-mark"></div>
            </div>
          ))}
          {/* Active Minute Line */}
          <div className="timeline-active-bar" style={{ width: '50%' }}></div>
          <div className="timeline-active-indicator" style={{ left: '50%' }}></div>
        </div>
        
        <div className="timeline-events">
          {/* Goal Event */}
          <div className="timeline-event" style={{ left: '15%' }}>
            ⚽
          </div>
          {/* Red Card Event */}
          <div className="timeline-event" style={{ left: '50%' }}>
            <div className="event-red-cards"></div>
          </div>
        </div>
      </div>

    </div>
  );
};
