import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>Hello, I'm <span className="highlight">CredWorth.AI</span><br />Your Corporate Credit Expert</h1>
        <p>
          I help you assess the creditworthiness of any company in India, privately and securely. I never sleep
          and never resign. <br></br>Talk to me. I'll show you the future of intelligent credit risk decisions.
        </p>
        <div className="hero-buttons">
          <button
            className="hero-waitlist-bubble-btn"
            onClick={() => {
              const el = document.getElementById('waitlist-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join My Waitlist
          </button>
        </div>
        <div className='hero-para'>
          <p>Join the early access list and help shape my capabilities</p>
        </div>
      </div>
    </section>
  );
}

export default Hero; 