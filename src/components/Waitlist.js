import React, { useState, useRef, useEffect } from 'react';
import './Waitlist.css';
import axios from 'axios';

const botAvatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png";
const userAvatar = "https://randomuser.me/api/portraits/men/32.jpg";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

function Waitlist() {
  const [step, setStep] = useState(0); // 0: name, 1: email, 2: phone, 3: suggestion, 4: join
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'How do you want me to call you?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', suggestion: '' });
  const [joined, setJoined] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [showResubmit, setShowResubmit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (step === 1) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(msgs => [...msgs, { sender: 'bot', text: 'What is your work email?' }]);
        setIsTyping(false);
      }, 1200);
    }
    if (step === 2) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(msgs => [...msgs, { sender: 'bot', text: 'What is your phone number?' }]);
        setIsTyping(false);
      }, 1200);
    }
    if (step === 3) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(msgs => [...msgs, { sender: 'bot', text: 'Do you want to provide any feature idea suggestion? If yes, please provide the suggestion or else please enter No.' }]);
        setIsTyping(false);
      }, 1200);
    }
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (step === 0) {
      setMessages(msgs => [...msgs, { sender: 'user', text: inputValue }]);
      setForm(f => ({ ...f, name: inputValue }));
      setInputValue('');
      setStep(1);
    } else if (step === 1) {
      setMessages(msgs => [...msgs, { sender: 'user', text: inputValue }]);
      setForm(f => ({ ...f, email: inputValue }));
      setInputValue('');
      setStep(2);
    } else if (step === 2) {
      setMessages(msgs => [...msgs, { sender: 'user', text: inputValue }]);
      setForm(f => ({ ...f, phone: inputValue }));
      setInputValue('');
      setStep(3);
    } else if (step === 3) {
      setMessages(msgs => [...msgs, { sender: 'user', text: inputValue }]);
      setForm(f => ({ ...f, suggestion: inputValue }));
      setInputValue('');
      setStep(4);
    }
  };

  const handleJoin = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setError("");
    // Frontend validation
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setShowConfirm(false);
    try {
      await axios.post('http://localhost:4000/api/waitlist', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        suggestion: form.suggestion
      });
      setJoined(true);
      setShowResubmit(false);
      setMessages(msgs => [
        ...msgs,
        { sender: 'bot', text: 'Thank you! You are on the waitlist.' }
      ]);
    } catch (err) {
      const msg = err.response?.data?.error || 'Submission failed. Please try again.';
      if (msg === 'You are already in the waitlist.' || msg === 'Submission failed. Please try again.') {
        setMessages(msgs => [
          ...msgs,
          { sender: 'bot', text: msg }
        ]);
        setShowResubmit(true);
      } else {
        setError(msg);
        setShowConfirm(true);
      }
    }
  };

  const handleResubmit = () => {
    setStep(0);
    setForm({ name: '', email: '', phone: '', suggestion: '' });
    setInputValue('');
    setJoined(false);
    setShowResubmit(false);
    setMessages([{ sender: 'bot', text: 'Want to be the first to meet me?' }]);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <section className="waitlist" id="waitlist-section">
      <div className="container">
        <h2>Want to be the <span className="highlight">First </span>to meet me?</h2>
        <div className="chat-bubble-container-waitlist">
          <div className="waitlist-illustration">
            <img src="/images/waitlist.jpg" alt="Waitlist Illustration" />
          </div>
          <div className="chat-bubbles-form">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.sender === 'user' ? 'sender' : 'receiver'}`}>
                {msg.sender === 'bot' && (
                  <span className="avatar-bubble sender-avatar"><img src={botAvatar} alt="Bot" /></span>
                )}
                {msg.sender === 'user' && (
                  <span className="avatar-bubble user-avatar"><img src={userAvatar} alt="User" /></span>
                )}
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble receiver typing">
                <span className="avatar-bubble sender-avatar"><img src={botAvatar} alt="Bot" /></span>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            {step < 4 && !isTyping && !joined && (
              <form className="input-bubble" onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center' }}>
                <span className="avatar-bubble user-avatar"><img src={userAvatar} alt="User" /></span>
                <div className="input-send-group">
                  {step === 3 ? (
                    <textarea
                      ref={inputRef}
                      placeholder={
                        'Enter your feature suggestion or type No...'
                      }
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      autoFocus
                    />
                  ) : (
                  <input
                    ref={inputRef}
                    type={step === 2 ? 'tel' : step === 1 ? 'email' : 'text'}
                    placeholder={
                      step === 0
                        ? 'Enter your name...'
                        : step === 1
                        ? 'Enter your email...'
                        : 'Enter your phone number...'
                    }
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    autoFocus
                  />
                  )}
                  <button type="submit" className="join-now-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </form>
            )}
            {step === 4 && !joined && !isTyping && (
              <button className="join-my-waitlist-btn-attractive" onClick={handleJoin}>
                <span>Join My Waitlist</span>
                <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#7B3FFF"/><path d="M9 14h10M15 10l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            {showConfirm && (
              <div className="waitlist-confirm-dialog">
                <div className="waitlist-confirm-content">
                  <div className="waitlist-confirm-title">Confirm Joining Waitlist</div>
                  <div className="waitlist-confirm-message">By confirming, your details will be saved with us</div>
                  {error && <div className="waitlist-confirm-error">{error}</div>}
                  <div className="waitlist-confirm-actions">
                    <button className="waitlist-confirm-btn confirm" onClick={handleConfirm}>Confirm</button>
                    <button className="waitlist-confirm-btn cancel" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {showResubmit && (
              <button className="waitlist-resubmit-btn" onClick={handleResubmit}>
                Send New Details
              </button>
            )}
          </div>
        </div>
        {/* Animated bot vector in bottom-left */}
        {/* <div className="waitlist-bot-vector">
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#7B3FFF" strokeWidth="2.2">
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

export default Waitlist; 