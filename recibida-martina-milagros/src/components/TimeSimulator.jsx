import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, Sparkles, Clock, ChevronDown, ChevronUp, Eye } from 'lucide-react';

export default function TimeSimulator({
  examTime,
  setExamTime,
  partyTime,
  setPartyTime,
  martinaPhone,
  setMartinaPhone,
  milagrosPhone,
  setMilagrosPhone,
  onSimulateNearExamZero,
  onSimulateNearPartyZero,
  onSimulateStage2Direct,
  onSimulatePartyStarted,
  onResetRealTime,
  isSimulating,
  simulatedStageDescription
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="simulator-floating-container" aria-label="Panel de prueba y simulación">
      <button
        className="simulator-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Abrir panel de simulación y horarios"
      >
        <Sliders size={18} className="toggle-icon" />
        <span className="toggle-label">
          {isSimulating ? '⚡ MODO SIMULACIÓN ACTIVO' : '⚙️ Simulador de Etapas & Horarios'}
        </span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {isOpen && (
        <div className="simulator-panel">
          <div className="simulator-header">
            <h5 className="sim-title">Panel de Control &amp; Verificación</h5>
            <p className="sim-description">
              Permite simular el paso del tiempo, probar las transiciones en vivo y configurar los teléfonos de WhatsApp.
            </p>
          </div>

          {/* Time configuration */}
          <div className="sim-section">
            <span className="sim-section-label">Configuración de Horarios (UTC-3):</span>
            <div className="sim-inputs-row">
              <label className="sim-input-label">
                <Clock size={14} />
                <span>Hora Examen (18/12):</span>
                <input
                  type="time"
                  value={examTime}
                  onChange={(e) => setExamTime(e.target.value)}
                  className="sim-time-input"
                />
              </label>

              <label className="sim-input-label">
                <Clock size={14} />
                <span>Hora Fiesta (19/12):</span>
                <input
                  type="time"
                  value={partyTime}
                  onChange={(e) => setPartyTime(e.target.value)}
                  className="sim-time-input"
                />
              </label>
            </div>
          </div>

          {/* Phone numbers configuration */}
          <div className="sim-section">
            <span className="sim-section-label">Teléfonos para Confirmación WhatsApp:</span>
            <div className="sim-inputs-row">
              <label className="sim-input-label">
                <span>📱 WhatsApp Martina:</span>
                <input
                  type="text"
                  value={martinaPhone}
                  onChange={(e) => setMartinaPhone(e.target.value)}
                  className="sim-time-input"
                  placeholder="+54 9 2262 57-2405"
                />
              </label>

              <label className="sim-input-label">
                <span>📱 WhatsApp Milagros:</span>
                <input
                  type="text"
                  value={milagrosPhone}
                  onChange={(e) => setMilagrosPhone(e.target.value)}
                  className="sim-time-input"
                  placeholder="+54 9 2262..."
                />
              </label>
            </div>
          </div>

          {/* Simulation triggers */}
          <div className="sim-section">
            <span className="sim-section-label">Simulaciones Rápidas de Transición:</span>
            <div className="sim-buttons-grid">
              <button
                type="button"
                className="btn-sim sim-highlight"
                onClick={onSimulateNearExamZero}
              >
                <Sparkles size={16} />
                <span>1. Probar CERO de Examen (5s y Confeti Celeste)</span>
              </button>

              <button
                type="button"
                className="btn-sim"
                onClick={onSimulateStage2Direct}
              >
                <Eye size={16} />
                <span>2. Ver Etapa 2 (Directo a Fiesta)</span>
              </button>

              <button
                type="button"
                className="btn-sim sim-highlight"
                onClick={onSimulateNearPartyZero}
              >
                <Sparkles size={16} />
                <span>3. Probar CERO de Fiesta (5s y Festejo)</span>
              </button>

              <button
                type="button"
                className="btn-sim"
                onClick={onSimulatePartyStarted}
              >
                <Play size={16} />
                <span>4. Ver Fiesta Iniciada</span>
              </button>
            </div>
          </div>

          {/* Status and reset */}
          <div className="sim-footer">
            <div className="sim-current-mode">
              <strong>Estado actual:</strong> {simulatedStageDescription}
            </div>
            {isSimulating && (
              <button
                type="button"
                className="btn-sim-reset"
                onClick={onResetRealTime}
              >
                <RotateCcw size={14} />
                <span>Restaurar Tiempo Real de Argentina</span>
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
