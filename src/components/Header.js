import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">CredWorth.AI</div>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav${menuOpen ? ' nav-open' : ''}`}>
          <ul>
            <li><a href="#business-intelligence-section" onClick={e => {
              e.preventDefault();
              setMenuOpen(false);
              const el = document.getElementById('business-intelligence-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>See Me</a></li>
            <li><a href="#about-me-section" onClick={e => {
              e.preventDefault();
              setMenuOpen(false);
              const el = document.getElementById('about-me-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>About Me</a></li>
            <li><a href="#trust-me-section" onClick={e => {
              e.preventDefault();
              setMenuOpen(false);
              const el = document.getElementById('trust-me-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Why Trust Me</a></li>
          </ul>
        </nav>
        <button
          className="join-waitlist-button"
          onClick={() => {
            const el = document.getElementById('waitlist-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Join My Waitlist
        </button>
      </div>
    </header>
  );
}

export default Header; 