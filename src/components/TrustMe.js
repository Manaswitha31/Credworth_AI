import React, { useState, useEffect } from 'react';
import './TrustMe.css';

const avatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png";

const chatMessages = [
  "Everything you share with me is encrypted and confidential.",
  "I sincerely answer your questions and I forget about it as soon as our conversation ends but I don't forget who I work for – YOU 😊",
  "I don't gossip, I don't leak data and I am built to have private and secure conversations.",
  "I may be virtual, but your trust is very real to me."
];

const trustLogos = [
  { src: "/images/insta.png", label: "My Parents" },
  { src: "/images/azure.png", label: "Residing At" },
  { src: "/images/gemma.png", label: "Powered By" },
  { src: "/images/recognized1.png", label: "Recognized By" },
  { src: "/images/recognized2.png", label: "Recognized By" },
];

const dataLogos = [
  { src: "/images/mca.png", label: "Ministry of Corporate Affairs" },
  { src: "/images/ecourts.png", label: "eCourts India" },
  { src: "/images/epfo.png", label: "Employees Provident Fund Organisation" },
  { src: "/images/gst.png", label: "Goods and Service Tax" },
  { src: "/images/itat.png", label: "ITAT" },
];

function TrustMe() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageDelay = 1000;
    const typingDelay = 1000;
    const resetDelay = 1000;

    const showNextMessage = () => {
      if (currentMessageIndex < chatMessages.length) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, chatMessages[currentMessageIndex]]);
          setIsTyping(false);
          setCurrentMessageIndex(prev => prev + 1);
        }, typingDelay);
      } else {
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
  }, [currentMessageIndex]);

  return (
    <section id="trust-me-section" className="trust-me">
      <div className="trustme-heading-row">
        <span className="trustme-shield">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="24" fill="#fff"/>
            <path d="M24 14L34 18V24C34 30 24 34 24 34C24 34 14 30 14 24V18L24 14Z" stroke="#6557FF" strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M22 24L24.5 26.5L28 22" stroke="#50C878" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <h2 className="trustme-title">Why <span className="trustme-title-green">Trust</span> Me</h2>
      </div>
      <div className="trustme-card">
        <div className="trustme-card-inner">
          <h3 className="trustme-card-title">I value your privacy. Deeply.</h3>
          <div className="trustme-chat-bubble-container">
            {messages.map((message, index) => (
              <div key={index} className="trustme-chat-bubble receiver">
                {message}
              </div>
            ))}
            {isTyping && (
              <div className="trustme-chat-bubble receiver typing">
                <div className="trustme-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div className="trustme-avatar-container">
              <img src={avatar} alt="User Avatar" className="trustme-avatar" />
            </div>
          </div>
        </div>
      </div>
      <div className="trustme-logos-row">
        {trustLogos.map((logo, i) => (
          <div className="trustme-logo-col" key={i}>
            <div className="trustme-logo-bubble">
              <div className="trustme-logo-imgwrap">
                <img src={logo.src} alt={logo.label} className="trustme-logo-img" />
              </div>
              <div className="trustme-logo-label-text">{logo.label}</div>
              {/* <svg className="trustme-bubble-tail" width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20 Q8 0 32 0" fill="#fff" />
              </svg> */}
            </div>
            <img src={avatar} alt="avatar" className="trustme-logo-avatar-bubble" />
          </div>
        ))}
      </div>
      <div className="trustme-data-row">
        <div className="trustme-data-bubble">
          <img src={avatar} alt="avatar" className="trustme-avatar" />
          I simplify data from following sources & learning about new sources
        </div>
        <div className="trustme-data-logos">
          {dataLogos.map((logo, i) => (
            <div className="trustme-data-logo-col" key={i}>
              <img src={logo.src} alt={logo.label} />
              <div className="trustme-data-logo-label">{logo.label}</div>
            </div>
          ))}
          
        </div>
        <img src={avatar} alt="avatar" className="trustme-data-logo-avatar-bubble" />
      </div>
    </section>
  );
}

export default TrustMe; 