import React, { useState } from 'react';
import './Onboarding.css';

interface OnboardingProps {
  onComplete: () => void;
  onLogout: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onLogout }) => {
  const roles = ["Fan", "Player", "Coach", "Analyst", "Scout", "Pro"];
  const goals = ["Scouting Players", "Match Prediction", "Tactical Analysis", "Live Stats", "Just for fun"];
  const leagues = ["Premier League", "La Liga", "Serie A", "Bundesliga", "MLS", "Champions League"];

  const [selectedRole, setSelectedRole] = useState(2); // Default to Coach
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);

  const handleNext = () => {
    // In a real app, save this to the backend user profile
    localStorage.setItem('soccerai_onboarding_done', 'true');
    onComplete();
  };

  return (
    <div className="onboarding-fullscreen">
      <button className="onboarding-logout" onClick={onLogout}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Log out
      </button>

      <div className="onboarding-split">
        <div className="onboarding-left">
          <pre className="ascii-art">
{`   _____                             ___  ____
  / ___/____  _____________  _____  /   |/  _/
  \\__ \\/ __ \\/ ___/ ___/ _ \\/ ___/ / /| |/ /  
 ___/ / /_/ / /__/ /__/  __/ /    / ___ / /   
/____/\\____/\\___/\\___/\\___/_/    /_/  |___/   `}
          </pre>
        </div>

        <div className="onboarding-right scrollable">
          <div className="onboarding-questions-container">
            
            <div className="onboarding-question-block">
              <h2 className="onboarding-question">What is your primary role?</h2>
              
              <div className="onboarding-timeline-container">
                <div className="onboarding-labels">
                  {roles.map((role, idx) => (
                    <div 
                      key={role} 
                      className={`onboarding-label ${selectedRole === idx ? 'active' : ''}`}
                      onClick={() => setSelectedRole(idx)}
                    >
                      {selectedRole === idx && <span className="label-bg"></span>}
                      <span className="label-text">{role}</span>
                    </div>
                  ))}
                </div>
                
                <div className="onboarding-track-wrapper">
                  <div className="onboarding-ticks">
                    {Array.from({ length: 65 }).map((_, i) => {
                      const numLabels = roles.length;
                      const tickSpacing = 10;
                      // First label is at tick 5.
                      const isLabelTick = (i - 5) % tickSpacing === 0 && i >= 5 && i < 5 + (numLabels * tickSpacing);
                      const labelIndex = Math.floor((i - 5) / tickSpacing);
                      const isSelected = selectedRole === labelIndex && isLabelTick;

                      return (
                        <div 
                          key={i} 
                          className={`tick ${isLabelTick ? 'major' : 'minor'} ${isSelected ? 'selected' : ''}`}
                          onClick={() => isLabelTick && setSelectedRole(labelIndex)}
                        >
                          {isSelected && <div className="tick-dot"></div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="onboarding-question-block">
              <h2 className="onboarding-question">What is your main goal?</h2>
              <div className="onboarding-chips">
                {goals.map((goal, idx) => (
                  <div 
                    key={goal} 
                    className={`onboarding-chip ${selectedGoal === idx ? 'active' : ''}`}
                    onClick={() => setSelectedGoal(idx)}
                  >
                    {goal}
                  </div>
                ))}
              </div>
            </div>

            <div className="onboarding-question-block">
              <h2 className="onboarding-question">Favorite League?</h2>
              <div className="onboarding-chips">
                {leagues.map((league, idx) => (
                  <div 
                    key={league} 
                    className={`onboarding-chip ${selectedLeague === idx ? 'active' : ''}`}
                    onClick={() => setSelectedLeague(idx)}
                  >
                    {league}
                  </div>
                ))}
              </div>
            </div>

            <button className="onboarding-next-btn" onClick={handleNext}>
              Complete Setup &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
