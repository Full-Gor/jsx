import React from 'react';

export default function RedStripeHomescreen() {
  const hours = "11";
  const minutes = "15";
  const day = "31";
  const weekday = "Mon";

  // Icônes 37px
  const DeviceIcon = () => (
    <svg width="37" height="37" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2" stroke="#E53935" strokeWidth="1.2"/>
      <circle cx="12" cy="18" r="1" stroke="#E53935" strokeWidth="1.2"/>
    </svg>
  );

  const ContactIcon = () => (
    <svg width="37" height="37" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="#E53935" strokeWidth="1.2"/>
      <path d="M5 21c0-4.5 3.5-7 7-7s7 2.5 7 7" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const TriangleIcon = () => (
    <svg width="37" height="37" viewBox="0 0 24 24" fill="none">
      <path d="M12 5L21 19H3L12 5Z" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="37" height="37" viewBox="0 0 24 24" fill="none">
      <path d="M4 12.5L9.5 18L20 6" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CameraIcon = () => (
    <svg width="37" height="37" viewBox="0 0 24 24" fill="none">
      <path d="M3 8h3l2-3h8l2 3h3v11H3V8z" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="3" stroke="#E53935" strokeWidth="1.2"/>
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="37" height="37" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" stroke="#E53935" strokeWidth="1.2"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round"/>
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
            right: '60px',
            display: 'flex',
            gap: '12px'
          }}>
            <div style={{
              width: '30px',
              height: '100%',
              background: 'linear-gradient(180deg, #C62828 0%, #E53935 20%, #EF5350 50%, #E53935 80%, #C62828 100%)',
              boxShadow: '0 0 20px rgba(229, 57, 53, 0.8), 0 0 40px rgba(229, 57, 53, 0.5), 0 0 60px rgba(229, 57, 53, 0.3)'
            }}/>
            <div style={{
              width: '30px',
              height: '100%',
              background: 'linear-gradient(180deg, #C62828 0%, #E53935 20%, #EF5350 50%, #E53935 80%, #C62828 100%)',
              boxShadow: '0 0 20px rgba(229, 57, 53, 0.8), 0 0 40px rgba(229, 57, 53, 0.5), 0 0 60px rgba(229, 57, 53, 0.3)'
            }}/>
          </div>

          {/* CONTENU À GAUCHE */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '25px'
          }}>
            {/* HORLOGE - En haut à gauche */}
            <div style={{
              textAlign: 'left',
              marginBottom: '25px'
            }}>
              {/* Heure */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  fontSize: '72px',
                  fontWeight: '100',
                  color: '#E53935',
                  letterSpacing: '-4px',
                  lineHeight: '0.85'
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

              {/* Date */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginTop: '4px'
              }}>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.75)'
                }}>
                  {day}
                </span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '400',
                  color: 'rgba(255,255,255,0.4)'
                }}>
                  {weekday}
                </span>
              </div>
            </div>

            {/* ICÔNES - En colonne verticale sous l'horloge */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <DeviceIcon />
              <ContactIcon />
              <TriangleIcon />
              <CheckIcon />
              <CameraIcon />
              <SettingsIcon />
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
      </div>
    </div>
  );
}
