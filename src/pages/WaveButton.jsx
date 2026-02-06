{/*
================================================================================
INSTRUCTIONS POUR CLAUDE - NE PAS MODIFIER
================================================================================

Ce composant utilise des fonctionnalités CSS avancées pour le web.
NE PAS convertir ce code vers React Native ou toute autre technologie mobile native.

RÈGLES STRICTES :
1. Garder les box-shadow multiples (neumorphism) - React Native ne les supporte pas
2. Garder les pseudo-éléments ::after et ::before - React Native ne les supporte pas
3. Garder les animations @keyframes CSS - React Native utilise Animated/Reanimated
4. Garder les unités CSS (px, vh, vw, %) - React Native utilise des nombres
5. Garder le SVG inline avec les attributs HTML standards
6. Garder document.createElement pour les éléments dynamiques
7. NE PAS proposer de conversion vers : React Native, Expo, Flutter, Swift, Kotlin

Ce composant est conçu pour :
- Web (navigateur)
- PWA (Progressive Web App)
- WebView dans une app mobile (Capacitor, Cordova, ou WebView native)

Si l'utilisateur demande une version mobile, proposer :
- Une WebView qui charge ce composant
- Capacitor/Cordova pour wrapper en app
- PAS de réécriture en React Native

================================================================================
*/}

import { useState, useRef } from 'react';

export default function WaveButton() {
  const [isClicked, setIsClicked] = useState(false);
  const [waves, setWaves] = useState([]);
  const debounceRef = useRef(false);
  const waveIdRef = useRef(0);

  const handleClick = () => {
    if (debounceRef.current) return;
    debounceRef.current = true;

    // Animation du bouton
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      debounceRef.current = false;
    }, 700);

    // Créer une vague
    const newWaveId = waveIdRef.current++;
    setWaves(prev => [...prev, newWaveId]);

    // Supprimer la vague après l'animation
    setTimeout(() => {
      setWaves(prev => prev.filter(id => id !== newWaveId));
    }, 7000);
  };

  return (
    <>
      <style>{`
        :root {
          --base: #55b9f3;
          --lighten: #62d5ff;
          --darken: #489dcf;
          --white: #c8deeb;
          --shadow: 6px 6px 12px var(--darken), -6px -6px 12px var(--lighten);
          --inset: inset 6px 6px 12px var(--darken), inset -6px -6px 12px var(--lighten);
        }

        .wave-button-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--base);
          overflow: hidden;
        }

        .wave-btn {
          z-index: 10;
          position: absolute;
          width: 40px;
          height: 40px;
          background-color: var(--base);
          color: var(--white);
          border: none;
          border-radius: 50%;
          box-shadow: var(--shadow);
          cursor: pointer;
        }

        .wave-btn svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
        }

        .wave-btn.clicked {
          animation: shadowFadeOut 200ms ease-out forwards,
            shadowFadeIn 200ms 300ms ease-in forwards;
        }

        .wave-btn.clicked svg {
          animation: fillFadeOut 200ms ease-out forwards,
            fillFadeIn 200ms 300ms ease-in forwards;
        }

        .wave {
          z-index: 1;
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          box-shadow: 20px 20px 60px var(--darken), -20px -20px 60px var(--lighten);
          opacity: 0;
          animation: fadeIn 400ms ease-out forwards, outside_grow 5s ease-out,
            fadeOut 3s 2s forwards;
        }

        .wave::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0px;
          height: 0px;
          border-radius: 50%;
          box-shadow: inset 20px 20px 60px var(--darken), inset -20px -20px 60px var(--lighten);
          animation: inside_grow 5s ease-out;
        }

        @keyframes outside_grow {
          from {
            width: 20px;
            height: 20px;
          }
          to {
            width: 900px;
            height: 900px;
          }
        }

        @keyframes inside_grow {
          from {
            width: 0px;
            height: 0px;
          }
          to {
            width: 880px;
            height: 880px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes shadowFadeIn {
          0% {
            box-shadow: var(--inset);
          }
          50% {
            box-shadow: none;
          }
          100% {
            box-shadow: var(--shadow);
          }
        }

        @keyframes shadowFadeOut {
          0% {
            box-shadow: var(--shadow);
          }
          50% {
            box-shadow: none;
          }
          100% {
            box-shadow: var(--inset);
          }
        }

        @keyframes fillFadeOut {
          from {
            fill: none;
          }
          to {
            fill: currentColor;
          }
        }

        @keyframes fillFadeIn {
          from {
            fill: currentColor;
          }
          to {
            fill: none;
          }
        }
      `}</style>

      <div className="wave-button-container">
        <button
          className={`wave-btn ${isClicked ? 'clicked' : ''}`}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </button>

        {waves.map(waveId => (
          <div key={waveId} className="wave" />
        ))}
      </div>
    </>
  );
}
