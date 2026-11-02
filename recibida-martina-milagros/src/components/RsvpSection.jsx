import React, { useState } from 'react';
import { CheckCircle2, User, Users, Utensils, Music, MessageSquareHeart, PartyPopper, Phone } from 'lucide-react';
import GraduationCapIcon from './GraduationCapIcon';
import confetti from 'canvas-confetti';

// Real WhatsApp SVG Icon for maximum fidelity and instant recognition on mobile
function WhatsAppIcon({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.52 3.48A11.93 11.93 0 0012.02 0C5.4 0 .03 5.37.03 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.19-1.62a11.97 11.97 0 005.83 1.5h.01c6.62 0 11.99-5.37 11.99-11.99 0-3.21-1.25-6.22-3.5-8.41z"
        fill="#25D366"
      />
      <path
        d="M17.55 14.59c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.34.21-.62.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.4-1.66-1.56-1.94-.17-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.37s1.02 2.75 1.16 2.94c.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.66-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function RsvpSection({
  partyDateStr = '19 de Diciembre de 2026',
  martinaPhone = '+54 9 2262 57-2405',
  milagrosPhone = '+54 9 2262 57-2405'
}) {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    companions: '0',
    diet: 'ninguna',
    dietOther: '',
    song: '',
    message: ''
  });

  const [submittedTo, setSubmittedTo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sanitizePhone = (phone) => {
    return phone.replace(/\D/g, '');
  };

  const generateMessageText = (targetGraduate) => {
    const greeting = targetGraduate === 'martina'
      ? '¡Hola Martina! 🎓💙'
      : '¡Hola Milagros! 🎓💙';

    const attendanceText = formData.attending === 'yes'
      ? '¡SÍ, VOY A ESTAR AHÍ PARA FESTEJAR! 🎉🥂'
      : 'Lamentablemente no voy a poder asistir 😢';

    const companionsText = formData.attending === 'yes'
      ? (formData.companions === '0' ? 'Voy solo/a' : `Voy con +${formData.companions} acompañante(s)`)
      : 'No aplica';

    const dietText = formData.diet === 'otra' ? formData.dietOther : formData.diet;

    return [
      greeting,
      '🎓 *CONFIRMACIÓN DE ASISTENCIA - FIESTA DE RECIBIDA*',
      '💙 *Licenciadas en Psicopedagogía*',
      '━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Nombre:* ${formData.name}`,
      `✨ *Asistencia:* ${attendanceText}`,
      ...(formData.attending === 'yes' ? [
        `👥 *Acompañantes:* ${companionsText}`,
        `🍽️ *Preferencia de menú:* ${dietText}`,
        formData.song ? `🎵 *Tema infaltable:* ${formData.song}` : null
      ] : []),
      formData.message ? `💌 *Mensaje:* "${formData.message}"` : null,
      '━━━━━━━━━━━━━━━━━━━━━━',
      '¡Nos vemos el 19 de diciembre para celebrar! ✨🎓🥂'
    ].filter(Boolean).join('\n');
  };

  const handleSendTo = (target) => {
    if (!formData.name.trim()) {
      alert('Por favor, ingresá tu nombre y apellido antes de confirmar.');
      return;
    }

    const rawNumber = target === 'martina' ? martinaPhone : milagrosPhone;
    const cleanNumber = sanitizePhone(rawNumber);
    const message = generateMessageText(target);
    const encodedMessage = encodeURIComponent(message);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#0284c7', '#fbbf24', '#ffffff']
    });

    setSubmittedTo(target);

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="rsvp-section" id="confirmar-asistencia">
      <div className="rsvp-card">
        {/* Decorative graduation cap */}
        <div className="rsvp-decor-cap">
          <GraduationCapIcon size={52} />
        </div>

        <div className="rsvp-header">
          <div className="rsvp-badge">
            <PartyPopper size={15} />
            <span>CONFIRMACIÓN DE ASISTENCIA</span>
          </div>
          <h3 className="rsvp-title">¿Nos acompañás a festejar?</h3>
          <p className="rsvp-subtitle">
            El título se celebra una sola vez en la vida. Completá tus datos y elegí a quién avisarle tu confirmación directamente por WhatsApp.
          </p>
        </div>

        {submittedTo && (
          <div className="rsvp-toast-success">
            <CheckCircle2 size={24} className="toast-icon" />
            <div className="toast-content">
              <strong>¡Confirmación enviada a {submittedTo === 'martina' ? 'Martina' : 'Milagros'}!</strong>
              <p>Si querés avisarle también a {submittedTo === 'martina' ? 'Milagros' : 'Martina'}, podés tocar el otro botón a continuación.</p>
            </div>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="rsvp-form">
          {/* Guest Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <User size={16} />
              <span>Nombre y Apellido *</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Sofía González"
              required
              className="form-input"
              autoComplete="name"
            />
          </div>

          {/* Attendance Choice */}
          <div className="form-group">
            <label className="form-label">
              <PartyPopper size={16} />
              <span>¿Asistirás a la fiesta? *</span>
            </label>
            <div className="radio-options-grid">
              <label className={`radio-card ${formData.attending === 'yes' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === 'yes'}
                  onChange={handleChange}
                />
                <div className="radio-content">
                  <span className="radio-emoji">🎉</span>
                  <div className="radio-texts">
                    <strong>¡Sí, voy a estar ahí!</strong>
                    <small>A celebrar la recibida</small>
                  </div>
                </div>
              </label>

              <label className={`radio-card ${formData.attending === 'no' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                />
                <div className="radio-content">
                  <span className="radio-emoji">💌</span>
                  <div className="radio-texts">
                    <strong>Lamentablemente no puedo</strong>
                    <small>Les mando un abrazo grande</small>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Conditional fields if attending */}
          {formData.attending === 'yes' && (
            <>
              {/* Companions */}
              <div className="form-group">
                <label htmlFor="companions" className="form-label">
                  <Users size={16} />
                  <span>¿Vas con acompañantes?</span>
                </label>
                <select
                  id="companions"
                  name="companions"
                  value={formData.companions}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="0">Voy solo/a</option>
                  <option value="1">+1 Acompañante</option>
                  <option value="2">+2 Acompañantes</option>
                  <option value="3">+3 Acompañantes</option>
                  <option value="4">+4 o más</option>
                </select>
              </div>

              {/* Dietary requirements */}
              <div className="form-group">
                <label htmlFor="diet" className="form-label">
                  <Utensils size={16} />
                  <span>Menú especial / Restricción alimentaria</span>
                </label>
                <select
                  id="diet"
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Menú estándar">Menú estándar (sin restricciones)</option>
                  <option value="Celíaco (Sin TACC)">Celíaco / Sin TACC</option>
                  <option value="Vegetariano">Vegetariano</option>
                  <option value="Vegano">Vegano</option>
                  <option value="otra">Otra especificación...</option>
                </select>

                {formData.diet === 'otra' && (
                  <input
                    type="text"
                    name="dietOther"
                    value={formData.dietOther}
                    onChange={handleChange}
                    placeholder="Detallá tu restricción alimentaria"
                    className="form-input form-input-sub"
                  />
                )}
              </div>

              {/* Song request */}
              <div className="form-group">
                <label htmlFor="song" className="form-label">
                  <Music size={16} />
                  <span>Tema que no puede faltar para bailar</span>
                </label>
                <input
                  type="text"
                  id="song"
                  name="song"
                  value={formData.song}
                  onChange={handleChange}
                  placeholder="Ej: Canción favorita de la noche"
                  className="form-input"
                />
              </div>
            </>
          )}

          {/* Message for the graduates */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <MessageSquareHeart size={16} />
              <span>Mensaje o dedicatoria para Martina &amp; Milagros</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="¡Escribiles unas palabras de felicitaciones!"
              rows={3}
              className="form-textarea"
            ></textarea>
          </div>

          {/* TWO DEDICATED WHATSAPP ACTION BUTTONS: "Avisar a Martina" / "Avisar a Milagros" */}
          <div className="form-group rsvp-send-section">
            <label className="form-label send-label">
              <Phone size={16} />
              <span>Tocá el botón para enviar tu confirmación por WhatsApp:</span>
            </label>

            <div className="rsvp-buttons-two-col">
              {/* Button 1: Avisar a Martina */}
              <button
                type="button"
                className={`btn-whatsapp-person btn-martina ${submittedTo === 'martina' ? 'btn-sent' : ''}`}
                onClick={() => handleSendTo('martina')}
                aria-label="Avisar a Martina por WhatsApp"
              >
                <div className="whatsapp-icon-circle">
                  <WhatsAppIcon size={26} />
                </div>
                <div className="btn-person-info">
                  <span className="btn-person-title">Avisar a Martina</span>
                  <span className="btn-person-phone">{martinaPhone}</span>
                </div>
              </button>

              {/* Button 2: Avisar a Milagros */}
              <button
                type="button"
                className={`btn-whatsapp-person btn-milagros ${submittedTo === 'milagros' ? 'btn-sent' : ''}`}
                onClick={() => handleSendTo('milagros')}
                aria-label="Avisar a Milagros por WhatsApp"
              >
                <div className="whatsapp-icon-circle">
                  <WhatsAppIcon size={26} />
                </div>
                <div className="btn-person-info">
                  <span className="btn-person-title">Avisar a Milagros</span>
                  <span className="btn-person-phone">{milagrosPhone}</span>
                </div>
              </button>
            </div>

            <p className="rsvp-note">
              Se abrirá WhatsApp directamente con tu mensaje de confirmación listo para enviar.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
