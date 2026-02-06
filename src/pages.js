/**
 * Registre des interfaces.
 *
 * Pour ajouter une nouvelle interface :
 * 1. Déposer le fichier .jsx dans src/pages/
 * 2. L'importer ici
 * 3. Ajouter une entrée dans le tableau `pages`
 *
 * Exemple :
 *
 *   import MonInterface from './pages/MonInterface.jsx'
 *
 *   { id: 'mon-interface', title: 'Mon Interface', description: 'Description courte', component: MonInterface }
 */

// -- Imports --
import CyberpunkDescriptions from './pages/CyberpunkDescriptions.jsx'
import CyberpunkUI from './pages/CyberpunkUI.jsx'
import WaveButton from './pages/WaveButton.jsx'
import MacKeyboard from './pages/MacKeyboard.jsx'
import Infographic3D from './pages/Infographic3D.jsx'

// -- Registry --
export const pages = [
  {
    id: 'cyberpunk-descriptions',
    title: 'Cyberpunk Descriptions',
    description: 'HUD cyberpunk avec typewriter et panneaux animés',
    component: CyberpunkDescriptions,
  },
  {
    id: 'cyberpunk-ui',
    title: 'Cyberpunk UI',
    description: 'Interface cyberpunk avec cadrans, grilles et scanlines',
    component: CyberpunkUI,
  },
  {
    id: 'wave-button',
    title: 'Wave Button',
    description: 'Bouton neumorphique avec effet de vagues concentriques',
    component: WaveButton,
  },
  {
    id: 'mac-keyboard',
    title: 'Mac Keyboard',
    description: 'Clavier Mac AZERTY interactif avec dark mode et RGB',
    component: MacKeyboard,
  },
  {
    id: 'infographic-3d',
    title: 'Infographic 3D',
    description: 'Barres 3D interactives avec molette rotative',
    component: Infographic3D,
  },
]
