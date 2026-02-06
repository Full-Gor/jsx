import { useState, useEffect, useCallback } from "react";

const CY = "#00E5FF";
const GR = "#39FF14";
const GRD = "#2BBD0E";
const Y = "#E8D44D";
const YD = "#C4A82A";
const D = "#0A0B10";
const D2 = "#0E1018";
const R = "#E63946";
const OR = "#FF8C00";

const mono = "'Share Tech Mono', 'Courier New', monospace";
const orb = "'Orbitron', monospace";
const raj = "'Rajdhani', sans-serif";

/* ── Typewriter hook ── */
function useTypewriter(text, speed = 35, delay = 0, active = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, active]);
  return { displayed, done };
}

/* ── Typewriter component ── */
const TypeText = ({ text, speed = 30, delay = 0, color = CY, size = 11, style = {} }) => {
  const { displayed, done } = useTypewriter(text, speed, delay, true);
  return (
    <span style={{ fontFamily: mono, fontSize: size, color, lineHeight: 1.5, ...style }}>
      {displayed}
      {!done && <span style={{ animation: "blink 0.6s step-end infinite", borderRight: `2px solid ${color}`, marginLeft: 1 }}>&nbsp;</span>}
    </span>
  );
};

/* ── Corner frame ── */
const Frame = ({ color = CY, t = 1.5, s = 12, children, style = {}, innerStyle = {} }) => (
  <div style={{ position: "relative", padding: 2, ...style }}>
    {/* outer glow */}
    <div style={{ position: "absolute", inset: -1, border: `1px solid ${color}11`, pointerEvents: "none" }} />
    <div style={{ position: "relative", border: `${t}px solid ${color}33`, padding: 12, boxShadow: `0 0 12px ${color}22, inset 0 0 20px ${color}08, 0 0 40px ${color}0a`, ...innerStyle }}>
      {/* corners */}
      {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i) => (
        <div key={i} style={{ position: "absolute", [v]: -1, [h]: -1, width: s, height: s, [`border${v.charAt(0).toUpperCase()+v.slice(1)}`]: `${t+0.5}px solid ${color}`, [`border${h.charAt(0).toUpperCase()+h.slice(1)}`]: `${t+0.5}px solid ${color}` }} />
      ))}
      {children}
    </div>
  </div>
);

/* ── Dotted line ── */
const DotLine = ({ color = CY, style = {} }) => (
  <div style={{ height: 1, backgroundImage: `repeating-linear-gradient(90deg, ${color} 0, ${color} 3px, transparent 3px, transparent 8px)`, opacity: 0.4, ...style }} />
);

/* ── Small label tag ── */
const Tag = ({ children, color = CY }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, borderLeft: `2px solid ${color}`, paddingLeft: 6, marginBottom: 6 }}>
    <span style={{ fontFamily: orb, fontSize: 8, fontWeight: 700, color, letterSpacing: 2, textShadow: `0 0 8px ${color}88` }}>{children}</span>
  </div>
);

/* ── Hazard stripe ── */
const Hazard = ({ h = 6, style = {} }) => (
  <div style={{ height: h, background: `repeating-linear-gradient(-45deg,${Y},${Y} 4px,${D} 4px,${D} 8px)`, boxShadow: `0 0 8px ${Y}22, 0 0 20px ${Y}0a`, ...style }} />
);

/* ── Bar ── */
const Bar = ({ v = 50, color = CY, h = 3 }) => (
  <div style={{ height: h, background: `${color}15`, width: "100%" }}>
    <div style={{ height: "100%", width: `${v}%`, background: color, boxShadow: `0 0 8px ${color}66, 0 0 20px ${color}33, 0 0 2px ${color}` }} />
  </div>
);

/* ── Blink dot ── */
const Blink = ({ color = CY, size = 5, delay = 0 }) => (
  <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 ${size+3}px ${color}, 0 0 ${size+10}px ${color}88, 0 0 ${size+20}px ${color}44`, animation: `blink 1.5s ${delay}s ease-in-out infinite` }} />
);

/* ──────────────────────── MAIN ──────────────────────── */
export default function CyberpunkDescriptions() {
  const [phase, setPhase] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => setPhase(5), 5000),
      setTimeout(() => setPhase(6), 6200),
      setTimeout(() => setPhase(7), 7500),
    ];
    const clock = setInterval(() => setTime(new Date()), 1000);
    return () => { timers.forEach(clearTimeout); clearInterval(clock); };
  }, []);

  const ts = time.toLocaleTimeString("en-US", { hour12: false });

  return (
    <div style={{ minHeight: "100vh", background: D, color: CY, fontFamily: mono, maxWidth: 420, margin: "0 auto", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes scanmove { 0%{top:-2px} 100%{top:100%} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 5px currentColor} 50%{box-shadow:0 0 15px currentColor, 0 0 30px currentColor} }
        @keyframes neonFlicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.6} 94%{opacity:1} 96%{opacity:0.7} 97%{opacity:1} }
        * { box-sizing: border-box; }
        .panel-enter { animation: fadeIn 0.5s ease forwards; }
      `}</style>

      {/* Scanlines */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)" }} />
      {/* Moving scan line */}
      <div style={{ position: "fixed", left: 0, width: "100%", height: 2, background: `linear-gradient(90deg,transparent,${CY}55,transparent)`, boxShadow: `0 0 15px ${CY}44, 0 0 30px ${CY}22`, animation: "scanmove 4s linear infinite", zIndex: 998, pointerEvents: "none" }} />

      <div style={{ padding: 10 }}>

        {/* ══════ TITLE ══════ */}
        <div style={{ textAlign: "center", marginBottom: 16, paddingTop: 8 }}>
          <div style={{ fontFamily: orb, fontSize: 20, fontWeight: 900, color: "#F0E6D0", letterSpacing: 6, textShadow: `0 0 10px rgba(240,230,208,0.4), 0 0 30px rgba(240,230,208,0.2), 0 0 60px rgba(240,230,208,0.1)` }}>
            DESCRIPTIONS
          </div>
          <DotLine color="#F0E6D044" style={{ marginTop: 8 }} />
        </div>

        {/* ══════ PANEL 1: ABOUT HUD — top panel ══════ */}
        {phase >= 1 && (
          <div className="panel-enter" style={{ marginBottom: 10 }}>
            <Frame color={CY} s={14}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 10 }}>
                {/* Footage placeholder */}
                <div style={{ background: `${CY}08`, border: `1px solid ${CY}22`, height: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: `inset 0 0 15px ${CY}11, 0 0 8px ${CY}11` }}>
                  <div style={{ position: "absolute", inset: 3 }}>
                    {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i) => (
                      <div key={i} style={{ position: "absolute", [v]: 0, [h]: 0, width: 5, height: 5, [`border${v.charAt(0).toUpperCase()+v.slice(1)}`]: `1px solid ${CY}44`, [`border${h.charAt(0).toUpperCase()+h.slice(1)}`]: `1px solid ${CY}44` }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 7, color: `${CY}55`, letterSpacing: 1, textAlign: "center", lineHeight: 1.4 }}>PLACE<br/>YOUR<br/>FOOTAGE<br/>HERE</span>
                </div>
                {/* About HUD text */}
                <div>
                  <div style={{ fontFamily: orb, fontSize: 11, fontWeight: 900, color: Y, letterSpacing: 2, marginBottom: 4, textShadow: `0 0 10px ${Y}88, 0 0 25px ${Y}44` }}>ABOUT HUD</div>
                  <div style={{ fontSize: 8, color: Y, opacity: 0.7, marginBottom: 6 }}>HUD is short for Heads up Display</div>
                  <TypeText
                    text="In video and computer games, the HUD is the display area where players can see their character's vital statistics."
                    speed={25}
                    delay={500}
                    color={`${CY}aa`}
                    size={8}
                  />
                </div>
              </div>
            </Frame>
          </div>
        )}

        {/* ══════ PANEL 2: Big description — right style ══════ */}
        {phase >= 2 && (
          <div className="panel-enter" style={{ marginBottom: 10 }}>
            <Frame color={CY} s={16} innerStyle={{ padding: 14, borderColor: `${CY}55` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 8 }}>
                <Blink color={CY} size={4} />
                <span style={{ fontFamily: orb, fontSize: 7, color: CY, letterSpacing: 3, opacity: 0.6 }}>SYS.DESC_MODULE</span>
              </div>
              <TypeText
                text="In video and computer games, the HUD is the display area where players can see their character's vital statistics such as current health, bonus attributes, armor level, ammunition count, and more. In most games, developers strive to create a HUD that does not intrude upon gameplay."
                speed={20}
                delay={400}
                color={Y}
                size={10}
              />
            </Frame>
          </div>
        )}

        {/* ══════ PANEL 3: DESCRIPTION label bar ══════ */}
        {phase >= 3 && (
          <div className="panel-enter" style={{ marginBottom: 10 }}>
            <div style={{ border: `1px solid ${CY}44`, borderLeft: `3px solid ${CY}`, padding: "8px 12px", background: `${CY}06`, position: "relative", boxShadow: `0 0 15px ${CY}15, inset 0 0 20px ${CY}08, -3px 0 12px ${CY}22` }}>
              <div style={{ position: "absolute", top: -8, left: 12, background: D, padding: "0 6px" }}>
                <span style={{ fontFamily: orb, fontSize: 8, fontWeight: 700, color: CY, letterSpacing: 2, animation: "neonFlicker 3s infinite", textShadow: `0 0 8px ${CY}88, 0 0 20px ${CY}44` }}>DESCRIPTION:</span>
              </div>
              <div style={{ marginTop: 4 }}>
                <TypeText
                  text="In video and computer games, the HUD is the display area where players can see"
                  speed={28}
                  delay={300}
                  color={`${CY}99`}
                  size={9}
                />
              </div>
            </div>
          </div>
        )}

        {/* ══════ ROW: DESCRIPTION left + number 28 right ══════ */}
        {phase >= 4 && (
          <div className="panel-enter" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {/* Left: Description small */}
            <div>
              <Tag color={CY}>DESCRIPTION</Tag>
              <div style={{ borderLeft: `1px solid ${CY}33`, paddingLeft: 8, marginTop: 4 }}>
                <TypeText text="Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting that tends" speed={30} delay={200} color={`${CY}88`} size={8} />
              </div>
            </div>

            {/* Right: Big 28 */}
            <div style={{ background: D2, border: `1px solid ${GR}33`, padding: 10, position: "relative", overflow: "hidden", boxShadow: `0 0 15px ${GR}15, inset 0 0 25px ${GR}08` }}>
              <div style={{ fontFamily: orb, fontSize: 48, fontWeight: 900, color: GR, lineHeight: 1, textShadow: `0 0 20px ${GR}66, 0 0 50px ${GR}33, 0 0 80px ${GR}1a`, marginBottom: 2 }}>28</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 7, color: OR, letterSpacing: 1 }}>Heads Up Display</span>
                <span style={{ fontSize: 7, color: `${GR}66` }}>06/22/2050</span>
              </div>
              <DotLine color={GR} style={{ marginBottom: 6 }} />
              {["Cyberpunk is", "a subgenre of", "science fiction", "in a dystopian", "futuristic", "setting that", "tends to focus", "on a", "combinations"].map((line, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1.5 }}>
                  <span style={{ fontSize: 7, color: `${CY}66` }}>{line}</span>
                  <span style={{ fontSize: 7, color: `${OR}88` }}>0.{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ ROW: PART01 + GREEN DESCRIPTION ══════ */}
        {phase >= 5 && (
          <div className="panel-enter" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 8, marginBottom: 10 }}>
            {/* Left: PART01 */}
            <div style={{ border: `1px solid ${CY}33`, padding: 10, boxShadow: `0 0 12px ${CY}15, inset 0 0 15px ${CY}06` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                <span style={{ color: CY, fontSize: 8 }}>╋</span>
                <span style={{ fontFamily: orb, fontSize: 8, fontWeight: 700, color: CY, letterSpacing: 1 }}>[PART01]</span>
              </div>
              <TypeText
                text="Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting that tends"
                speed={30}
                delay={400}
                color={`${CY}88`}
                size={8}
              />
            </div>

            {/* Right: Green bordered description */}
            <div style={{ position: "relative" }}>
              {/* Green shape - clipped */}
              <div style={{ background: `${GR}08`, border: `2px solid ${GR}55`, borderRadius: "4px 4px 4px 20px", padding: 12, position: "relative", boxShadow: `0 0 15px ${GR}22, inset 0 0 25px ${GR}0a, 0 0 40px ${GR}0a` }}>
                <div style={{ position: "absolute", top: -8, left: 14, background: D, padding: "0 8px" }}>
                  <span style={{ fontFamily: orb, fontSize: 8, fontWeight: 700, color: GR, letterSpacing: 2, animation: "neonFlicker 4s infinite", textShadow: `0 0 8px ${GR}88, 0 0 20px ${GR}44` }}>DESCRIPTION:</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <TypeText
                    text="Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting that tends"
                    speed={28}
                    delay={600}
                    color={GR}
                    size={9}
                  />
                </div>
                {/* Small diamond decorations */}
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  {[GR, GR, GR].map((c, i) => (
                    <svg key={i} width="6" height="6" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill={c} opacity={0.3 + i * 0.2} /></svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════ HUD MEANS + STAGE 01 ══════ */}
        {phase >= 6 && (
          <div className="panel-enter" style={{ marginBottom: 10 }}>
            <Frame color={GR} s={10} innerStyle={{ padding: 12, borderColor: `${GR}44` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {/* Left: 2021 HEADS UP DISPLAY */}
                <div>
                  <div style={{ fontFamily: orb, fontSize: 22, fontWeight: 900, color: Y, lineHeight: 1, marginBottom: 2, textShadow: `0 0 12px ${Y}88, 0 0 30px ${Y}44` }}>2021</div>
                  <div style={{ fontFamily: orb, fontSize: 9, fontWeight: 700, color: Y, letterSpacing: 2, marginBottom: 8, textShadow: `0 0 8px ${Y}66` }}>HEADS UP DISPLAY</div>
                  <TypeText
                    text="In video and computer games, the HUD is the display area where players can see their character's vital statistics such as current health, bonus attributes, armor level, ammunition count, and more."
                    speed={22}
                    delay={500}
                    color={`${CY}77`}
                    size={7}
                  />
                  <div style={{ marginTop: 8, fontFamily: mono, fontSize: 8, color: `${CY}44`, letterSpacing: 2 }}>[PT0]</div>
                </div>

                {/* Right: HUD MEANS */}
                <div>
                  <div style={{ fontFamily: orb, fontSize: 8, fontWeight: 700, color: OR, letterSpacing: 2, marginBottom: 6, textShadow: `0 0 10px ${OR}88, 0 0 20px ${OR}44` }}>HUD MEANS</div>
                  <div style={{ fontSize: 7, color: `${CY}77`, lineHeight: 1.6, marginBottom: 10 }}>
                    HUD is short for Heads Up Display.<br />
                    Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting that tends.
                  </div>
                  <DotLine color={GR} style={{ marginBottom: 8 }} />
                  <div style={{ fontFamily: orb, fontSize: 9, fontWeight: 700, color: GR, letterSpacing: 2, marginBottom: 6, textShadow: `0 0 10px ${GR}88, 0 0 25px ${GR}44` }}>STAGE 01</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[65, 45, 80, 30].map((v, i) => (
                      <div key={i} style={{ flex: 1 }}><Bar v={v} color={GR} h={3} /></div>
                    ))}
                  </div>
                </div>
              </div>
            </Frame>
          </div>
        )}

        {/* ══════ BOTTOM ROW: CP CYBERPUNK + BARCODE ══════ */}
        {phase >= 7 && (
          <div className="panel-enter" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, marginBottom: 10 }}>
            {/* CP Logo panel */}
            <div style={{ background: D2, border: `1px solid ${CY}33`, padding: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: `0 0 15px ${CY}18, inset 0 0 20px ${CY}08` }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
                <span style={{ fontFamily: orb, fontSize: 24, fontWeight: 900, color: CY, lineHeight: 1, textShadow: `0 0 15px ${CY}aa, 0 0 35px ${CY}55` }}>C</span>
                <span style={{ fontFamily: orb, fontSize: 24, fontWeight: 900, color: `${CY}55`, lineHeight: 1 }}>P</span>
              </div>
              <div style={{ fontFamily: orb, fontSize: 7, fontWeight: 700, color: CY, letterSpacing: 4 }}>CYBERPUNK</div>
              <DotLine color={CY} style={{ width: "100%", marginTop: 6, marginBottom: 4 }} />
              <span style={{ fontSize: 6, color: `${CY}44`, letterSpacing: 1 }}>J7095A000563</span>
            </div>

            {/* Barcode + info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Hazard h={5} />
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {/* Fake barcode */}
                <div style={{ display: "flex", gap: 1, alignItems: "flex-end", height: 20 }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} style={{ width: Math.random() > 0.5 ? 2 : 1.5, height: 12 + Math.random() * 8, background: GR, opacity: 0.5 + Math.random() * 0.5 }} />
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                    {[GR, Y, CY, OR].map((c, i) => (
                      <div key={i} style={{ width: 8, height: 8, background: c, opacity: 0.6 }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 6, color: `${GR}66`, letterSpacing: 1 }}>PKG.2021.CYBER</span>
                </div>
              </div>
              <Hazard h={5} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Blink color={GR} size={4} />
                <span style={{ fontSize: 7, color: `${GR}77`, letterSpacing: 2 }}>PROTOCOL ACTIVE — {ts}</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════ FOOTER ══════ */}
        <div style={{ textAlign: "center", padding: "10px 0", opacity: 0.3 }}>
          <DotLine color={CY} style={{ marginBottom: 8 }} />
          <span style={{ fontSize: 7, letterSpacing: 4 }}>NEXUS PROTOCOL v4.6 — ENCRYPTED</span>
        </div>

      </div>
    </div>
  );
}
