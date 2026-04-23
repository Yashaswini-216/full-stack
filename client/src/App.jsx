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
