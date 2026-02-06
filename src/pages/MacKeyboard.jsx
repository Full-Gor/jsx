import { useState, useEffect, useRef } from 'react';

export default function MacKeyboard() {
  const [capsLockPressed, setCapsLockPressed] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [rgbMode, setRgbMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const keyboardRef = useRef(null);

  // Mapping des touches physiques vers les touches du clavier JSX
  const keyMapping = {
    // Lettres AZERTY
    'KeyQ': 'A', 'KeyW': 'Z', 'KeyE': 'E', 'KeyR': 'R', 'KeyT': 'T',
    'KeyY': 'Y', 'KeyU': 'U', 'KeyI': 'I', 'KeyO': 'O', 'KeyP': 'P',
    'KeyA': 'Q', 'KeyS': 'S', 'KeyD': 'D', 'KeyF': 'F', 'KeyG': 'G',
    'KeyH': 'H', 'KeyJ': 'J', 'KeyK': 'K', 'KeyL': 'L', 'Semicolon': 'M',
    'KeyZ': 'W', 'KeyX': 'X', 'KeyC': 'C', 'KeyV': 'V', 'KeyB': 'B',
    'KeyN': 'N', 'KeyM': ',',
    // Chiffres
    'Digit1': '&', 'Digit2': 'é', 'Digit3': '"', 'Digit4': "'",
    'Digit5': '(', 'Digit6': '-', 'Digit7': 'è', 'Digit8': '_',
    'Digit9': 'ç', 'Digit0': 'à',
    // Touches spéciales
    'Space': 'space', 'Backspace': 'delete', 'Enter': 'return',
    'Tab': 'tab', 'CapsLock': 'capslock', 'ShiftLeft': 'shift-left',
    'ShiftRight': 'shift-right', 'ControlLeft': 'control-left',
    'ControlRight': 'control-right', 'AltLeft': 'option-left',
    'AltRight': 'option-right', 'MetaLeft': 'command-left',
    'MetaRight': 'command-right', 'Escape': 'esc',
    // Touches de fonction
    'F1': 'F1', 'F2': 'F2', 'F3': 'F3', 'F4': 'F4', 'F5': 'F5',
    'F6': 'F6', 'F7': 'F7', 'F8': 'F8', 'F9': 'F9', 'F10': 'F10',
    'F11': 'F11', 'F12': 'F12',
    // Flèches
    'ArrowUp': 'arrow-up', 'ArrowDown': 'arrow-down',
    'ArrowLeft': 'arrow-left', 'ArrowRight': 'arrow-right',
    // Numpad
    'Numpad0': 'num-0', 'Numpad1': 'num-1', 'Numpad2': 'num-2',
    'Numpad3': 'num-3', 'Numpad4': 'num-4', 'Numpad5': 'num-5',
    'Numpad6': 'num-6', 'Numpad7': 'num-7', 'Numpad8': 'num-8',
    'Numpad9': 'num-9', 'NumpadEnter': 'enter', 'NumpadAdd': 'num-plus',
    'NumpadSubtract': 'num-minus', 'NumpadMultiply': 'num-multiply',
    'NumpadDivide': 'num-divide', 'NumpadDecimal': 'num-dot',
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Bloquer les raccourcis navigateur (Ctrl+W, Ctrl+T, etc.)
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }

      const mappedKey = keyMapping[e.code] || e.key;
      setActiveKeys(prev => new Set([...prev, mappedKey]));

      // Jouer le son
      playKeySound();

      // Gérer le texte
      if (e.code === 'Backspace') {
        setTypedText(prev => prev.slice(0, -1));
      } else if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        setTypedText(prev => prev + '\n');
      } else if (e.code === 'Tab') {
        e.preventDefault();
        setTypedText(prev => prev + '    ');
      } else if (e.code === 'Space') {
        e.preventDefault();
        setTypedText(prev => prev + ' ');
      } else if (e.code === 'CapsLock') {
        setCapsLockPressed(prev => !prev);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        setTypedText(prev => prev + e.key);
      }
    };

    const handleKeyUp = (e) => {
      const mappedKey = keyMapping[e.code] || e.key;
      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(mappedKey);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Fonction pour vérifier si une touche est active
  const isKeyActive = (keyId) => activeKeys.has(keyId);

  // Composant helper pour les touches
  const Key = ({ className, keyId, onClick, children }) => (
    <button
      type="button"
      className={`${className} ${isKeyActive(keyId) ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  // Son de clavier généré avec Web Audio API - plus réaliste
  const playKeySound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Créer un bruit blanc filtré pour simuler le "thock" mécanique
      const bufferSize = audioContext.sampleRate * 0.08;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      // Générer le bruit avec enveloppe
      for (let i = 0; i < bufferSize; i++) {
        const t = i / audioContext.sampleRate;
        // Enveloppe exponentielle décroissante
        const envelope = Math.exp(-t * 50);
        // Bruit avec composante tonale
        const noise = (Math.random() * 2 - 1) * 0.5;
        const tone = Math.sin(2 * Math.PI * 3500 * t) * 0.3 + Math.sin(2 * Math.PI * 1200 * t) * 0.2;
        data[i] = (noise + tone) * envelope;
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;

      // Filtre passe-bande pour le son de clavier
      const filter = audioContext.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2000 + Math.random() * 500;
      filter.Q.value = 1.5;

      // Filtre high-shelf pour ajouter du "click"
      const highShelf = audioContext.createBiquadFilter();
      highShelf.type = 'highshelf';
      highShelf.frequency.value = 4000;
      highShelf.gain.value = 3;

      // Gain avec variation aléatoire
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.4 + Math.random() * 0.2;

      // Connexions
      source.connect(filter);
      filter.connect(highShelf);
      highShelf.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.start();
      source.stop(audioContext.currentTime + 0.08);

      // Cleanup
      setTimeout(() => audioContext.close(), 150);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const handleKeyClick = (key, callback) => {
    playKeySound();

    // Gestion du texte tapé
    if (key === 'delete') {
      setTypedText(prev => prev.slice(0, -1));
    } else if (key === 'return' || key === 'enter') {
      setTypedText(prev => prev + '\n');
    } else if (key === 'tab') {
      setTypedText(prev => prev + '    ');
    } else if (key === 'space') {
      setTypedText(prev => prev + ' ');
    } else if (key && key.length === 1) {
      const finalKey = capsLockPressed ? key.toUpperCase() : key.toLowerCase();
      setTypedText(prev => prev + finalKey);
    }

    if (callback) callback();
  };

  const toggleCapsLock = () => {
    setCapsLockPressed(prev => !prev);
  };

  return (
    <>
      <style>{`
        .mac-keyboard-container *,
        .mac-keyboard-container *:before,
        .mac-keyboard-container *:after {
          border: 0;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .mac-keyboard-container {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        }

        .mac-keyboard-container button {
          font-family: inherit;
          font-size: 1em;
        }

        .mac-keyboard-main {
          display: flex;
          flex-direction: column;
          overflow: auto;
          padding: 2em 4.5em 4.5em;
          width: 100%;
          min-height: 100vh;
          gap: 2em;
          align-items: center;
          justify-content: center;
        }

        .text-display {
          width: 33.25em;
          min-height: 8em;
          max-height: 16em;
          background: linear-gradient(135deg, hsl(0, 0%, 15%), hsl(0, 0%, 8%));
          border-radius: 0.5em;
          box-shadow:
            0 0.5em 1.5em hsla(0, 0%, 0%, 0.5),
            0 0 0 1px hsl(0, 0%, 25%) inset;
          padding: 1em 1.5em;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          font-size: 1em;
          color: hsl(120, 100%, 70%);
          text-shadow: 0 0 10px hsla(120, 100%, 50%, 0.5);
          overflow-y: auto;
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.5;
        }

        .text-display::after {
          content: '▋';
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .mac-keyboard-container button {
          background-color: hsl(0, 0%, 93%);
          border-radius: 0.125em;
          box-shadow:
            -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.25),
            0 0 0 0.04em hsla(0, 0%, 0%, 0.3),
            0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.4) inset,
            -0.05em -0.05em 0.02em hsla(0, 0%, 100%, 0.8) inset;
          color: hsl(0, 0%, 47%);
          display: block;
          font-size: 1em;
          outline: transparent;
          position: relative;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          cursor: pointer;
        }

        .mac-keyboard-container button:active,
        .mac-keyboard-container button.active {
          box-shadow:
            0.1em 0.1em 0.1em hsla(0, 0%, 0%, 0.2),
            0 0 0 0.05em hsla(0, 0%, 0%, 0.4),
            -0.025em -0.05em 0.025em hsla(0, 0%, 100%, 0.8) inset;
          transform: translateY(0.05em);
          background-color: hsl(0, 0%, 88%);
        }

        .mac-keyboard-container button:focus-visible {
          background-color: hsl(0, 0%, 100%);
          color: hsl(0, 0%, 54%);
        }

        .mac-keyboard-container button span {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .mac-keyboard-container button > span {
          margin: auto;
          padding: 0.1em 0.2em;
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 0.45em;
          line-height: 1.8;
          transform: translateY(-50%) scaleX(0.85);
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mac-keyboard-container button[aria-pressed="true"] .dot-light {
          color: hsl(88, 100%, 50%);
          text-shadow: 0 0 2px hsl(88, 100%, 27%);
        }

        /* Keyboard */
        .keyboard {
          background-image: linear-gradient(90deg, hsl(0, 0%, 53%), hsl(0, 0%, 80%));
          border-radius: 0.5em;
          box-shadow:
            -1em -1em 1.5em hsla(0, 0%, 0%, 0.6),
            0 0 0 1px hsl(0, 0%, 67%) inset;
          display: grid;
          gap: 0.375em 0.875em;
          grid-template-columns: 21.25em 4.125em 5.65em;
          grid-template-rows: 0.75em 1.125em 1.125em 1.125em 1.125em 1.375em;
          font-size: 36px;
          margin: auto;
          padding: 0.25em;
          width: 33.25em;
          height: 9em;
        }

        .row {
          display: flex;
          gap: 0.35em;
        }

        .row:nth-of-type(14) {
          margin: auto;
        }

        .row:nth-of-type(14),
        .row:nth-of-type(17) {
          transform: translateY(0.25em);
        }

        .bump {
          border-radius: 0.1em;
          box-shadow: -0.05em -0.02em 0 0.05em hsla(0, 0%, 0%, 0.3);
          padding: 0;
          top: 85%;
          left: calc(50% - 0.4em);
          width: 0.8em;
          height: 0.15em;
        }

        /* Button sizes */
        .btn-0 { width: 1.19em; height: 0.75em; font-size: 0.9em; }
        .btn-1 { width: 1.125em; height: 0.75em; font-size: 0.9em; }
        .btn-2 { width: 1.125em; height: 1.125em; }
        .btn-3 { width: 2em; height: 1.125em; }
        .btn-4 { width: 2.3em; height: 1.125em; }
        .btn-5 { width: 2.85em; height: 1.125em; }
        .btn-6 { width: 1.5625em; height: 1.375em; }
        .btn-7 { width: 1.8375em; height: 1.375em; }
        .btn-8 { width: 1.125em; height: 1.375em; }
        .btn-9 { width: 2.6875em; height: 1.375em; }
        .btn-10 { width: 1.125em; height: 2.875em; }
        .btn-longest { width: 8.625em; height: 1.375em; }

        /* Button text alignment */
        .ul, .ll, .ur, .lr {
          top: 0;
          transform: scaleX(0.8);
        }

        .ul, .ll {
          justify-content: flex-start;
          transform-origin: 0 50%;
          text-align: left;
        }

        .ur, .lr {
          justify-content: flex-end;
          transform-origin: 100% 50%;
          text-align: right;
        }

        .ll, .lr {
          top: auto;
          bottom: 0;
        }

        .noxscale {
          transform: translateY(-50%) scaleX(1);
        }

        .ll.noxscale, .lr.noxscale {
          transform: scaleX(1);
        }

        /* Button font sizes */
        .xxxs { font-size: 0.18em; line-height: 1.4; }
        .xxs { font-size: 0.22em; line-height: 1.4; }
        .xs { font-size: 0.26em; line-height: 1.2; }
        .sm { font-size: 0.35em; line-height: 1.2; }

        /* Icons */
        .up, .right, .down, .left {
          width: 0;
          height: 0;
          vertical-align: 0.1em;
        }

        .up {
          border-left: 0.25em solid transparent;
          border-right: 0.25em solid transparent;
          border-bottom: 0.5em solid currentColor;
        }

        .right {
          border-left: 0.5em solid currentColor;
          border-top: 0.25em solid transparent;
          border-bottom: 0.25em solid transparent;
        }

        .down {
          border-left: 0.25em solid transparent;
          border-right: 0.25em solid transparent;
          border-top: 0.5em solid currentColor;
        }

        .left {
          border-right: 0.5em solid currentColor;
          border-top: 0.25em solid transparent;
          border-bottom: 0.25em solid transparent;
        }

        .pause {
          border-left: 0.2em solid;
          border-right: 0.2em solid;
          vertical-align: 0.1em;
          width: 0.475em;
          height: 0.5em;
        }

        .emoji {
          filter: saturate(0);
          -webkit-filter: saturate(0);
        }

        .block {
          margin-left: 0.1em;
          height: 0.8em;
          width: 0.6em;
          vertical-align: 0.1em;
          border: 1px solid;
        }

        .cascade {
          position: relative;
          height: 1em;
          width: 1.2em;
        }

        .cascade::before,
        .cascade::after {
          content: "";
          position: absolute;
          height: 0.45em;
          width: 0.8em;
          border: 1px solid;
        }

        .cascade::before {
          top: 0;
          left: 0;
        }

        .cascade::after {
          right: 0;
          bottom: 0;
        }

        .apps::before,
        .apps::after {
          font-weight: bold;
          display: block;
          content: "◻◻◻";
          line-height: 0.875;
        }

        .noxpad {
          padding: 0.2em 0;
        }

        /* ===== DARK MODE ===== */
        .dark-mode .keyboard {
          background-image: linear-gradient(90deg, hsl(0, 0%, 15%), hsl(0, 0%, 20%));
          box-shadow:
            -1em -1em 1.5em hsla(0, 0%, 0%, 0.8),
            0 0 0 1px hsl(0, 0%, 25%) inset;
        }

        .dark-mode button {
          background-color: hsl(0, 0%, 12%);
          box-shadow:
            -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.4),
            0 0 0 0.04em hsla(0, 0%, 30%, 0.5),
            0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.6) inset,
            -0.05em -0.05em 0.02em hsla(0, 0%, 30%, 0.3) inset;
          color: hsl(0, 0%, 90%);
        }

        .dark-mode button:active,
        .dark-mode button.active {
          background-color: hsl(0, 0%, 8%);
          box-shadow:
            0.1em 0.1em 0.1em hsla(0, 0%, 0%, 0.4),
            0 0 0 0.05em hsla(0, 0%, 20%, 0.6),
            -0.025em -0.05em 0.025em hsla(0, 0%, 20%, 0.3) inset;
        }

        .dark-mode .text-display {
          background: linear-gradient(135deg, hsl(0, 0%, 8%), hsl(0, 0%, 4%));
          box-shadow:
            0 0.5em 1.5em hsla(0, 0%, 0%, 0.7),
            0 0 0 1px hsl(0, 0%, 15%) inset;
        }

        /* ===== RGB MODE ===== */
        .rgb-mode button {
          animation: rgb-glow 3s ease-in-out infinite;
          animation-delay: calc(var(--key-index, 0) * 0.05s);
        }

        .rgb-mode button:nth-child(1) { --key-index: 0; }
        .rgb-mode button:nth-child(2) { --key-index: 1; }
        .rgb-mode button:nth-child(3) { --key-index: 2; }
        .rgb-mode button:nth-child(4) { --key-index: 3; }
        .rgb-mode button:nth-child(5) { --key-index: 4; }
        .rgb-mode button:nth-child(6) { --key-index: 5; }
        .rgb-mode button:nth-child(7) { --key-index: 6; }
        .rgb-mode button:nth-child(8) { --key-index: 7; }
        .rgb-mode button:nth-child(9) { --key-index: 8; }
        .rgb-mode button:nth-child(10) { --key-index: 9; }
        .rgb-mode button:nth-child(11) { --key-index: 10; }
        .rgb-mode button:nth-child(12) { --key-index: 11; }
        .rgb-mode button:nth-child(13) { --key-index: 12; }
        .rgb-mode button:nth-child(14) { --key-index: 13; }

        @keyframes rgb-glow {
          0%, 100% {
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.25),
              0 0 0 0.04em hsla(0, 0%, 0%, 0.3),
              0 0 0.5em hsla(0, 100%, 50%, 0.6),
              0 0 1em hsla(0, 100%, 50%, 0.3),
              0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.4) inset,
              -0.05em -0.05em 0.02em hsla(0, 0%, 100%, 0.8) inset;
          }
          16% {
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.25),
              0 0 0 0.04em hsla(0, 0%, 0%, 0.3),
              0 0 0.5em hsla(60, 100%, 50%, 0.6),
              0 0 1em hsla(60, 100%, 50%, 0.3),
              0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.4) inset,
              -0.05em -0.05em 0.02em hsla(0, 0%, 100%, 0.8) inset;
          }
          33% {
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.25),
              0 0 0 0.04em hsla(0, 0%, 0%, 0.3),
              0 0 0.5em hsla(120, 100%, 50%, 0.6),
              0 0 1em hsla(120, 100%, 50%, 0.3),
              0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.4) inset,
              -0.05em -0.05em 0.02em hsla(0, 0%, 100%, 0.8) inset;
          }
          50% {
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.25),
              0 0 0 0.04em hsla(0, 0%, 0%, 0.3),
              0 0 0.5em hsla(180, 100%, 50%, 0.6),
              0 0 1em hsla(180, 100%, 50%, 0.3),
              0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.4) inset,
              -0.05em -0.05em 0.02em hsla(0, 0%, 100%, 0.8) inset;
          }
          66% {
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.25),
              0 0 0 0.04em hsla(0, 0%, 0%, 0.3),
              0 0 0.5em hsla(240, 100%, 50%, 0.6),
              0 0 1em hsla(240, 100%, 50%, 0.3),
              0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.4) inset,
              -0.05em -0.05em 0.02em hsla(0, 0%, 100%, 0.8) inset;
          }
          83% {
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.25),
              0 0 0 0.04em hsla(0, 0%, 0%, 0.3),
              0 0 0.5em hsla(300, 100%, 50%, 0.6),
              0 0 1em hsla(300, 100%, 50%, 0.3),
              0.02em 0.02em 0.02em hsla(0, 0%, 0%, 0.4) inset,
              -0.05em -0.05em 0.02em hsla(0, 0%, 100%, 0.8) inset;
          }
        }

        /* RGB + Dark mode combined */
        .dark-mode.rgb-mode button {
          animation: rgb-glow-dark 3s ease-in-out infinite;
          animation-delay: calc(var(--key-index, 0) * 0.05s);
        }

        @keyframes rgb-glow-dark {
          0%, 100% {
            background-color: hsl(0, 0%, 12%);
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.4),
              0 0 0.6em hsla(0, 100%, 50%, 0.8),
              0 0 1.5em hsla(0, 100%, 50%, 0.4),
              0 0 0 0.04em hsla(0, 100%, 50%, 0.5);
            color: hsl(0, 100%, 80%);
            text-shadow: 0 0 0.3em hsla(0, 100%, 50%, 0.8);
          }
          16% {
            background-color: hsl(0, 0%, 12%);
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.4),
              0 0 0.6em hsla(60, 100%, 50%, 0.8),
              0 0 1.5em hsla(60, 100%, 50%, 0.4),
              0 0 0 0.04em hsla(60, 100%, 50%, 0.5);
            color: hsl(60, 100%, 80%);
            text-shadow: 0 0 0.3em hsla(60, 100%, 50%, 0.8);
          }
          33% {
            background-color: hsl(0, 0%, 12%);
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.4),
              0 0 0.6em hsla(120, 100%, 50%, 0.8),
              0 0 1.5em hsla(120, 100%, 50%, 0.4),
              0 0 0 0.04em hsla(120, 100%, 50%, 0.5);
            color: hsl(120, 100%, 80%);
            text-shadow: 0 0 0.3em hsla(120, 100%, 50%, 0.8);
          }
          50% {
            background-color: hsl(0, 0%, 12%);
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.4),
              0 0 0.6em hsla(180, 100%, 50%, 0.8),
              0 0 1.5em hsla(180, 100%, 50%, 0.4),
              0 0 0 0.04em hsla(180, 100%, 50%, 0.5);
            color: hsl(180, 100%, 80%);
            text-shadow: 0 0 0.3em hsla(180, 100%, 50%, 0.8);
          }
          66% {
            background-color: hsl(0, 0%, 12%);
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.4),
              0 0 0.6em hsla(240, 100%, 50%, 0.8),
              0 0 1.5em hsla(240, 100%, 50%, 0.4),
              0 0 0 0.04em hsla(240, 100%, 50%, 0.5);
            color: hsl(240, 100%, 80%);
            text-shadow: 0 0 0.3em hsla(240, 100%, 50%, 0.8);
          }
          83% {
            background-color: hsl(0, 0%, 12%);
            box-shadow:
              -0.2em -0.125em 0.125em hsla(0, 0%, 0%, 0.4),
              0 0 0.6em hsla(300, 100%, 50%, 0.8),
              0 0 1.5em hsla(300, 100%, 50%, 0.4),
              0 0 0 0.04em hsla(300, 100%, 50%, 0.5);
            color: hsl(300, 100%, 80%);
            text-shadow: 0 0 0.3em hsla(300, 100%, 50%, 0.8);
          }
        }

        /* Mode controls */
        .mode-controls {
          display: flex;
          gap: 1em;
          margin-bottom: 1em;
        }

        .mode-btn {
          padding: 0.5em 1.2em;
          border-radius: 0.5em;
          border: none;
          font-size: 0.9em;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mode-btn.dark-btn {
          background: linear-gradient(135deg, #1a1a1a, #333);
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .mode-btn.dark-btn.active {
          background: linear-gradient(135deg, #333, #1a1a1a);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }

        .mode-btn.rgb-btn {
          background: linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff0080);
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .mode-btn.rgb-btn.active {
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.3);
        }

        .mode-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
      `}</style>

      <div className={`mac-keyboard-container ${darkMode ? 'dark-mode' : ''} ${rgbMode ? 'rgb-mode' : ''}`}>
        <main className="mac-keyboard-main">
          {/* Boutons de contrôle des modes */}
          <div className="mode-controls">
            <button
              className={`mode-btn dark-btn ${darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              🌙 Dark Mode
            </button>
            <button
              className={`mode-btn rgb-btn ${rgbMode ? 'active' : ''}`}
              onClick={() => setRgbMode(!rgbMode)}
            >
              🌈 RGB Mode
            </button>
          </div>

          {/* Zone d'affichage du texte */}
          <div className="text-display">
            {typedText}
          </div>

          <div className="keyboard">
            {/* Row 1 - Function keys */}
            <div className="row">
              <button type="button" className={`btn-0 ${isKeyActive('esc') ? 'active' : ''}`} onClick={() => handleKeyClick()}>
                <span className="xs">esc</span>
              </button>
              <button type="button" className={`btn-0 ${isKeyActive('F1') ? 'active' : ''}`} onClick={() => handleKeyClick()}>
                <span className="xs noxscale">
                  <span className="emoji">🔅</span>
                </span>
                <span className="lr xxxs">F1</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="xs noxscale">
                  <span className="emoji">🔆</span>
                </span>
                <span className="lr xxxs">F2</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="xs noxscale">
                  <span className="cascade"></span>
                  <span className="block"></span>
                </span>
                <span className="lr xxxs">F3</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="xxxs noxscale">
                  <span className="apps"></span>
                </span>
                <span className="lr xxxs">F4</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F5</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F6</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="sm">
                  <span className="left"></span>
                  <span className="left"></span>
                </span>
                <span className="lr xxxs">F7</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="sm">
                  <span className="right"></span>
                  <span className="pause"></span>
                </span>
                <span className="lr xxxs">F8</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="sm">
                  <span className="right"></span>
                  <span className="right"></span>
                </span>
                <span className="lr xxxs">F9</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="xs noxscale">
                  <span className="emoji">🔈</span>
                </span>
                <span className="lr xxxs">F10</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="xs noxscale">
                  <span className="emoji">🔉</span>
                </span>
                <span className="lr xxxs">F11</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="xs noxscale">
                  <span className="emoji">🔊</span>
                </span>
                <span className="lr xxxs">F12</span>
              </button>
              <button type="button" className="btn-0" onClick={() => handleKeyClick()}>
                <span className="xs noxscale">⏏</span>
              </button>
            </div>

            {/* Row 2 - F13-F15 */}
            <div className="row">
              <button type="button" className="btn-1" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F13</span>
              </button>
              <button type="button" className="btn-1" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F14</span>
              </button>
              <button type="button" className="btn-1" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F15</span>
              </button>
            </div>

            {/* Row 3 - F16-F19 */}
            <div className="row">
              <button type="button" className="btn-1" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F16</span>
              </button>
              <button type="button" className="btn-1" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F17</span>
              </button>
              <button type="button" className="btn-1" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F18</span>
              </button>
              <button type="button" className="btn-1" onClick={() => handleKeyClick()}>
                <span className="lr xxxs">F19</span>
              </button>
            </div>

            {/* Row 4 - Number row AZERTY */}
            <div className="row">
              <button type="button" className="btn-2" onClick={() => handleKeyClick('@')}>
                <span className="sm">@<br />²</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('&')}>
                <span className="sm">1<br />&amp;</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('é')}>
                <span className="sm">2<br />é</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('"')}>
                <span className="sm">3<br />"</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick("'")}>
                <span className="sm">4<br />'</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('(')}>
                <span className="sm">5<br />(</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('-')}>
                <span className="sm">6<br />-</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('è')}>
                <span className="sm">7<br />è</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('_')}>
                <span className="sm">8<br />_</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('ç')}>
                <span className="sm">9<br />ç</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('à')}>
                <span className="sm">0<br />à</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick(')')}>
                <span className="sm">°<br />)</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('=')}>
                <span className="sm">+<br />=</span>
              </button>
              <Key className="btn-3" keyId="delete" onClick={() => handleKeyClick('delete')}>
                <span className="lr xs">delete</span>
              </Key>
            </div>

            {/* Row 5 - fn, home, page up */}
            <div className="row">
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span className="xs">fn</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span className="xs">home</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span className="xs">page up</span>
              </button>
            </div>

            {/* Row 6 - Numpad top */}
            <div className="row">
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span className="xs">clear</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span>=</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span>/</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span>*</span>
              </button>
            </div>

            {/* Row 7 - QWERTY row */}
            <div className="row">
              <Key className="btn-3" keyId="tab" onClick={() => handleKeyClick('tab')}>
                <span className="ll xs">tab</span>
              </Key>
              <Key className="btn-2" keyId="A" onClick={() => handleKeyClick('A')}>
                <span>A</span>
              </Key>
              <Key className="btn-2" keyId="Z" onClick={() => handleKeyClick('Z')}>
                <span>Z</span>
              </Key>
              <Key className="btn-2" keyId="E" onClick={() => handleKeyClick('E')}>
                <span>E</span>
              </Key>
              <Key className="btn-2" keyId="R" onClick={() => handleKeyClick('R')}>
                <span>R</span>
              </Key>
              <Key className="btn-2" keyId="T" onClick={() => handleKeyClick('T')}>
                <span>T</span>
              </Key>
              <Key className="btn-2" keyId="Y" onClick={() => handleKeyClick('Y')}>
                <span>Y</span>
              </Key>
              <Key className="btn-2" keyId="U" onClick={() => handleKeyClick('U')}>
                <span>U</span>
              </Key>
              <Key className="btn-2" keyId="I" onClick={() => handleKeyClick('I')}>
                <span>I</span>
              </Key>
              <Key className="btn-2" keyId="O" onClick={() => handleKeyClick('O')}>
                <span>O</span>
              </Key>
              <Key className="btn-2" keyId="P" onClick={() => handleKeyClick('P')}>
                <span>P</span>
              </Key>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('^')}>
                <span className="sm">¨<br />^</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('$')}>
                <span className="sm">£<br />$</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('*')}>
                <span className="sm">µ<br />*</span>
              </button>
            </div>

            {/* Row 8 - delete, end, page down */}
            <div className="row">
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span className="xs noxpad">delete⌦</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span className="xs">end</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick()}>
                <span className="xs">page down</span>
              </button>
            </div>

            {/* Row 9 - Numpad 7-8-9 */}
            <div className="row">
              <button type="button" className="btn-2" onClick={() => handleKeyClick('7')}>
                <span>7</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('8')}>
                <span>8</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('9')}>
                <span>9</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('-')}>
                <span>-</span>
              </button>
            </div>

            {/* Row 10 - ASDF row */}
            <div className="row">
              <button
                type="button"
                id="caps-lock"
                className={`btn-4 ${isKeyActive('capslock') ? 'active' : ''}`}
                aria-pressed={capsLockPressed}
                onClick={() => { playKeySound(); toggleCapsLock(); }}
              >
                <span className="ul xs dot-light" aria-hidden="true">•</span>
                <span className="ll xs">caps lock</span>
              </button>
              <Key className="btn-2" keyId="Q" onClick={() => handleKeyClick('Q')}>
                <span>Q</span>
              </Key>
              <Key className="btn-2" keyId="S" onClick={() => handleKeyClick('S')}>
                <span>S</span>
              </Key>
              <Key className="btn-2" keyId="D" onClick={() => handleKeyClick('D')}>
                <span>D</span>
              </Key>
              <Key className="btn-2" keyId="F" onClick={() => handleKeyClick('F')}>
                <span>F</span>
                <span className="bump"></span>
              </Key>
              <Key className="btn-2" keyId="G" onClick={() => handleKeyClick('G')}>
                <span>G</span>
              </Key>
              <Key className="btn-2" keyId="H" onClick={() => handleKeyClick('H')}>
                <span>H</span>
              </Key>
              <Key className="btn-2" keyId="J" onClick={() => handleKeyClick('J')}>
                <span>J</span>
                <span className="bump"></span>
              </Key>
              <Key className="btn-2" keyId="K" onClick={() => handleKeyClick('K')}>
                <span>K</span>
              </Key>
              <Key className="btn-2" keyId="L" onClick={() => handleKeyClick('L')}>
                <span>L</span>
              </Key>
              <Key className="btn-2" keyId="M" onClick={() => handleKeyClick('M')}>
                <span>M</span>
              </Key>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('ù')}>
                <span className="sm">%<br />ù</span>
              </button>
              <Key className="btn-4" keyId="return" onClick={() => handleKeyClick('return')}>
                <span className="lr xs">return</span>
              </Key>
            </div>

            {/* Row 11 - Empty */}
            <div className="row"></div>

            {/* Row 12 - Numpad 4-5-6 */}
            <div className="row">
              <button type="button" className="btn-2" onClick={() => handleKeyClick('4')}>
                <span>4</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('5')}>
                <span>5</span>
                <span className="bump"></span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('6')}>
                <span>6</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('+')}>
                <span>+</span>
              </button>
            </div>

            {/* Row 13 - WXCV row */}
            <div className="row">
              <Key className="btn-5" keyId="shift-left" onClick={() => { playKeySound(); }}>
                <span className="ll xs">shift</span>
              </Key>
              <Key className="btn-2" keyId="<" onClick={() => handleKeyClick('<')}>
                <span className="sm">&gt;<br />&lt;</span>
              </Key>
              <Key className="btn-2" keyId="W" onClick={() => handleKeyClick('W')}>
                <span>W</span>
              </Key>
              <Key className="btn-2" keyId="X" onClick={() => handleKeyClick('X')}>
                <span>X</span>
              </Key>
              <Key className="btn-2" keyId="C" onClick={() => handleKeyClick('C')}>
                <span>C</span>
              </Key>
              <Key className="btn-2" keyId="V" onClick={() => handleKeyClick('V')}>
                <span>V</span>
              </Key>
              <Key className="btn-2" keyId="B" onClick={() => handleKeyClick('B')}>
                <span>B</span>
              </Key>
              <Key className="btn-2" keyId="N" onClick={() => handleKeyClick('N')}>
                <span>N</span>
              </Key>
              <Key className="btn-2" keyId="," onClick={() => handleKeyClick(',')}>
                <span className="sm">?<br />,</span>
              </Key>
              <Key className="btn-2" keyId=";" onClick={() => handleKeyClick(';')}>
                <span className="sm">.<br />;</span>
              </Key>
              <Key className="btn-2" keyId=":" onClick={() => handleKeyClick(':')}>
                <span className="sm">/<br />:</span>
              </Key>
              <Key className="btn-2" keyId="!" onClick={() => handleKeyClick('!')}>
                <span className="sm">§<br />!</span>
              </Key>
              <Key className="btn-5" keyId="shift-right" onClick={() => { playKeySound(); }}>
                <span className="lr xs">shift</span>
              </Key>
            </div>

            {/* Row 14 - Arrow up */}
            <div className="row">
              <Key className="btn-2" keyId="arrow-up" onClick={() => handleKeyClick()}>
                <span>
                  <span className="up"></span>
                </span>
              </Key>
            </div>

            {/* Row 15 - Numpad 1-2-3 */}
            <div className="row">
              <button type="button" className="btn-2" onClick={() => handleKeyClick('1')}>
                <span>1</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('2')}>
                <span>2</span>
              </button>
              <button type="button" className="btn-2" onClick={() => handleKeyClick('3')}>
                <span>3</span>
              </button>
              <Key className="btn-10" keyId="enter" onClick={() => handleKeyClick('enter')}>
                <span className="lr xs">enter</span>
              </Key>
            </div>

            {/* Row 16 - Bottom row */}
            <div className="row">
              <Key className="btn-7" keyId="control-left" onClick={() => handleKeyClick()}>
                <span className="ll xs">control</span>
              </Key>
              <Key className="btn-6" keyId="option-left" onClick={() => handleKeyClick()}>
                <span className="ul xxs">alt</span>
                <span className="ll xs">option</span>
              </Key>
              <Key className="btn-7" keyId="command-left" onClick={() => handleKeyClick()}>
                <span className="ll xs">command</span>
                <span className="lr xs noxscale">⌘</span>
              </Key>
              <Key className="btn-longest" keyId="space" onClick={() => handleKeyClick('space')}>
                <span></span>
              </Key>
              <Key className="btn-7" keyId="command-right" onClick={() => handleKeyClick()}>
                <span className="ll xs noxscale">⌘</span>
                <span className="lr xs">command</span>
              </Key>
              <Key className="btn-6" keyId="option-right" onClick={() => handleKeyClick()}>
                <span className="ur xxs">alt</span>
                <span className="lr xs">option</span>
              </Key>
              <Key className="btn-7" keyId="control-right" onClick={() => handleKeyClick()}>
                <span className="lr xs">control</span>
              </Key>
            </div>

            {/* Row 17 - Arrow keys */}
            <div className="row">
              <Key className="btn-2" keyId="arrow-left" onClick={() => handleKeyClick()}>
                <span>
                  <span className="left"></span>
                </span>
              </Key>
              <Key className="btn-2" keyId="arrow-down" onClick={() => handleKeyClick()}>
                <span>
                  <span className="down"></span>
                </span>
              </Key>
              <Key className="btn-2" keyId="arrow-right" onClick={() => handleKeyClick()}>
                <span>
                  <span className="right"></span>
                </span>
              </Key>
            </div>

            {/* Row 18 - Numpad 0 and dot */}
            <div className="row">
              <button type="button" className="btn-9" onClick={() => handleKeyClick('0')}>
                <span>0</span>
              </button>
              <button type="button" className="btn-8" onClick={() => handleKeyClick('.')}>
                <span>.</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
