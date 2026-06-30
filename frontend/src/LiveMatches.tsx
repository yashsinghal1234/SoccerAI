import React, { useEffect, useState } from 'react';
import './LiveMatches.css';
import { LiveMatchDetail } from './LiveMatchDetail';

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

export const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/matches');
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Failed to fetch matches", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
    
    // Poll every 10 seconds for live updates
    const interval = setInterval(fetchMatches, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="analysis-loader" style={{ position: 'relative', zIndex: 10 }}>
        <div className="spinner"></div>
        <p>Loading real-time matches...</p>
      </div>
    );
  }

  if (selectedMatch) {
    return <LiveMatchDetail match={selectedMatch} onBack={() => setSelectedMatch(null)} />;
  }

  return (
    <div className="live-matches-container" style={{ position: 'relative', zIndex: 10 }}>
      <h2 className="dashboard-title">Live & Upcoming Matches</h2>
      
      <div className="matches-grid">
        {matches.map(match => (
          <div 
            key={match.id} 
            className={`match-card glass-panel ${match.status === 'LIVE' ? 'is-live' : ''}`}
            onClick={() => setSelectedMatch(match)}
            style={{ cursor: 'pointer' }}
          >
            
            <div className="match-header">
              <span className="match-league">{match.league}</span>
              {match.status === 'LIVE' && (
                <span className="live-indicator"><span className="pulse-dot"></span> {match.minute}'</span>
              )}
              {match.status === 'PRE_MATCH' && <span className="status-badge">UPCOMING</span>}
              {match.status === 'FINISHED' && <span className="status-badge">FT</span>}
            </div>

            <div className="match-teams">
              <div className="team">
                <span className="team-name">{match.homeTeam}</span>
                <span className="team-score">{match.homeScore}</span>
              </div>
              <div className="team">
                <span className="team-name">{match.awayTeam}</span>
                <span className="team-score">{match.awayScore}</span>
              </div>
            </div>

            {match.status === 'LIVE' && match.possession && (
              <div className="match-stats-mini">
                <div className="stat-label">Possession</div>
                <div className="prob-bar">
                  <div className="prob-fill home" style={{ width: `${match.possession.home}%` }}>{match.possession.home}%</div>
                  <div className="prob-fill away" style={{ width: `${match.possession.away}%` }}>{match.possession.away}%</div>
                </div>
              </div>
            )}

            {match.aiInsight && (
              <div className="match-ai-insight">
                <div className="agent-icon">🧠</div>
                <p>{match.aiInsight}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
