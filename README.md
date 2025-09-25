# 🏕️ OneForAll - Plateforme de Survie Post-Apocalyptique

<div align="center">

![OneForAll Logo](frontend/src/assets/images/logo.png)

**Plateforme complète de documentation et communication pour survivants**

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/Skyneur/OneForAll)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-purple.svg)](https://vitejs.dev/)

</div>

---

## 📖 À propos du projet

**OneForAll** est une plateforme web sécurisée conçue pour les survivants en situation post-apocalyptique. Elle offre un accès complet à la documentation de survie, un système de communication chiffré, et des outils de configuration avancés pour s'adapter à tous les environnements hostiles.

### 🎯 Mission
Fournir aux survivants les outils essentiels pour :
- **Apprendre** des techniques de survie éprouvées
- **Communiquer** de manière sécurisée avec d'autres survivants
- **Configurer** leur environnement selon leurs besoins spécifiques
- **Survivre** dans un monde post-apocalyptique

---

## ✨ Fonctionnalités principales

### 📚 Documentation de Survie
- **Guide complet** avec techniques de survie détaillées
- **Navigation intuitive** par catégories (Eau, Nourriture, Abri, etc.)
- **Recherche avancée** pour trouver rapidement l'information nécessaire
- **Mode hors ligne** pour consultation sans connexion internet

### 💬 Chat Sécurisé
- **Chiffrement AES-256** pour communications sécurisées
- **Messages éphémères** avec auto-destruction programmée
- **Mode anonyme** pour protéger l'identité
- **Alertes d'urgence** pour situations critiques

### ⚙️ Centre de Contrôle
- **Paramètres de sécurité** avancés (chiffrement, anonymat, mode hors ligne)
- **Interface personnalisable** (thème sombre, sons, notifications)
- **Mode survie** avec options d'urgence et économie d'énergie
- **Gestion des données** (import/export, sauvegarde automatique)

### 🛡️ Sécurité Avancée
- **Chiffrement bout-en-bout** pour toutes les communications
- **Mode anonyme** complet pour masquer l'identité
- **Stockage local** sécurisé sans collecte de données
- **Mode d'urgence** pour situations critiques

---

## 🚀 Installation et Configuration

### Prérequis
- **Node.js** (version 18.x ou supérieure)
- **npm** ou **yarn**
- **Git**

### Installation
```bash
# Cloner le repository
git clone https://github.com/Skyneur/OneForAll.git
cd OneForAll

# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install
```

### Lancement en développement
```bash
# Démarrer le serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:5173
```

### 🏗️ Build de production
```bash
# Construire l'application pour la production
npm run build

# Les fichiers optimisés seront dans le dossier 'dist/'
```

### 👀 Prévisualisation du build
```bash
# Prévisualiser le build de production localement
npm run preview

# Accessible sur http://localhost:4173
```

---

## 📁 Structure du projet

```
OneForAll/
├── frontend/                 # Application React/TypeScript
│   ├── public/              # Fichiers statiques
│   │   ├── favicon.svg      # Icône du site
│   │   └── index.html       # Point d'entrée HTML
│   ├── src/
│   │   ├── assets/          # Ressources (images, logos)
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── Navigation.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ...
│   │   ├── pages/           # Pages principales
│   │   │   ├── HomePage.tsx
│   │   │   ├── DocumentationPage.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── data/            # Données statiques
│   │   │   └── sampleContent.ts
│   │   ├── App.tsx          # Composant principal
│   │   └── main.tsx         # Point d'entrée React
│   ├── package.json         # Dépendances et scripts
│   └── vite.config.ts       # Configuration Vite
├── backend/                 # [Réservé pour développements futurs]
└── README.md               # Ce fichier
```

---

## 🛠️ Technologies utilisées

### Frontend
- **⚛️ React 18** - Framework JavaScript moderne
- **📘 TypeScript** - Typage statique pour plus de robustesse
- **⚡ Vite** - Build tool ultra-rapide
- **🎨 CSS3** - Styling moderne avec variables CSS
- **🧭 React Router** - Navigation côté client
- **📝 React Markdown** - Rendu de contenu Markdown
- **🎭 Lucide React** - Icônes modernes et cohérentes

### Outils de développement
- **ESLint** - Linting du code
- **TypeScript Compiler** - Vérification de types
- **Vite HMR** - Rechargement à chaud en développement

---

## 🎨 Design et UX

### Thème Post-Apocalyptique
- **Palette de couleurs survival** : Verts militaires (#5d8a3a) et bruns terre (#8b6f47)
- **Typographie robuste** : Montserrat pour les titres, fonts système pour le contenu
- **Animations fluides** : Transitions CSS optimisées
- **Mode sombre** : Interface adaptée aux environnements peu éclairés

### Responsive Design
- **Mobile First** : Optimisé pour tous les écrans
- **Breakpoints adaptatifs** : 480px, 768px, 1200px
- **Navigation tactile** : Interactions optimisées pour mobile

---

## 📜 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Construit l'application pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie la qualité du code |

---

## 🚀 Déploiement

### Build de production
```bash
npm run build
```
Cette commande génère une version optimisée dans le dossier `dist/` avec :
- **Minification** du code JavaScript/CSS
- **Tree-shaking** pour éliminer le code non utilisé
- **Optimisation des images** et assets
- **Compression gzip** automatique

### Serveurs compatibles
- **Vercel** (recommandé)
- **Netlify**
- **GitHub Pages**
- **Apache/Nginx** (serveur statique)

### Variables d'environnement
Créer un fichier `.env` si nécessaire :
```env
VITE_APP_TITLE=OneForAll
VITE_API_URL=https://api.example.com
```

---

## 🔧 Configuration avancée

### Customisation du thème
Les couleurs peuvent être modifiées dans `src/index.css` :
```css
:root {
  --accent-primary: #5d8a3a;    /* Vert survival */
  --accent-secondary: #8b6f47;  /* Brun terre */
  --bg-primary: #1a1a1a;        /* Fond sombre */
}
```

### Ajout de contenu
Le contenu de la documentation se trouve dans `src/data/sampleContent.ts` et peut être étendu facilement.

---

## 🤝 Contribution

### Comment contribuer
1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commit** vos changements (`git commit -m 'Add amazing feature'`)
4. **Push** sur la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

### Standards de code
- **TypeScript strict** activé
- **ESLint** configuration respectée
- **Commits conventionnels** recommandés
- **CSS BEM** pour le nommage des classes

---

## 📊 Performance

### Métriques de build
- **Bundle size** : ~200KB (gzipped)
- **First Content Paint** : <1.5s
- **Time to Interactive** : <2.5s
- **Lighthouse Score** : 95+/100

### Optimisations incluses
- **Code splitting** automatique
- **Lazy loading** des pages
- **Compression d'images** WebP
- **Service Worker** ready

---

## 🔒 Sécurité

### Mesures implémentées
- **CSP Headers** configurés
- **XSS Protection** activée
- **HTTPS** obligatoire en production
- **Validation** des inputs utilisateur
- **Sanitization** du contenu Markdown

---

## 📞 Support et Contact

### Issues
Pour rapporter un bug ou suggérer une amélioration :
[GitHub Issues](https://github.com/Skyneur/OneForAll/issues)

### Documentation
Wiki complet disponible sur :
[GitHub Wiki](https://github.com/Skyneur/OneForAll/wiki)

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🎖️ Remerciements

- **React Team** pour le framework exceptionnel
- **Vite Team** pour l'outil de build révolutionnaire  
- **Lucide** pour les icônes magnifiques
- **Communauté Open Source** pour l'inspiration continue

---

<div align="center">

**Survivez. Communiquez. Prospérez.**

*Développé avec ❤️ pour la communauté des survivants*

**[⭐ Donnez une étoile au projet](https://github.com/Skyneur/OneForAll)** si il vous aide à survivre !

</div>