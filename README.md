# JSX Gallery

Galerie d'interfaces React JSX compilée en fichiers statiques (HTML + CSS + JS). Aucun serveur applicatif requis en production.

## Prérequis

- Node.js >= 18

## Installation

```bash
npm install
```

## Développement local

```bash
npm run dev
```

Ouvre le navigateur sur `http://localhost:5173`.

## Build de production

```bash
npm run build
```

Le dossier `dist/` contient uniquement du HTML, CSS et JS statique. Il est prêt à être uploadé tel quel sur un hébergement statique (Cloud1, Nginx, Apache, S3, etc.).

Pour tester le build localement :

```bash
npm run preview
```

## Déployer sur Cloud1

1. Lancer `npm run build`
2. Copier le contenu du dossier `dist/` sur le serveur
3. C'est tout. Aucune dépendance serveur, aucun runtime Node.js requis

## Ajouter une nouvelle interface

### 1. Déposer le fichier

Placer le fichier `.jsx` dans `src/pages/`. Le composant doit avoir un `export default`.

```
src/pages/MonInterface.jsx
```

### 2. Enregistrer dans le registre

Ouvrir `src/pages.js` et :

1. Importer le composant
2. Ajouter une entrée dans le tableau `pages`

```js
// -- Imports --
import MonInterface from './pages/MonInterface.jsx'

// -- Registry --
export const pages = [
  {
    id: 'mon-interface',           // identifiant unique (utilisé dans l'URL)
    title: 'Mon Interface',        // titre affiché dans la galerie
    description: 'Description',    // description courte (optionnelle)
    component: MonInterface,       // le composant importé
  },
]
```

### 3. Relancer le build

```bash
npm run build
```

Le nouveau composant est maintenant accessible dans la galerie et via l'URL `/#/view/mon-interface`.

## Si un composant utilise des librairies externes

Certaines interfaces peuvent dépendre de packages npm (recharts, lucide-react, three, etc.). Il faut les installer avant le build :

```bash
npm install recharts lucide-react three @react-three/fiber
```

## Structure du projet

```
├── index.html              Entrée HTML (Vite)
├── vite.config.js          Configuration Vite
├── package.json
├── src/
│   ├── main.jsx            Point d'entrée React
│   ├── App.jsx             Routeur (HashRouter)
│   ├── pages.js            Registre des interfaces
│   ├── pages/              Déposer les fichiers .jsx ici
│   ├── components/         Composants partagés (optionnel)
│   └── gallery/
│       ├── Gallery.jsx     Page d'accueil (liste des interfaces)
│       ├── Gallery.css     Styles de la galerie (thème sombre)
│       └── PageViewer.jsx  Affichage plein écran d'une interface
└── dist/                   Build statique (généré par npm run build)
```

## Notes techniques

- Le routing utilise `HashRouter` (URLs en `/#/...`) pour fonctionner sur tout hébergement statique sans configuration serveur
- `base: './'` dans Vite permet de déployer dans n'importe quel sous-dossier
- Chaque interface est rendue plein écran avec un bouton retour en overlay
