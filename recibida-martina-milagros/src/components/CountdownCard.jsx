import React, { memo } from 'react';

/**
 * Individual digit card with glassmorphism and subtle tick animation
 */
const CountdownCard = memo(function CountdownCard({ value, label, isFinished }) {
  // Format numbers to always be 2 digits (e.g., '05')
  const formattedValue = String(value).padStart(2, '0');

  return (
    <div className={`countdown-unit-card ${isFinished ? 'unit-finished' : ''}`}>
      <div className="unit-card-inner">
        <div className="digit-glow-backdrop"></div>
        <div className="digit-display">
          <span className="digit-number">{formattedValue}</span>
        </div>
        <div className="card-divider-line"></div>
      </div>
      <span className="unit-label">{label}</span>
    </div>
  );
});

export default CountdownCard;
