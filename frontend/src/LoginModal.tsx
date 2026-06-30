import React, { useState } from 'react';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { email, password, username };

      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      localStorage.setItem('soccerai_token', data.token);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      onClose();
    } catch (err: any) {
      // For development, simulate login if backend isn't reachable
      if (err.message.includes('Failed to fetch')) {
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          onClose();
        }, 1500);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-fullscreen">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1 className="auth-left-title">Build the ultimate team and tactical strategy.</h1>
          <p className="auth-left-subtitle">
            Analyze matches, players, and formations with our state-of-the-art AI. Once you're signed in, AI agents generate real-time insights and predictions.
          </p>
          
          <div className="auth-mockup glass-panel">
            <div className="roadmap-col">
              <div className="roadmap-header">Pre-Match <span>2/2</span></div>
              <div className="roadmap-card completed">
                <span className="roadmap-icon">✓</span> Matchup Analysis
              </div>
              <div className="roadmap-card active">
                <span className="roadmap-icon">⚡</span> Tactical Prediction
              </div>
            </div>
            <div className="roadmap-col">
              <div className="roadmap-header">Live Match <span>0/3</span></div>
              <div className="roadmap-card locked">
                <span className="roadmap-icon">🔒</span> Live Events
              </div>
              <div className="roadmap-card locked">
                <span className="roadmap-icon">🔒</span> Player Tracking
              </div>
            </div>
            <div className="roadmap-col">
              <div className="roadmap-header">Post-Match <span>0/1</span></div>
              <div className="roadmap-card locked">
                <span className="roadmap-icon">🔒</span> Final Summary
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-right">        
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="auth-brand">SoccerAI</h2>
            <p className="auth-brand-sub">Let's build your strategy.</p>
          </div>

          <div className="auth-toggle">
            <div className="auth-toggle-track">
              <div className={`auth-toggle-pill ${!isLogin ? 'right' : ''}`}></div>
              <button 
                className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(true); setShowEmailForm(false); }}
              >
                Sign In
              </button>
              <button 
                className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(false); setShowEmailForm(false); }}
              >
                Sign Up
              </button>
            </div>
          </div>

          {!showEmailForm ? (
            <div className="auth-socials">
              <button className="auth-social-btn google-btn">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                {isLogin ? 'Sign in' : 'Sign up'} with Google
              </button>
              <button className="auth-social-btn github-btn">
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
                {isLogin ? 'Sign in' : 'Sign up'} with GitHub
              </button>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <button className="auth-social-btn" onClick={() => setShowEmailForm(true)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Continue with email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-email-form">
              {error && <div className="auth-error">{error}</div>}
              
              {!isLogin && (
                <div className="input-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    placeholder="Enter your username"
                  />
                </div>
              )}
              
              <div className="input-group">
                <label>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
              
              <button type="button" className="auth-back-btn" onClick={() => setShowEmailForm(false)}>
                ← Back to options
              </button>
            </form>
          )}

          <div className="auth-terms">
            By continuing you agree to our<br/>
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
          </div>
        </div>

        <div className="auth-footer">
          The Premier AI Soccer Platform
        </div>
      </div>
    </div>
  );
};
