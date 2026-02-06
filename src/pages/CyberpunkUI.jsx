import { useState, useEffect } from "react";

const YELLOW = "#E8D44D";
const YELLOW_BRIGHT = "#F5E642";
const RED = "#E63946";
const DARK = "#0A0A0F";
const DARK_BLUE = "#0D1B2A";
const CYAN = "#00E5FF";
const ORANGE = "#FF6B35";
const GRAY = "#1A1A2E";
const LIGHT_GRAY = "#2A2A3E";

// Scanline overlay
const Scanlines = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 9999,
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
    }}
  />
);

// Animated glitch text
const GlitchText = ({ children, style = {}, as = "span" }) => {
  const Tag = as;
  return (
    <Tag
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
    >
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      <span
        className="glitch-1"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          clipPath: "inset(20% 0 40% 0)",
          color: CYAN,
          opacity: 0.7,
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </Tag>
  );
};

// Corner brackets decoration
const CornerBrackets = ({ color = YELLOW, size = 12, thickness = 2, children, style = {} }) => (
  <div style={{ position: "relative", padding: size + 4, ...style }}>
    {/* TL */}
    <div style={{ position: "absolute", top: 0, left: 0, width: size, height: size, borderTop: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` }} />
    {/* TR */}
    <div style={{ position: "absolute", top: 0, right: 0, width: size, height: size, borderTop: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` }} />
    {/* BL */}
    <div style={{ position: "absolute", bottom: 0, left: 0, width: size, height: size, borderBottom: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` }} />
    {/* BR */}
    <div style={{ position: "absolute", bottom: 0, right: 0, width: size, height: size, borderBottom: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` }} />
    {children}
  </div>
);

// Hazard stripes
const HazardStripe = ({ height = 8, style = {} }) => (
  <div
    style={{
      height,
      background: `repeating-linear-gradient(
        -45deg,
        ${YELLOW},
        ${YELLOW} 6px,
        ${DARK} 6px,
        ${DARK} 12px
      )`,
      ...style,
    }}
  />
);

// Blinking dot
const BlinkDot = ({ color = CYAN, size = 6, delay = 0 }) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 ${size}px ${color}`,
      animation: `blink 1.5s ease-in-out ${delay}s infinite`,
    }}
  />
);

// Data bar
const DataBar = ({ value = 70, color = YELLOW, height = 4 }) => (
  <div style={{ height, background: "rgba(255,255,255,0.08)", width: "100%", position: "relative" }}>
    <div
      style={{
        height: "100%",
        width: `${value}%`,
        background: color,
        boxShadow: `0 0 8px ${color}44`,
        transition: "width 1s ease",
      }}
    />
  </div>
);

// Grid pattern background
const GridBg = ({ opacity = 0.08 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(232,212,77,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(232,212,77,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px",
      pointerEvents: "none",
    }}
  />
);

// Chevron arrows
const Chevrons = ({ count = 3, color = YELLOW, direction = "right", size = 10 }) => (
  <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width={size} height={size * 1.6} viewBox="0 0 10 16" style={{ opacity: 0.5 + (i / count) * 0.5 }}>
        <polyline
          points={direction === "right" ? "2,2 8,8 2,14" : "8,2 2,8 8,14"}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
    ))}
  </div>
);

// Cross/target marker
const TargetMarker = ({ size = 20, color = YELLOW }) => (
  <svg width={size} height={size} viewBox="0 0 20 20">
    <line x1="10" y1="0" x2="10" y2="20" stroke={color} strokeWidth="1" />
    <line x1="0" y1="10" x2="20" y2="10" stroke={color} strokeWidth="1" />
    <circle cx="10" cy="10" r="6" fill="none" stroke={color} strokeWidth="1" />
    <circle cx="10" cy="10" r="2" fill={color} />
  </svg>
);

// Hex code display
const HexDisplay = ({ value = "0x4F2A", color = CYAN }) => (
  <span style={{ fontFamily: "'Share Tech Mono', monospace", color, fontSize: 10, letterSpacing: 2 }}>
    {value}
  </span>
);

// Dark cadran / black screen panel
const CadranPanel = ({ height = 75, children, cornerColor = YELLOW, label }) => (
  <div style={{ height, background: DARK, border: `1.5px solid ${YELLOW}33`, position: "relative", overflow: "hidden" }}>
    <GridBg opacity={0.04} />
    {/* Corner accents */}
    <div style={{ position: "absolute", inset: 4 }}>
      {[[0,0,"Top","Left"],[0,0,"Top","Right"],[0,0,"Bottom","Left"],[0,0,"Bottom","Right"]].map(([,,v,h],i) => (
        <div key={i} style={{ position: "absolute", [v.toLowerCase()]: 0, [h.toLowerCase()]: 0, width: 8, height: 8, [`border${v}`]: `1.5px solid ${cornerColor}`, [`border${h}`]: `1.5px solid ${cornerColor}` }} />
      ))}
    </div>
    {/* Top-right controls */}
    <div style={{ position: "absolute", top: 6, right: 8, display: "flex", gap: 4, alignItems: "center" }}>
      <div style={{ width: 6, height: 6, border: `1px solid ${YELLOW}55` }} />
      <svg width="8" height="8" viewBox="0 0 10 10"><line x1="2" y1="2" x2="8" y2="8" stroke={`${YELLOW}66`} strokeWidth="1.5" /><line x1="8" y1="2" x2="2" y2="8" stroke={`${YELLOW}66`} strokeWidth="1.5" /></svg>
    </div>
    {label && <div style={{ position: "absolute", bottom: 5, left: 10, fontSize: 6, fontFamily: "'Share Tech Mono'", color: `${YELLOW}55`, letterSpacing: 2 }}>{label}</div>}
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children || <TargetMarker size={22} color={`${YELLOW}44`} />}
    </div>
  </div>
);

// Main component
export default function CyberpunkUI() {
  const [time, setTime] = useState(new Date());
  const [activePanel, setActivePanel] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setScanProgress((p) => (p >= 100 ? 0 : p + Math.random() * 3));
    }, 100);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActivePanel((p) => (p + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", { hour12: false });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: DARK,
        color: YELLOW,
        fontFamily: "'Share Tech Mono', 'Courier New', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes glitchShift {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, 2px); }
          80% { transform: translate(1px, -2px); }
        }
        @keyframes dataFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .cyber-panel:hover {
          border-color: ${CYAN} !important;
          box-shadow: 0 0 20px ${CYAN}22, inset 0 0 30px ${CYAN}08 !important;
        }
        .cyber-btn:hover {
          background: ${YELLOW} !important;
          color: ${DARK} !important;
          box-shadow: 0 0 15px ${YELLOW}66 !important;
        }
      `}</style>

      <Scanlines />

      {/* Moving scanline */}
      <div
        style={{
          position: "fixed",
          left: 0,
          width: "100%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${CYAN}44, transparent)`,
          animation: "scanline 4s linear infinite",
          zIndex: 9998,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 420, margin: "0 auto", padding: "6px 6px 30px" }}>

        {/* ===== TOP HEADER SECTION ===== */}
        <div
          style={{
            background: YELLOW,
            padding: "2px",
            marginBottom: 2,
          }}
        >
          <div
            style={{
              background: YELLOW,
              padding: "10px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 11,
                  fontWeight: 900,
                  color: DARK,
                  letterSpacing: 4,
                  lineHeight: 1.1,
                }}
              >
                CYBERPUNK
              </div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 8, color: DARK, letterSpacing: 6, opacity: 0.6 }}>
                PROTOCOL SYSTEM
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      border: `1px solid ${DARK}`,
                      background: i <= activePanel ? DARK : "transparent",
                    }}
                  />
                ))}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: DARK }}>
                {timeStr}
              </div>
            </div>
          </div>
        </div>

        {/* Sub-header bar */}
        <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <div style={{ flex: 1, background: YELLOW, padding: "4px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 8, color: DARK, letterSpacing: 3 }}>SYS.INIT_PROTOCOL</span>
            <div style={{ display: "flex", gap: 4 }}>
              <div style={{ width: 6, height: 6, background: DARK }} />
              <div style={{ width: 6, height: 6, border: `1px solid ${DARK}` }} />
            </div>
          </div>
          <div style={{ width: 120, background: DARK, border: `1px solid ${YELLOW}`, padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, color: YELLOW, letterSpacing: 2 }}>◈ ONLINE</span>
          </div>
        </div>

        {/* ===== BLACK CADRAN SCREENS ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>
          <CadranPanel height={75} label="VIEWPORT_01" cornerColor={YELLOW}>
            <TargetMarker size={24} color={`${YELLOW}55`} />
          </CadranPanel>
          <CadranPanel height={75} label="VIEWPORT_02" cornerColor={CYAN}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }}>
                {Array.from({length: 15}).map((_, i) => (
                  <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: i % 3 === 0 ? CYAN : `${YELLOW}33` }} />
                ))}
              </div>
              <span style={{ fontSize: 6, color: `${CYAN}66`, letterSpacing: 2 }}>SCANNING</span>
            </div>
          </CadranPanel>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>

          {/* LEFT: Cybertemplate panel */}
          <div
            className="cyber-panel"
            style={{
              background: YELLOW,
              padding: 3,
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ background: DARK, padding: 16, height: "100%", position: "relative", overflow: "hidden" }}>
              <GridBg opacity={0.06} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ fontSize: 7, letterSpacing: 3, opacity: 0.5, marginBottom: 4 }}>CYBERTEMPLATE</div>
                <div style={{ fontFamily: "'Orbitron'", fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>
                  FUTURE LAYOUT
                </div>
                <div style={{ fontSize: 8, opacity: 0.4, marginBottom: 16 }}>C/19</div>

                {/* Decorative arrows */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Chevrons count={2} size={6} color={YELLOW} />
                      <span style={{ fontSize: 7, opacity: 0.4 }}>0x{(i * 1337 + 4096).toString(16).toUpperCase()}</span>
                    </div>
                  ))}
                </div>

                {/* Code block decoration */}
                <div style={{ border: `1px solid ${YELLOW}33`, padding: 10, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 4, height: 4, background: CYAN }} />
                    <span style={{ fontSize: 8, color: CYAN, letterSpacing: 2 }}>EDGE_PROTOCOL v2.1</span>
                  </div>
                  {[72, 45, 88, 60, 33].map((v, i) => (
                    <div key={i} style={{ marginBottom: 4 }}>
                      <DataBar value={v} color={i % 2 === 0 ? YELLOW : CYAN} height={3} />
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <TargetMarker size={16} color={YELLOW} />
                  <HexDisplay value="NODE::ACTIVE" color={YELLOW} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Cyberpass + Futuristic */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>

            {/* Cyberpass code */}
            <div style={{ background: DARK, border: `2px solid ${YELLOW}`, padding: 14, position: "relative" }}>
              <div style={{ position: "absolute", top: 6, right: 8, display: "flex", gap: 3 }}>
                <div style={{ width: 8, height: 8, border: `1px solid ${YELLOW}44` }} />
                <div style={{ width: 8, height: 8, background: YELLOW }} />
              </div>
              <div style={{ fontSize: 9, letterSpacing: 3, marginBottom: 6, opacity: 0.6 }}>CYBERPASS-CODE</div>
              <GlitchText style={{ fontFamily: "'Orbitron'", fontSize: 16, fontWeight: 700, letterSpacing: 3 }}>
                3112330-32333-322
              </GlitchText>
              <div style={{ marginTop: 8 }}>
                <DataBar value={scanProgress} color={CYAN} height={2} />
              </div>
            </div>

            {/* Futuristic + Kanji panel */}
            <div
              className="cyber-panel"
              style={{
                flex: 1,
                background: DARK_BLUE,
                border: `1px solid ${YELLOW}44`,
                padding: 14,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <GridBg opacity={0.04} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 7, letterSpacing: 2, color: CYAN, opacity: 0.6 }}>CODE::T7/VIR-0001</div>
                    <div
                      style={{
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontSize: 48,
                        lineHeight: 1,
                        color: YELLOW,
                        marginTop: 4,
                        textShadow: `0 0 20px ${YELLOW}44`,
                      }}
                    >
                      未来
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "'Orbitron'",
                        fontSize: 16,
                        fontWeight: 900,
                        letterSpacing: 4,
                        color: YELLOW,
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        lineHeight: 1,
                      }}
                    >
                      FUTURISTIC
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                  <BlinkDot color={CYAN} delay={0} />
                  <BlinkDot color={YELLOW} delay={0.3} />
                  <BlinkDot color={RED} delay={0.6} />
                  <span style={{ fontSize: 8, opacity: 0.4, marginLeft: 4 }}>中枢 ▪ NEXUS</span>
                </div>

                {/* Number display */}
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "'Orbitron'",
                    fontSize: 20,
                    fontWeight: 900,
                    letterSpacing: 6,
                    color: YELLOW,
                    opacity: 0.3,
                  }}
                >
                  008082
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RED SECTION ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 2, marginBottom: 2 }}>

          {/* Red panel */}
          <div style={{ background: RED, padding: 16, position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.3))",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M2,10 L10,2 L18,10 L10,18 Z" fill="none" stroke={YELLOW_BRIGHT} strokeWidth="1.5" />
                  <path d="M6,10 L10,6 L14,10 L10,14 Z" fill={YELLOW_BRIGHT} />
                </svg>
                <div>
                  <div style={{ fontFamily: "'Orbitron'", fontSize: 10, fontWeight: 700, color: YELLOW_BRIGHT, letterSpacing: 2 }}>
                    ABSTRACT RENDER
                  </div>
                  <div style={{ fontSize: 7, color: "rgba(255,255,255,0.5)", letterSpacing: 3 }}>PROCESSING...</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
                {[RED, YELLOW, CYAN, "#FF6B35"].map((c, i) => (
                  <div key={i} style={{ width: 16, height: 16, background: c, opacity: 0.7, border: `1px solid rgba(255,255,255,0.2)` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Dark info panel */}
          <div
            className="cyber-panel"
            style={{
              background: GRAY,
              border: `1px solid ${YELLOW}22`,
              padding: 14,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <GridBg opacity={0.03} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <BlinkDot color={RED} size={5} />
                  <span style={{ fontSize: 8, color: RED, letterSpacing: 2 }}>REC</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Chevrons count={4} color={YELLOW} size={7} />
                  <span style={{ fontSize: 9, fontFamily: "'Orbitron'", fontWeight: 700, color: YELLOW }}>34</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {["NODE-A1", "NODE-B7", "NODE-C4"].map((node, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 7, opacity: 0.4, letterSpacing: 2, marginBottom: 4 }}>{node}</div>
                    <div
                      style={{
                        fontFamily: "'Orbitron'",
                        fontSize: 18,
                        fontWeight: 900,
                        color: i === 0 ? CYAN : i === 1 ? YELLOW : RED,
                        textShadow: `0 0 10px ${i === 0 ? CYAN : i === 1 ? YELLOW : RED}44`,
                      }}
                    >
                      {String(Math.floor(Math.random() * 99)).padStart(2, "0")}
                    </div>
                    <DataBar value={30 + Math.random() * 60} color={i === 0 ? CYAN : i === 1 ? YELLOW : RED} height={2} />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 4, justifyContent: "flex-end" }}>
                <div style={{ fontSize: 7, opacity: 0.3 }}>BLOCK.NAME.INDEX</div>
                <div style={{ fontSize: 7, color: YELLOW, opacity: 0.6 }}>34</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== HAZARD STRIPE ===== */}
        <HazardStripe height={6} style={{ marginBottom: 2 }} />

        {/* ===== BOTTOM SECTION ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 2, marginBottom: 2 }}>

          {/* Cyberdata panel */}
          <div
            className="cyber-panel"
            style={{
              background: DARK_BLUE,
              borderLeft: `3px solid ${CYAN}`,
              padding: 16,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <GridBg opacity={0.04} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 7, letterSpacing: 3, color: CYAN, opacity: 0.5, marginBottom: 2 }}>CYBERDATA</div>
              <div style={{ fontFamily: "'Orbitron'", fontSize: 20, fontWeight: 900, letterSpacing: 3, marginBottom: 4 }}>
                <GlitchText>UI LAYOUT</GlitchText>
              </div>
              <div style={{ fontSize: 8, opacity: 0.3, marginBottom: 12 }}>G4R63T-GA5668-0GR</div>

              {/* Big decorative shape */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <polygon points="30,5 55,20 55,45 30,55 5,45 5,20" fill="none" stroke={CYAN} strokeWidth="1.5" opacity="0.6" />
                  <polygon points="30,15 45,24 45,40 30,48 15,40 15,24" fill={CYAN} opacity="0.1" />
                  <polygon points="30,15 45,24 45,40 30,48 15,40 15,24" fill="none" stroke={CYAN} strokeWidth="1" opacity="0.4" />
                  <circle cx="30" cy="30" r="4" fill={CYAN} opacity="0.8">
                    <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div style={{ flex: 1 }}>
                  {[
                    { label: "SYS_LOAD", value: 78, color: CYAN },
                    { label: "MEM_ALLOC", value: 54, color: YELLOW },
                    { label: "NET_TRAF", value: 91, color: RED },
                  ].map((item, i) => (
                    <div key={i} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <span style={{ fontSize: 7, opacity: 0.5 }}>{item.label}</span>
                        <span style={{ fontSize: 7, color: item.color }}>{item.value}%</span>
                      </div>
                      <DataBar value={item.value} color={item.color} height={3} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right info blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>

            {/* Status block */}
            <div style={{ background: GRAY, border: `1px solid ${RED}44`, padding: 12, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 3, height: 18, background: RED }} />
                  <span style={{ fontFamily: "'Orbitron'", fontSize: 9, fontWeight: 700, color: RED, letterSpacing: 2 }}>ALERT_SYS</span>
                </div>
                <BlinkDot color={RED} size={5} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { label: "INTRUSION", value: "NONE", color: CYAN },
                  { label: "FIREWALL", value: "ACTIVE", color: YELLOW },
                  { label: "ENCRYPT", value: "AES-256", color: YELLOW },
                  { label: "TUNNEL", value: "SECURE", color: CYAN },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 7, opacity: 0.3, letterSpacing: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: item.color, fontWeight: 700, letterSpacing: 1 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom hazard + counter */}
            <div style={{ display: "flex", gap: 2 }}>
              <div style={{ flex: 1 }}>
                <HazardStripe height={32} />
              </div>
              <CornerBrackets color={YELLOW} size={8} thickness={1} style={{ background: DARK, border: `1px solid ${YELLOW}33`, flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Orbitron'", fontSize: 18, fontWeight: 900, letterSpacing: 4, color: YELLOW, animation: "pulse 2s ease-in-out infinite" }}>
                  {timeStr.replace(/:/g, ".")}
                </div>
              </CornerBrackets>
            </div>
          </div>
        </div>

        {/* ===== SECOND CADRAN ROW ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2, marginBottom: 2 }}>
          <CadranPanel height={65} label="SECTOR_7G" cornerColor={CYAN}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <TargetMarker size={20} color={`${CYAN}66`} />
              <span style={{ fontSize: 6, color: `${CYAN}55`, letterSpacing: 2 }}>TRACKING...</span>
              <div style={{ width: 60 }}><DataBar value={scanProgress} color={CYAN} height={1.5} /></div>
            </div>
          </CadranPanel>
          <CadranPanel height={65} label="CAM_03" cornerColor={RED}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <rect x="3" y="3" width="14" height="14" fill="none" stroke={RED} strokeWidth="1" opacity="0.4" rx="1" />
                <circle cx="10" cy="10" r="4" fill="none" stroke={RED} strokeWidth="1" opacity="0.6" />
                <circle cx="10" cy="10" r="1.5" fill={RED} opacity="0.7" />
              </svg>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}><BlinkDot color={RED} size={4} /><span style={{ fontSize: 5, color: `${RED}66`, letterSpacing: 2 }}>REC</span></div>
            </div>
          </CadranPanel>
        </div>

        {/* ===== FOOTER BAR ===== */}
        <div style={{ background: YELLOW, padding: "6px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <rect x="1" y="1" width="12" height="12" fill="none" stroke={DARK} strokeWidth="1.5" />
              <rect x="4" y="4" width="6" height="6" fill={DARK} />
            </svg>
            <span style={{ fontFamily: "'Orbitron'", fontSize: 8, fontWeight: 700, color: DARK, letterSpacing: 3 }}>
              NEXUS PROTOCOL v4.6
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 7, color: DARK, opacity: 0.5, letterSpacing: 2 }}>ENCRYPTED CHANNEL</span>
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ width: 3, height: 10, background: DARK, opacity: 0.2 + Math.random() * 0.8 }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
