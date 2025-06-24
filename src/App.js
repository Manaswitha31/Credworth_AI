import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import BusinessIntelligence from './components/BusinessIntelligence';
import AboutMe from './components/AboutMe';
import Strengths from './components/Strengths';
import Ratio from './components/Ratio';
import Comparison from './components/Comparison';
import TrustMe from './components/TrustMe';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import Admin from './components/Admin';
import './App.css';

function useSectionAnimation() {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        node.classList.add('visible');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

function MainSite() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Always scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation refs
  const heroRef = useSectionAnimation();
  const biRef = useSectionAnimation();
  const aboutRef = useSectionAnimation();
  const strengthsRef = useSectionAnimation();
  const ratioRef = useSectionAnimation();
  const comparisonRef = useSectionAnimation();
  const trustRef = useSectionAnimation();
  const waitlistRef = useSectionAnimation();

  return (
    <div className="App">
      <Header />
      <div ref={heroRef} className="fade-in"><Hero /></div>
      <div ref={biRef} className="slide-up"><BusinessIntelligence /></div>
      <div ref={aboutRef} className="fade-in"><AboutMe /></div>
      <div ref={strengthsRef} className="slide-up"><Strengths /></div>
      <div ref={ratioRef} className="fade-in"><Ratio /></div>
      <div ref={comparisonRef} className="slide-up"><Comparison /></div>
      <div ref={trustRef} className="fade-in"><TrustMe /></div>
      <div ref={waitlistRef} className="slide-up"><Waitlist /></div>
      <Footer />
      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<MainSite />} />
      </Routes>
    </Router>
  );
}

export default App;
