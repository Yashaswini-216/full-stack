import { useState, useEffect, useRef } from 'react';
import '../styles/OTP.css';
import { RotateCcw, ArrowLeft, Ticket } from 'lucide-react';

export default function OTPVerification({ onBack }) {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (index < 5 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    
    pasteData.forEach((digit, index) => {
      if (digit.match(/^[0-9]$/) && index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
  };

  // Verify OTP
  const handleVerify = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Reset or navigate
      }, 2000);
    }, 1500);
  };

  // Resend OTP
  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="otp-container">
      {/* Background with overlay */}
      <div className="background-overlay"></div>

      {/* Back Button */}
      <button className="back-button" onClick={onBack} title="Go back to signup">
        <ArrowLeft size={20} />
      </button>

      {/* Success Message */}
      {success && (
        <div className="success-message">
          ✓ OTP verified successfully!
        </div>
      )}

      {/* OTP Card */}
      <div className="otp-card">
        <div className="otp-icon">
          <Ticket size={48} color="#fff" />
        </div>

        <h1 className="otp-title">Verify Your OTP</h1>
        <p className="otp-subtitle">Enter the 6-digit code sent to your email</p>

        {/* OTP Input Fields */}
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="otp-input"
              placeholder="0"
            />
          ))}
        </div>

        {/* Timer and Resend */}
        <div className="timer-section">
          {!canResend ? (
            <p className="timer-text">
              Resend in <span className="timer-countdown">{timer}s</span>
            </p>
          ) : (
            <button className="resend-button" onClick={handleResend}>
              <RotateCcw size={16} />
              Resend OTP
            </button>
          )}
        </div>

        {/* Verify Button */}
        <button
          className={`verify-button ${loading ? 'loading' : ''}`}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>

        {/* Additional Info */}
        <p className="info-text">
          Didn't receive the code? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  );
}
