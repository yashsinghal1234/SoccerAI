import React, { useState, useEffect } from 'react';

export const PostMatch: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI post-match analysis generation delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 20px auto' }}></div>
        <p>AI is generating post-match summaries and player ratings...</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
      <h2 style={{ color: '#00ff88', marginTop: 0, marginBottom: '20px' }}>Post-Match Analysis</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0 }}>📝 Match Summary</h3>
          <p style={{ lineHeight: '1.6', color: '#ccc' }}>
            Barcelona delivered a commanding performance tonight, maintaining 64% possession and completely dictating the tempo. 
            The high press effectively neutralized Real Madrid's transition game. The turning point was the tactical substitution 
            in the 60th minute which overloaded the left flank, directly resulting in the decisive goal.
          </p>
          <p style={{ lineHeight: '1.6', color: '#ccc' }}>
            Defensively, the backline remained compact and restricted the opposition to low-xG chances from outside the box.
          </p>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginTop: 0 }}>📊 Advanced Stats</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ccc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Expected Goals (xG):</span> <strong>2.14 - 0.82</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Possession Efficiency:</span> <strong>88%</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>High Press Success:</span> <strong>64%</strong></li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Passes Completed:</span> <strong>540 - 320</strong></li>
          </ul>
        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>⭐ Player Ratings (AI Generated)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {[
          { name: 'R. Lewandowski', rating: 8.5, note: 'Clinical finish, great link-up' },
          { name: 'Pedri', rating: 9.0, note: 'Controlled the midfield maestro' },
          { name: 'J. Kounde', rating: 7.5, note: 'Solid defensive output' },
          { name: 'M. ter Stegen', rating: 8.0, note: 'Crucial saves in 1st half' }
        ].map((p, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #00ff88' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '5px' }}>
              <span>{p.name}</span>
              <span style={{ color: '#00ff88' }}>{p.rating}</span>
            </div>
            <div style={{ fontSize: '0.85em', color: '#aaa' }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
