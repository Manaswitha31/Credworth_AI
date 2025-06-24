import React, { useState } from 'react';
import './Strengths.css';
import SearchBar from './SearchBar';

const summaryIcon = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="14" height="14" rx="3" fill="#D1FADF"/>
    <rect x="6" y="7" width="8" height="1.5" rx="0.75" fill="#16B364"/>
    <rect x="6" y="10" width="5" height="1.5" rx="0.75" fill="#16B364"/>
    <rect x="6" y="13" width="3" height="1.5" rx="0.75" fill="#16B364"/>
  </svg>
);

function Strengths() {
  const [animate1, setAnimate1] = useState(true);
  const [animate2, setAnimate2] = useState(true);
  const [searchValue1, setSearchValue1] = useState('Tell me about CBL DATA SCIENCE PRIVATE LIMITED');
  const [searchValue2, setSearchValue2] = useState('Who are the current directors of this company?');

  const handleSendClick1 = () => {
    setAnimate1(false);
    setTimeout(() => setAnimate1(true), 50);
  };
  const handleSendClick2 = () => {
    setAnimate2(false);
    setTimeout(() => setAnimate2(true), 50);
  };

  return (
    <section className="strengths">
      {/* Decorative vector illustrations in corners - same as About Me */}
      <svg className="aboutme-vector aboutme-vector-lock" width="200" height="200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="rotate(-25 65 60)">
          <rect x="18" y="50" width="80" height="50" rx="16" stroke="#6557FF" strokeWidth="1" fill="none"/>
          <ellipse cx="58" cy="75" rx="12" ry="12" stroke="#6557FF" strokeWidth="1" fill="none"/>
          {/* <path d="M58 50V32a24 24 0 1 1 48 0v18" stroke="##6557FF" strokeWidth="1" fill="none"/> */}
          <line x1="60" y1="50" x2="60" y2="32" stroke="#6557FF" strokeWidth="1"/>
          <circle cx="60" cy="28" r="3" stroke="#6557FF" strokeWidth="1" fill="none"/>
        </g>
      </svg>
      <svg className="aboutme-vector aboutme-vector-bot" width="200" height="200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="rotate(20 80 100)">
          <rect x="40" y="50" width="60" height="36" rx="12" stroke="#7B3FFF" strokeWidth="1" fill="none"/>
          <circle cx="60" cy="68" r="7" stroke="#7B3FFF" strokeWidth="1" fill="none"/>
          <circle cx="80" cy="68" r="7" stroke="#7B3FFF" strokeWidth="1" fill="none"/>
          <line x1="70" y1="50" x2="70" y2="32" stroke="#7B3FFF" strokeWidth="1"/>
          <circle cx="70" cy="26" r="6" stroke="#7B3FFF" strokeWidth="1" fill="none"/>
          <rect x="52" y="90" width="36" height="16" rx="8" stroke="#7B3FFF" strokeWidth="1" fill="none"/>
        </g>
      </svg>
      <div className="strengths-network-bg" aria-hidden="true">
        <svg width="600" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="6" fill="#6557FF"/>
          <circle cx="180" cy="40" r="5" fill="#50C878"/>
          <circle cx="320" cy="120" r="5" fill="#8a2be2"/>
          <circle cx="500" cy="80" r="6" fill="#6557FF"/>
          <circle cx="560" cy="180" r="5" fill="#50C878"/>
          <circle cx="400" cy="180" r="4" fill="#8a2be2"/>
          <circle cx="120" cy="180" r="4" fill="#8a2be2"/>
          <line x1="60" y1="60" x2="180" y2="40" stroke="#6557FF" strokeWidth="2"/>
          <line x1="180" y1="40" x2="320" y2="120" stroke="#8a2be2" strokeWidth="2"/>
          <line x1="320" y1="120" x2="500" y2="80" stroke="#50C878" strokeWidth="2"/>
          <line x1="500" y1="80" x2="560" y2="180" stroke="#6557FF" strokeWidth="2"/>
          <line x1="320" y1="120" x2="400" y2="180" stroke="#6557FF" strokeWidth="2"/>
          <line x1="180" y1="40" x2="120" y2="180" stroke="#50C878" strokeWidth="2"/>
        </svg>
      </div>
      <div className="container">
        <h2>My <span>Strengths</span></h2>
        <div className="strength-grid">
          <div className="strength-item reverse">
            <div className="strength-image-card" style={{ flexDirection: 'column', alignItems: 'center' }}>
              <div className="strength-screenshots">
                <img
                  src="/images/company-overview.png"
                  alt="Company Overview"
                  className={`strength-screenshot-img img-center${animate1 ? ' animate-in' : ''}`}
                  style={{ zIndex: 2 }}
                />
              </div>
              {/* <SearchBar
                value={searchValue1}
                onChange={e => setSearchValue1(e.target.value)}
                onSend={handleSendClick1}
              /> */}
            </div>
            <div className="strength-content">
              <h3>Ask me about any of the <span>27 Lakh</span> companies registered in India?</h3>
            </div>
          </div>
          <div className="strength-item">
            <div className="strength-image-card" style={{ flexDirection: 'column', alignItems: 'center' }}>
              <div className="strength-screenshots">
                <img
                  src="/images/directors.png"
                  alt="Directors"
                  className={`strength-screenshot-img img-center${animate2 ? ' animate-in' : ''}`}
                  style={{ zIndex: 1 }}
                />
              </div>
              {/* <SearchBar
                value={searchValue2}
                onChange={e => setSearchValue2(e.target.value)}
                labelText="Summary"
                labelBg="#D1FADF"
                labelColor="#16B364"
                labelIcon={summaryIcon}
                onSend={handleSendClick2}
              /> */}
            </div>
            <div className="strength-content">
              <h3>Ask me for any specific financial, legal or corporate insights of any company?</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Strengths; 