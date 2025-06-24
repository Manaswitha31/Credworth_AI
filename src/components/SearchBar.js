import React, { useRef, useLayoutEffect, useState } from 'react';
import './SearchBar.css';

function SearchBar({ value = '', onChange, onSend, labelText = 'Basic', labelBg = '#E8EDFB', labelColor = '#2A4DD0', labelIcon }) {
  const inputRef = useRef(null);
  const spanRef = useRef(null);
  const [fontSize, setFontSize] = useState(18);

  useLayoutEffect(() => {
    let size = 18;
    if (spanRef.current && inputRef.current) {
      const maxWidth = inputRef.current.offsetWidth;
      spanRef.current.style.fontSize = size + 'px';
      while (spanRef.current.offsetWidth > maxWidth && size > 10) {
        size -= 1;
        spanRef.current.style.fontSize = size + 'px';
      }
    }
    setFontSize(size);
  }, [value]);

  return (
    <div className="searchbar-container">
      <div className="searchbar-label" style={{ background: labelBg }}>
        <span className="searchbar-label-docicon" style={{ color: labelColor }}>
          {labelIcon || (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="2" width="12" height="16" rx="2" fill="#E0E7FF"/>
              <rect x="7" y="6" width="6" height="1.5" rx="0.75" fill="#6557FF"/>
              <rect x="7" y="9" width="6" height="1.5" rx="0.75" fill="#6557FF"/>
              <rect x="7" y="12" width="4" height="1.5" rx="0.75" fill="#6557FF"/>
            </svg>
          )}
        </span>
        <span className="searchbar-label-text" style={{ color: labelColor }}>{labelText}</span>
      </div>
      <span className="searchbar-search-icon">
        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="7" stroke="#B0B7C3" strokeWidth="2"/><path d="M15 15l-3-3" stroke="#B0B7C3" strokeWidth="2" strokeLinecap="round"/></svg>
      </span>
      <input
        className="searchbar-input"
        value={value}
        onChange={onChange}
        ref={inputRef}
        style={{ fontSize: fontSize + 'px', color: '#111' }}
      />
      {/* Mirror span for measuring text width */}
      <span ref={spanRef} className="searchbar-mirror-span">{value || ''}</span>
      <button className="searchbar-send-btn" type="button" onClick={onSend}>
        <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#6557FF"/><path d="M9 14h10M15 10l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

export default SearchBar; 