import { useState, useEffect } from 'react';
import './Dashboard.css';
import { PreMatchAnalysis } from './PreMatchAnalysis';
import { LiveMatches } from './LiveMatches';

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
            </div>
          </div>
          <div className="nav-actions">
            <button className="btn btn-outline" onClick={onLogout}>Log Out</button>
            <button className="btn btn-primary">Profile</button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main container">
        {activeTab === 'live' && <LiveMatches />}
        {activeTab === 'pre-match' && <PreMatchAnalysis />}
      </main>
    </div>
  );
};
