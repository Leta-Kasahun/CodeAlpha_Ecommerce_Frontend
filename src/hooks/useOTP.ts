// src/hooks/useOTP.ts
import { useState, useEffect } from 'react';

export function useOTP(length: number = 6) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [countdown, setCountdown] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const startCountdown = (seconds: number = 60) => {
    setCountdown(seconds);
  };

  const resetOtp = () => {
    setOtp(Array(length).fill(''));
  };

  const getOtpString = () => otp.join('');

  return {
    otp: getOtpString(),
    otpArray: otp,
    countdown,
    handleOtpChange,
    handleKeyDown,
    startCountdown,
    resetOtp,
    isComplete: getOtpString().length === length
  };
}