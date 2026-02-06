import { useState } from 'react';

const items = [
  { letter: 'A', colorClass: 'letter-orange' },
  { letter: 'B', colorClass: 'letter-blue' },
  { letter: 'C', colorClass: 'letter-teal' },
  { letter: 'D', colorClass: 'letter-yellow' },
];

const icons = [
  // Gear
  <svg key="i0" viewBox="0 0 24 24" fill="#5A6A70">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      fill="none" stroke="#5A6A70" strokeWidth="1.5"/>
  </svg>,
  // Document
  <svg key="i1" viewBox="0 0 24 24" fill="#5A6A70">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8" fill="none" stroke="#E8ECEF" strokeWidth="2"/>
    <line x1="16" y1="13" x2="8" y2="13" stroke="#E8ECEF" strokeWidth="2"/>
    <line x1="16" y1="17" x2="8" y2="17" stroke="#E8ECEF" strokeWidth="2"/>
  </svg>,
  // Person
  <svg key="i2" viewBox="0 0 24 24" fill="none" stroke="#5A6A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" fill="#5A6A70"/>
    <path d="M9 22l3-9 4 1"/>
    <path d="M6 13l4 1 4-4 3 2"/>
  </svg>,
  // Mixed
  <svg key="i3" viewBox="0 0 24 24" fill="#5A6A70">
    <circle cx="9" cy="9" r="2"/>
    <circle cx="17" cy="17" r="2.5"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"
      fill="none" stroke="#5A6A70" strokeWidth="1"/>
  </svg>,
];

export default function InfographicSidebar() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (index) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <>
      <style>{`
        .isb-body {
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(180deg, #E8ECEF 0%, #D8DFE3 100%);
          min-height: 100vh;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 40px 0;
        }

        .isb-wrapper {
          display: flex;
          position: relative;
        }

        .isb-sidebar-bar {
          width: 44px;
          height: 350px;
          position: relative;
          background: linear-gradient(180deg, #F5F7F9 0%, #E8ECEF 100%);
          z-index: 10;
          box-shadow:
            2px 0 4px rgba(0,0,0,0.06),
            4px 0 8px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 20px 0;
        }

        .isb-icon-container {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .isb-icon-container:hover {
          transform: scale(1.1);
        }

        .isb-icon-container svg {
          width: 28px;
          height: 28px;
          opacity: 0.45;
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.12));
        }

        .isb-items-column {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 350px;
          padding: 20px 0;
          position: absolute;
          left: 0;
          top: 0;
        }

        .isb-item-row {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .isb-letter-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          transform: translateX(0);
          transition: transform 0.4s ease;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.15),
            0 4px 8px rgba(0,0,0,0.12),
            inset 0 2px 3px rgba(255,255,255,0.3),
            inset 0 -2px 3px rgba(0,0,0,0.1);
        }

        .isb-letter-orange { background: linear-gradient(145deg, #F7B733, #E09515); }
        .isb-letter-blue { background: linear-gradient(145deg, #5BA3E0, #3A7BC8); }
        .isb-letter-teal { background: linear-gradient(145deg, #5FD9C9, #40B9AA); }
        .isb-letter-yellow { background: linear-gradient(145deg, #F7E07E, #E5C75E); color: #5A6A70; }

        .isb-item-text {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          transition-delay: 0.1s;
          white-space: nowrap;
        }

        .isb-item-text h3 {
          font-size: 12px;
          font-weight: 600;
          color: #3D4852;
          margin: 0;
          display: inline;
        }

        .isb-item-text span {
          font-size: 9px;
          color: #A0AEC0;
          margin-left: 6px;
          letter-spacing: 0.5px;
        }

        .isb-item-text p {
          font-size: 9px;
          color: #9BA8B0;
          margin: 2px 0 0 0;
          line-height: 1.4;
        }

        .isb-item-row.open .isb-letter-circle {
          transform: translateX(55px);
        }

        .isb-item-row.open .isb-item-text {
          opacity: 1;
          transform: translateX(55px);
        }
      `}</style>

      <div className="isb-body">
        <div className="isb-wrapper">
          <div className="isb-items-column">
            {items.map((item, i) => (
              <div key={i} className={`isb-item-row ${openItems.has(i) ? 'open' : ''}`}>
                <div className={`isb-letter-circle isb-${item.colorClass}`}>{item.letter}</div>
                <div className="isb-item-text">
                  <h3>Infographic</h3><span>OPTION</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="isb-sidebar-bar">
            {icons.map((icon, i) => (
              <div key={i} className="isb-icon-container" onClick={() => toggle(i)}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
