import React, { useState, useEffect } from 'react';
import './App.css';
import MainApp from '../App';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preloader-bg">
        <div className="preloader-logo">CredWorth<span className="preloader-dot">.</span>AI</div>
        <div className="preloader-spinner">
          <div className="preloader-bounce"></div>
          <div className="preloader-bounce"></div>
          <div className="preloader-bounce"></div>
        </div>
      </div>
    );
  }

  return <MainApp />;
}

export default App; 