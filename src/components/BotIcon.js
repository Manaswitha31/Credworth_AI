import React from 'react';
import './BotIcon.css';

const BotIcon = () => {
  return (
    <div className="bot-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 18v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
      </svg>
    </div>
  );
};

export default BotIcon; 