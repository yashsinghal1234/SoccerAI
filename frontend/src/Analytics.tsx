import React from 'react';

export const Analytics: React.FC = () => {
  return (
    <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
      <h2 style={{ color: '#00ff88', marginTop: 0, marginBottom: '20px' }}>Global Analytics & Trends</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        {/* Top Scorer Card */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0, color: '#ccc', fontSize: '16px' }}>👟 Player Form (Last 5)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>1. E. Haaland</span>
              <span style={{ color: '#00ff88', fontWeight: 'bold' }}>8 Goals</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>2. K. Mbappe</span>
              <span style={{ color: '#00ff88', fontWeight: 'bold' }}>6 Goals</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>3. L. Yamal</span>
              <span style={{ color: '#00ff88', fontWeight: 'bold' }}>5 Assists</span>
            </div>
          </div>
        </div>

        {/* Possession Stats */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0, color: '#ccc', fontSize: '16px' }}>🎯 Highest Possession Avg</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#00ff88' }}></div>
              </div>
              <span style={{ fontSize: '14px', width: '80px' }}>Man City (68%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '64%', height: '100%', background: '#00ff88' }}></div>
              </div>
              <span style={{ fontSize: '14px', width: '80px' }}>Barcelona (64%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: '#00ff88' }}></div>
              </div>
              <span style={{ fontSize: '14px', width: '80px' }}>Arsenal (60%)</span>
            </div>
          </div>
        </div>

        {/* Clean Sheets */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0, color: '#ccc', fontSize: '16px' }}>🛡️ Clean Sheets Tracking</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>A. Becker (LIV)</span>
              <span style={{ color: '#00ff88', fontWeight: 'bold' }}>12</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>D. Raya (ARS)</span>
              <span style={{ color: '#00ff88', fontWeight: 'bold' }}>10</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>M. Maignan (MIL)</span>
              <span style={{ color: '#00ff88', fontWeight: 'bold' }}>9</span>
            </div>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ marginTop: 0, color: '#ccc', fontSize: '16px' }}>📈 League Standings (Simulated)</h3>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th style={{ padding: '10px 0' }}>Pos</th>
              <th>Club</th>
              <th>Pld</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '10px 0' }}>1</td>
              <td>Barcelona</td>
              <td>11</td>
              <td>+24</td>
              <td style={{ color: '#00ff88', fontWeight: 'bold' }}>30</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '10px 0' }}>2</td>
              <td>Real Madrid</td>
              <td>11</td>
              <td>+15</td>
              <td style={{ color: '#00ff88', fontWeight: 'bold' }}>24</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 0' }}>3</td>
              <td>Atletico Madrid</td>
              <td>11</td>
              <td>+8</td>
              <td style={{ color: '#00ff88', fontWeight: 'bold' }}>20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
