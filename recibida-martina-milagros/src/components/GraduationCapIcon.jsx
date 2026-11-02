import React from 'react';

/**
 * Custom scalable vector Graduation Cap (Birrete de Recibida)
 * Features dimensional styling, mortarboard, ribbon and golden tassel
 */
export default function GraduationCapIcon({ size = 72, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`graduation-cap-svg ${className}`}
    >
      <defs>
        {/* Cap top gradient */}
        <linearGradient id="capGradient" x1="10" y1="35" x2="110" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        {/* Skull cap gradient */}
        <linearGradient id="skullGradient" x1="40" y1="50" x2="80" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Gold tassel gradient */}
        <linearGradient id="goldTassel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Celeste ribbon */}
        <linearGradient id="celesteRibbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id="capShadow" x="-10%" y="-10%" width="130%" height="140%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0284c7" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Skull cap base under the mortarboard */}
      <path
        d="M38 52 C38 52 38 75 60 76 C82 75 82 52 82 52"
        fill="url(#skullGradient)"
        stroke="#0284c7"
        strokeWidth="1.5"
      />

      {/* Ribete celeste en el borde del casquete */}
      <path
        d="M40 70 C48 76 72 76 80 70"
        stroke="url(#celesteRibbon)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Mortarboard Diamond Top with Shadow */}
      <polygon
        points="60,18 112,42 60,62 8,42"
        fill="url(#capGradient)"
        filter="url(#capShadow)"
        stroke="#7dd3fc"
        strokeWidth="2"
      />

      {/* Dimensional edge highlight */}
      <polygon
        points="60,62 112,42 112,46 60,66 8,46 8,42"
        fill="#075985"
      />

      {/* Center button */}
      <ellipse cx="60" cy="40" rx="4.5" ry="3" fill="url(#goldTassel)" />

      {/* Golden & Celeste Tassel String */}
      <path
        d="M60 40 Q80 44 88 56"
        fill="none"
        stroke="url(#goldTassel)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Tassel Ring / Clasp */}
      <circle cx="88" cy="56" r="2.5" fill="#f59e0b" />

      {/* Tassel Fringe (Borla) */}
      <path
        d="M86 58 L83 82 C83 84 93 84 93 82 L90 58 Z"
        fill="url(#goldTassel)"
      />
      {/* Celeste secondary ribbon on tassel */}
      <path
        d="M87 63 L89 63 L91 80 L85 80 Z"
        fill="url(#celesteRibbon)"
        opacity="0.8"
      />

      {/* Sparkles around the cap */}
      <path
        d="M20 22 L22 26 L26 28 L22 30 L20 34 L18 30 L14 28 L18 26 Z"
        fill="#fbbf24"
        opacity="0.9"
      />
      <path
        d="M98 20 L100 23 L103 24 L100 25 L98 28 L96 25 L93 24 L96 23 Z"
        fill="#38bdf8"
        opacity="0.9"
      />
    </svg>
  );
}
