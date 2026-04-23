import { useState } from 'react';
import Signup from './pages/Signup';
import OTPVerification from './pages/OTP';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('signup'); // 'signup' or 'otp'

  const handleSignupComplete = () => {
    setCurrentPage('otp');
  };

  const handleBackToSignup = () => {
    setCurrentPage('signup');
  };

  return (
    <div className="app">
      {currentPage === 'signup' ? (
        <Signup onSignupComplete={handleSignupComplete} />
      ) : (
        <OTPVerification onBack={handleBackToSignup} />
      )}
    </div>
  );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
