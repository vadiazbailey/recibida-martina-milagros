import React from 'react';
import GraduationCapIcon from './GraduationCapIcon';
import { Sparkles, Heart } from 'lucide-react';

export default function HeroBranding() {
  return (
    <div className="hero-branding">
      {/* Prominent festive graduation cap */}
      <div className="cap-showcase">
        <div className="cap-halo-glow"></div>
        <GraduationCapIcon size={84} className="hero-cap-animated" />
      </div>

      <div className="names-container">
        <span className="hero-pretitle">🎓 ¡NOS RECIBIMOS! • NUESTRA GRAN FIESTA 🎓</span>
        <h2 className="graduate-names">
          Martina <span className="ampersand">&amp;</span> Milagros
        </h2>
        <div className="degree-tag">
          <Sparkles size={15} className="tag-sparkle" />
          <span>Licenciadas en Psicopedagogía</span>
          <Sparkles size={15} className="tag-sparkle" />
        </div>
      </div>
    </div>
  );
}
