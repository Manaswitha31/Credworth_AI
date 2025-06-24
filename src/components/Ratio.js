import React, { useState } from 'react';
import './Ratio.css';
import SearchBar from './SearchBar';

const chatIcon = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="14" height="14" rx="7" fill="#F4EBFF"/>
    <path d="M7 9h6M7 12h4" stroke="#7B3FFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 15v-7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7l-2 3z" stroke="#7B3FFF" strokeWidth="1.5" fill="#fff"/>
  </svg>
);

function Ratio() {
  const [animate, setAnimate] = useState(true);
  const [searchValue, setSearchValue] = useState('Calculate Authorized to Paid-up Capital Ratio of this company?');

  const handleSendClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50); // restart animation
  };
  return (
    <section className="ratio">
      {/* Decorative chat bubble vector in top left */}
      <img src="/images/chat.svg" alt="Chat Vector" className="ratio-vector-chat" style={{position: 'absolute', top: 0, left: 0, zIndex: 1}} aria-hidden="true" />
      {/* FrameLock SVG in bottom left */}
      <img src="/images/FrameLock.svg" alt="Frame Lock" className="ratio-framelock-svg" />
      
      <div className="ratio-network-bg" aria-hidden="true">
        <svg width="500" height="180" viewBox="0 0 500 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="60" r="6" fill="#6557FF"/>
          <circle cx="120" cy="40" r="5" fill="#50C878"/>
          <circle cx="220" cy="120" r="5" fill="#8a2be2"/>
          <circle cx="400" cy="80" r="6" fill="#6557FF"/>
          <circle cx="460" cy="160" r="5" fill="#50C878"/>
          <circle cx="320" cy="160" r="4" fill="#8a2be2"/>
          <circle cx="80" cy="160" r="4" fill="#8a2be2"/>
          <line x1="40" y1="60" x2="120" y2="40" stroke="#6557FF" strokeWidth="2"/>
          <line x1="120" y1="40" x2="220" y2="120" stroke="#8a2be2" strokeWidth="2"/>
          <line x1="220" y1="120" x2="400" y2="80" stroke="#50C878" strokeWidth="2"/>
          <line x1="400" y1="80" x2="460" y2="160" stroke="#6557FF" strokeWidth="2"/>
          <line x1="220" y1="120" x2="320" y2="160" stroke="#6557FF" strokeWidth="2"/>
          <line x1="120" y1="40" x2="80" y2="160" stroke="#50C878" strokeWidth="2"/>
        </svg>
      </div>
      <div className="container">
        <div className="ratio-item">
          <div className="ratio-content">
            <h3>Ask me to calculate a new ratio & explain a ratio?</h3>
          </div>
          <div className="ratio-image-card" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <img
              src="/images/ratio-bar-chart.png"
              alt="Ratio Bar Chart"
              className={`strength-screenshot-img img-center${animate ? ' animate-in' : ''}`}
              style={{ zIndex: 2 }}
            />
            {/* <SearchBar
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              labelText="Chat"
              labelBg="#F4EBFF"
              labelColor="#7B3FFF"
              labelIcon={chatIcon}
              onSend={handleSendClick}
            /> */}
            {/* You can add ratio-related images or content here if needed */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ratio; 