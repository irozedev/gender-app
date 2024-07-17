import React, { useState, useRef, useEffect } from 'react';
import './Wheel.css';

const Wheel = ({ onSpinComplete }) => {
  const [spinning, setSpinning] = useState(false);
  const [highlightedSegment, setHighlightedSegment] = useState(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (highlightedSegment !== null) {
      const timeout = setTimeout(() => {
        setHighlightedSegment(null);
      }, 3000); // Убираем выделение через 3 секунды
      return () => clearTimeout(timeout);
    }
  }, [highlightedSegment]);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Минимум 10 полных оборотов
    wheelRef.current.style.transition = 'transform 5s ease-out';
    wheelRef.current.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
      const finalDegree = randomDegree % 360;
      const segmentIndex = Math.floor((360 - finalDegree) / 45) % 8;
      setHighlightedSegment(segmentIndex);
      const result = segmentIndex % 2 === 0 ? 'boy' : 'girl';
      wheelRef.current.style.transition = 'none'; // Отключаем анимацию для повторного вращения
      wheelRef.current.style.transform = `rotate(${finalDegree}deg)`;
      setSpinning(false);
      onSpinComplete(result);
    }, 5000); // Время кручения колеса (5 секунд)
  };

  return (
    <div className="wheel-container">
      <div className="wheel" ref={wheelRef}>
        {['boy', 'girl', 'boy', 'girl', 'boy', 'girl', 'boy', 'girl'].map((type, index) => (
          <div key={index} className={`segment ${type} ${highlightedSegment === index ? 'highlight' : ''}`}>
            <span className="text">{type === 'boy' ? 'Boy' : 'Girl'}</span>
          </div>
        ))}
      </div>
      <div className="arrow"></div>
      <button onClick={spinWheel} className="spin-button">Spin</button>
    </div>
  );
};

export default Wheel;
