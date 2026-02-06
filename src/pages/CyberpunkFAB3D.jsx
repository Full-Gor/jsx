import { useState, useEffect, useRef, useCallback } from "react";

const CyberpunkFAB3D = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [dragStartOrbit, setDragStartOrbit] = useState(0);
  const [logoPhase, setLogoPhase] = useState(0);
  const [ringBoost, setRingBoost] = useState(0);
  const [deploying, setDeploying] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const lastMove = useRef({ angle: 0, t: 0 });

  const menuItems = [
    { id: 0, icon: "settings", label: "Settings", colors: { primary: "#ff4466", glow: "rgba(255,68,102,0.5)" }, ringColor: "#ff4466" },
    { id: 1, icon: "waveform", label: "Audio", colors: { primary: "#ff3366", glow: "rgba(255,51,102,0.5)" }, ringColor: "#ff3366" },
    { id: 2, icon: "users", label: "Contacts", colors: { primary: "#aa55ff", glow: "rgba(170,85,255,0.5)" }, ringColor: "#aa55ff" },
    { id: 3, icon: "heart", label: "Favorites", colors: { primary: "#ff2255", glow: "rgba(255,34,85,0.5)" }, ringColor: "#ff2255" },
    { id: 4, icon: "network", label: "Network", colors: { primary: "#44ddff", glow: "rgba(68,221,255,0.5)" }, ringColor: "#44ddff" },
    { id: 5, icon: "chat", label: "Messages", colors: { primary: "#ff5577", glow: "rgba(255,85,119,0.5)" }, ringColor: "#ff5577" },
    { id: 6, icon: "mic", label: "Voice", colors: { primary: "#dd44ff", glow: "rgba(221,68,255,0.5)" }, ringColor: "#dd44ff" },
    { id: 7, icon: "dashboard", label: "Dashboard", colors: { primary: "#ff6633", glow: "rgba(255,102,51,0.5)" }, ringColor: "#ff6633" },
  ];

  useEffect(() => {
    if (isOpen) {
      setDeploying(true);
      setLogoPhase(1);
      const t1 = setTimeout(() => setLogoPhase(2), 300);
      const t2 = setTimeout(() => setLogoPhase(3), 600);
      const t3 = setTimeout(() => setLogoPhase(4), 900);
      const t4 = setTimeout(() => setDeploying(false), 600);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    } else {
      setDeploying(true);
      setLogoPhase(0);
      const t = setTimeout(() => setDeploying(false), 500);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.setTransform(2, 0, 0, 2, 0, 0); };
    resize();
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 2 + 0.5, alpha: Math.random() * 0.35 + 0.05 });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = canvas.offsetWidth; if (p.x > canvas.offsetWidth) p.x = 0; if (p.y < 0) p.y = canvas.offsetHeight; if (p.y > canvas.offsetHeight) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(140,200,255,${p.alpha})`; ctx.fill(); });
      for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < 90) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(100,160,255,${0.07 * (1 - dist / 90)})`; ctx.lineWidth = 0.5; ctx.stroke(); } } }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth momentum with ref-based animation loop
  const orbitAngleRef = useRef(0);
  const orbitMomentumRef = useRef(0);

  useEffect(() => { orbitAngleRef.current = orbitAngle; }, [orbitAngle]);

  useEffect(() => {
    if (isDragging) return;
    let id;
    const tick = () => {
      if (Math.abs(orbitMomentumRef.current) < 0.01) { orbitMomentumRef.current = 0; return; }
      orbitMomentumRef.current *= 0.96;
      setOrbitAngle(prev => prev + orbitMomentumRef.current);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isDragging]);

  // Decay ringBoost over time
  useEffect(() => {
    if (ringBoost > 0) {
      const id = requestAnimationFrame(() => setRingBoost(prev => prev * 0.98));
      return () => cancelAnimationFrame(id);
    }
  }, [ringBoost]);

  const getAngleFromCenter = useCallback((clientX, clientY) => {
    if (!sceneRef.current) return 0;
    const rect = sceneRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx);
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (e.target.closest("[data-fab-btn]")) return;
    setIsDragging(true);
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const angle = getAngleFromCenter(cx, cy);
    setDragStartAngle(angle);
    setDragStartOrbit(orbitAngle);
    lastMove.current = { angle, t: Date.now() };
    orbitMomentumRef.current = 0;
  }, [orbitAngle, getAngleFromCenter]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const angle = getAngleFromCenter(cx, cy);
    let delta = angle - dragStartAngle;
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    setOrbitAngle(dragStartOrbit + delta * (180 / Math.PI));
    const now = Date.now();
    const dt = now - lastMove.current.t;
    if (dt > 0 && dt < 100) {
      let angleDelta = angle - lastMove.current.angle;
      if (angleDelta > Math.PI) angleDelta -= 2 * Math.PI;
      if (angleDelta < -Math.PI) angleDelta += 2 * Math.PI;
      const speed = angleDelta * (180 / Math.PI) / Math.max(dt, 16) * 16;
      // Smooth: blend with previous momentum and clamp
      orbitMomentumRef.current = orbitMomentumRef.current * 0.6 + speed * 0.4;
      orbitMomentumRef.current = Math.max(-8, Math.min(8, orbitMomentumRef.current));
    }
    lastMove.current = { angle, t: now };
  }, [isDragging, dragStartAngle, dragStartOrbit, getAngleFromCenter]);

  const handlePointerUp = useCallback(() => { setIsDragging(false); }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);
    return () => { window.removeEventListener("mousemove", handlePointerMove); window.removeEventListener("mouseup", handlePointerUp); window.removeEventListener("touchmove", handlePointerMove); window.removeEventListener("touchend", handlePointerUp); };
  }, [handlePointerMove, handlePointerUp]);

  const renderIcon = (type, size = 20) => {
    const s = size;
    const p = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
    switch (type) {
      case "settings": return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
      case "waveform": return <svg {...p}><line x1="4" y1="8" x2="4" y2="16"/><line x1="7" y1="5" x2="7" y2="19"/><line x1="10" y1="9" x2="10" y2="15"/><line x1="13" y1="3" x2="13" y2="21"/><line x1="16" y1="7" x2="16" y2="17"/><line x1="19" y1="10" x2="19" y2="14"/></svg>;
      case "users": return <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
      case "heart": return <svg {...p} fill="currentColor" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
      case "network": return <svg {...p}><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><line x1="12" y1="7.5" x2="5" y2="16.5"/><line x1="12" y1="7.5" x2="19" y2="16.5"/><line x1="7.5" y1="19" x2="16.5" y2="19"/></svg>;
      case "chat": return <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>;
      case "mic": return <svg {...p}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
      case "dashboard": return <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>;
      default: return null;
    }
  };

  const getItemPos = (i, total, r) => {
    const orbitRad = (orbitAngle * Math.PI) / 180;
    const a = -Math.PI / 2 - Math.PI / 8 + (i * 2 * Math.PI) / total + orbitRad;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  };

  return (
    <div ref={containerRef} onMouseDown={handlePointerDown} onTouchStart={handlePointerDown}
      style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at center, #1a1040 0%, #0d0820 40%, #060412 100%)", overflow: "hidden", position: "relative", fontFamily: "'Segoe UI', sans-serif", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", touchAction: "none" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.03 }}>
          <defs><pattern id="tG" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse"><polygon points="30,0 60,52 0,52" fill="none" stroke="#8888ff" strokeWidth="0.5"/><polygon points="0,0 60,0 30,52" fill="none" stroke="#8888ff" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#tG)"/>
        </svg>
      </div>

      <div style={{ perspective: 900, perspectiveOrigin: "50% 50%" }}>
        <div ref={sceneRef} style={{ width: 440, height: 440, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", transformStyle: "preserve-3d", transform: "rotateX(32deg) rotateY(-5deg)", transition: "none" }}>

          {/* Back shadow */}
          <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,10,60,0.8) 0%, transparent 70%)", transform: "translateZ(-60px)", filter: "blur(20px)" }} />

          {/* Outer ring */}
          <div style={{ position: "absolute", width: 390, height: 390, borderRadius: "50%", border: "1px solid rgba(100,200,255,0.06)", transform: "translateZ(-40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", scale: isOpen ? "1" : "0.3", opacity: isOpen ? 1 : 0 }} />

          {/* Triangle pattern back - self rotating */}
          <svg width="420" height="420" viewBox="0 0 420 420" style={{ position: "absolute", transform: "translateZ(-30px)", transition: "scale 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s cubic-bezier(0.16,1,0.3,1)", scale: isOpen ? "1" : "0.2", opacity: isOpen ? 0.35 : 0, animation: isOpen ? "spinCW 30s linear infinite" : "none" }}>
            <defs><linearGradient id="triG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#44aaff" stopOpacity="0.6"/><stop offset="50%" stopColor="#8844ff" stopOpacity="0.4"/><stop offset="100%" stopColor="#44aaff" stopOpacity="0.6"/></linearGradient></defs>
            {Array.from({length:24}).map((_,i) => { const a=(i*15*Math.PI)/180; const cx=210,cy=210; return <polygon key={i} points={`${cx+Math.cos(a-0.06)*155},${cy+Math.sin(a-0.06)*155} ${cx+Math.cos(a+0.06)*155},${cy+Math.sin(a+0.06)*155} ${cx+Math.cos(a)*178},${cy+Math.sin(a)*178}`} fill="url(#triG)" stroke="rgba(100,170,255,0.2)" strokeWidth="0.5"/> })}
          </svg>

          {/* Triangle pattern mid - counter rotating */}
          <svg width="420" height="420" viewBox="0 0 420 420" style={{ position: "absolute", transform: "translateZ(-20px) rotate(7.5deg)", transition: "scale 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s cubic-bezier(0.16,1,0.3,1)", scale: isOpen ? "1" : "0.2", opacity: isOpen ? 0.2 : 0, animation: isOpen ? "spinCCW 25s linear infinite" : "none" }}>
            {Array.from({length:24}).map((_,i) => { const a=(i*15*Math.PI)/180; const cx=210,cy=210; return <polygon key={i} points={`${cx+Math.cos(a-0.05)*140},${cy+Math.sin(a-0.05)*140} ${cx+Math.cos(a+0.05)*140},${cy+Math.sin(a+0.05)*140} ${cx+Math.cos(a)*155},${cy+Math.sin(a)*155}`} fill="rgba(100,130,255,0.15)" stroke="rgba(100,170,255,0.1)" strokeWidth="0.5"/> })}
          </svg>

          {/* Glow disc */}
          <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(60,180,255,0.12) 0%, rgba(80,60,200,0.08) 40%, transparent 70%)", transform: "translateZ(-10px)", transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)", scale: isOpen ? "1.5" : "0.6", opacity: isOpen ? 1 : 0, filter: "blur(15px)" }} />

          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const pos = getItemPos(index, menuItems.length, 164);
            const delay = index * 0.055;
            const isH = hoveredItem === item.id;
            return (
              <div key={item.id}
                style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: 60, height: 60, marginLeft: -30, marginTop: -30,
                  transform: `translate(${isOpen ? pos.x : 0}px, ${isOpen ? pos.y : 0}px)`,
                  transition: deploying ? `transform ${isOpen ? `0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s` : `0.35s cubic-bezier(0.16,1,0.3,1) ${(menuItems.length - index) * 0.03}s`}` : "none",
                  transformStyle: "preserve-3d", zIndex: 10,
                }}>
                <div onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)} data-fab-btn="true" onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 60, height: 60,
                    transform: isOpen ? `translateZ(${isH ? 35 : 10}px) scale(${isH ? 1.18 : 1})` : "translateZ(0px) scale(0)",
                    transition: `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${isOpen ? delay : 0}s, opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${isOpen ? delay : 0}s`,
                    opacity: isOpen ? 1 : 0, cursor: "pointer",
                    transformStyle: "preserve-3d",
                  }}>
                <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `radial-gradient(circle, ${item.colors.glow} 0%, transparent 70%)`, opacity: isH ? 0.9 : 0.25, transition: "opacity 0.3s ease", filter: "blur(5px)", transform: "translateZ(-5px)" }} />
                <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: "absolute", top: 0, left: 0, animation: isOpen ? `${index % 2 === 0 ? 'spinCW' : 'spinCCW'} ${8 + index}s linear infinite` : "none" }}>
                  <defs><linearGradient id={`r${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={item.ringColor} stopOpacity="0.8"/><stop offset="50%" stopColor={item.ringColor} stopOpacity="0.15"/><stop offset="100%" stopColor={item.ringColor} stopOpacity="0.8"/></linearGradient></defs>
                  <circle cx="30" cy="30" r="28" fill="none" stroke={`url(#r${item.id})`} strokeWidth="1.5" strokeDasharray={isH ? "176" : "20 8"} style={{ transition: "stroke-dasharray 0.4s ease" }}/>
                  {Array.from({length:12}).map((_,i) => { const a=(i*30*Math.PI)/180; return <line key={i} x1={30+Math.cos(a)*25} y1={30+Math.sin(a)*25} x2={30+Math.cos(a)*28} y2={30+Math.sin(a)*28} stroke={item.ringColor} strokeWidth="0.5" opacity="0.3"/> })}
                </svg>
                <div style={{ position: "absolute", top: 6, left: 6, width: 48, height: 48, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, rgba(40,30,80,0.95), rgba(12,8,35,0.98))", display: "flex", alignItems: "center", justifyContent: "center", color: item.colors.primary, boxShadow: isH ? `0 0 24px ${item.colors.glow}, inset 0 0 15px rgba(0,0,0,0.5)` : "inset 0 0 15px rgba(0,0,0,0.5)", transition: "box-shadow 0.3s ease", border: `1px solid rgba(${parseInt(item.colors.primary.slice(1,3),16)},${parseInt(item.colors.primary.slice(3,5),16)},${parseInt(item.colors.primary.slice(5,7),16)},0.2)` }}>
                  {renderIcon(item.icon, 20)}
                </div>
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: `translateX(-50%) translateY(${isH ? "8px" : "2px"}) translateZ(5px)`, opacity: isH ? 1 : 0, transition: "all 0.2s ease", fontSize: 11, color: item.colors.primary, whiteSpace: "nowrap", textShadow: `0 0 10px ${item.colors.glow}`, fontWeight: 600, letterSpacing: "0.5px", pointerEvents: "none" }}>{item.label}</div>
              </div>
              </div>
            );
          })}

          {/* Center shadow */}
          <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)", transform: "translateZ(-15px)", filter: "blur(12px)" }} />

          {/* CENTER FAB */}
          <button data-fab-btn="true" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); setRingBoost(1); }}
            style={{ position: "relative", width: 120, height: 120, borderRadius: "50%", border: "none", cursor: "pointer", background: "transparent", zIndex: 20, outline: "none", padding: 0, transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
            <div style={{ position: "absolute", inset: -25, borderRadius: "50%", background: "radial-gradient(circle, rgba(60,220,255,0.3) 30%, rgba(60,220,255,0.04) 60%, transparent 70%)", filter: "blur(10px)", transition: "all 0.5s ease", opacity: isOpen ? 1 : 0.5, transform: `translateZ(-5px) scale(${isOpen ? 1.15 : 0.9})` }} />
            <div style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "2px solid rgba(60,220,255,0.5)", boxShadow: isOpen ? "0 0 35px rgba(60,220,255,0.4), inset 0 0 30px rgba(60,220,255,0.1)" : "0 0 15px rgba(60,220,255,0.2)", transition: "all 0.5s ease", transform: "translateZ(2px)" }} />

            <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: "absolute", top: 0, left: 0, transform: "translateZ(4px)" }}>
              <defs><linearGradient id="cR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#55ddff" stopOpacity="0.7"/><stop offset="50%" stopColor="#3388cc" stopOpacity="0.2"/><stop offset="100%" stopColor="#55ddff" stopOpacity="0.7"/></linearGradient>
              <linearGradient id="cR2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#aa66ff" stopOpacity="0.5"/><stop offset="50%" stopColor="#6633cc" stopOpacity="0.15"/><stop offset="100%" stopColor="#aa66ff" stopOpacity="0.5"/></linearGradient></defs>
              {/* Ring 1 - CW */}
              <g style={{ animation: isOpen ? `spinCW ${3 - ringBoost * 1.5}s linear infinite` : "none", transformOrigin: "60px 60px" }}>
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(60,200,255,0.12)" strokeWidth="1"/>
                {[{s:0,e:80},{s:120,e:200},{s:240,e:320}].map((arc,i) => <path key={i} d={describeArc(60,60,54,arc.s,arc.e)} fill="none" stroke="url(#cR)" strokeWidth="1.5" strokeLinecap="round"/>)}
              </g>
              {/* Ring 2 - CCW */}
              <g style={{ animation: isOpen ? `spinCCW ${5 - ringBoost * 2}s linear infinite` : "none", transformOrigin: "60px 60px" }}>
                <circle cx="60" cy="60" r="47" fill="none" stroke="rgba(60,200,255,0.08)" strokeWidth="0.5"/>
                {[{s:30,e:90},{s:150,e:210},{s:270,e:330}].map((arc,i) => <path key={i} d={describeArc(60,60,47,arc.s,arc.e)} fill="none" stroke="url(#cR2)" strokeWidth="1.2" strokeLinecap="round"/>)}
              </g>
              {/* Ring 3 - CW faster */}
              <g style={{ animation: isOpen ? `spinCW ${7 - ringBoost * 3}s linear infinite` : "none", transformOrigin: "60px 60px" }}>
                <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(60,200,255,0.06)" strokeWidth="0.5"/>
                {Array.from({length:36}).map((_,i) => { if(i%3===0)return null; const a=(i*10*Math.PI)/180; return <line key={i} x1={60+Math.cos(a)*38} y1={60+Math.sin(a)*38} x2={60+Math.cos(a)*42} y2={60+Math.sin(a)*42} stroke="rgba(60,200,255,0.18)" strokeWidth="1"/> })}
              </g>
              {/* Ring 4 - CCW slow, outer */}
              <g style={{ animation: isOpen ? `spinCCW ${9 - ringBoost * 3}s linear infinite` : "none", transformOrigin: "60px 60px" }}>
                {[{s:10,e:50},{s:70,e:110},{s:130,e:170},{s:190,e:230},{s:250,e:290},{s:310,e:350}].map((arc,i) => <path key={i} d={describeArc(60,60,57,arc.s,arc.e)} fill="none" stroke="rgba(100,180,255,0.1)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="4 2"/>)}
              </g>
            </svg>

            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: "radial-gradient(circle at 38% 38%, rgba(35,60,95,0.9) 0%, rgba(15,25,50,0.95) 50%, rgba(8,12,30,0.98) 100%)", boxShadow: "inset 0 0 30px rgba(0,0,0,0.5), inset 0 2px 6px rgba(60,200,255,0.1)", transform: "translateZ(6px)" }} />

            {/* ANIMATED LOGO WITH ELEVATION */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transformStyle: "preserve-3d", transform: `translateZ(${logoPhase >= 3 ? 30 : logoPhase >= 2 ? 20 : logoPhase >= 1 ? 14 : 10}px)`, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ overflow: "visible", filter: logoPhase >= 3 ? "drop-shadow(0 0 12px rgba(60,220,255,0.5))" : "none", transition: "filter 0.5s ease" }}>
                <defs>
                  <linearGradient id="dF" x1="26" y1="4" x2="26" y2="48" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#88bbdd"/></linearGradient>
                  <linearGradient id="dFR" x1="30" y1="4" x2="22" y2="48" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ddeeff"/><stop offset="100%" stopColor="#6699bb"/></linearGradient>
                  <filter id="dG"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  <filter id="dG2"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  <filter id="dG3"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>

                {/* Bottom shadow that grows as logo elevates */}
                <ellipse cx="26" cy={logoPhase >= 2 ? 48 : 36} rx={logoPhase >= 3 ? 20 : logoPhase >= 2 ? 12 : 0} ry={logoPhase >= 3 ? 4 : logoPhase >= 2 ? 2 : 0} fill="rgba(60,220,255,0.1)" style={{ transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
                <ellipse cx="26" cy={logoPhase >= 2 ? 48 : 36} rx={logoPhase >= 3 ? 14 : 0} ry={logoPhase >= 3 ? 2.5 : 0} fill="rgba(60,220,255,0.2)" style={{ transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s" }} />

                {/* Left facet */}
                <path d={`M26 ${logoPhase>=1?4:20} L${logoPhase>=1?11:20} ${logoPhase>=1?21:26} L26 ${logoPhase>=1?44:32} Z`} fill="url(#dF)" opacity={logoPhase>=2?0.9:0.95} filter="url(#dG)" style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
                {/* Right facet - slightly darker */}
                <path d={`M26 ${logoPhase>=1?4:20} L${logoPhase>=1?41:32} ${logoPhase>=1?21:26} L26 ${logoPhase>=1?44:32} Z`} fill="url(#dFR)" opacity={logoPhase>=2?0.7:0.9} filter="url(#dG)" style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
                {/* Horizontal facet line */}
                <line x1={logoPhase>=1?11:22} y1={logoPhase>=1?21:26} x2={logoPhase>=1?41:30} y2={logoPhase>=1?21:26} stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
                {/* Inner diamond cutout */}
                <path d={`M26 ${logoPhase>=2?13:22} L${logoPhase>=2?32:28} ${logoPhase>=2?22:26} L26 ${logoPhase>=2?34:30} L${logoPhase>=2?20:24} ${logoPhase>=2?22:26} Z`} fill={`rgba(8,15,35,${logoPhase>=2?0.75:0.3})`} style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s" }} />
                {/* Inner diamond bright edge */}
                <path d={`M26 ${logoPhase>=2?13:22} L${logoPhase>=2?32:28} ${logoPhase>=2?22:26} L26 ${logoPhase>=2?34:30} L${logoPhase>=2?20:24} ${logoPhase>=2?22:26} Z`} fill="none" stroke={`rgba(60,220,255,${logoPhase>=3?0.4:0})`} strokeWidth="0.5" style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />

                {/* Expanding energy rings */}
                <circle cx="26" cy="26" r={logoPhase>=3?28:5} fill="none" stroke="rgba(60,220,255,0.3)" strokeWidth="0.8" style={{ transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s" }} />
                <circle cx="26" cy="26" r={logoPhase>=3?34:3} fill="none" stroke="rgba(100,180,255,0.15)" strokeWidth="0.5" strokeDasharray={logoPhase>=4?"6 4":"0"} style={{ transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
                  {logoPhase>=4 && <animateTransform attributeName="transform" type="rotate" from="0 26 26" to="360 26 26" dur="10s" repeatCount="indefinite"/>}
                </circle>
                <circle cx="26" cy="26" r={logoPhase>=4?40:2} fill="none" stroke="rgba(60,200,255,0.08)" strokeWidth="0.4" strokeDasharray={logoPhase>=4?"3 6":"0"} style={{ transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>
                  {logoPhase>=4 && <animateTransform attributeName="transform" type="rotate" from="360 26 26" to="0 26 26" dur="15s" repeatCount="indefinite"/>}
                </circle>

                {/* Top energy spike */}
                <line x1="26" y1={logoPhase>=3?-6:10} x2="26" y2={logoPhase>=3?4:10} stroke="rgba(100,220,255,0.6)" strokeWidth="1.5" strokeLinecap="round" filter="url(#dG2)" style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
                {/* Bottom energy spike */}
                <line x1="26" y1={logoPhase>=3?48:36} x2="26" y2={logoPhase>=3?56:36} stroke="rgba(100,220,255,0.3)" strokeWidth="1" strokeLinecap="round" filter="url(#dG2)" style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1) 0.35s" }} />
                {/* Side spikes */}
                <line x1={logoPhase>=3?-4:20} y1="26" x2={logoPhase>=3?4:20} y2="26" stroke="rgba(100,220,255,0.3)" strokeWidth="1" strokeLinecap="round" filter="url(#dG2)" style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1) 0.4s" }} />
                <line x1={logoPhase>=3?48:32} y1="26" x2={logoPhase>=3?56:32} y2="26" stroke="rgba(100,220,255,0.3)" strokeWidth="1" strokeLinecap="round" filter="url(#dG2)" style={{ transition: "all 0.4s cubic-bezier(0.16,1,0.3,1) 0.4s" }} />

                {/* Orbiting energy dots */}
                {logoPhase>=4 && [0,1,2,3,4,5].map(i => { const a=(i*60)*Math.PI/180; return <circle key={i} cx={26+Math.cos(a)*28} cy={26+Math.sin(a)*28} r="1.2" fill="rgba(60,220,255,0.7)" filter="url(#dG2)"><animate attributeName="opacity" values="0.2;1;0.2" dur={`${1.5+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.25}s`}/><animateTransform attributeName="transform" type="rotate" from={`0 26 26`} to={`${i%2===0?360:-360} 26 26`} dur={`${6+i}s`} repeatCount="indefinite"/></circle>; })}
              </svg>
            </div>

            <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1px solid rgba(60,220,255,0.3)", animation: "pulse 2s ease-in-out infinite", transform: "translateZ(3px)" }} />
          </button>

          {/* Floating specs */}
          {isOpen && [0,1,2,3,4,5].map(i => { const a=(i*60+30)*Math.PI/180; const r=80+i*8; return <div key={`sp${i}`} style={{ position: "absolute", left: "50%", top: "50%", width: 3, height: 3, marginLeft: -1.5, marginTop: -1.5, borderRadius: "50%", background: "rgba(100,200,255,0.6)", boxShadow: "0 0 6px rgba(100,200,255,0.4)", transform: `translate(${Math.cos(a)*r}px, ${Math.sin(a)*r}px) translateZ(${30+i*5}px)`, opacity: 0.7 }} />; })}

        </div>
      </div>

      <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", color: "rgba(100,180,255,0.3)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", pointerEvents: "none" }}>
        drag to spin · tap center to {isOpen ? "close" : "open"}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { transform: translateZ(3px) scale(1); opacity: 0.5; } 50% { transform: translateZ(3px) scale(1.1); opacity: 0; } }
        @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
};

function describeArc(x, y, r, s, e) { const st = polarToCart(x,y,r,e), en = polarToCart(x,y,r,s); return `M ${st.x} ${st.y} A ${r} ${r} 0 ${e-s<=180?"0":"1"} 0 ${en.x} ${en.y}`; }
function polarToCart(cx, cy, r, deg) { const rad = ((deg-90)*Math.PI)/180; return { x: cx+r*Math.cos(rad), y: cy+r*Math.sin(rad) }; }

export default CyberpunkFAB3D;
