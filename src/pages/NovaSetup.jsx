import React, { useState, useEffect } from 'react';

export default function NovaSetup() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const dayName = time.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dayNumber = time.getDate().toString().padStart(2, '0');

  const pink = '#E8B4B8';
  const black = '#0a0a0a';
  const white = '#ffffff';

  // Bicolor icons - smaller size (w-5 h-5)
  const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor1)" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  );

  const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor2)" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
    </svg>
  );

  const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor3)" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );

  const BoldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor4)" d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    </svg>
  );

  const VolumeOffIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor5)" d="M11 5L6 9H2v6h4l5 4V5z"/>
      <line stroke="url(#bicolor5)" x1="23" y1="9" x2="17" y2="15"/>
      <line stroke="url(#bicolor5)" x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );

  const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor6" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor6)" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle stroke="url(#bicolor6)" cx="12" cy="12" r="3"/>
    </svg>
  );

  const CameraIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor7" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor7)" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle stroke="url(#bicolor7)" cx="12" cy="13" r="4"/>
    </svg>
  );

  const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor8" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor8)" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline stroke="url(#bicolor8)" points="22,6 12,13 2,6"/>
    </svg>
  );

  const LinkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolor9" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolor9)" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path stroke="url(#bicolor9)" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );

  const PhoneIcon = ({ color = pink }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );

  const MessageIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolormsg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <path stroke="url(#bicolormsg)" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );

  const DockMoreIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-5 h-5">
      <defs>
        <linearGradient id="bicolordock" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor={pink} />
          <stop offset="50%" stopColor={white} />
        </linearGradient>
      </defs>
      <circle stroke="url(#bicolordock)" cx="5" cy="12" r="1.5"/>
      <circle stroke="url(#bicolordock)" cx="12" cy="12" r="1.5"/>
      <circle stroke="url(#bicolordock)" cx="19" cy="12" r="1.5"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center p-4">
      {/* Phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '380px',
          height: '820px',
          borderRadius: '45px',
          backgroundColor: '#0a0a0a',
          boxShadow: '0 0 0 3px #222, 0 30px 60px -15px rgba(0, 0, 0, 0.9)',
          border: '10px solid #111'
        }}
      >
        {/* Main screen - FULL vertical split */}
        <div className="h-full flex">

          {/* LEFT SIDE - Pink - Full height */}
          <div
            className="flex flex-col"
            style={{
              width: '50%',
              backgroundColor: pink,
              height: '100%',
              paddingTop: '40px',
              paddingLeft: '18px',
              paddingRight: '10px',
              paddingBottom: '20px'
            }}
          >
            {/* TIME label - 25% bigger and 10% bolder */}
            <p
              style={{
                color: black,
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                marginBottom: '10px',
                marginTop: '-10px'
              }}
            >
              TIME
            </p>

            {/* Hours with minutes superscript - 15% smaller, 5% more left */}
            <div className="flex items-start" style={{ marginTop: '20px', marginLeft: '-12px' }}>
              <span
                style={{
                  fontSize: '94px',
                  color: black,
                  fontWeight: 200,
                  lineHeight: 0.85,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  letterSpacing: '-0.03em'
                }}
              >
                {hours}
              </span>
              <span
                style={{
                  fontSize: '22px',
                  color: black,
                  fontWeight: 300,
                  marginTop: '5px',
                  marginLeft: '2px'
                }}
              >
                {minutes}
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Day name vertical + vertical line above + day number */}
            <div className="flex items-end" style={{ marginBottom: '30px' }}>
              <p
                style={{
                  color: black,
                  fontSize: '22px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  height: 'auto'
                }}
              >
                {dayName}
              </p>

              <div className="flex flex-col items-center ml-3">
                {/* Vertical line above day number */}
                <div
                  style={{
                    width: '2px',
                    height: '60px',
                    backgroundColor: black,
                    marginBottom: '10px'
                  }}
                />
                <span
                  style={{
                    fontSize: '28px',
                    color: black,
                    fontWeight: 300
                  }}
                >
                  {dayNumber}
                </span>
              </div>
            </div>

            {/* Spacer to push dock to bottom */}
            <div className="flex-1" />

            {/* Bottom dock on pink side - phone icon, aligned with black side dock */}
            <div className="flex items-center justify-center" style={{ paddingBottom: '26px' }}>
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: black,
                  width: '48px',
                  height: '48px'
                }}
              >
                <PhoneIcon color={pink} />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - Black - Full height */}
          <div
            className="flex flex-col"
            style={{
              width: '50%',
              backgroundColor: black,
              height: '100%',
              paddingTop: '40px',
              paddingBottom: '20px',
              paddingLeft: '12px',
              paddingRight: '12px'
            }}
          >
            {/* Play icon in circle - centered */}
            <div className="flex justify-center">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  border: `1.5px solid ${pink}`,
                  marginBottom: '0px'
                }}
              >
                <svg viewBox="0 0 24 24" fill={pink} className="w-4 h-4" style={{ marginLeft: '2px' }}>
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>

            {/* Vertical line from play icon down to send icon - moved down 35% */}
            <div className="flex justify-center" style={{ marginTop: '98px' }}>
              <div
                style={{
                  width: '1.5px',
                  height: '280px',
                  backgroundColor: pink
                }}
              />
            </div>

            {/* Middle section: vertical texts at different heights - moved up more */}
            <div className="flex justify-center items-start" style={{ height: '250px', marginTop: '-337px' }}>
              {/* Left column - ON 1426:15, 12:18am, THE NOVA SETUP on same vertical axis */}
              <div className="flex flex-col items-center" style={{ marginRight: '15px' }}>
                {/* THE NOVA SETUP vertical - at top */}
                <p
                  style={{
                    color: pink,
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}
                >
                  THE NOVA SETUP
                </p>
              </div>

              {/* 12:18am on same axis - moved down 50% */}
              <div className="flex flex-col items-center" style={{ marginRight: '0px', marginLeft: '-24px' }}>
                <p
                  style={{
                    color: '#444',
                    fontSize: '7px',
                    letterSpacing: '0.08em',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    marginTop: '180px'
                  }}
                >
                  12:18am
                </p>
              </div>

              {/* ON 1426:15 on same axis - moved down more */}
              <div className="flex flex-col items-center" style={{ marginRight: '15px', marginLeft: '-20px' }}>
                <p
                  style={{
                    color: '#555',
                    fontSize: '7px',
                    letterSpacing: '0.12em',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    marginTop: '307px'
                  }}
                >
                  ON 1426:15
                </p>
              </div>

              {/* Right column - Bad Habits and Being On The Late on same vertical axis */}
              <div className="flex flex-col" style={{ marginLeft: '35px' }}>
                {/* Bad Habits text vertical */}
                <p
                  style={{
                    color: '#444',
                    fontSize: '6px',
                    letterSpacing: '0.08em',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    lineHeight: 1.6
                  }}
                >
                  Bad Habits Spending Too Late
                </p>
              </div>

              {/* Being On The Late on same axis as Bad Habits - moved down 70% */}
              <div className="flex flex-col" style={{ marginLeft: '4px' }}>
                <p
                  style={{
                    color: '#444',
                    fontSize: '6px',
                    letterSpacing: '0.08em',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    lineHeight: 1.6,
                    marginTop: '204px'
                  }}
                >
                  Being On The Late
                </p>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* App icons grid - 3 columns, 3 rows, aligned right, elevated */}
            <div className="flex justify-end px-2 mb-16">
              <div className="grid grid-cols-3 gap-x-5 gap-y-4">
                <div className="flex items-center justify-center"><TwitterIcon /></div>
                <div className="flex items-center justify-center"><SendIcon /></div>
                <div className="flex items-center justify-center"><HeartIcon /></div>
                <div className="flex items-center justify-center"><VolumeOffIcon /></div>
                <div className="flex items-center justify-center"><EyeIcon /></div>
                <div className="flex items-center justify-center"><CameraIcon /></div>
                <div className="flex items-center justify-center"><MailIcon /></div>
                <div className="flex items-center justify-center"><LinkIcon /></div>
                <div className="flex items-center justify-center"><BoldIcon /></div>
              </div>
            </div>

            {/* Bottom dock on black side - message and more icons, aligned with pink side */}
            <div className="flex justify-center items-center gap-6 px-4" style={{ paddingBottom: '26px' }}>
              {/* Message icon - in circle, same size as phone */}
              <div
                className="flex items-center justify-center"
                style={{
                  border: `1.5px solid ${pink}`,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  aspectRatio: '1/1'
                }}
              >
                <MessageIcon />
              </div>

              {/* More button - outline circle */}
              <div
                className="flex items-center justify-center"
                style={{
                  border: `1.5px solid ${pink}`,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  aspectRatio: '1/1'
                }}
              >
                <DockMoreIcon />
              </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center">
              <div
                style={{
                  width: '100px',
                  height: '4px',
                  backgroundColor: '#333',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
