import React, { useState } from 'react';

export const UserProfile: React.FC = () => {
  const [theme, setTheme] = useState('Dark Mode');
  const [notifications, setNotifications] = useState(true);
  const [favoriteTeam, setFavoriteTeam] = useState('Barcelona');

  return (
    <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#00ff88', marginTop: 0, marginBottom: '20px' }}>User Settings & Profile</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0, color: '#ccc' }}>👤 Personal Info</h3>
          <p style={{ margin: '5px 0' }}><strong>Username:</strong> SoccerAnalyst99</p>
          <p style={{ margin: '5px 0' }}><strong>Email:</strong> analyst@soccerai.com</p>
          <p style={{ margin: '5px 0' }}><strong>Account Type:</strong> Pro Tactician</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0, color: '#ccc' }}>⚙️ Preferences</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
            <span>Favorite Team</span>
            <select 
              value={favoriteTeam} 
              onChange={e => setFavoriteTeam(e.target.value)}
              style={{ background: '#121214', color: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #333' }}
            >
              <option>Barcelona</option>
              <option>Real Madrid</option>
              <option>Manchester City</option>
              <option>Arsenal</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
            <span>Push Notifications</span>
            <button 
              onClick={() => setNotifications(!notifications)}
              style={{ padding: '8px 16px', background: notifications ? '#00ff88' : '#444', color: notifications ? '#000' : '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {notifications ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>App Theme</span>
            <button 
              onClick={() => setTheme(theme === 'Dark Mode' ? 'Light Mode' : 'Dark Mode')}
              style={{ padding: '8px 16px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '20px', cursor: 'pointer' }}
            >
              {theme}
            </button>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0, color: '#ccc' }}>⭐ Saved Matches</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>El Clasico (Oct 24, 2026)</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>Champions League Final (May 2026)</li>
            <li style={{ padding: '10px 0' }}>Man City vs Arsenal (Jan 2026)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
