import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import HeroBranding from './components/HeroBranding';
import StageHeader from './components/StageHeader';
import CountdownDisplay from './components/CountdownDisplay';
import EventDetails from './components/EventDetails';
import TimeSimulator from './components/TimeSimulator';
import {
  DEFAULT_CONFIG,
  getArgentinaTargetTimestamp,
  getEffectiveNow,
  calculateRemaining,
  formatSpanishDate
} from './utils/dateUtils';
import {
  fireCelesteCelebration,
  firePartyCelebration,
  playCelebrationChime
} from './utils/confetti';
import './App.css';

function App() {
  // Configurable hours (defaults: 12:00 for exam, 21:30 for party)
  const [examTime, setExamTime] = useState(DEFAULT_CONFIG.examTime);
  const [partyTime, setPartyTime] = useState(DEFAULT_CONFIG.partyTime);

  // Time simulation offset in ms (0 = real current time in Argentina)
  const [simulationOffsetMs, setSimulationOffsetMs] = useState(0);

  // Tracks current simulated/real timestamp
  const [currentTimestamp, setCurrentTimestamp] = useState(() => getEffectiveNow(0));

  // Flags for celebration transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasAchievedDegree, setHasAchievedDegree] = useState(false);

  // References to prevent duplicate celebratory triggers
  const hasTriggeredExamZero = useRef(false);
  const hasTriggeredPartyZero = useRef(false);

  // Compute absolute target timestamps in Argentina timezone (UTC-3)
  const examTargetTimestamp = useMemo(() => {
    return getArgentinaTargetTimestamp(DEFAULT_CONFIG.examDate, examTime);
  }, [examTime]);

  const partyTargetTimestamp = useMemo(() => {
    return getArgentinaTargetTimestamp(DEFAULT_CONFIG.partyDate, partyTime);
  }, [partyTime]);

  // Determine active stage based on current timestamp
  // 1. 'EXAM' if before exam
  // 2. 'PARTY' if exam is passed but before party
  // 3. 'PARTY_CELEBRATION' if party has started
  const currentStage = useMemo(() => {
    if (currentTimestamp < examTargetTimestamp) {
      return 'EXAM';
    } else if (currentTimestamp < partyTargetTimestamp) {
      return 'PARTY';
    } else {
      return 'PARTY_CELEBRATION';
    }
  }, [currentTimestamp, examTargetTimestamp, partyTargetTimestamp]);

  // Synchronize degree achievement flag
  useEffect(() => {
    if (currentTimestamp >= examTargetTimestamp) {
      setHasAchievedDegree(true);
    } else {
      setHasAchievedDegree(false);
    }
  }, [currentTimestamp, examTargetTimestamp]);

  // Active target for the ONE single countdown component
  const activeTargetTimestamp = useMemo(() => {
    if (currentStage === 'EXAM') {
      return examTargetTimestamp;
    }
    return partyTargetTimestamp;
  }, [currentStage, examTargetTimestamp, partyTargetTimestamp]);

  // Compute countdown units
  const remaining = useMemo(() => {
    if (currentStage === 'PARTY_CELEBRATION') {
      return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isZero: true, isPassed: true };
    }
    return calculateRemaining(activeTargetTimestamp, currentTimestamp);
  }, [activeTargetTimestamp, currentTimestamp, currentStage]);

  // Main 1-second ticker loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(getEffectiveNow(simulationOffsetMs));
    }, 1000);

    return () => clearInterval(interval);
  }, [simulationOffsetMs]);

  // Automatic transition monitor: triggers celebration animations at zero
  useEffect(() => {
    // When Exam reaches 0:
    if (currentTimestamp >= examTargetTimestamp && !hasTriggeredExamZero.current) {
      hasTriggeredExamZero.current = true;
      setIsTransitioning(true);
      fireCelesteCelebration();
      playCelebrationChime();

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 4500);
      return () => clearTimeout(timer);
    }

    // Reset lock if we rewind before exam
    if (currentTimestamp < examTargetTimestamp) {
      hasTriggeredExamZero.current = false;
    }
  }, [currentTimestamp, examTargetTimestamp]);

  useEffect(() => {
    // When Party reaches 0:
    if (currentTimestamp >= partyTargetTimestamp && !hasTriggeredPartyZero.current) {
      hasTriggeredPartyZero.current = true;
      setIsTransitioning(true);
      firePartyCelebration();
      playCelebrationChime();

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    // Reset lock if we rewind before party
    if (currentTimestamp < partyTargetTimestamp) {
      hasTriggeredPartyZero.current = false;
    }
  }, [currentTimestamp, partyTargetTimestamp]);

  // Simulation handlers
  const handleSimulateNearExamZero = useCallback(() => {
    // Jump to 5 seconds before the exam target
    const target = examTargetTimestamp - 5000;
    const offset = target - Date.now();
    hasTriggeredExamZero.current = false;
    hasTriggeredPartyZero.current = false;
    setSimulationOffsetMs(offset);
    setCurrentTimestamp(Date.now() + offset);
  }, [examTargetTimestamp]);

  const handleSimulateStage2Direct = useCallback(() => {
    // Jump to midway between exam and party (e.g. 18 Dec 18:00)
    const target = examTargetTimestamp + (partyTargetTimestamp - examTargetTimestamp) / 2;
    const offset = target - Date.now();
    hasTriggeredExamZero.current = true;
    hasTriggeredPartyZero.current = false;
    setSimulationOffsetMs(offset);
    setCurrentTimestamp(Date.now() + offset);
  }, [examTargetTimestamp, partyTargetTimestamp]);

  const handleSimulateNearPartyZero = useCallback(() => {
    // Jump to 5 seconds before party starts
    const target = partyTargetTimestamp - 5000;
    const offset = target - Date.now();
    hasTriggeredExamZero.current = true;
    hasTriggeredPartyZero.current = false;
    setSimulationOffsetMs(offset);
    setCurrentTimestamp(Date.now() + offset);
  }, [partyTargetTimestamp]);

  const handleSimulatePartyStarted = useCallback(() => {
    // Jump to 1 hour after party started
    const target = partyTargetTimestamp + 3600000;
    const offset = target - Date.now();
    hasTriggeredExamZero.current = true;
    hasTriggeredPartyZero.current = true;
    setSimulationOffsetMs(offset);
    setCurrentTimestamp(Date.now() + offset);
  }, [partyTargetTimestamp]);

  const handleResetRealTime = useCallback(() => {
    setSimulationOffsetMs(0);
    const now = Date.now();
    setCurrentTimestamp(now);
    hasTriggeredExamZero.current = now >= examTargetTimestamp;
    hasTriggeredPartyZero.current = now >= partyTargetTimestamp;
  }, [examTargetTimestamp, partyTargetTimestamp]);

  // Formatted labels for display
  const activeDateLabel = useMemo(() => {
    return formatSpanishDate(activeTargetTimestamp);
  }, [activeTargetTimestamp]);

  const activeTimeLabel = useMemo(() => {
    return currentStage === 'EXAM' ? `${examTime} hs` : `${partyTime} hs`;
  }, [currentStage, examTime, partyTime]);

  const simulatedDescription = useMemo(() => {
    if (simulationOffsetMs === 0) return 'Tiempo Real (Argentina UTC-3)';
    if (currentStage === 'EXAM') return 'Simulando Etapa 1: Último Final';
    if (currentStage === 'PARTY') return 'Simulando Etapa 2: Esperando la Fiesta';
    return 'Simulando Etapa Final: ¡Fiesta en Curso!';
  }, [simulationOffsetMs, currentStage]);

  return (
    <div className="invitation-app-root">
      {/* Ambient background particles & orbs */}
      <div className="ambient-background">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
        <div className="stars-overlay"></div>
      </div>

      <main className="invitation-wrapper">
        {/* Brand identity: Martina & Milagros */}
        <HeroBranding />

        {/* Dynamic Stage Header: Titles, Subtitles, and Degree Milestone */}
        <StageHeader
          stage={currentStage}
          hasAchievedDegree={hasAchievedDegree}
          isTransitioning={isTransitioning}
        />

        {/* The single protagonist countdown component */}
        <CountdownDisplay
          remaining={remaining}
          stage={currentStage}
          targetDateLabel={activeDateLabel}
          targetTimeLabel={activeTimeLabel}
          isTransitioning={isTransitioning}
        />

        {/* Event Schedule & Calendar integration */}
        <EventDetails
          examTimestamp={examTargetTimestamp}
          partyTimestamp={partyTargetTimestamp}
          examTimeStr={examTime}
          partyTimeStr={partyTime}
          stage={currentStage}
        />

        {/* Invitation footer quote */}
        <footer className="invitation-footer">
          <p className="footer-quote">
            “La psicopedagogía no es solo una profesión, es la pasión por acompañar y potenciar el aprendizaje de cada persona.”
          </p>
          <div className="footer-signature">
            <span>Con amor, Martina &amp; Milagros 💙</span>
          </div>
        </footer>
      </main>

      {/* Floating Time Simulator & Verification Bar */}
      <TimeSimulator
        examTime={examTime}
        setExamTime={setExamTime}
        partyTime={partyTime}
        setPartyTime={setPartyTime}
        onSimulateNearExamZero={handleSimulateNearExamZero}
        onSimulateNearPartyZero={handleSimulateNearPartyZero}
        onSimulateStage2Direct={handleSimulateStage2Direct}
        onSimulatePartyStarted={handleSimulatePartyStarted}
        onResetRealTime={handleResetRealTime}
        isSimulating={simulationOffsetMs !== 0}
        simulatedStageDescription={simulatedDescription}
      />
    </div>
  );
}

export default App;
