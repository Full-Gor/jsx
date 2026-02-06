import React, { useState, useRef, useCallback } from 'react';

export default function Infographic3DAnimated() {
  const maxBarWidth = 500;

  // Pourcentages initiaux
  const initialPercents = [10, 15, 25, 12, 22, 9, 18, 30];

  const [percents, setPercents] = useState(initialPercents);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef(null);
  const lastAngleRef = useRef(0);

  const bars = [
    { num: '01', baseColor: '#5DD3D3', darkColor: '#3BA8A8', bottomColor: '#2D8585' },
    { num: '02', baseColor: '#4DC4C4', darkColor: '#3A9E9E', bottomColor: '#2A7A7A' },
    { num: '03', baseColor: '#3FB5B5', darkColor: '#329292', bottomColor: '#256E6E' },
    { num: '04', baseColor: '#35A3A8', darkColor: '#2A8387', bottomColor: '#1F6266' },
    { num: '05', baseColor: '#2D8E95', darkColor: '#237278', bottomColor: '#1A575C' },
    { num: '06', baseColor: '#256A78', darkColor: '#1D5460', bottomColor: '#153F48' },
    { num: '07', baseColor: '#1E5265', darkColor: '#174150', bottomColor: '#10313C' },
    { num: '08', baseColor: '#183D50', darkColor: '#12303F', bottomColor: '#0C242F' },
  ];

  const icons = [
    <svg key="icon1" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>
    </svg>,
    <svg key="icon2" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
    </svg>,
    <svg key="icon3" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <path d="M9 18h6"/><path d="M10 22h4"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>,
    <svg key="icon4" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>,
    <svg key="icon5" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>,
    <svg key="icon6" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>,
    <svg key="icon7" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <line x1="12" y1="3" x2="12" y2="21"/><path d="M5 7l7-4 7 4"/>
      <path d="M3 13l2-6 4 0"/><path d="M15 7l4 0 2 6"/>
      <path d="M3 13a2 2 0 0 0 4 0"/><path d="M17 13a2 2 0 0 0 4 0"/>
    </svg>,
    <svg key="icon8" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#4A9BA0" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>,
  ];

  // Rivets pour le cercle
  const rivets = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i * 18 - 90) * (Math.PI / 180);
    const radius = 122;
    rivets.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
  }

  const barHeight = 52;
  const barGap = 75;
  const startY = 20;
  const depth = 14;

  // Calcul de l'angle depuis le centre du bouton
  const getAngle = useCallback((clientX, clientY) => {
    if (!knobRef.current) return 0;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    lastAngleRef.current = getAngle(e.clientX, e.clientY);
  }, [getAngle]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const currentAngle = getAngle(e.clientX, e.clientY);
    let delta = currentAngle - lastAngleRef.current;

    // Gérer le wrap-around à 180/-180
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    setRotation(prev => prev + delta);

    // Modifier les pourcentages selon la rotation
    const sensitivity = 0.15;
    setPercents(prev => prev.map((p, i) => {
      // Chaque barre réagit différemment pour créer un effet de vague
      const phase = i * 0.3;
      const change = delta * sensitivity * (1 + Math.sin(phase));
      const newVal = p + change;
      return Math.max(5, Math.min(95, newVal)); // Limiter entre 5% et 95%
    }));

    lastAngleRef.current = currentAngle;
  }, [isDragging, getAngle]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    lastAngleRef.current = getAngle(touch.clientX, touch.clientY);
  }, [getAngle]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const touch = e.touches[0];

    const currentAngle = getAngle(touch.clientX, touch.clientY);
    let delta = currentAngle - lastAngleRef.current;

    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    setRotation(prev => prev + delta);

    const sensitivity = 0.15;
    setPercents(prev => prev.map((p, i) => {
      const phase = i * 0.3;
      const change = delta * sensitivity * (1 + Math.sin(phase));
      const newVal = p + change;
      return Math.max(5, Math.min(95, newVal));
    }));

    lastAngleRef.current = currentAngle;
  }, [isDragging, getAngle]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      style={{
        width: '900px',
        height: '650px',
        background: 'linear-gradient(180deg, #4A9BA0 0%, #2A6A75 40%, #1A4A55 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* Barres et hexagones */}
      {bars.map((bar, index) => {
        const barWidth = (percents[index] / 100) * maxBarWidth;
        const barY = startY + (index * barGap);
        const hexX = barWidth + depth + 20;
        const hexY = barY + (barHeight / 2) - 32;

        return (
          <React.Fragment key={bar.num}>
            {/* BARRE 3D */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: `${barY}px`,
              height: `${barHeight + depth}px`,
              transition: 'all 0.1s ease-out',
            }}>
              {/* Ombre portée */}
              <div style={{
                position: 'absolute',
                left: '8px',
                top: '8px',
                width: `${barWidth}px`,
                height: `${barHeight}px`,
                background: 'rgba(0,0,0,0.35)',
                filter: 'blur(8px)',
                transition: 'width 0.1s ease-out',
              }} />

              {/* Face du DESSOUS */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: `${barHeight - 2}px`,
                width: `${barWidth}px`,
                height: `${depth}px`,
                background: bar.bottomColor,
                transform: 'skewX(-45deg)',
                transformOrigin: 'top left',
                transition: 'width 0.1s ease-out',
              }} />

              {/* Face DROITE */}
              <div style={{
                position: 'absolute',
                left: `${barWidth}px`,
                top: '0',
                width: `${depth}px`,
                height: `${barHeight}px`,
                background: `linear-gradient(180deg, ${bar.darkColor} 0%, ${bar.bottomColor} 100%)`,
                transform: 'skewY(-45deg)',
                transformOrigin: 'top left',
                transition: 'left 0.1s ease-out',
              }} />

              {/* Coin 3D */}
              <div style={{
                position: 'absolute',
                left: `${barWidth}px`,
                top: `${barHeight - 2}px`,
                width: '0',
                height: '0',
                borderLeft: `${depth}px solid ${bar.bottomColor}`,
                borderBottom: `${depth}px solid transparent`,
                transition: 'left 0.1s ease-out',
              }} />

              {/* Face principale */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: `${barWidth}px`,
                height: `${barHeight}px`,
                background: `linear-gradient(180deg, ${bar.baseColor} 0%, ${bar.darkColor} 100%)`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px',
                overflow: 'hidden',
                transition: 'width 0.1s ease-out',
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginRight: '20px',
                  textShadow: '1px 2px 3px rgba(0,0,0,0.3)',
                  minWidth: '35px',
                }}>{bar.num}</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{
                    width: Math.max(0, Math.min(70, barWidth - 100)),
                    height: '3px',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: '2px',
                    transition: 'width 0.1s ease-out',
                  }} />
                  <div style={{
                    width: Math.max(0, Math.min(110, barWidth - 80)),
                    height: '3px',
                    background: 'rgba(255,255,255,0.35)',
                    borderRadius: '2px',
                    transition: 'width 0.1s ease-out',
                  }} />
                </div>
              </div>
            </div>

            {/* HEXAGONE */}
            <div style={{
              position: 'absolute',
              left: `${hexX}px`,
              top: `${hexY}px`,
              width: '56px',
              height: '64px',
              zIndex: 20,
              transition: 'left 0.1s ease-out',
            }}>
              <svg
                width="56" height="64" viewBox="0 0 56 64"
                style={{
                  position: 'absolute',
                  left: '6px',
                  top: '6px',
                  filter: 'blur(6px)',
                  opacity: '0.5',
                }}
              >
                <polygon points="28,0 56,16 56,48 28,64 0,48 0,16" fill="#000"/>
              </svg>

              <svg width="56" height="64" viewBox="0 0 56 64" style={{ position: 'absolute', left: '0', top: '0' }}>
                <defs>
                  <linearGradient id={`hexGrad${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F8F8F8" />
                    <stop offset="100%" stopColor="#E8E8E8" />
                  </linearGradient>
                </defs>
                <polygon points="28,0 56,16 56,48 28,64 0,48 0,16" fill={`url(#hexGrad${index})`}/>
                <polygon points="28,2 54,17 54,20 28,6 2,20 2,17" fill="rgba(255,255,255,0.6)"/>
              </svg>

              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
                {icons[index]}
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* CERCLE INFOGRAPHICS - ROTATIF */}
      <div
        ref={knobRef}
        style={{
          position: 'absolute',
          right: '50px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '280px',
          height: '280px',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Ombre */}
        <div style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
          left: '15px',
          top: '20px',
          filter: 'blur(15px)',
        }} />

        {/* Anneau avec rivets - TOURNE */}
        <div style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'linear-gradient(160deg, #E8E8E8 0%, #D0D0D0 50%, #B8B8B8 100%)',
          boxShadow: `
            inset 3px 3px 6px rgba(255,255,255,0.8),
            inset -2px -2px 6px rgba(0,0,0,0.15),
            0 8px 20px rgba(0,0,0,0.3)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}>
          {rivets.map((rivet, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #E0E0E0 0%, #A0A0A0 100%)',
              boxShadow: `
                inset 2px 2px 3px rgba(255,255,255,0.9),
                inset -1px -1px 3px rgba(0,0,0,0.3),
                1px 2px 3px rgba(0,0,0,0.2)
              `,
              left: `${140 + rivet.x - 7}px`,
              top: `${140 + rivet.y - 7}px`,
            }} />
          ))}
        </div>

        {/* Cercle intérieur - NE TOURNE PAS */}
        <div style={{
          position: 'absolute',
          left: '35px',
          top: '35px',
          width: '210px',
          height: '210px',
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #EBEBEB 100%)',
          boxShadow: `
            inset 0 4px 10px rgba(0,0,0,0.08),
            inset 0 -2px 6px rgba(255,255,255,0.9),
            0 -3px 8px rgba(0,0,0,0.1)
          `,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#3A8A90',
            letterSpacing: '3px',
            textShadow: '0 1px 1px rgba(255,255,255,0.8)',
          }}>INFOGRAPHICS</span>

          <div style={{ display: 'flex', gap: '5px' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i < 4
                  ? 'linear-gradient(145deg, #5DD3D3 0%, #3AA8A8 100%)'
                  : 'linear-gradient(145deg, #3A8A90 0%, #2A6A70 100%)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }} />
            ))}
          </div>

          {/* Indicateur de rotation */}
          <div style={{
            fontSize: '12px',
            color: '#6ABABE',
            marginTop: '5px',
          }}>
            ↻ Tournez pour animer
          </div>
        </div>
      </div>

      {/* Watermarks */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '20px',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '11px',
      }}>
        © Visitnholz
      </div>

      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '11px',
      }}>
        <span>freepik</span>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  );
}
