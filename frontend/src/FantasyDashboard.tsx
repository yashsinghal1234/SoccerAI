import React, { useState } from 'react';
import './FantasyDashboard.css';

export const FantasyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('MY TEAMS');
  
  return (
    <div className="fantasy-app">
      {/* Main Grid */}
      <main className="fantasy-main">
        
        {/* LEFT SIDEBAR */}
        <aside className="fantasy-sidebar-left">
          <div className="sidebar-section">
            <h3 className="section-title">Game</h3>
            <div className="tournament-card">
              <div className="tourney-header">Tournament Name</div>
              <div className="tourney-prize-icon">🏆</div>
              <div className="tourney-prize-title">Prizepool</div>
              <div className="tourney-prize-amount">$1000</div>
              
              <ul className="tourney-stats">
                <li><span>Buy in</span> <span>$10</span></li>
                <li><span>Entrants</span> <span>12</span></li>
                <li><span>Starts</span> <span>12</span></li>
                <li><span>Ends</span> <span>12</span></li>
              </ul>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title">My teams</h3>
            <div className="team-list">
              {[12, 2, 13].map((pts, idx) => (
                <div key={idx} className="my-team-item">
                  <div className="my-team-icon shield"></div>
                  <div className="my-team-info">
                    <span className="name">My Team Name</span>
                    <span className="rank">#{pts === 12 ? 12 : pts === 2 ? 4 : 2}</span>
                  </div>
                  <div className="my-team-pts">{pts}p &gt;</div>
                </div>
              ))}
            </div>
            <button className="fantasy-btn-primary">CREATE NEW TEAM</button>
          </div>
        </aside>

        {/* CENTER COLUMN */}
        <section className="fantasy-center">
          <div className="pitch-header">
            <div className="dropdown">Team Name ▼</div>
            <div className="budget">$1454</div>
            <div className="captain">Captain Name</div>
          </div>

          {/* 3D Pitch Area */}
          <div className="pitch-container">
            <div className="pitch-3d">
              <div className="pitch-surface">
                <div className="pitch-lines"></div>
                {/* Player Nodes (4-4-2) */}
                <div className="formation-row forwards">
                  <div className="player-node">+</div>
                  <div className="player-node">+</div>
                </div>
                <div className="formation-row midfielders">
                  <div className="player-node">+</div>
                  <div className="player-node">+</div>
                  <div className="player-node">+</div>
                  <div className="player-node">+</div>
                </div>
                <div className="formation-row defenders">
                  <div className="player-node">+</div>
                  <div className="player-node">+</div>
                  <div className="player-node">+</div>
                  <div className="player-node">+</div>
                </div>
                <div className="formation-row goalkeeper">
                  <div className="player-node">+</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rankings & Formations */}
          <div className="center-bottom-panels">
            <div className="rankings-panel">
              <div className="panel-title">Rankings</div>
              <div className="rankings-stats">
                <div className="stat-box">
                  <span className="val">12</span>
                  <span className="lbl">Points</span>
                </div>
                <div className="stat-box">
                  <span className="val">54</span>
                  <span className="lbl">Rank</span>
                </div>
                <div className="stat-box">
                  <span className="val">125</span>
                  <span className="lbl">Value</span>
                </div>
              </div>
              <div className="mock-graph"></div>
            </div>

            <div className="formations-panel">
              <div className="panel-title">Formation</div>
              <div className="formation-selector">
                <div className="form-item active">
                  <div className="dots-icon f442"></div>
                  <span>4-4-2</span>
                </div>
                <div className="form-item">
                  <div className="dots-icon"></div>
                  <span>3-5-2</span>
                </div>
                <div className="form-item">
                  <div className="dots-icon"></div>
                  <span>4-5-1</span>
                </div>
                <div className="form-item">
                  <div className="dots-icon"></div>
                  <span>4-3-3</span>
                </div>
              </div>

              <div className="prizes-section">
                <div className="panel-title">Prizes</div>
                <div className="prizes-icons">
                  {Array(8).fill('⭐').map((icon, i) => (
                    <div key={i} className="prize-icon-box">{icon}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="fantasy-sidebar-right">
          <div className="filters">
            <div className="filter-row">
              <select><option>la liga</option></select>
              <div className="pos-filters">
                <span className="active">ALL</span>
                <span>GK</span><span>DEF</span><span>MID</span><span>FOR</span>
              </div>
            </div>
            <div className="filter-row">
              <select><option>all Teams</option></select>
              <input type="text" placeholder="search" className="search-input"/>
            </div>
            <div className="slider-container">
               <input type="range" className="slider" />
            </div>
          </div>

          <div className="player-list-header">
            <span className="col-player">Player</span>
            <div className="col-stats">
              <span>Price</span><span>Y</span><span>R</span><span>G</span><span>A</span>
            </div>
          </div>

          <div className="player-list">
            <div className="position-group">
              <div className="pos-header">Goalkeepers</div>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="player-row">
                  <div className="player-shirt">👕</div>
                  <div className="player-info">
                    <span className="p-name">Marconi Macchi...</span>
                    <span className="p-role">Goalkeeper</span>
                  </div>
                  <div className="p-stats">
                    <span className="p-price">$10</span>
                    <span>3</span><span>3</span><span>4</span><span>8</span><span>13</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="position-group">
              <div className="pos-header">Defenders</div>
              {[1,2,3].map(i => (
                <div key={i} className="player-row">
                  <div className="player-shirt">👕</div>
                  <div className="player-info">
                    <span className="p-name">Marconi Macchi...</span>
                    <span className="p-role">Defender</span>
                  </div>
                  <div className="p-stats">
                    <span className="p-price">$10</span>
                    <span>3</span><span>3</span><span>4</span><span>8</span><span>13</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="fantasy-footer">
        <div className="fixtures-header">
          <span className="brand-accent">FIXTURES</span>
          <div className="fixture-tabs">
            <span className="active">UPCOMING</span>
            <span>FINISHED</span>
          </div>
        </div>
        <div className="fixtures-carousel">
          <div className="nav-arrow">&lt;</div>
          <div className="fixtures-grid">
            {[1,2,3,4].map(col => (
              <div key={col} className="fixture-col">
                {[1,2,3].map(row => (
                  <div key={row} className="fixture-card">
                    <span className="f-team">Name A Lorem</span>
                    <span className="f-logo">🛡️</span>
                    <span className="f-score">2:3</span>
                    <span className="f-logo">⚔️</span>
                    <span className="f-team">Name B</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="nav-arrow">&gt;</div>
        </div>
      </footer>
    </div>
  );
};
