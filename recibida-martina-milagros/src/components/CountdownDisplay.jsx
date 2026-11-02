import React from 'react';
import CountdownCard from './CountdownCard';
import { Calendar, Clock, Sparkles } from 'lucide-react';

/**
 * Single central protagonist countdown component
 * Strict requirement: ONLY ONE visual counter component exists in the application.
 * When the first stage hits zero, this exact component dynamically points to the second stage.
 */
export default function CountdownDisplay({
  remaining,
  stage,
  targetDateLabel,
  targetTimeLabel,
  isTransitioning
}) {
  const isFinalCelebration = stage === 'PARTY_CELEBRATION';

  return (
    <section className={`main-countdown-container ${isTransitioning ? 'transition-flash' : ''}`} id="contador-principal" aria-label="Contador Regresivo Principal">
      <div className="countdown-glow-halo"></div>

      {/* Target Info Pill */}
      <div className="target-info-pill">
        <span className="pill-icon">
          {stage === 'EXAM' ? <Clock size={16} /> : <Calendar size={16} />}
        </span>
        <span className="pill-text">
          {stage === 'EXAM' && `Fecha de Examen: ${targetDateLabel} a las ${targetTimeLabel}`}
          {stage === 'PARTY' && `Fecha de la Fiesta: ${targetDateLabel} a las ${targetTimeLabel}`}
          {stage === 'PARTY_CELEBRATION' && `¡El evento se está celebrando ahora!`}
        </span>
        <span className="pill-tz">Hora ARG (UTC-3)</span>
      </div>

      {/* The 4 Units Grid */}
      <div className="countdown-grid">
        <CountdownCard
          value={remaining.days}
          label="DÍAS"
          isFinished={isFinalCelebration}
        />
        <div className="countdown-separator">:</div>
        <CountdownCard
          value={remaining.hours}
          label="HORAS"
          isFinished={isFinalCelebration}
        />
        <div className="countdown-separator">:</div>
        <CountdownCard
          value={remaining.minutes}
          label="MINUTOS"
          isFinished={isFinalCelebration}
        />
        <div className="countdown-separator">:</div>
        <CountdownCard
          value={remaining.seconds}
          label="SEGUNDOS"
          isFinished={isFinalCelebration}
        />
      </div>

      {/* Live status badge */}
      <div className="countdown-status-indicator">
        <span className={`status-dot ${isFinalCelebration ? 'dot-gold' : 'dot-active'}`}></span>
        <span className="status-caption">
          {stage === 'EXAM' && 'Descontando tiempo hasta el último examen final'}
          {stage === 'PARTY' && 'Descontando tiempo hasta el inicio de la fiesta'}
          {stage === 'PARTY_CELEBRATION' && '¡Momento de festejar la recibida!'}
        </span>
      </div>
    </section>
  );
}
