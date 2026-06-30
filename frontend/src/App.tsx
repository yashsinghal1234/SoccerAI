import { useState, useEffect } from 'react';
import './index.css';
import { LoginModal } from './LoginModal';
import { Dashboard } from './Dashboard';
import { FantasyDashboard } from './FantasyDashboard';
import { Onboarding } from './Onboarding';

const NodeScore = ({ finalQ, finalR, finalD, delayMs }: { finalQ: number, finalR: number, finalD: number, delayMs: number }) => {
  const [visible, setVisible] = useState(false);
  const [evaluating, setEvaluating] = useState(true);
  const [scores, setScores] = useState({ q: 0, r: 0, d: 0 });

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
      
      let ticks = 0;
      const interval = setInterval(() => {
        setScores({
          q: Math.floor(Math.random() * (finalQ + 3)),
          r: Math.floor(Math.random() * (finalR + 3)),
          d: Math.floor(Math.random() * (finalD + 3)),
        });
        ticks++;
        if (ticks > 15) {
          clearInterval(interval);
          setEvaluating(false);
          setScores({ q: finalQ, r: finalR, d: finalD });
        }
      }, 100);
      
    }, delayMs);
    return () => clearTimeout(showTimer);
  }, [finalQ, finalR, finalD, delayMs]);

  if (!visible) return null;

  return (
    <div className={`node-score ${evaluating ? 'evaluating' : 'settled'}`}>
      <span className="score-dot orange"></span> {scores.q}
      <span className="score-icon">↻</span> {scores.r}
      <span className="score-dot green"></span> {scores.d}
    </div>
  );
};

const WORD_SETS = [
  [
    { word: "MESSI", row: 2, col: 4 },
    { word: "RONALDO", row: 4, col: 7 },
    { word: "GUARDIOLA", row: 6, col: 2 },
    { word: "ZIDANE", row: 8, col: 11 }
  ],
  [
    { word: "MBAPPE", row: 1, col: 5 },
    { word: "HAALAND", row: 3, col: 8 },
    { word: "ANCELOTTI", row: 6, col: 4 },
    { word: "NEYMAR", row: 8, col: 2 }
  ],
  [
    { word: "KLOPP", row: 2, col: 10 },
    { word: "BELLINGHAM", row: 4, col: 3 },
    { word: "DEBRUYNE", row: 7, col: 8 },
    { word: "SALAH", row: 9, col: 2 }
  ]
];

const generateGrid = (wordSet: {word: string, row: number, col: number}[]) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const newGrid = Array(10).fill(null).map(() => 
    Array(19).fill(null).map(() => letters.charAt(Math.floor(Math.random() * letters.length)))
  );
  
  wordSet.forEach(({ word, row, col }) => {
    for (let i = 0; i < word.length; i++) {
      newGrid[row][col + i] = word[i];
    }
  });
  
  return newGrid;
};

function WordSearchSection() {
  const [phase, setPhase] = useState({ setIdx: 0, highlightCount: 0 });
  const [grid, setGrid] = useState(() => generateGrid(WORD_SETS[0]));

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase.highlightCount < 4) {
      timeoutId = setTimeout(() => {
        setPhase(p => ({ ...p, highlightCount: p.highlightCount + 1 }));
      }, 600);
    } else {
      timeoutId = setTimeout(() => {
        const nextIdx = (phase.setIdx + 1) % WORD_SETS.length;
        setGrid(generateGrid(WORD_SETS[nextIdx]));
        setPhase({ setIdx: nextIdx, highlightCount: 0 });
      }, 2500);
    }

    return () => clearTimeout(timeoutId);
  }, [phase]);

  const currentSet = WORD_SETS[phase.setIdx];
  const activeHighlights = currentSet.slice(0, phase.highlightCount);

  const isHighlighted = (r: number, c: number) => {
    return activeHighlights.some(h => r === h.row && c >= h.col && c < h.col + h.word.length);
  };

  return (
    <section className="word-search-section">
      <h2 className="ws-heading">Everything you need to master the pitch</h2>
      <div className="ws-grid">
        {activeHighlights.map((h) => (
          <div 
            key={h.word} 
            className="ws-highlight"
            style={{
              gridRow: h.row + 1,
              gridColumn: `${h.col + 1} / ${h.col + 1 + h.word.length}`
            }}
          />
        ))}
        {grid.map((row, r) => (
          row.map((char, c) => (
            <div 
              key={`char-${r}-${c}`} 
              className={`ws-char ${isHighlighted(r, c) ? 'highlighted' : ''}`}
              style={{ gridRow: r + 1, gridColumn: c + 1 }}
            >
              {char}
            </div>
          ))
        ))}
      </div>
    </section>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('soccerai_token');
    const onboardingDone = localStorage.getItem('soccerai_onboarding_done');
    
    if (token) {
      setIsAuthenticated(true);
      if (onboardingDone !== 'true') {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('soccerai_token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    const onboardingDone = localStorage.getItem('soccerai_onboarding_done');
    if (onboardingDone !== 'true') {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (isAuthenticated) {
    if (showOnboarding) {
      return <Onboarding onComplete={handleOnboardingComplete} onLogout={handleLogout} />;
    }
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="page-wrapper">
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      
      <nav className={`sticky-nav ${isScrolled ? 'visible' : ''}`}>
        <div className="sticky-nav-container">
          <div className="logo">SoccerAI</div>
          <div className="nav-center">
            <div className="nav-links">
              <a href="#fans">For Fans</a>
              <span className="divider">|</span>
              <a href="#coaches">For Coaches</a>
              <span className="divider">|</span>
              <a href="#pre-match">Pre-Match</a>
              <span className="divider">|</span>
              <a href="#live">Live</a>
              <span className="divider">|</span>
              <a href="#post-match">Post-Match</a>
              <span className="divider">|</span>
              <a href="#chat">Chat</a>
              <span className="divider">|</span>
              <a href="#pricing">Pricing</a>
            </div>
          </div>
          <div className="nav-actions">
            <button className="btn btn-outline" onClick={() => setIsLoginOpen(true)}>Log in</button>
            <button className="btn btn-dark">Start Analyzing</button>
          </div>
        </div>
      </nav>
      <header className="hero-banner">
        <div className="pixel-bg"></div>
        <div className="container">
          <nav className="nav-bar">
            <div className="logo">SoccerAI</div>
            <div className="nav-center">
              <div className="nav-links">
                <a href="#fans">For Fans</a>
                <span className="divider">|</span>
                <a href="#coaches">For Coaches</a>
                <span className="divider">|</span>
                <a href="#pre-match">Pre-Match</a>
                <span className="divider">|</span>
                <a href="#live">Live</a>
                <span className="divider">|</span>
                <a href="#post-match">Post-Match</a>
                <span className="divider">|</span>
                <a href="#chat">Chat</a>
                <span className="divider">|</span>
                <a href="#pricing">Pricing</a>
              </div>
            </div>
            <div className="nav-actions">
              <button className="btn btn-outline" onClick={() => setIsLoginOpen(true)}>Log in</button>
              <button className="btn btn-primary">Analyze Match</button>
            </div>
          </nav>

          <main className="hero-section">
            <div className="hero-content">
              <h1>Understand every soccer match with end-to-end AI</h1>
              <p className="subtitle">
                Get matchup analysis before kickoff, live real-time commentary during the game, and tactical breakdowns after the final whistle.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary">Start Analyzing</button>
                <button className="btn btn-accent glass-btn">Explore Dashboard</button>
              </div>
            </div>

            <div className="task-list">
              <div className="task-card glass">
                <div className="status-dot completed"></div>
                <div className="task-content">
                  <span className="task-status-text">Analysis Completed</span>
                  <span className="task-title">Pre-Match Prediction Narrative</span>
                </div>
              </div>

              <div className="task-card glass">
                <div className="status-dot completed"></div>
                <div className="task-content">
                  <span className="task-status-text">Vision AI Analysis</span>
                  <span className="task-title">Tactical Breakdown Generated</span>
                </div>
              </div>

              <div className="task-card glass">
                <div className="status-dot running"></div>
                <div className="task-content">
                  <span className="task-status-text">Streaming Live</span>
                  <span className="task-title">Real-time AI Commentary</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </header>

      <section className="explainer-section">
        <h2>SoccerAI is an end-to-end intelligence platform<br/>designed to analyze matches before, during, and after they happen</h2>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-container">
          {/* Left side: Mind map */}
          <div className="dashboard-left">
            <div className="mindmap-wrapper">
              <div className="mindmap-center">
                <span className="sunflower">⚽</span>
                <span className="center-text">SoccerAI</span>
              </div>
              
              <div className="mindmap-node node-legal">
                <NodeScore finalQ={3} finalR={2} finalD={2} delayMs={1000} />
                Before Match
              </div>
              <div className="mindmap-node node-finance">Live Dashboard</div>
              <div className="mindmap-node node-marketing">
                <NodeScore finalQ={4} finalR={4} finalD={3} delayMs={1800} />
                Vision Analysis
              </div>
              <div className="mindmap-node node-support">Matchup Analysis</div>
              <div className="mindmap-node node-engineering">
                <NodeScore finalQ={2} finalR={1} finalD={1} delayMs={2000} />
                After Match
              </div>
              <div className="mindmap-node node-operations">Real-time Events</div>
              <div className="mindmap-node node-design">AI Chat</div>
              <div className="mindmap-node node-sales">Post-Match Summary</div>
              
              {/* Connecting lines drawn via CSS */}
              <div className="mindmap-lines"></div>
              
              {/* Flowing Data Streams */}
              <div className="data-stream stream-bottom">
                <div className="data-dot"></div>
                <div className="data-dot"></div>
                <div className="data-dot"></div>
              </div>
              <div className="data-stream stream-right">
                <div className="data-dot"></div>
                <div className="data-dot"></div>
                <div className="data-dot"></div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-right">
            <div className="sidebar-tabs">
              <button className="tab active">Home</button>
              <button className="tab">Company</button>
              <button className="tab">SoccerAI</button>
              <button className="tab">Tasks</button>
              <button className="tab">Library</button>
            </div>
            
            <div className="sidebar-content">
              <div className="chat-bubble agent">
                <p><span className="agent-icon">∷</span> Great question — analyzing the upcoming match between Real Madrid and Barcelona. I'm kicking off the Matchup Analysis to look at recent team form, injuries, and tactics. <strong>I'll come back with a clear prediction narrative for the game.</strong></p>
                <div className="task-status">
                  <span className="task-name">✓ Matchup Agent <span className="task-desc">Analyzing team form and injurie...</span></span>
                  <span className="status-pill running">Running</span>
                </div>
                <div className="task-status">
                  <span className="task-name">⊚ Prediction Agent <span className="task-desc">Generating narrative prediction...</span></span>
                  <span className="status-pill queued">Queued</span>
                </div>
              </div>

              <div className="chat-bubble user">
                <p>Can you take a look at this image from the match and tell me what formation they're using?</p>
              </div>

              <div className="chat-bubble agent">
                <p><span className="agent-icon">∷</span> Good spot. The Vision Agent is analyzing the formation now. It looks like a 4-3-3, with the wingers pushing high to exploit space behind the fullbacks. <strong>I'll generate a full tactical breakdown to summarize their attacking strategy.</strong></p>
                <div className="task-status">
                  <span className="task-name">✓ Vision Agent <span className="task-desc">Analyzing player positioning...</span></span>
                  <span className="status-pill running">Running</span>
                </div>
                <div className="task-status">
                  <span className="task-name">⊚ Tactics Agent <span className="task-desc">Drafting tactical breakdown...</span></span>
                  <span className="status-pill queued">Queued</span>
                </div>
              </div>

              <div className="chat-bubble agent typing">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
            
            <div className="chat-input-area">
              <input type="text" placeholder="Ask SoccerAI a question or upload a match image..." />
              <button className="send-btn">↑</button>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-col">
            <strong>Agentic analysis — </strong> SoccerAI is designed like a real coaching staff, with scouts, tacticians, and analysts sharing context.
          </div>
          <div className="feature-col">
            <strong>Human in the loop — </strong> Agents work alongside you, requiring approval before finalizing tactical breakdowns or predictions.
          </div>
          <div className="feature-col">
            <strong>Fully extensible — </strong> Easily connect custom match data APIs, custom tactics, or your entire club's historical database.
          </div>
        </div>
        <div className="features-cta">
          <p>Bring your club's context into the platform and start with the next concrete match.</p>
          <button className="btn btn-dark">Start in SoccerAI</button>
        </div>
      </section>

      <section className="guides-section">
        <div className="guides-header">
          <h2>Learn how to analyze a match</h2>
          <p>Read the guide, then let SoccerAI turn each phase into tactical breakdowns, tasks, and agents.</p>
          <button className="btn btn-dark">Put the guide to work</button>
        </div>
        
        <div className="guides-grid">
          <div className="guide-card">
            <h3 className="guide-title">Chapter 1<br/>How To Scout</h3>
            <hr className="guide-divider" />
            <div className="guide-subtitle">Chapter I</div>
            <div className="guide-image rocket-bg"></div>
          </div>
          <div className="guide-card">
            <h3 className="guide-title">Chapter 2<br/>How To Break Down Tactics</h3>
            <hr className="guide-divider" />
            <div className="guide-subtitle">Chapter II</div>
            <div className="guide-image factory-bg"></div>
          </div>
          <div className="guide-card">
            <h3 className="guide-title">Chapter 3<br/>How To Predict</h3>
            <hr className="guide-divider" />
            <div className="guide-subtitle">Chapter III</div>
            <div className="guide-image radar-bg"></div>
          </div>
          <div className="guide-card">
            <h3 className="guide-title">Chapter 4<br/>How To Manage</h3>
            <hr className="guide-divider" />
            <div className="guide-subtitle">Chapter IV</div>
            <div className="guide-image train-bg"></div>
          </div>
        </div>
      </section>

      <WordSearchSection />

      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-left">
            <h2 className="footer-heading">
              Understand every soccer match<br />
              <span className="footer-heading-light">with end-to-end AI</span>
            </h2>
            
            <div className="footer-nav-horizontal">
              <a href="#">How to Scout</a>
              <a href="#">How to Break Down</a>
              <a href="#">How to Predict</a>
              <a href="#">How to Manage</a>
            </div>

            <div className="footer-links-grid">
              <div className="footer-links-col">
                <a href="#">Homepage</a>
                <a href="#">Resources</a>
                <a href="#">Pricing</a>
                <a href="#">Careers</a>
              </div>
              <div className="footer-links-col">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Docs</a>
              </div>
            </div>

            <div className="footer-socials">
              <button className="social-btn">X</button>
              <button className="social-btn">in</button>
            </div>

            <div className="footer-bottom">
              <p className="footer-security">Automate with <span className="soc-badge">🔒 SOC 2</span> compliant security</p>
              <p className="footer-copyright">Copyright © 2026 SoccerAI</p>
              <p className="footer-design">Design by SoccerAI</p>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-card">
              <div className="footer-card-image">
                <div className="footer-card-overlay">
                  <h3>SoccerAI is an end-to-end<br/>intelligence platform</h3>
                  <p>designed to analyze matches<br/>before, during, and after.</p>
                  <button className="btn-run-club">Start Analyzing</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="pixel-grass-bar">
        <span>Made with ❤️ by Yash Singhal</span>
      </div>
    </div>
  );
}

export default App;
