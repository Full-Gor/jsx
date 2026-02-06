import React, { useState, useEffect } from 'react';

export default function RedStripeMonitor() {
  const [stats, setStats] = useState({
    cpu: 45,
    memory: 62,
    storage: 71,
    temp: 52,
    download: 2.4,
    upload: 0.8,
    load: 2.35
  });

  const [time, setTime] = useState(new Date());

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(30 + Math.random() * 50),
        memory: Math.floor(50 + Math.random() * 30),
        storage: Math.floor(65 + Math.random() * 15),
        temp: Math.floor(45 + Math.random() * 25),
        download: (Math.random() * 5 + 0.5).toFixed(1),
        upload: (Math.random() * 2 + 0.1).toFixed(1),
        load: (Math.random() * 3 + 1).toFixed(2)
      });
      setTime(new Date());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const day = time.getDate();
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][time.getDay()];

  // Couleurs
  const red = '#E53935';
  const redLight = '#EF5350';
  const redDark = '#C62828';

  // Circular Gauge Component
  const CircularGauge = ({ percent, size, strokeWidth, label }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;

    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(229, 57, 53, 0.15)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={red}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            style={{
              transition: 'stroke-dasharray 0.5s ease',
              filter: `drop-shadow(0 0 8px ${red})`
            }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <span style={{
            color: red,
            fontSize: size > 60 ? '22px' : '14px',
            fontWeight: 'bold',
            textShadow: `0 0 15px rgba(229, 57, 53, 0.5)`
          }}>
            {percent}%
          </span>
          {label && (
            <div style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '8px',
              letterSpacing: '0.1em',
              marginTop: '2px'
            }}>
              {label}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Icônes
  const DeviceIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2" stroke={red} strokeWidth="1.2"/>
      <circle cx="12" cy="18" r="1" stroke={red} strokeWidth="1.2"/>
    </svg>
  );

  const ContactIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke={red} strokeWidth="1.2"/>
      <path d="M5 21c0-4.5 3.5-7 7-7s7 2.5 7 7" stroke={red} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const TriangleIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M12 5L21 19H3L12 5Z" stroke={red} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M4 12.5L9.5 18L20 6" stroke={red} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CameraIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M3 8h3l2-3h8l2 3h3v11H3V8z" stroke={red} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="3" stroke={red} strokeWidth="1.2"/>
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" stroke={red} strokeWidth="1.2"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke={red} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke={red} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Phone Frame */}
      <div style={{
        width: '380px',
        height: '800px',
        backgroundColor: '#0c0c0c',
        borderRadius: '45px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 50px 100px rgba(0,0,0,0.8)'
      }}>
        {/* Screen area */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          bottom: '12px',
          backgroundColor: '#0a0a0a',
          borderRadius: '36px',
          overflow: 'hidden'
        }}>

          {/* 2 BARRES ROUGES à droite */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '55px',
            display: 'flex',
            gap: '12px'
          }}>
            <div style={{
              width: '28px',
              height: '100%',
              background: `linear-gradient(180deg, ${redDark} 0%, ${red} 20%, ${redLight} 50%, ${red} 80%, ${redDark} 100%)`,
              boxShadow: `0 0 20px rgba(229, 57, 53, 0.8), 0 0 40px rgba(229, 57, 53, 0.5), 0 0 60px rgba(229, 57, 53, 0.3)`
            }}/>
            <div style={{
              width: '28px',
              height: '100%',
              background: `linear-gradient(180deg, ${redDark} 0%, ${red} 20%, ${redLight} 50%, ${red} 80%, ${redDark} 100%)`,
              boxShadow: `0 0 20px rgba(229, 57, 53, 0.8), 0 0 40px rgba(229, 57, 53, 0.5), 0 0 60px rgba(229, 57, 53, 0.3)`
            }}/>
          </div>

          {/* CONTENU À GAUCHE */}
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '20px',
            right: '140px'
          }}>

            {/* HORLOGE - En haut à gauche */}
            <div style={{
              textAlign: 'left',
              marginBottom: '15px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  fontSize: '64px',
                  fontWeight: '100',
                  color: red,
                  letterSpacing: '-4px',
                  lineHeight: '0.85',
                  textShadow: `0 0 30px rgba(229, 57, 53, 0.5)`
                }}>
                  {hours}
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '8px',
                  marginLeft: '2px'
                }}>
                  :{minutes}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginTop: '4px'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.75)'
                }}>
                  {day}
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color: 'rgba(255,255,255,0.4)'
                }}>
                  {weekday}
                </span>
              </div>
            </div>

            {/* ICÔNES - En colonne verticale */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <DeviceIcon />
              <ContactIcon />
              <TriangleIcon />
              <CheckIcon />
              <CameraIcon />
              <SettingsIcon />
            </div>

            {/* STATS SECTION */}
            <div style={{
              marginTop: '15px'
            }}>
              {/* CPU Gauge principal */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <CircularGauge percent={stats.cpu} size={70} strokeWidth={5} label="CPU" />

                {/* CPU Cores indicator */}
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '5px' }}>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: i < Math.ceil(stats.cpu / 12.5) ? red : 'rgba(229, 57, 53, 0.2)',
                          borderRadius: '1px',
                          transition: 'background-color 0.3s'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>8 CORES</span>
                </div>
              </div>

              {/* Mini gauges row */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '15px'
              }}>
                <CircularGauge percent={stats.memory} size={50} strokeWidth={4} label="MEM" />
                <CircularGauge percent={stats.storage} size={50} strokeWidth={4} label="DISK" />

                {/* Temperature */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    color: red,
                    fontSize: '20px',
                    fontWeight: '300',
                    textShadow: `0 0 10px rgba(229, 57, 53, 0.5)`
                  }}>
                    {stats.temp}°
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>TEMP</span>
                </div>
              </div>

              {/* Network stats */}
              <div style={{
                display: 'flex',
                gap: '20px',
                padding: '10px',
                background: 'rgba(229, 57, 53, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(229, 57, 53, 0.15)'
              }}>
                <div>
                  <span style={{ color: '#4CAF50', fontSize: '11px' }}>↓ {stats.download}</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', marginLeft: '3px' }}>MB/s</span>
                </div>
                <div>
                  <span style={{ color: '#FF9800', fontSize: '11px' }}>↑ {stats.upload}</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', marginLeft: '3px' }}>MB/s</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>LOAD: {stats.load}</span>
                </div>
              </div>

              {/* Status indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#4CAF50',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #4CAF50',
                  animation: 'pulse 1.5s infinite'
                }}/>
                <span style={{ color: '#4CAF50', fontSize: '9px', letterSpacing: '0.1em' }}>
                  SYSTEM ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '130px',
            height: '4px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '2px'
          }}/>
        </div>

        {/* Boutons physiques */}
        <div style={{
          position: 'absolute',
          right: '-2px',
          top: '180px',
          width: '3px',
          height: '80px',
          backgroundColor: '#1a1a1a',
          borderRadius: '2px 0 0 2px'
        }}/>
        <div style={{
          position: 'absolute',
          left: '-2px',
          top: '140px',
          width: '3px',
          height: '35px',
          backgroundColor: '#1a1a1a',
          borderRadius: '0 2px 2px 0'
        }}/>
        <div style={{
          position: 'absolute',
          left: '-2px',
          top: '190px',
          width: '3px',
          height: '60px',
          backgroundColor: '#1a1a1a',
          borderRadius: '0 2px 2px 0'
        }}/>

        {/* CSS Animation */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
        `}</style>
      </div>
    </div>
  );
}
