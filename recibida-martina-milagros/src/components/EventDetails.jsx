import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, Share2, PartyPopper } from 'lucide-react';
import { formatSpanishDate } from '../utils/dateUtils';

export default function EventDetails({
  examTimestamp,
  partyTimestamp,
  examTimeStr,
  partyTimeStr,
  stage
}) {
  const [copied, setCopied] = useState(false);

  // Helper to generate Google Calendar links
  const createGoogleCalendarUrl = (title, details, location, startTimeISO, endTimeISO) => {
    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const start = formatDate(new Date(startTimeISO));
    const end = formatDate(new Date(endTimeISO));
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}`;
  };

  const examStart = new Date(examTimestamp);
  const examEnd = new Date(examTimestamp + 3 * 60 * 60 * 1000);
  const examCalUrl = createGoogleCalendarUrl(
    '🎓 Último Final: Martina & Milagros - Lic. en Psicopedagogía',
    '¡Acompañanos con tu energía en el último examen final de nuestra carrera!',
    'Facultad / Sede Universitaria',
    examStart,
    examEnd
  );

  const partyStart = new Date(partyTimestamp);
  const partyEnd = new Date(partyTimestamp + 6 * 60 * 60 * 1000);
  const partyCalUrl = createGoogleCalendarUrl(
    '🎉 Fiesta de Recibida: Martina & Milagros',
    '¡Festejamos el título de Licenciadas en Psicopedagogía! Noche inolvidable.',
    'Salón de Fiestas',
    partyStart,
    partyEnd
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Recibida Martina & Milagros',
        text: '¡Vení a festejar nuestra recibida de Licenciadas en Psicopedagogía!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToRsvp = () => {
    const el = document.getElementById('confirmar-asistencia');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="events-section">
      <div className="section-header">
        <h3 className="section-title">CRONOGRAMA DE NUESTRO SUEÑO</h3>
        <p className="section-subtitle">Dos momentos únicos que marcan el fin de una etapa y el comienzo de la celebración</p>
      </div>

      <div className="events-grid">
        {/* Card 1: El Último Final */}
        <div className={`event-card ${stage === 'EXAM' ? 'card-highlighted' : 'card-completed'}`}>
          <div className="event-card-header">
            <span className="event-chip exam-chip">
              {stage === 'EXAM' ? 'Paso 1: En curso' : 'Paso 1: ¡Completado! 🎓'}
            </span>
            <span className="event-date-badge">18 DIC 2026</span>
          </div>

          <h4 className="event-name">El Último Final</h4>
          <p className="event-desc">
            Rendimos la última materia para consagrarnos como Licenciadas en Psicopedagogía.
          </p>

          <div className="event-meta-list">
            <div className="event-meta-item">
              <Calendar size={18} className="meta-icon" />
              <span>{formatSpanishDate(examTimestamp)}</span>
            </div>
            <div className="event-meta-item">
              <Clock size={18} className="meta-icon" />
              <span>{examTimeStr} hs (Argentina UTC-3)</span>
            </div>
            <div className="event-meta-item">
              <MapPin size={18} className="meta-icon" />
              <span>Sede Universitaria</span>
            </div>
          </div>

          <a
            href={examCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-calendar"
          >
            <Calendar size={16} />
            <span>Agendar Examen</span>
          </a>
        </div>

        {/* Card 2: La Gran Fiesta */}
        <div className={`event-card ${stage === 'PARTY' || stage === 'PARTY_CELEBRATION' ? 'card-highlighted' : ''}`}>
          <div className="event-card-header">
            <span className="event-chip party-chip">
              {stage === 'PARTY_CELEBRATION' ? '¡Es Hoy!' : 'Paso 2: La Gran Fiesta 🎉'}
            </span>
            <span className="event-date-badge">19 DIC 2026</span>
          </div>

          <h4 className="event-name">La Fiesta de Recibida</h4>
          <p className="event-desc">
            Brindis, música, baile y celebración hasta que salga el sol junto a quienes más queremos.
          </p>

          <div className="event-meta-list">
            <div className="event-meta-item">
              <Calendar size={18} className="meta-icon" />
              <span>{formatSpanishDate(partyTimestamp)}</span>
            </div>
            <div className="event-meta-item">
              <Clock size={18} className="meta-icon" />
              <span>{partyTimeStr} hs (Argentina UTC-3)</span>
            </div>
            <div className="event-meta-item">
              <MapPin size={18} className="meta-icon" />
              <span>Salón de Fiestas &amp; Eventos</span>
            </div>
          </div>

          <div className="card-actions">
            <button
              onClick={scrollToRsvp}
              className="btn-calendar btn-party-action"
            >
              <PartyPopper size={16} />
              <span>Confirmar Asistencia</span>
            </button>
            <a
              href={partyCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-calendar"
              title="Guardar en Google Calendar"
            >
              <Calendar size={16} />
              <span>Agendar</span>
            </a>
            <button
              onClick={handleShare}
              className="btn-share"
              title="Compartir invitación"
            >
              {copied ? <CheckCircle2 size={16} color="#0284c7" /> : <Share2 size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
