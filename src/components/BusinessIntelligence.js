import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './BusinessIntelligence.css';
import TypingIndicator from './TypingIndicator';
import BotIcon from './BotIcon';

function BusinessIntelligence() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]); // { sender: 'user' | 'bot', text: string }
  const [isBotTyping, setIsBotTyping] = useState(false);
  const searchInputRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);
  const chatContainerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ left: 0, top: 0, width: 520 });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  // Position dropdown below input
  useEffect(() => {
    if (dropdownOpen && searchInputRef.current) {
      const rect = searchInputRef.current.getBoundingClientRect();
      setDropdownPos({
        left: rect.left + window.scrollX,
        top: rect.bottom + window.scrollY + 4, // 4px gap
        width: rect.width
      });
    }
  }, [dropdownOpen]);

  const handleFocus = () => setDropdownOpen(true);
  const handleBlur = (e) => {
    setTimeout(() => setDropdownOpen(false), 120);
  };
  const handleOptionClick = (option) => {
    if (option === 'ai') {
      setInputValue('Who are the current directors of zomato?');
    } else if (option === 'overview') {
      setInputValue('Tell me about CBL Datascient Private Limited');
    } else if (option === 'ratio') {
      setInputValue('Calculate the authorized to Paid-up capital ratio of Zomato');
    } else if (option === 'compare') {
      setInputValue('Compare Swiggy with Zomato');
    }
    setDropdownOpen(false);
    // Do NOT send the message here, only fill the input
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedImage(null), 350);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Add user message immediately
    setMessages(prev => [...prev, { sender: 'user', text: trimmed }]);
    setInputValue("");
    setDropdownOpen(false);
    setIsBotTyping(true);

    // Simulate bot thinking and then respond
    setTimeout(() => {
      let botMsg = null;
      if (trimmed.toLowerCase() === 'who are the current directors of zomato?') {
        botMsg = { sender: 'bot', type: 'image', src: '/images/directors.png', alt: 'Who are the current directors of zomato?' };
      } else if (trimmed.toLowerCase() === 'tell me about cbl datascient private limited') {
        botMsg = { sender: 'bot', type: 'image', src: '/images/company-overview.png', alt: 'Tell me about CBL Datascient Private Limited' };
      } else if (trimmed.toLowerCase() === 'calculate the authorized to paid-up capital ratio of zomato') {
        botMsg = { sender: 'bot', type: 'image', src: '/images/ratio-bar-chart.png', alt: 'Capital Ratio of zomato' };
      } else if (trimmed.toLowerCase() === 'compare swiggy with zomato') {
        botMsg = { sender: 'bot', type: 'image', src: '/images/compare-companies.png', alt: 'Swiggy with Zomato Comparison' };
      } else {
        botMsg = { sender: 'bot', text: 'Check the dropdowns for functionality.' };
      }
      
      setIsBotTyping(false);
      setMessages(prev => [...prev, botMsg]);

    }, 2000); // 2-second delay
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <section id="business-intelligence-section" className="business-intelligence">
      <div className="bi-bg-text" aria-hidden="true">
        <h2>See <span>Me</span> 👀</h2>
      </div>
      {/* Add Chat-Prompt.gif above the main container */}
      <div className="bi-report-prompt-gif-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px' }}>
        <img
          src="/images/Report-Prompt.gif"
          alt="Chat Prompt Demo"
          style={{ width: '100%', maxWidth: '1200px', height: 'auto', borderRadius: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.12)' }}
        />
      </div>
      <div className="bi-chat-prompt-gif-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px' }}>
        <img
          src="/images/Chat-Prompt.gif"
          alt="Chat Prompt Demo"
          style={{ width: '100%', maxWidth: '1200px', height: 'auto', borderRadius: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.12)' }}
        />
      </div>

      <div className="bi-bg-text" aria-hidden="true">
        <h2>Try <span>Me</span> 👀</h2>
      </div>

<div className="container">
        <div className="business-intelligence-navbar">
          <div className="bi-logo">
            <span className="bi-logo-cw-icon">CW</span> CredWorthAI
          </div>
        </div>
            <div className="bi-chat-messages" ref={chatContainerRef}>
                {messages.map((msg, idx) => {
                  if (msg.sender === 'bot') {
                    return (
                      <div key={idx} className="bi-bot-message-row">
                        <BotIcon />
                        <div className="bi-chat-bubble bot">
                          {msg.type === 'image' ? (
                            <img
                                src={msg.src}
                                alt={msg.alt}
                                className="bi-chat-image-large"
                                style={{ maxWidth: '100%', maxHeight: '320px', borderRadius: '18px', boxShadow: '0 2px 8px rgba(101,87,255,0.08)', cursor: 'pointer' }}
                                onClick={() => setModalImage({ src: msg.src, alt: msg.alt })}
                            />
                          ) : (
                            msg.text
                          )}
                        </div>
                      </div>
                    );
                  } else { // sender is 'user'
                    return (
                      <div key={idx} className="bi-chat-bubble user">
                        {msg.text}
                      </div>
                    );
                  }
                })}
                {isBotTyping && <TypingIndicator />}
            </div>

        {/* Show selected image in fullscreen modal overlay */}
        {showModal && selectedImage && ReactDOM.createPortal(
          <div className="bi-modal-overlay" onClick={handleCloseModal}>
            <div className="bi-modal-content" onClick={e => e.stopPropagation()}>
              <button className="bi-modal-close" onClick={handleCloseModal} aria-label="Close image">&times;</button>
              <img
                src={selectedImage === 'ai' ? '/images/ai-business-insights.jpg' : '/images/company-overview.jpg'}
                alt={selectedImage === 'ai' ? 'Who are the current directors of zomato?' : 'Who are the current diectors of Zomato'}
                className="bi-modal-img"
              />
            </div>
          </div>,
          document.getElementById('modal-root')
        )}

        {/* Only show old preview if selectedImage is set and showModal is false (and not just after closing) */}
        {selectedImage && !showModal && false && (
          <div className="bi-image-preview pop-in">
            <img
              src={selectedImage === 'ai' ? '/images/ai-business-insights.jpg' : '/images/company-overview.jpg'}
              alt={selectedImage === 'ai' ? 'Tell about CBL Datascience Private Limited' : 'Tell me about CBL Datascient Private Limited'}
            />
          </div>
        )}

        {/* Modal for chat image fullscreen view */}
        {modalImage && ReactDOM.createPortal(
          <div className="bi-modal-overlay" onClick={() => setModalImage(null)}>
            <div className="bi-modal-content" onClick={e => e.stopPropagation()}>
              <button className="bi-modal-close" onClick={() => setModalImage(null)} aria-label="Close image">&times;</button>
              <img
                src={modalImage.src}
                alt={modalImage.alt}
                className="bi-modal-img"
              />
            </div>
          </div>,
          document.getElementById('modal-root')
        )}

        <div className="search-bar-container" style={{ position: 'relative' }}>
          <button className="basic-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Chat
          </button>
          <div className="search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              className="search-input"
              placeholder="Enter your query here..."
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={searchInputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {/* Dropdown options */}
            {dropdownOpen && ReactDOM.createPortal(
              <div
                className="bi-dropdown pop-in"
                ref={dropdownRef}
                style={{
                  position: 'absolute',
                  left: dropdownPos.left,
                  top: dropdownPos.top,
                  width: dropdownPos.width,
                  maxWidth: '100vw',
                  minWidth: 0,
                  background: '#fff',
                  border: '2px solid #6557FF',
                  zIndex: 99999,
                  padding: '8px 0',
                  boxShadow: '0 8px 32px rgba(123,63,255,0.13), 0 2px 8px rgba(101,87,255,0.10)',
                }}
              >
                <div className="bi-dropdown-option" onMouseDown={() => handleOptionClick('ai')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6557FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
                  Who are the current directors of zomato?
                </div>
                <div className="bi-dropdown-option" onMouseDown={() => handleOptionClick('overview')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6557FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="8"/><rect x="9" y="8" width="4" height="12"/><rect x="15" y="4" width="4" height="16"/></svg>
                  Tell me about CBL Datascient Private Limited
                </div>
                <div className="bi-dropdown-option" onMouseDown={() => handleOptionClick('ratio')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6557FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 6h8M8 10h8M8 14h8M8 18h8"/></svg>
                  Calculate the authorized to Paid-up capital ratio of Zomato?
                </div>
                <div className="bi-dropdown-option" onMouseDown={() => handleOptionClick('compare')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6557FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 19l-7-7 7-7"/><path d="M21 19l-7-7 7-7"/></svg>
                  Compare Swiggy with Zomato
                </div>
              </div>,
              document.getElementById('dropdown-root')
            )}
          </div>
          <button className="send-button" type="button" onClick={handleSend}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default BusinessIntelligence; 