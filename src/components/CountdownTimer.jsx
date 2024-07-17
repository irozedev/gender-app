import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className="countdown-timer flex justify-around p-4 bg-white rounded-lg shadow-md">
      {Object.keys(timeLeft).map((interval, index) => (
        <div key={index} className="countdown-item text-center mx-2">
          <span className="countdown-value text-3xl font-bold text-gray-800">{timeLeft[interval]}</span>
          <span className="countdown-label text-sm text-gray-500">{interval}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
