# 🏕️ OneForAll - Application de Survie

Application web complète avec documentation de survie et chat temps réel.

## 🚀 Démarrage Rapide

```bash
# Backend (Terminal 1)
cd backend
npm install
npm run dev

# Frontend (Terminal 2)  
cd frontend
npm install
npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Structure du Projet

```
OneForAll/
├── backend/           # API Node.js + Socket.IO
│   ├── src/
│   │   ├── routes/    # API REST
│   │   ├── services/  # WebSocket
│   │   └── server.js  # Point d'entrée
│   └── package.json
│
├── frontend/          # Interface React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

## 🎨 Fonctionnalités

- **🏠 Dashboard** - Vue d'ensemble
- **📚 Documentation** - Guides de survie
- **💬 Chat** - Communication temps réel avec expiration des messages
- **🖼️ Stéganographie** - Cacher/révéler des messages dans des images
- **⚙️ Paramètres** - Configuration

## 🐍 Dépendances Python

L'application utilise Python pour la stéganographie. Les dépendances requises :
- `stegano` - Bibliothèque de stéganographie LSB
- `pillow` - Traitement d'images

### Installation automatique

```bash
# Windows
.\setup-python.ps1

# Linux/Mac
chmod +x setup-python.sh
./setup-python.sh
```

### Installation manuelle

```bash
pip install stegano pillow
```

## 🛠️ Technologies

**Backend:**
- Node.js + Express.js
- Socket.IO (WebSocket)
- Helmet (Sécurité)

**Frontend:**
- React 18 + TypeScript
- Vite (Build tool)
- Socket.IO Client

## 🚀 Déploiement sur VPS

### Déploiement automatique

```bash
# 1. Cloner le projet sur le VPS
git clone https://github.com/votre-username/OneForAll.git
cd OneForAll

# 2. Exécuter le script de déploiement
chmod +x deploy.sh
sudo ./deploy.sh
```

### Déploiement manuel

```bash
# 1. Installer les prérequis
sudo apt update
sudo apt install -y nodejs npm python3 python3-pip nginx

# 2. Installer PM2 (gestionnaire de processus)
sudo npm install -g pm2

# 3. Installer les dépendances Python
pip3 install stegano pillow

# 4. Installer et builder le projet
cd backend && npm install --production
cd ../frontend && npm install && npm run build

# 5. Configurer les variables d'environnement
cp backend/.env.example backend/.env
# Modifier les URLs avec votre IP publique

# 6. Démarrer avec PM2
pm2 start backend/src/server.js --name oneforall
pm2 save
pm2 startup

# 7. Configurer Nginx (voir deploy.sh pour la config)
```

### Variables d'environnement pour production

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://VOTRE_IP_PUBLIQUE
ALLOWED_ORIGINS=http://VOTRE_IP_PUBLIQUE
PYTHON_EXECUTABLE=python3
```

## 🎯 Utilisation

1. **Démarrez** les deux serveurs
2. **Ouvrez** http://localhost:5173
3. **Naviguez** vers les différentes pages
4. **Testez** la stéganographie avec vos propres images
5. **Chattez** en temps réel avec expiration automatique

## 📡 API Endpoints

- `GET /api/health` - Santé du serveur
- `POST /api/steganography` - Cacher/révéler des messages
- `GET /api/steganography/download/:filename` - Télécharger images
- `WebSocket /socket.io` - Chat temps réel

---

**Développé pour la survie 🌱**