import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

export default function HeroBranding() {
  return (
    <div className="hero-branding">
      <div className="laurel-emblem">
        <GraduationCap className="cap-icon" size={32} />
      </div>
      <div className="names-container">
        <span className="hero-pretitle">NUESTRA RECIBIDA</span>
        <h2 className="graduate-names">
          Martina <span className="ampersand">&amp;</span> Milagros
        </h2>
        <div className="degree-tag">
          <Sparkles size={14} className="tag-sparkle" />
          <span>Futuras Licenciadas en Psicopedagogía</span>
          <Sparkles size={14} className="tag-sparkle" />
        </div>
      </div>
    </div>
  );
}
