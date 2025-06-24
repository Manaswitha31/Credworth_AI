import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './StrengthsChat.css';

const options = [
  {
    label: 'Show Company Overview',
    value: 'overview',
  },
  {
    label: 'Show Business Insights',
    value: 'insights',
  },
];

const images = {
  overview: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
  ],
  insights: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
  ],
};

function StrengthsChat() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="strengths-chat-container">
      {/* Chatbot message: Search bar */}
      <div className="chat-bubble bot">
        <SearchBar />
      </div>

      {/* Chatbot message: Options */}
      {!selected && (
        <div className="chat-bubble bot options-bubble">
          <div className="options-row">
            {options.map((opt) => (
              <button
                key={opt.value}
                className="option-btn"
                onClick={() => setSelected(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User selection and bot reply with images */}
      {selected && (
        <>
          <div className="chat-bubble user">
            {options.find((o) => o.value === selected).label}
          </div>
          <div className="chat-bubble bot">
            Here are some results:
            <div className="images-row">
              {images[selected].map((img, idx) => (
                <img key={idx} src={img} alt="result" className="result-img" />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StrengthsChat; 