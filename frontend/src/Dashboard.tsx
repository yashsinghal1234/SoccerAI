import { useState, useEffect } from 'react';
import './Dashboard.css';
import { PreMatchAnalysis } from './PreMatchAnalysis';
import { LiveMatches } from './LiveMatches';
import { AgentChat } from './AgentChat';
import { PostMatch } from './PostMatch';
import { VisionAnalysis } from './VisionAnalysis';
import { Analytics } from './Analytics';
import { UserProfile } from './UserProfile';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('live');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="dashboard-layout page-wrapper">
      <nav className={`sticky-nav ${isScrolled ? 'visible' : 'interior-top'}`}>
        <div className="sticky-nav-container">
          <div className="logo" onClick={() => window.scrollTo(0,0)} style={{cursor: 'pointer'}}>SoccerAI</div>
          <div className="nav-center">
            <div className="nav-links">
              <a href="#" className={activeTab === 'live' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('live'); }}>Live Matches</a>
              <span className="divider">|</span>
              <a href="#" className={activeTab === 'pre-match' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('pre-match'); }}>Pre-Match Prediction</a>
              <span className="divider">|</span>
              <a href="#" className={activeTab === 'post-match' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('post-match'); }}>Post-Match</a>
              <span className="divider">|</span>
              <a href="#" className={activeTab === 'chat' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('chat'); }}>Agent Q&A</a>
              <span className="divider">|</span>
              <a href="#" className={activeTab === 'vision' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('vision'); }}>Vision Analysis</a>
              <span className="divider">|</span>
              <a href="#" className={activeTab === 'analytics' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('analytics'); }}>Analytics</a>
            </div>
          </div>
          <div className="nav-actions">
            <button className="btn btn-outline" onClick={onLogout}>Log Out</button>
            <button className="btn btn-primary" onClick={() => setActiveTab('profile')}>Profile</button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main container">
        {activeTab === 'live' && <LiveMatches />}
        {activeTab === 'pre-match' && <PreMatchAnalysis />}
        {activeTab === 'post-match' && <PostMatch />}
        {activeTab === 'chat' && <AgentChat />}
        {activeTab === 'vision' && <VisionAnalysis />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'profile' && <UserProfile />}
      </main>
    </div>
  );
};
