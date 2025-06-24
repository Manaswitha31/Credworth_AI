import React, { useState, useEffect } from 'react';
import './AboutMe.css';

function AboutMe() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const chatMessages = [
    "I'm CredWorth.AI, your always-on credit risk assistant.",
    "I've been trained on millions of financial, legal, and operational signals across 27+ lakh Indian companies.",
    "My job is simple – help you avoid bad credit decisions, faster and smarter than ever before."
  ];

  useEffect(() => {
    const messageDelay = 1000; // Delay between messages
    const typingDelay = 1000; // Delay for typing animation
    const resetDelay = 1000; // Delay before resetting

    const showNextMessage = () => {
      if (currentMessageIndex < chatMessages.length) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, chatMessages[currentMessageIndex]]);
          setIsTyping(false);
          setCurrentMessageIndex(prev => prev + 1);
        }, typingDelay);
      } else {
        // Reset after all messages are shown
        setTimeout(() => {
          setMessages([]);
          setCurrentMessageIndex(0);
          setIsTyping(true);
        }, resetDelay);
      }
    };

    if (currentMessageIndex < chatMessages.length) {
      const timer = setTimeout(showNextMessage, messageDelay);
      return () => clearTimeout(timer);
    } else {
      // Reset the chat loop
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentMessageIndex(0);
        setIsTyping(true);
      }, resetDelay);
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex, chatMessages]);

  return (
    <section id="about-me-section" className="about-me">
      {/* Simple, elegant SVG network background under the container */}
      <svg className="aboutme-network-bg" width="100%" height="220" viewBox="0 0 1200 220" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#B6A9FB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B6A9FB" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g strokeWidth="1.2" opacity="0.18">
          <path d="M60 180 Q300 40 600 120 T1140 80" fill="none" stroke="#eee6ff" />
          <path d="M120 60 Q400 200 900 60 T1180 180" fill="none" stroke="#eee6ff" />
          <path d="M80 120 Q600 10 1120 120" fill="none" stroke="#eee6ff" />
          <circle cx="60" cy="180" r="18" fill="url(#nodeGlow)" />
          <circle cx="600" cy="120" r="14" fill="url(#nodeGlow)" />
          <circle cx="1140" cy="80" r="18" fill="url(#nodeGlow)" />
          <circle cx="900" cy="60" r="10" fill="url(#nodeGlow)" />
          <circle cx="1180" cy="180" r="10" fill="url(#nodeGlow)" />
          <circle cx="1120" cy="120" r="8" fill="url(#nodeGlow)" />
          <circle cx="120" cy="60" r="8" fill="url(#nodeGlow)" />
        </g>
      </svg>
      <div className="container">
        <h2>About <span>Me</span></h2>
        <div className="chat-bubble-container">
          <h3>Let me introduce myself...</h3>
          {messages.map((message, index) => (
            <div key={index} className="chat-bubble receiver">
              {message}
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble receiver typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div className="avatar-container">
            <img 
              src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png" 
              alt="User Avatar" 
              className="avatar" 
            />
          </div>
        </div>
        {/* Animated bot vector in bottom-right */}
        {/* <div className="aboutme-bot-vector">
          <svg width="410" height="400" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#7B3FFF" strokeWidth="2.0">
              <rect x="15" y="20" width="30" height="20" rx="8"/>
              <circle cx="25" cy="30" r="3"/>
              <circle cx="35" cy="30" r="3"/>
              <rect x="20" y="40" width="20" height="10" rx="5"/>
              <line x1="30" y1="20" x2="30" y2="10"/>
              <circle cx="30" cy="7" r="3"/>
            </g>
          </svg>
        </div> */}
      </div>
    </section>
  );
}

export default AboutMe; 