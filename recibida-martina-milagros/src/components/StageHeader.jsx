import React from 'react';
import { Award, Sparkles, PartyPopper, Heart } from 'lucide-react';

/**
 * Handles the titles, subtitles, and stage transition messaging
 */
export default function StageHeader({ stage, hasAchievedDegree, isTransitioning }) {
  return (
    <header className="stage-header">
      {/* Dynamic Stage Pill */}
      <div className="stage-badge-wrapper">
        {stage === 'EXAM' && (
          <div className="stage-badge badge-exam">
            <span className="badge-pulse"></span>
            <Award size={16} className="badge-icon" />
            <span>ETAPA 1: EL ÚLTIMO FINAL</span>
          </div>
        )}

        {(stage === 'PARTY' || hasAchievedDegree) && stage !== 'PARTY_CELEBRATION' && (
          <div className="stage-badge badge-party">
            <Sparkles size={16} className="badge-icon-gold" />
            <span>ETAPA 2: LA FIESTA DE RECIBIDA</span>
          </div>
        )}

        {stage === 'PARTY_CELEBRATION' && (
          <div className="stage-badge badge-celebration">
            <PartyPopper size={16} className="badge-icon-celeste" />
            <span>¡LA FIESTA COMENZÓ!</span>
          </div>
        )}
      </div>

      {/* Degree Achievement Banner (Shown when transitioning or in Stage 2) */}
      {(hasAchievedDegree || stage === 'PARTY' || stage === 'PARTY_CELEBRATION') && (
        <div className={`achievement-banner ${isTransitioning ? 'banner-animate-in' : ''}`}>
          <div className="banner-glow"></div>
          <div className="banner-content">
            <span className="banner-tag">¡OBJETIVO CUMPLIDO!</span>
            <h2 className="banner-title">¡LO LOGRAMOS! ¡SOMOS PSICOPEDAGOGAS!</h2>
            <p className="banner-sub">
              Después de tanto esfuerzo, llegó nuestro momento. ¡Ahora sí, a festejar!
            </p>
          </div>
        </div>
      )}

      {/* Main Dynamic Titles */}
      <div className={`title-block ${isTransitioning ? 'title-morph' : ''}`}>
        {stage === 'EXAM' && (
          <>
            <h1 className="main-title">
              ¡LA META ESTÁ CADA VEZ MÁS CERCA!
            </h1>
            <p className="main-subtitle">
              Cuenta regresiva para convertirnos en Psicopedagogas.
            </p>
          </>
        )}

        {stage === 'PARTY' && (
          <>
            <h1 className="main-title party-title">
              ¡LA FIESTA DE NUESTRA RECIBIDA!
            </h1>
            <p className="main-subtitle">
              El título se celebra una sola vez… ¡y queremos compartirlo con vos!
            </p>
          </>
        )}

        {stage === 'PARTY_CELEBRATION' && (
          <div className="final-celebration-hero">
            <div className="celebration-burst-icon">🎉</div>
            <h1 className="final-party-title">
              ¡HOY SE FESTEJA! MARTINA &amp; MILAGROS TE ESPERAN PARA UNA NOCHE INOLVIDABLE. 💙
            </h1>
            <p className="final-party-sub">
              Gracias por acompañarnos en este hermoso camino académico y de vida. ¡A disfrutar la noche!
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
